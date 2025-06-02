import torch
from pytorchvideo.data.encoded_video import EncodedVideo
from torchvision.transforms import Compose, Lambda, RandomCrop
from pytorchvideo.transforms import UniformTemporalSubsample, RandomShortSideScale
import torch.nn.functional as F
import yaml
import numpy as np
import time
from src.model_module import X3DFineTuner

# 1. config 로드
with open("dynamic_classification_model/configs/default.yaml", "r") as f:
    CFG = yaml.safe_load(f)

# 2. 디바이스 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"✅ 현재 사용 중인 디바이스: {device}")

# 3. 모델 로드
model = X3DFineTuner(CFG)
ckpt_path = "dynamic_classification_model/configs/checkpoints/x3d-epoch=25-val_loss=0.05.ckpt"
state_dict = torch.load(ckpt_path, map_location=device)["state_dict"]
model.load_state_dict(state_dict)
model.eval().to(device)

# 4. 전처리 정의 (eval.py 기준과 동일)
transform = Compose([
    UniformTemporalSubsample(8),
    Lambda(lambda x: x / 255.0),
    RandomShortSideScale(min_size=256, max_size=320),
    RandomCrop(224),
])

# 5. 비디오 로딩 및 전처리
def load_and_preprocess_video(video_path, clip_duration=3.0):
    video = EncodedVideo.from_path(video_path)
    clip = video.get_clip(start_sec=0, end_sec=clip_duration)["video"]
    video_tensor = transform(clip)
    return video_tensor.unsqueeze(0)  # (1, C, T, H, W)

# 6. 인퍼런스 수행
label_map = {
    0: "fighting",
    1: "normal",
    2: "swoon",
    3: "weapon_attack",
}

video_path = "test_data/weapon_attack/20250521_200537_0000s_000.mp4"
video_tensor = load_and_preprocess_video(video_path).to(device)
print("입력 텐서 디바이스:", video_tensor.device)

with torch.no_grad():
    if device.type == "cuda":
        start_event = torch.cuda.Event(enable_timing=True)
        end_event = torch.cuda.Event(enable_timing=True)
        start_event.record()
        logits = model(video_tensor)
        end_event.record()
        torch.cuda.synchronize()
        elapsed_time_ms = start_event.elapsed_time(end_event)
    else:
        start = time.time()
        logits = model(video_tensor)
        elapsed_time_ms = (time.time() - start) * 1000

    probs = F.softmax(logits, dim=1)
    pred = torch.argmax(probs, dim=1).item()

pred_eng = label_map.get(pred, f"class_{pred}")
print(f"\n🎯 예측 클래스: {pred_eng} (index={pred})")

np.set_printoptions(precision=6, suppress=True)
print(f"📊 Softmax Probabilities: {probs.cpu().numpy()}")
print(f"⏱️ Inference 시간: {elapsed_time_ms:.2f} ms")

if device.type == "cuda":
    allocated = torch.cuda.memory_allocated() / 1024**2
    print(f"🔥 현재 할당된 GPU 메모리: {allocated:.2f} MB")