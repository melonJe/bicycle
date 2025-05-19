// import LoopPath from '@/components/GraphHopperGoogleMap'
//
// export default function Home() {
//     return (
//         <div style={{width: '100vw', height: '100vh'}}>
//             <LoopPath minutes={60} lat={37.5665} lon={126.9920}/>
//         </div>
//     )
// }
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