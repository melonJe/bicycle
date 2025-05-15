import httpx
from fastapi import APIRouter, Query, HTTPException

from config import setting_env

paths_router = APIRouter()


@paths_router.get("/loop")
async def get_circular_route(
        minutes: int = Query(30, gt=0, description="주행 소요시간(분)"),
        lat: float = Query(..., description="출발점 위도"),
        lon: float = Query(..., description="출발점 경도"),
        points_encoded: bool = Query(True, description="인코딩 사용 여부")
):
    """
    1) minutes 를 받아서 → 거리(m)로 환산 (예: 250m/분 * minutes)
    2) GraphHopper round_trip.distance 파라미터로 호출
    """
    params = [
        ("point", f"{lat},{lon}"),
        ("profile", "bike"),
        ("algorithm", "round_trip"),
        ("ch.disable", "true"),
        ("round_trip.distance", minutes * 250),  # 15Km/h == 250m/min
    ]

    if not points_encoded:
        params += ("points_encoded", "false")

    async with httpx.AsyncClient() as client:
        print(setting_env.URL)
        response = await client.get(setting_env.URL + "/route", params=params)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code,
                            detail=f"GraphHopper API error: {response.text}")

    data = response.json()
    points = data["paths"][0]["points"]

    return points


if __name__ == "__main__":
    pass
