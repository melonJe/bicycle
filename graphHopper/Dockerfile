# ---------- 1️⃣ Builder 스테이지 ----------
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

# JAR · 설정 복사
COPY graphhopper-web-10.0.jar .
COPY config.yml .

# PBF 내려받기 (또는 COPY)
ADD https://download.geofabrik.de/asia/south-korea-latest.osm.pbf /data/south-korea-latest.osm.pbf

# 그래프 생성
RUN java -Xmx6g -Xms6g -jar graphhopper-web-10.0.jar \
    import config.yml
# ↳ 실행이 끝나면 /data/graph-cache 가 생김

# ---------- 2️⃣ 런타임 스테이지 ----------
FROM eclipse-temurin:21-jdk
WORKDIR /app

# 실행 파일·설정·그래프 캐시만 복사
COPY --from=builder /app/graphhopper-web-10.0.jar .
COPY --from=builder /app/config.yml .
COPY --from=builder /data/graph-cache /data/graph-cache

# 포트 노출
EXPOSE 8989

# 기본 명령 = 서버 모드
CMD ["java","-Xmx4g","-Xms4g","-jar","graphhopper-web-10.0.jar","server","config.yml"]