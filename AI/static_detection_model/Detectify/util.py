import torch
from .logger import Logger


log = Logger()


def ask(message: str) -> bool:
    while True:
        select = input(f"{message} (Y/n) : ").lower()
        if select == 'y' or select == '':
            return True
        elif select == 'n':
            return False
        else:
            log.warn("입력 값은 Y/n 이어야합니다.")


def get_device() -> list | str:
    log.alert(f"GPU 가속 여부를 확인하고 있습니다.")
    try:
        if torch.cuda.is_available():
            log.success("GPU 가속을 사용할 수 있습니다.")
            return list(range(torch.cuda.device_count()))
        else:
            log.warn("GPU 가속을 사용할 수 없습니다.")
            return "cpu"
    except Exception as ex:
        log.error("디바이스를 확인하던 중 문제가 발생했습니다.", ex)
        return "cpu"