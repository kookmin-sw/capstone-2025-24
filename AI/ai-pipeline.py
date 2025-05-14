import cv2
import time
import signal
import requests
import yaml
import torch
import torch.nn.functional as F
from torchvision.io import read_video
from torchvision.transforms import Compose, Lambda, CenterCrop
from pytorchvideo.transforms import UniformTemporalSubsample, Normalize, ShortSideScale
from ultralytics import YOLO
from concurrent.futures import ThreadPoolExecutor
from model_module import X3DFineTuner
import boto3
import os

# ─── 설정 로드 ─────────────────────────────────────────────────────────
with open("../config.yaml","r",encoding="utf-8") as f:
    CFG = yaml.safe_load(f)

EXT_POST_SEC = CFG.get("EXT_POST_SEC", 10)
SUPPRESSION_SEC = CFG.get("SUPPRESSION_SEC", 120)

last_trigger = {} 
active_categories = set()  # 현재 녹화 중인 카테고리
stop = False

def on_signal(sig, frame):
    global stop
    print(f"[Main] Signal {sig}, shutting down...", flush=True)
    stop = True

signal.signal(signal.SIGINT, on_signal)
signal.signal(signal.SIGTERM, on_signal)

# ─── 2차 모델 준비 ─────────────────────────────────────────────────────
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")
x3d_cfg = yaml.safe_load(open(CFG["SECOND_MODEL"]["CFG_PATH"]))
model2 = X3DFineTuner.load_from_checkpoint(
    CFG["SECOND_MODEL"]["CKPT_PATH"], cfg=x3d_cfg
).to(DEVICE).eval()

def transform_video(path):
    v,_,_ = read_video(path, pts_unit="sec")
    x = v.permute(3,0,1,2).float()
    tf = Compose([
        UniformTemporalSubsample(8),
        Lambda(lambda t: t/255.0),
        Normalize((0.45,)*3,(0.225,)*3),
        ShortSideScale(256),
        CenterCrop(224),
    ])
    return tf(x).unsqueeze(0).to(DEVICE)

def inference_model2(clip_path):
    inp = transform_video(clip_path)
    with torch.no_grad():
        logits = model2(inp)
        probs  = F.softmax(logits, dim=1)[0]
        idx = int(probs.argmax())
    return CFG["SECOND_MODEL"]["LABEL_MAP"][idx], probs.cpu().tolist()

def upload_to_s3(local_file, s3_file, cfg):
    s3 = boto3.client(
        's3',
        aws_access_key_id=cfg['STORAGE']['ACCESS_KEY_ID'],
        aws_secret_access_key=cfg['STORAGE']['SECRET_ACCESS_KEY']
    )
    try:
        s3.upload_file(
            local_file,
            cfg['STORAGE']['BUCKET_NAME'],
            s3_file,
            ExtraArgs={"ContentType": "video/mp4"}
        )
        print(f"[S3] Uploaded: {s3_file}", flush=True)
        return s3_file
    except Exception as e:
        print(f"[S3] Error uploading file: {e}", flush=True)
        return None

def record_post_frames(stream_url, duration, fps, w, h):
    cap2 = cv2.VideoCapture(stream_url)
    frames = []
    end = time.time() + duration
    while time.time() < end:
        ret, f = cap2.read()
        if not ret: break
        frames.append(f)
    cap2.release()
    return frames

# ─── 워커: MP4 저장 → 2차 예측 → 위험 시 클립 생성·업로드 → 삭제 ─────────
def worker(frames, w, h, fps, clip_primary, cat):
    clip_ext = None
    try:
        # 1) 1차 클립 저장
        fourcc = cv2.VideoWriter_fourcc(*"avc1")
        out1 = cv2.VideoWriter(clip_primary, fourcc, fps, (w, h))
        for img in frames:
            out1.write(img)
        out1.release()
        print(f"[Worker] Primary clip saved: {clip_primary}", flush=True)

        # 2) 사람(person)만 2차 모델 예측
        if cat == "person":
            pred, probs = inference_model2(clip_primary)
            print(f"[Worker] X3D Predicted {pred}, probs={probs}", flush=True)

            now = time.time()
            last_time = last_trigger.get(pred, 0)

            elapsed_time = time.time() - now
            print(f"{pred} 실행 시간: {elapsed_time:.6f}초")


            if pred != "normal":
                if now - last_time < SUPPRESSION_SEC:
                    print(f"[Worker] Skipping {pred}, suppression active", flush=True)
                elif pred in active_categories:
                    print(f"[Worker] Skipping {pred}, already active", flush=True)
                else:
                    active_categories.add(pred)
                    # 후속 10초 영상 캡처
                    post_frames = record_post_frames(
                        CFG.get("STREAM_URL",""), EXT_POST_SEC, fps, w, h
                    )
                    clip_ext = f"2_{pred}_{time.strftime('%Y%m%d_%H%M%S')}.mp4"
                    out2 = cv2.VideoWriter(clip_ext, fourcc, fps, (w, h))
                    for img in post_frames:
                        out2.write(img)
                    out2.release()
                    print(f"[Worker] Extended clip saved: {clip_ext}", flush=True)

                    url = upload_to_s3(clip_ext, f"videos/{clip_ext}", CFG)
                    if url:
                        payload = {
                            "officeId": CFG["OFFICE_ID"],
                            "cctvId":   CFG["CCTV_ID"],
                            "category": pred,
                            "video":    url,
                            "memo": ""
                        }
                        try:
                            r = requests.post(CFG["BACKEND_URL"], json=payload, timeout=10)
                            print(f"[Worker] X3D POST {pred} → {r.status_code}", flush=True)
                        except Exception as e:
                            print(f"[Worker] POST error: {e}", flush=True)
                    
                    last_trigger[pred] = now
        else:
            # smoke/fire/... 이벤트 처리
            now = time.time()
            last_time = last_trigger.get(cat, 0)
            if now - last_time < SUPPRESSION_SEC:
                print(f"[Worker] Skipping YOLO {cat}, suppression active", flush=True)
            else:
                url = upload_to_s3(clip_primary, f"videos/{clip_primary}", CFG)
                if url:
                    payload = {
                        "officeId": CFG["OFFICE_ID"],
                        "cctvId":   CFG["CCTV_ID"],
                        "category": cat,
                        "video":    url,
                        "memo": ""
                    }
                    try:
                        r = requests.post(CFG["BACKEND_URL"], json=payload, timeout=10)
                        print(f"[Worker] YOLO POST {cat} → {r.status_code}", flush=True)
                    except Exception as e:
                        print(f"[Worker] POST error: {e}", flush=True)
                last_trigger[cat] = now
    except Exception as ex:
        print(f"[Worker] Error processing {cat}: {ex}", flush=True)
    finally:
        # 반드시 임시 파일 삭제
        for path in (clip_primary, clip_ext):
            if path and os.path.exists(path):
                try:
                    os.remove(path)
                    print(f"[Worker] Deleted file: {path}", flush=True)
                except Exception:
                    pass
        active_categories.discard(cat)
        
# ─── 메인 루프: 1차 감지(사람 제외 suppression) & 세션 버퍼링 ──────────────
def main():
    cap = cv2.VideoCapture(CFG.get("STREAM_URL", CFG["CAMERA_INDEX"]))
    if not cap.isOpened():
        print("❌ Cannot open source", flush=True)
        return

    w   = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    h   = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS) or CFG["FPS_FALLBACK"]
    print(f"[Init] {w}×{h} @ {fps:.1f}FPS", flush=True)

    model1   = YOLO(CFG["PRIMARY_PT"])
    executor = ThreadPoolExecutor(max_workers=CFG["WORKER"]["MAX_WORKERS"])

    recs, next_ts, cnt = [], 0.0, 0
    frame_idx = 0
    try:
        while not stop:
            ret, frame = cap.read()
            if not ret: break
            now = time.time()

            # A) 진행 중 세션 업데이트
            for r in recs[:]:
                r["frames"].append(frame)
                if len(r["frames"]) >= r["frames_to_rec"]:
                    executor.submit(worker, r["frames"], w, h, fps, r["path"], r["cat"])
                    recs.remove(r)

            # B) 1차 감지 → 새 세션
            if now >= next_ts and len(recs) < CFG["WORKER"]["MAX_RECORDERS"]:
                res = model1(frame, verbose=False)[0]
                
                if res.boxes.shape[0] > 0:
                    dets = res[0].boxes  # Boxes 객체
                
                    # 클래스 이름별 카운트 집계
                    counts = {}
                    for cls_id in dets.cls:
                        name = res[0].names[int(cls_id)]
                        counts[name] = counts.get(name, 0) + 1

                    # "4 persons, 1 weapon, 4 heads" 형태로 포맷
                    parts = []
                    for name, cnt in counts.items():
                        # 복수형 처리: 단순히 s 붙이기 (필요시 한글/영어 맞춤)
                        label = name + ("s" if cnt > 1 else "")
                        parts.append(f"{cnt} {label}")
                    msg = ", ".join(parts)

                    # 콘솔에 출력
                    print(f"\n0: 360x640 [Frame {frame_idx}]: {msg}")
                
                frame_idx += 1
                
                detected_cats = {model1.names[int(b.cls)] for b in res.boxes if model1.names[int(b.cls)] in CFG["WORKER"]["CLASSES"]}
                for cat in detected_cats:

                    if cat in active_categories:
                        print(f"[Main] Skipping {cat}, already recording", flush=True)
                        continue

                    # 사람은 suppression 없이 처리
                    if cat == "person":
                        dur = CFG["PERSON_SEC"]

                    else:
                        elapsed_time = time.time() - now
                        print(f"{cat} 실행 시간: {elapsed_time:.6f}초")
                        
                        active_categories.add(cat)
                        now = time.time()
                        last_time = last_trigger.get(cat, 0)
                        if now - last_time < SUPPRESSION_SEC:
                            active_categories.discard(cat)
                            print(f"[Main] Skipping primary {cat}, within {SUPPRESSION_SEC}s", flush=True)
                            continue
                        dur = CFG["DEFAULT_SEC"]

                    cnt += 1
                    f2r  = int(fps * dur)
                    clip = f"{cat}_{time.strftime('%Y%m%d_%H%M%S')}_{cnt:02d}.mp4"
                    print(f"[Main] Detected primary {cat}, rec {dur}s → {clip}", flush=True)
                    recs.append({"frames":[],"path":clip,"cat":cat,"frames_to_rec":f2r})

                if detected_cats:
                    next_ts = now + max((CFG["PERSON_SEC"] if "person" in detected_cats else 0),
                                        (CFG["DEFAULT_SEC"] if detected_cats - {"person"} else 0))
    finally:
        executor.shutdown(wait=True)
        cap.release()
        cv2.destroyAllWindows()
                          
        print("[Main] Shutdown complete", flush=True)

if __name__=="__main__":
    main()