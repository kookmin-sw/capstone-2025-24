import yaml
from pytorch_lightning import Trainer
from pytorch_lightning.callbacks import ModelCheckpoint
from pytorch_lightning.loggers import CSVLogger
from data_module import VideoDataModule
from model_module import X3DFineTuner

if __name__ == "__main__":
    with open("/content/drive/MyDrive/X3D/fine-tune/configs/default.yaml", "r") as f:
        CFG = yaml.safe_load(f)

    dm = VideoDataModule(CFG)
    model = X3DFineTuner(CFG)

    logger = CSVLogger("logs", name="x3d")

    checkpoint_callback = ModelCheckpoint(
        monitor="val_loss",
        dirpath="checkpoints/",
        filename="x3d-{epoch:02d}-{val_loss:.2f}",
        save_top_k=1,
        mode="min",
    )

    trainer = Trainer(
        max_epochs=CFG["max_epochs"],
        accelerator="gpu",
        devices=1,
        precision="16-mixed",
        logger=logger,
        callbacks=[checkpoint_callback],
    )
    trainer.fit(model, dm)
    trainer.test(model, datamodule=dm)
