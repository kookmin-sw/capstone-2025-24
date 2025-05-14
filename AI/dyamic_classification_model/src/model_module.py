import torch
import torch.nn as nn
import torch.nn.functional as F
import pytorch_lightning as pl
from pytorchvideo.models.hub import x3d_s

class X3DFineTuner(pl.LightningModule):
    def __init__(self, cfg):
        super().__init__()
        self.save_hyperparameters(cfg)
        self.model = x3d_s(pretrained=True)

        self.model.blocks[-1].pool = nn.AdaptiveAvgPool3d((1, 1, 1))
        self.model.blocks[-1].proj = nn.LazyLinear(cfg["num_classes"])

        if cfg.get("freeze_backbone", False):
            for name, param in self.model.named_parameters():
                if "proj" not in name:
                    param.requires_grad = False

        self.lr = float(cfg["lr"])

    def forward(self, x):
        return self.model(x)

    def training_step(self, batch, batch_idx):
        video, label = batch["video"], batch["label"]
        logits = self(video)
        loss = F.cross_entropy(logits, label)
        self.log("train_loss", loss, prog_bar=True)
        return loss

    def validation_step(self, batch, batch_idx):
        video, label = batch["video"], batch["label"]
        logits = self(video)

        loss = F.cross_entropy(logits, label)
        acc = (logits.argmax(dim=1) == label).float().mean()

        logs = {
            "val_loss": loss,
            "val_acc": acc,
        }

        # 클래스별 loss 계산
        num_classes = self.hparams["num_classes"]
        for i in range(num_classes):
            class_mask = (label == i)
            if class_mask.any():
                class_loss = F.cross_entropy(
                    logits[class_mask], label[class_mask], reduction="mean"
                )
                logs[f"val_loss_class_{i}"] = class_loss

        self.log_dict(logs, prog_bar=True, batch_size=video.size(0))

      
    def test_step(self, batch, batch_idx):
        video, label = batch["video"], batch["label"]
        logits = self(video)
        loss = F.cross_entropy(logits, label)
        acc = (logits.argmax(dim=1) == label).float().mean()
        self.log_dict({
            "test_loss": loss,
            "test_acc": acc,
        }, prog_bar=True)

    def configure_optimizers(self):
        return torch.optim.AdamW(self.parameters(), lr=self.lr)
