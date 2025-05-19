import {MapContainer, Polyline, TileLayer, useMapEvents,} from 'react-leaflet'
import type {LatLngExpression} from 'leaflet'
import React, {useEffect, useRef, useState} from 'react'
import 'leaflet/dist/leaflet.css'
import * as S from '@/styles/contextMenu.styled'
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
                zoom={17}
                whenReady={() => {
                    mapRef.current = route
                }}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <ContextHandler/>

                {/* 2) API 호출로 받은 경로 그리기 */}
                {route && (
                    <>
                        <Polyline positions={route} pathOptions={{color: 'blue', weight: 4}}/>
                        {/*<Marker position={route[0]}>*/}
                        {/*    <Popup>Start</Popup>*/}
                        {/*</Marker>*/}
                        {/*<Marker position={route[route.length - 1]}>*/}
                        {/*    <Popup>End</Popup>*/}
                        {/*</Marker>*/}
                    </>
                )}
            </MapContainer>

            {/* 3) 우클릭 시 나타나는 커스텀 메뉴 */}
            {menuPos && (
                // <ContextMenu x={menuPos.x} y={menuPos.y}></ContextMenu>
                <S.Wrapper
                    x={`${menuPos.x}`}
                    y={`${menuPos.y}`}
                >
                    <S.Menu>
                        <S.Item>
                            <S.Span onClick={handleEatRoute}>loop</S.Span>
                        </S.Item>
                    </S.Menu>
                </S.Wrapper>
            )}
        </div>
    )
}