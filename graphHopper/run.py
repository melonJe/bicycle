yaml
# docker-compose.yml
# version: '3'
# services:
# graphhopper:
# image: israelhikingmap/graphhopper:latest
# container_name: graphhopper-kr
# ports: [ \"8989:8989\" ]
# volumes:
# - ./graph-data:/data # 그래프 캐시 보존
# environment:
# - JAVA_OPTS=-Xmx6g -Xms6g
# command: >-
# --url https://download.geofabrik.de/asia/south-korea-latest.osm.pbf
# --host 0.0.0.0