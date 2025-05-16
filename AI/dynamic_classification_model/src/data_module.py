import os
import random
import pytorch_lightning as pl
from torch.utils.data import DataLoader
from pytorchvideo.data import make_clip_sampler, LabeledVideoDataset
from pytorchvideo.transforms import ApplyTransformToKey, UniformTemporalSubsample, RandomShortSideScale
from torchvision.transforms import Compose, Lambda, RandomCrop, RandomHorizontalFlip

class VideoDataModule(pl.LightningDataModule):
    def __init__(self, cfg):
        super().__init__()
        self.DATA_PATH     = cfg["data_path"]
        self.CLIP_DURATION = cfg["clip_duration"]
        self.BATCH_SIZE    = cfg["batch_size"]
        self.NUM_WORKERS   = cfg["num_workers"]

        self.train_transform = Compose([
            ApplyTransformToKey("video", Compose([
                UniformTemporalSubsample(8),
                Lambda(lambda x: x / 255.0),
                RandomShortSideScale(256, 320),
                RandomCrop(224),
                RandomHorizontalFlip(0.5),
            ])),
        ])
        self.val_transform = Compose([
            ApplyTransformToKey("video", Compose([
                UniformTemporalSubsample(8),
                Lambda(lambda x: x / 255.0),
                RandomShortSideScale(256, 320),
                RandomCrop(224),
            ])),
        ])

    def _make_shuffled_dataset(self, split: str, transform):
        split_dir = os.path.join(self.DATA_PATH, split)
        class_names = sorted([
            d for d in os.listdir(split_dir)
            if os.path.isdir(os.path.join(split_dir, d))
        ])

        video_list = []
        for idx, cls in enumerate(class_names):
            cls_dir = os.path.join(split_dir, cls)
            for fn in os.listdir(cls_dir):
                if not fn.lower().endswith(".mp4"):
                    continue
                video_list.append((os.path.join(cls_dir, fn), {"label": idx}))

        random.shuffle(video_list)

        return LabeledVideoDataset(
            labeled_video_paths=video_list,
            clip_sampler=make_clip_sampler(
                "random" if split == "train" else "uniform",
                self.CLIP_DURATION
            ),
            transform=transform,
            decode_audio=False,
            decoder="pyav",
        )

    def train_dataloader(self):
        train_ds = self._make_shuffled_dataset("train", self.train_transform)
        return DataLoader(
            train_ds,
            batch_size=self.BATCH_SIZE,
            num_workers=self.NUM_WORKERS,
            persistent_workers=True,
            pin_memory=True,
        )

    def val_dataloader(self):
        val_ds = self._make_shuffled_dataset("val", self.val_transform)
        return DataLoader(
            val_ds,
            batch_size=self.BATCH_SIZE,
            num_workers=self.NUM_WORKERS,
        )
    def test_dataloader(self):
        test_ds = self._make_shuffled_dataset("test", self.val_transform)
        return DataLoader(
            test_ds,
            batch_size=self.BATCH_SIZE,
            num_workers=self.NUM_WORKERS,
        )