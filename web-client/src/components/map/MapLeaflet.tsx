import {MapContainer, Polyline, TileLayer, useMapEvents,} from 'react-leaflet'
import type {LatLngExpression} from 'leaflet'
import React, {useEffect, useRef, useState} from 'react'
import 'leaflet/dist/leaflet.css'
import {loopRoute} from '@/utils/route'

interface LoopPathLeafletProps {
    minutes: number
    initialPosition: LatLngExpression
}

export default function MapLeaflet({initialPosition}: LoopPathLeafletProps) {
    const mapRef = useRef<any>(null)
    const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null)
    const [clickLatLng, setClickLatLng] = useState<LatLngExpression | null>(null)
    const [route, setRoute] = useState<LatLngExpression[] | null>(null)

    function ContextHandler() {
        useMapEvents({
            contextmenu: (e) => {
                e.originalEvent.preventDefault()
                setMenuPos({x: e.containerPoint.x, y: e.containerPoint.y})
                setClickLatLng([e.latlng.lat, e.latlng.lng])
            },
            click: (e) => {
                setMenuPos(null)
            },
            drag: (e) => {
                setMenuPos(null)
            },
        })
        return null
    }

    async function handleEatRoute() {
        if (!clickLatLng) return

        const [lat, lon] = clickLatLng as [number, number]
        await loopRoute({
            lat,
            lon,
            onSuccess: (route) => {
                setMenuPos(null)
                setRoute(route)
            },
            onError: (err) => {
                // 필요시 에러 핸들링 UI 추가
            }
        })
    }

    useEffect(() => {
        console.log("menuPos changed:", menuPos);
    }, [menuPos]);
    return (
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
            {/* 1) 지도 렌더링 */}
            <MapContainer
                center={initialPosition}
                zoom={18}
                whenReady={() => {
                    mapRef.current = route
                }}
                style={{width: '100%', height: '100%', zIndex: "0"}}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <ContextHandler/>

                {/* 2) API 호출로 받은 경로 그리기 */}
                {route && (
                    <>
                        <Polyline positions={route} pathOptions={{color: 'blue', weight: 4}}/>
                    </>
                )}
            </MapContainer>

            {/* 3) 우클릭 시 나타나는 커스텀 메뉴 */}
            {menuPos && (
                // <ContextMenu x={menuPos.x} y={menuPos.y}></ContextMenu>
                <div
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        position: 'absolute',
                        left: `${menuPos.x}px`,
                        top: `${menuPos.y}px`,
                        zIndex: 1000,
                        width: '200px',
                    }}
                >
                    <div className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <button onClick={handleEatRoute} aria-current="true" type="button"
                                className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                            Loop Route
                        </button>
                        <button type="button"
                                className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                            Menu2
                        </button>
                        <button type="button"
                                className="w-full px-4 py-2 font-medium text-left rtl:text-right border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
                            Menu3
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}