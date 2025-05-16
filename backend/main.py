from fastapi import FastAPI

from paths.path import paths_router

app = FastAPI(title="My FastAPI App", version="0.1.0")

# 라우터 등록
app.include_router(paths_router, prefix="/paths", tags=["paths"])

if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
