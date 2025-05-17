from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from paths.path import paths_router

app = FastAPI(title="My FastAPI App", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 배포 시에는 프론트엔드 도메인만 허용하세요
    allow_methods=["GET"],
    allow_headers=["*"],
    allow_credentials=True,
)
# 라우터 등록
app.include_router(paths_router, prefix="/paths", tags=["paths"])

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
