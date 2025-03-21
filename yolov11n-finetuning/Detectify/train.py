import os
import requests
import yaml
import wandb
from pathlib import Path
from ultralytics import YOLO
from .util import ask, get_device
from .logger import Logger


class Train:
    def __init__(self, model: str = "yolo11n.pt"):
        """Detectify에서 YOLOv11 기반의 모델 파인튜닝 인스턴스를 생성합니다."""
        self.log = Logger()

        try:
            while True:
                if os.path.exists(model):
                    self.log.alert(f"'{model}'을 불러오고 있습니다.")
                    self.model = YOLO(model=model)
                    self.log.success(f"'{model}'를 성공적으로 불러왔습니다.")
                    break
                else:
                    self.log.warn(f"현재 경로에 '{model}'이 존재하지 않습니다.")
                    if ask("모델을 다운로드하시겠습니까?"):
                        link = f"https://github.com/ultralytics/assets/releases/download/v8.3.0/{model}"
                        try:
                            file = requests.get(link)
                            if file.status_code == 404:
                                raise ValueError(f"'{model}'은 유효하지 않은 모델 이름입니다.")
                            open(model, 'wb').write(file.content)
                            self.log.success(f"'{model}' 다운로드를 성공했습니다.")
                        except Exception as ex:
                            self.log.error(f"'{model}' 다운로드를 실패하였습니다.", ex)
                    else:
                        raise Exception("모델 다운로드를 취소하여, 인스턴스 생성에 실패하였습니다.")
        except Exception as ex:
            self.log.error(f"'{model}'를 불러오던 중 문제가 발생했습니다.", ex)

    def start(self, dataset: str, output: str = "output", epochs: int = 50, batch_size: int = 16, save_per_epochs: int = 10, cache: bool = False, resume: bool = False):
        """Detectify에서 YOLOv11 기반의 모델을 파인튜닝합니다."""

        try:
            self.log.alert(f"데이터셋 유효성 검사를 시작합니다.")
            
            if not os.path.exists(dataset):
                raise FileNotFoundError("데이터셋이 유효하지 않습니다. 학습을 종료합니다.")

            with open(dataset) as file:
                config = yaml.full_load(file)

            for key, path in (("train", "train"), ("val", "valid"), ("test", "test")):
                if not os.path.exists(config[key]):
                    self.log.warn(f"{dataset} 내의 {key}의 경로를 찾을 수 없습니다.")
                    if ask("자동 수정을 진행하시겠습니까?"):
                        dir = Path(dataset).parent.absolute()
                        fix_path = os.path.join(dir, path, "images")
                        config[key] = fix_path

                        with open(dataset, 'w') as file:
                            yaml.dump(config, file)
                    else:
                        raise Exception("데이터 자동수정을 진행하지 않아, 중단되었습니다.")
                else:
                    self.log.success(f"{dataset} 내의 {key} 데이터셋 유효성 검사를 통과했습니다.")
        except Exception as ex:
            self.log.error("데이터셋 유효성 검사를 실패하였습니다.", ex)

        device = get_device()

        # 1) wandb 초기화
        wandb.init(
            project="yolov11-finetuning",  # wandb 프로젝트명
            name="exp_yolo11n",           # 실험 이름
            config={
                "epochs": epochs,
                "batch_size": batch_size,
                "save_period": save_per_epochs,
                "cache": cache,
                "resume": resume,
                "device": device
            }
        )

        try:
            self.log.alert(f"파인튜닝을 시작합니다.")

            # 2) Ultralytics 콜백 함수 정의 (Epoch 끝날 때마다 실행)
            def on_epoch_end(trainer):
                # wandb에 로그
                wandb.log({
                    "epoch": trainer.epoch,
                    "train/box_loss": trainer.model.metrics.box_loss,
                    "train/cls_loss": trainer.model.metrics.cls_loss,
                    "train/dfl_loss": trainer.model.metrics.dfl_loss,
                    "val/mAP50": trainer.model.metrics.map50,
                    "val/mAP50-95": trainer.model.metrics.map,
                })

            # 3) 콜백 등록
            self.model.add_callback("on_train_epoch_end", on_epoch_end)

            # 4) train 호출
            self.model.train(
                data=dataset,
                epochs=epochs,
                batch=batch_size,
                save_period=save_per_epochs,
                cache=cache,
                project=output,
                device=device,
                resume=resume,
                workers=0,
                patience=0
            )

            self.log.alert(f"파인튜닝이 완료되었습니다!")

        except Exception as ex:
            self.log.error("파인튜닝을 진행하던 중, 문제가 발생했습니다.", ex)

        finally:
            # 5) wandb 마무리
            wandb.finish()