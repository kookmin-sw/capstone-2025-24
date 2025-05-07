import yaml
import torch
import torch.nn.functional as F
from torchvision.io import read_video
from torchvision.transforms import Compose, Lambda, CenterCrop
from pytorchvideo.transforms import (
    UniformTemporalSubsample,
    Normalize,
    ShortSideScale,
)
from src.model_module import X3DFineTuner
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

CFG_PATH = "configs/default.yaml"
CHECKPOINT_PATH = "/content/drive/MyDrive/X3D/fine-tune/configs/checkpoints/x3d-epoch=09-val_loss=0.45.ckpt"
VIDEO_PATH = ""
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

label_map = {
    0: "fighting",
    1: "normal",
    2: "swoon",
    3: "weapon_attack",
}

def transform_video(video_path, cfg):
    # [T, H, W, C]로 로드
    video, _, _ = read_video(video_path, pts_unit="sec")
    # [C, T, H, W]
    video = video.permute(3, 0, 1, 2).float()

    transform = Compose([
        UniformTemporalSubsample(8),     
        Lambda(lambda x: x / 255.0),     
        Normalize((0.45,0.45,0.45),(0.225,0.225,0.225)),
        ShortSideScale(256),            
        CenterCrop(224),                
    ])
    # apply
    video = transform(video)  # [C, T, H, W]
    return video.unsqueeze(0)  # [1, C, T, H, W]

def load_model(checkpoint_path, cfg_path, device):
    cfg = yaml.safe_load(open(cfg_path))
    # LightningModule 기반으로 로드
    model = X3DFineTuner.load_from_checkpoint(
        checkpoint_path,
        cfg=cfg
    )
    model = model.to(device)
    model.eval()
    return model, cfg

def inference(model, video_tensor, device):
    video_tensor = video_tensor.to(device)
    with torch.no_grad():
        logits = model(video_tensor)
        probs = F.softmax(logits, dim=1)
        pred = torch.argmax(probs, dim=1).item()
    return pred, probs.cpu().numpy()

if __name__ == "__main__":
    # 모델 로드
    model, cfg = load_model(CHECKPOINT_PATH, CFG_PATH, DEVICE)

    # 비디오 전처리
    video_tensor = transform_video(VIDEO_PATH, cfg)

    # 인퍼런스
    label_idx, probabilities = inference(model, video_tensor, DEVICE)

    # 결과 출력
    class_name = label_map.get(label_idx, f"Class_{label_idx}")
    print(f"Predicted: {class_name} (index={label_idx})")
    print(f"Probabilities: {probabilities}")
