# all_pipeline.py
import os
import cv2
import time
import torch
import yaml
import numpy as np
import torch.nn.functional as F

from ultralytics import YOLO
from pytorchvideo.data.encoded_video import EncodedVideo
from torchvision.transforms import Compose, Lambda, RandomCrop
from pytorchvideo.transforms import UniformTemporalSubsample, RandomShortSideScale
from dynamic_classification_model.src.model_module import X3DFineTuner

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
with open(PIPE_CFG["SECOND_MODEL"]["CFG_PATH"], "r") as f:
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

label_map = PIPE_CFG["SECOND_MODEL"]["LABEL_MAP"]

def run_x3d_inference(clip_path: str):
    """3초 클립 → X3D 분류 : (label, probs, elapsed_ms) 반환 + 디버그 출력"""
    video = EncodedVideo.from_path(clip_path)
    clip  = video.get_clip(start_sec=0, end_sec=PIPE_CFG["PERSON_SEC"])["video"]
    vt    = x3d_transform(clip).unsqueeze(0).to(DEVICE)

    print("입력 텐서 디바이스:", vt.device)

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

    # 결과 디버그 출력
    np.set_printoptions(precision=6, suppress=True)
    #print(f"🎯 예측 클래스: {pred_eng} (index={pred})")
    #print(f"📊 Softmax Probabilities: {probs.cpu().numpy()}")
    #print(f"⏱️ Inference 시간: {elapsed_ms:.2f} ms")
    #if DEVICE.type == "cuda":
    #    allocated = torch.cuda.memory_allocated() / 1024**2
    #    print(f"🔥 현재 할당된 GPU 메모리: {allocated:.2f} MB")

    return pred_eng, probs.cpu().numpy()[0], elapsed_ms

# ─── 5) 비디오 캡처 준비 ─────────────────────────────────────────────────
cap = cv2.VideoCapture(PIPE_CFG["STREAM_URL"] or PIPE_CFG["CAMERA_INDEX"])
if not cap.isOpened():
    raise RuntimeError(f"Cannot open source {PIPE_CFG['STREAM_URL']}")

W = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
H = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
FPS = cap.get(cv2.CAP_PROP_FPS) or PIPE_CFG["FPS_FALLBACK"]
print(f"✅ Loaded source: {W}×{H} @ {FPS:.1f}FPS")

# ─── 6) 클립 버퍼 세팅 ───────────────────────────────────────────────────
clip_dur     = PIPE_CFG["PERSON_SEC"]
buffer_size  = int(FPS * clip_dur)
frame_buffer = []
clip_idx     = 0

def write_clip(frames, path):
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    out   = cv2.VideoWriter(path, fourcc, FPS, (W, H))
    for f in frames: out.write(f)
    out.release()

# ─── 7) 메인 루프 ────────────────────────────────────────────────────────
while True:
    ret, frame = cap.read()
    if not ret:
        break

    # ❌ 기본 verbose 출력을 막는다
    results = yolo(frame, verbose=False)[0]
    names_probs = [(results.names[int(cls)], float(score)) 
                for cls, score in zip(results.boxes.cls, results.boxes.conf)]
    names = {n for n, _ in names_probs}  # 이름만 뽑아서 set으로 저장



    # ── 1. 사람(person) 처리 ────────────────────────────────────────────
    if "person" in names:
        frame_buffer.append(frame)
        if len(frame_buffer) >= buffer_size:
            clip_path = f"tmp_clip_{clip_idx:03d}.mp4"
            write_clip(frame_buffer, clip_path)

            pred_label, prob, t_ms = run_x3d_inference(clip_path)
            np.set_printoptions(precision=6, suppress=True)
            print(f"[Clip {clip_idx:03d}] 🎯 {pred_label} | {prob} | {t_ms:.2f} ms")

            os.remove(clip_path)
            frame_buffer.clear()
            clip_idx += 1
    else:
        frame_buffer.clear()

    # ── 2. 사람 이외 객체가 있을 때만 터미널 출력 ────────────────────────
    non_person = [(n, s) for n, s in names_probs if n not in {"person", "head"}]
    if non_person:
        print("🔍 YOLO:")
        for name, score in non_person:
            print(f"   - {name}: {score:.2%}")


    #YOLO 추론 결과 시각화
    annotated_frame = results.plot()

    # 웹캠 영상 출력
    cv2.imshow("YOLO + X3D 추론 영상", annotated_frame)

    # 'q' 키 누르면 종료
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
print("✅ 종료")
