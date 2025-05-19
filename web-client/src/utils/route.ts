import {LatLngExpression} from 'leaflet'

interface LoopRouteParams {
    lat: number
    lon: number
    minutes?: number
    onSuccess: (data: LatLngExpression[]) => void
    onError?: (err: any) => void
}

export async function loopRoute({lat, lon, minutes = 60, onSuccess, onError,}: LoopRouteParams) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL
        if (!baseUrl) {
            throw new Error('API URL 환경변수가 정의되지 않았습니다.')
        }

        const url = new URL(`${baseUrl}/paths`)
        url.search = new URLSearchParams({
            minutes: `${minutes}`,
            lat: `${lat}`,
            lon: `${lon}`,
            points_encoded: `${false}`,
        }).toString()

        const res = await fetch(url.toString())
        if (!res.ok) {
            throw new Error(await res.text())
        }

        const encoded: [[number, number]] = await res.json()
        const latlngs = encoded.map(([la, ln]) => [ln, la] as LatLngExpression)
        onSuccess(latlngs)
    } catch (err) {
        console.error('경로 요청 실패:', err)
        onError?.(err)
    }
}
