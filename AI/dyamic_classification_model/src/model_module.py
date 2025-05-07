import torch
import torch.nn.functional as F
import pytorch_lightning as pl
from pytorchvideo.models.x3d import create_x3d

class X3DFineTuner(pl.LightningModule):
    def __init__(self, cfg):
        super().__init__()
        # cfg 는 configs/default.yaml 에서 불러온 dict
        self.cfg = cfg
        
        self.model = create_x3d(
            input_channel=3,                              
            input_clip_length=cfg["clip_duration"],      
            input_crop_size=224,                          
            model_num_class=cfg["num_classes"],           
            dropout_rate=cfg.get("dropout_rate", 0.5),    
            width_factor=0.5,                             
            depth_factor=0.5                              
        )
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
        acc  = (logits.argmax(1) == label).float().mean()
        self.log("val_loss", loss, batch_size=video.size(0))  
        self.log("val_acc", acc, batch_size=video.size(0))
        return loss

    def configure_optimizers(self):
        return torch.optim.Adam(self.parameters(), lr=self.lr)
