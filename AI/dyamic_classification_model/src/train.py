import yaml
from pytorch_lightning import Trainer
from data_module import VideoDataModule
from model_module import X3DFineTuner
from pytorch_lightning.callbacks import ModelCheckpoint

if __name__ == "__main__":
    cfg = yaml.safe_load(open("configs/default.yaml"))
    dm  = VideoDataModule(cfg)
    model = X3DFineTuner(cfg)
    checkpoint_callback = ModelCheckpoint(
        monitor="val_loss",     
        dirpath="/content/drive/MyDrive/X3D/fine-tune/configs/checkpoints/",         # 저장 위치
        filename="x3d-{epoch:02d}-{val_loss:.2f}", 
        save_top_k=1,                
        mode="min",               
    )
    trainer = Trainer(
         max_epochs=cfg["max_epochs"],
         callbacks=[checkpoint_callback],
         accelerator="gpu",  
         devices=1,           
         precision=16,       
    )
    trainer.fit(model, dm)