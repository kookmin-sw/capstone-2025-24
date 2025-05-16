import os
import yaml
import torch
import torch.nn.functional as F
from tqdm import tqdm
from collections import defaultdict

from pytorch_lightning import seed_everything
from data_module import VideoDataModule
from model_module import X3DFineTuner

with open("/content/drive/MyDrive/X3D/fine-tune/configs/default.yaml", "r") as f:
    CFG = yaml.safe_load(f)

seed_everything(42)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

dm = VideoDataModule(CFG)
dm.setup("test")  
test_loader = dm.test_dataloader()

model = X3DFineTuner.load_from_checkpoint(
    checkpoint_path="/content/drive/MyDrive/X3D/fine-tune/checkpoints/x3d-epoch=26-val_loss=0.02.ckpt", 
    cfg=CFG,
)
model.eval().to(device)

class_names = sorted(os.listdir(os.path.join(CFG["data_path"], "test")))
num_classes = len(class_names)
print(f"클래스 수: {num_classes}")
print(f"클래스 이름: {class_names}")

correct = defaultdict(int)
total = defaultdict(int)

with torch.no_grad():
    for batch in tqdm(test_loader, desc="Evaluating"):
        videos = batch["video"].to(device)  # (B, C, T, H, W)
        labels = batch["label"].to(device)  # (B,)

        logits = model(videos)
        preds = torch.argmax(F.softmax(logits, dim=1), dim=1)  # (B,)

        for gt, pred in zip(labels, preds):
            cls = gt.item()
            total[cls] += 1
            if pred.item() == cls:
                correct[cls] += 1

print("\n클래스별 정확도 (Top-1 Accuracy):")
for i in range(num_classes):
    acc = 100 * correct[i] / total[i] if total[i] > 0 else 0
    print(f"- {class_names[i]}: {acc:.2f}% ({correct[i]}/{total[i]})")

# 8. 전체 평균
overall_correct = sum(correct.values())
overall_total = sum(total.values())
overall_acc = 100 * overall_correct / overall_total if overall_total > 0 else 0
print(f"\n전체 정확도: {overall_acc:.2f}% ({overall_correct}/{overall_total})")
