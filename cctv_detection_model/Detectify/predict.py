import os, cv2, time
from threading import Thread
from ultralytics import YOLO
from .util import get_device
from .logger import Logger


class Predict:
    def __init__(self, model: str):
        """
        Detectify에서 YOLOv11 기반의 추론 인스턴스를 생성합니다.

        Args:
            model (str):
                추론에 사용할 모델의 경로를 설정합니다.
        """
        self.log = Logger()
        self.device = get_device()
        self.src = None

        self.status = False
        self.is_working = False
        self.result = None
        self.most = ""

        self.preprocessing = None
        self.handler = None
        self.conf = 0.25
        self.iou = 0.7
        self.max_objs = 300
        
        if not os.path.exists(model):
            self.log.error(f"현재 경로에 '{model}'이 존재하지 않습니다.")

        try:
            self.log.alert(f"'{model}'을 불러오고 있습니다.")
            self.model = YOLO(model=model)
            self.log.success(f"'{model}'를 성공적으로 불러왔습니다.")
        except Exception as ex:
            self.log.error(f"'{model}'를 불러오던 중 문제가 발생했습니다.", ex)

    def __predict_thread__(self, source: str | int, show: bool, exit_trigger: int):
        self.log.alert(f"추론을 시작합니다.")
        prev_time = 0

        prev_most = ""

        self.log.alert(f"소스를 할당하고 있습니다.")
        try:
            src = cv2.VideoCapture(source)
            self.log.success(f"소스를 성공적으로 할당하였습니다.")
        except Exception as ex:
            self.log.warn("유효하지 않은 소스입니다. 추론을 중지합니다.", ex)
            return

        while src.isOpened() and self.status:
            ret, frame = src.read()

            if self.preprocessing != None:
                frame = self.preprocessing(frame)

            current_time = time.time()
            second = current_time - prev_time
            prev_time = current_time
            if ret:
                self.result = self.model(source=frame, conf=self.conf, iou=self.iou, device=self.device, max_det=self.max_objs, verbose=False)[0]
                self.is_working = True

                for r in self.result:
                    for c in r.boxes.cls:
                        self.most = self.result.names[int(c)]

                if self.handler != None:
                    if prev_most != self.most:
                        self.handler()
                        prev_most = self.most

                if show:
                    preview = self.result.plot()
                    cv2.putText(preview, f"FPS : {round(1 / second, 2)}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
                    cv2.imshow('Detectify - Predict Preview', preview)

                if cv2.waitKey(1) & 0xFF == exit_trigger:
                    break
            else:
                self.log.warn("소스를 읽지못했습니다. 추론을 중지합니다.")
                break

        self.log.alert(f"추론이 중지되었습니다.")
        self.status = False
        self.is_working = False
        
        self.log.alert(f"소스를 해제하고 있습니다.")
        try:
            src.release()
            cv2.destroyAllWindows()
            self.log.success(f"소스를 성공적으로 해제하였습니다.")
        except Exception as ex:
            self.log.warn("소스를 해제하던 중, 문제가 발생했습니다.", ex)

    def start(self, source: str | int, show: bool = True, exit_trigger: int = 27, daemon: bool = False):
        """
        Detectify의 추론 스레드를 시작합니다.\n

        Args:
            source (str | int):
                추론할 소스를 설정합니다.
            show (bool, optional):
                프리뷰 윈도우를 표시합니다.
                *기본 값은 `True` 입니다.*
            exit_trigger (int, optional):
                추론과 프리뷰 윈도우를 종료할 키 코드입니다.\n
                *기본 값은 `27` / `ESC` 입니다.*
            daemon (bool, optional):
                Thread의 형식을 Daemon으로 설정합니다.\n
                *기본 값은 `False` 입니다.*
        """
        try:
            self.status = True
            if not self.is_working:
                T = Thread(target=self.__predict_thread__, args=(source, show, exit_trigger), daemon=daemon)
                T.start()
        except Exception as ex:
            self.log.error("추론 스레드를 시작하는 중, 문제가 발생했습니다.", ex)

    def stop(self):
        """
        Detectify의 추론 스레드를 중지합니다.
        """
        self.status = False