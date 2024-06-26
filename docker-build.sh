#!/bin/bash

# 현재 위치 저장
current_dir=$(pwd)

# bicycle 폴더 확인
if [ -d "bicycle" ]; then
    # 이미 폴더가 있으면 git fetch와 git status를 사용하여 업데이트 필요 여부 확인
    echo "Checking for updates..."
    cd "bicycle" || exit
    git fetch origin main
    # git status를 사용하여 로컬과 원격의 차이를 확인
    if git diff --quiet origin/main; then
        echo "Repository is already up to date. No further action required."
        cd "$current_dir" || exit
        exit 0
    else
        echo "Updates found. Pulling changes..."
        git merge origin/main || { echo "Git merge failed"; exit 1; }
    fi
else
    # 폴더가 없으면 git clone 실행
    echo "Cloning repository..."
    git clone -b main git@github.com:melonJe/bicycle.git "bicycle" || { echo "Git clone failed"; exit 1; }
    cd "bicycle" || exit
fi

docker buildx build --tag bicycle:latest . || { echo "Docker build failed"; exit 1; }
cp -f ./docker-compose.bicycle.yml ../docker-compose.bicycle.yml || { echo "Copy failed"; exit 1; }

# 원래 위치로 돌아가기
cd "$current_dir" || exit

# docker-compose up -d 실행하고 더 이상 사용되지 않는 이미지 제거
docker-compose -f docker-compose.bicycle.yml down && docker-compose -f docker-compose.bicycle.yml up -d && docker image prune -f || { echo "Docker Compose up failed"; exit 1; }
