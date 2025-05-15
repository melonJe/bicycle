"""
이 모듈은 환경 변수를 로드하고 다양한 설정을 구성하는 기능을 제공합니다.

사용법:
1. .env 파일에 환경 변수를 정의합니다.
2. 이 모듈을 임포트하여 환경 변수를 로드하고 필요한 설정을 가져옵니다.
3. 로깅을 통해 주요 이벤트와 오류를 기록합니다.
"""

import logging
import os

from dotenv import load_dotenv

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()  # .env 파일에서 환경 변수를 로드


def get_env(key, default=None):
    """
    주어진 키에 해당하는 환경 변수를 가져옵니다. 환경 변수가 설정되지 않았고 기본값이 제공되지 않은 경우 예외를 발생시킵니다.

    Args:
        key (str): 가져올 환경 변수의 키.
        default (str, optional): 환경 변수가 설정되지 않은 경우 사용할 기본값. 기본값은 None입니다.

    Returns:
        str: 환경 변수의 값.

    Raises:
        ValueError: 환경 변수가 설정되지 않았고 기본값도 제공되지 않은 경우.
    """
    value = os.getenv(key, default)
    if value is None:
        raise ValueError(f"환경 변수 {key}가 설정되지 않았습니다.")
    return value


URL = get_env("URL")

logger.info("환경 변수가 성공적으로 로드되었습니다.")
logger.info(f"URL: {URL}")
