# pipeline_원본.py
import os
import cv2, av
import time
import torch
import yaml
import numpy as np
import torch.nn.functional as F
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
import requests

from ultralytics import YOLO
from pytorchvideo.data.encoded_video import EncodedVideo
from torchvision.transforms import Compose, Lambda, RandomCrop
from pytorchvideo.transforms import UniformTemporalSubsample, RandomShortSideScale
from dynamic_classification_model.src.model_module import X3DFineTuner

from collections import deque
from concurrent.futures import ThreadPoolExecutor

# ─── 1) 파이프라인 설정 로드 ─────────────────────────────────────────────
with open("./config.yaml", "r", encoding="utf-8") as f:
    PIPE_CFG = yaml.safe_load(f)

# ─── 2) 디바이스 설정 ───────────────────────────────────────────────────
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"-> Using device: {DEVICE}")

# ─── 3) YOLO 모델 로드 ───────────────────────────────────────────────────
yolo = YOLO(PIPE_CFG["PRIMARY_PT"])

# ─── 4) X3D 모델 로드 ───────────────────────────────────────────────────
#    (동일한 config.yaml 내 SECOND_MODEL 항목을 참고)
with open(PIPE_CFG["SECOND_MODEL"]["CFG_PATH"], "r", encoding='utf-8') as f:
    X3D_CFG = yaml.safe_load(f)

x3d = X3DFineTuner(X3D_CFG)
sd = torch.load(PIPE_CFG["SECOND_MODEL"]["CKPT_PATH"], map_location=DEVICE)["state_dict"]
x3d.load_state_dict(sd)
x3d.eval().to(DEVICE)

# X3D 전처리 파이프라인
x3d_transform = Compose([
    UniformTemporalSubsample(8),
    Lambda(lambda x: x / 255.0),
    RandomShortSideScale(min_size=256, max_size=320),  # min·max 분리
    RandomCrop(224),
])


s3 = boto3.client(
    's3',
    aws_access_key_id=PIPE_CFG['STORAGE']["ACCESS_KEY_ID"],
    aws_secret_access_key=PIPE_CFG['STORAGE']['SECRET_ACCESS_KEY']
)

label_map = PIPE_CFG["SECOND_MODEL"]["LABEL_MAP"]

def run_x3d_inference(clip_path: str):
    """3초 클립 → X3D 분류 : (label, probs, elapsed_ms) 반환 + 디버그 출력"""
    video = EncodedVideo.from_path(clip_path)
    clip  = video.get_clip(start_sec=0, end_sec=PIPE_CFG["PERSON_SEC"])["video"]
    vt    = x3d_transform(clip).unsqueeze(0).to(DEVICE)

    # print("입력 텐서 디바이스:", vt.device)

    with torch.no_grad():
        if DEVICE.type == "cuda":
            start_evt = torch.cuda.Event(enable_timing=True)
            end_evt   = torch.cuda.Event(enable_timing=True)
            start_evt.record()
            logits = x3d(vt)
            end_evt.record()
            torch.cuda.synchronize()
            elapsed_ms = start_evt.elapsed_time(end_evt)
        else:
            t0 = time.time()
            logits = x3d(vt)
            elapsed_ms = (time.time() - t0) * 1000

    probs = F.softmax(logits, dim=1)
    pred  = torch.argmax(probs, dim=1).item()
    pred_eng = label_map.get(pred, f"class_{pred}")
    
    # # 결과 디버그 출력
    # np.set_printoptions(precision=6, suppress=True)
    # print(f"예측 클래스: {pred_eng} (index={pred}) | Inference 시간: {elapsed_ms:.2f} ms", flush=True)
    # print(f"Softmax Probabilities: {probs.cpu().numpy()}", flush=True)
    if DEVICE.type == "cuda":
        allocated = torch.cuda.memory_allocated() / 1024**2
        print(f"현재 할당된 GPU 메모리: {allocated:.2f} MB", flush=True)

    if probs.max() < PIPE_CFG["SECOND_MODEL"]["THRESHOLD"]:
        pred_eng = "normal"  # 확률이 임계값 미만이면 'normal'로 설정

    return pred_eng, probs.cpu().numpy()[0], elapsed_ms

# ─── 5) 비디오 캡처 준비 ─────────────────────────────────────────────────
cap = cv2.VideoCapture(PIPE_CFG["STREAM_URL"] or PIPE_CFG["CAMERA_INDEX"])
if not cap.isOpened():
    raise RuntimeError(f"Cannot open source {PIPE_CFG['STREAM_URL']}")

W = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
H = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
FPS = cap.get(cv2.CAP_PROP_FPS) or PIPE_CFG["FPS_FALLBACK"]
print(f"✅ Loaded source: {W}×{H} @ {FPS:.1f}FPS", flush=True)

# ─── 6) 클립 버퍼 세팅 ───────────────────────────────────────────────────
clip_dur = PIPE_CFG["PERSON_SEC"]
person_buf_sz = int(FPS * clip_dur)
person_buf = []
yolo_buf = deque(maxlen=int(FPS * PIPE_CFG["DEFAULT_SEC"]))
clip_idx = 0

last_trigger = {}

io_pool = ThreadPoolExecutor(max_workers=4)

active_rec = []                     # 진행 중인 녹화 세션 리스트

class Recording:
    """탐지 후 n초 동안 프레임을 모아 비동기로 저장"""
    def __init__(self, category, idx, fps):
        self.category = category
        self.idx = idx
        self.full = fps  # 채워야 할 프레임 수
        self.frames = []

    def add(self, frame):
        self.frames.append(frame)
        return len(self.frames) >= self.full

def upload_to_s3(file_path, s3_key):
    """파일을 S3에 업로드하고 URL 반환"""

    try:
        s3.upload_file(
            file_path, 
            PIPE_CFG['STORAGE']["BUCKET_NAME"], 
            s3_key,
            ExtraArgs={"ContentType": "video/mp4"}
        )
        return s3_key
    
    except Exception as e:
        print(f"❌ S3 업로드 실패: {e}")
        return None

def write_clip(frames, path):
    fourcc = cv2.VideoWriter_fourcc(*"mp4v") 
    out   = cv2.VideoWriter(path, fourcc, FPS, (W, H))
    for f in frames: out.write(f)
    out.release()

# ─── H.264 인코딩 util ────────────────────────────────────────────────
def write_h264(frames, path):
    output = av.open(path, mode="w")
    rate = int(FPS)
        
    stream = output.add_stream("h264", rate=rate)
    stream.width, stream.height, stream.pix_fmt = W, H, "yuv420p"
    
    for img in frames:
        vf = av.VideoFrame.from_ndarray(img, format="bgr24")
        for pkt in stream.encode(vf):
            output.mux(pkt)

    for pkt in stream.encode():
        output.mux(pkt)

    output.close()

def io_job(frames, path, category):
    write_h264(frames, path)
    print(f"🎥 클립 저장 완료: {path}", flush=True)
    url = upload_to_s3(path, f"videos/{path}", PIPE_CFG)   # 기존 함수 재사용
    print(f"🔗 S3 업로드 완료: {url}", flush=True)

    if url:
        payload = {
            "officeId": PIPE_CFG["OFFICE_ID"],
            "cctvId":   PIPE_CFG["CCTV_ID"],
            "category": category,
            "video":    url,
            "memo": ""
        }
        requests.post(PIPE_CFG["BACKEND_URL"], json=payload, timeout=5)
    os.remove(path)

# ─── 7) 메인 루프 ────────────────────────────────────────────────────────
while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    yolo_buf.append(frame)

    for rec in active_rec[:]:                  # shallow copy → 동시에 pop 안전
        if rec.add(frame):                    # 프레임 다 모였으면
            out_path = f"{rec.category}_{rec.idx:03d}.mp4"
            io_pool.submit(io_job, rec.frames, out_path, rec.category)
            active_rec.remove(rec)

    # ❌ 기본 verbose 출력을 막는다
    results = yolo(frame, verbose=False)[0]
    names   = {results.names[int(c)] for c in results.boxes.cls}

    # print(names, flush=True)

    # ── 1. 사람(person) 처리 ────────────────────────────────────────────
    if "person" in names:
        person_buf.append(frame)
        if len(person_buf) >= person_buf_sz:
            clip_path = f"person_{clip_idx:03d}.mp4"
            write_clip(person_buf, clip_path)

            pred_label, prob, t_ms = run_x3d_inference(clip_path)

            if pred_label != "normal" and time.time() - last_trigger.get(pred_label, 0) >= PIPE_CFG["SUPPRESSION_SEC"]:
                last_trigger[pred_label] = time.time()
                
                active_rec.append(Recording(pred_label, clip_idx, int(FPS * PIPE_CFG["X3D_SEC"])))
                print(f"[Clip {clip_idx:03d}] {pred_label} | {prob} | {t_ms:.2f} ms", flush=True)

            os.remove(clip_path)
            person_buf.clear()
    else:
        person_buf.clear()

    # ── 2. 사람 이외 객체가 있을 때만 터미널 출력 ───────────────────────
    
    detected_cats = set()  
    for i, cls_id in enumerate(results.boxes.cls):
        conf = results.boxes.conf[i].item()  # 현재 객체의 confidence score
        name = results.names[int(cls_id)]   # 현재 객체의 클래스 이름

        # "weapon"의 확률이 95% 이상일 때만 'weapon'으로 추가
        if name == "weapon" and conf >= 0.95:
            detected_cats.add("weapon")
        # "assault"의 확률이 70% 이상일 때만 'assault'으로 추가
        elif name == "assault" and conf >= 0.7:
            detected_cats.add("assault")
        # "weapon"과 "assault" 외 다른 객체는 그대로 추가
        elif name not in ["weapon", "assault", "person", "head"]:
            detected_cats.add(name)

    if detected_cats:
        # print("🔍 YOLO Detected:", ", ".join(sorted(non_person)))

        for non_p in detected_cats:
            if time.time() - last_trigger.get(non_p, 0) >= PIPE_CFG["SUPPRESSION_SEC"]:
                print(f"🔍 {non_p} 감지됨", flush=True)
                last_trigger[non_p] = time.time()

                active_rec.append(Recording(non_p, clip_idx, int(FPS * PIPE_CFG["DEFAULT_SEC"])))

    clip_idx += 1

cap.release()
cv2.destroyAllWindows()
print("✅ 종료")