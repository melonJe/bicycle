import dynamic from 'next/dynamic'
import {LatLngExpression} from "leaflet";

const MapLeaflet = dynamic(
    () => import('@/components/MapLeaflet'),
    {ssr: false}
)

export default function Home() {
    const demoPath: LatLngExpression = [37.5665, 126.9780]

    return (
        <div className="w-full h-screen">
            <MapLeaflet minutes={60} initialPosition={demoPath}/>
        </div>
    )
}