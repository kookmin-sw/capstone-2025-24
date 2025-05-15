# 베이스 이미지: NGINX + RTMP 모듈이 이미 포함된 이미지
FROM alfg/nginx-rtmp:latest

# 만약 FFmpeg가 없는 이미지라면 apt로 설치
# (alfg/nginx-rtmp에는 ffmpeg가 이미 포함된 버전도 있으니, 상황에 따라 아래를 추가)
# Alpine 기반이므로 apt-get 대신 apk를 사용
RUN apk update && apk add --no-cache ffmpeg

# 커스텀 nginx.conf 파일을 프로젝트 디렉토리에서 복사
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 1935 80
CMD ["nginx", "-g", "daemon off;"]
