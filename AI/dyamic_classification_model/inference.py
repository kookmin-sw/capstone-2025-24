import torch
from pytorchvideo.data.encoded_video import EncodedVideo
from torchvision.transforms import Compose, Lambda, Resize
from pytorchvideo.transforms import UniformTemporalSubsample
import torch.nn.functional as F
import yaml
from src.model_module import X3DFineTuner

# ───────────────────────────────
# 1. config 로드
with open("/content/drive/MyDrive/X3D/fine-tune/configs/default.yaml", "r") as f:
    CFG = yaml.safe_load(f)

# ───────────────────────────────
# 2. 모델 로드 (checkpoint 포함)
model = X3DFineTuner(CFG)
ckpt_path = "/content/drive/MyDrive/X3D/fine-tune/checkpoints/x3d-epoch=26-val_loss=0.02.ckpt"
state_dict = torch.load(ckpt_path, map_location="cpu")["state_dict"]
model.load_state_dict(state_dict)
model.eval().cuda()

# ───────────────────────────────
# 3. 비디오 로딩 및 전처리
def load_and_preprocess_video(video_path, clip_duration=2.0):
    video = EncodedVideo.from_path(video_path)
    video_data = video.get_clip(start_sec=0, end_sec=clip_duration)["video"]  # (C, T, H, W)

    transform = Compose([
        UniformTemporalSubsample(8),
        Lambda(lambda x: x / 255.0),
        Resize((224, 224))
    ])
    video_data = transform(video_data)
    return video_data.unsqueeze(0)  # → (1, C, T, H, W)

# ───────────────────────────────
# 4. 인퍼런스 수행
video_tensor = load_and_preprocess_video("/content/drive/MyDrive/X3D/fine-tune/dataset/test/fighting/1-1_cam01_fight04_place02_night_spring_1_0000s_000.mp4").cuda()
with torch.no_grad():
    logits = model(video_tensor)
    probs = F.softmax(logits, dim=1)
    pred = torch.argmax(probs, dim=1).item()

print(f"예측 클래스 ID: {pred}")
print(f"Softmax Probabilities: {probs.cpu().numpy()}")