// 📂 components/traffic-hotspots-map.tsx
'use client';

import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useData } from '@/app/context/data-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export function TrafficHotspotsMap() {
    const { feeds } = useData();

    const getHotspotOptions = (status: string) => {
        switch(status) {
            case 'incident': return { color: 'red', fillColor: '#f87171', fillOpacity: 0.6, radius: 500 };
            case 'congested': return { color: 'orange', fillColor: '#fb923c', fillOpacity: 0.5, radius: 400 };
            default: return { color: 'green', fillColor: '#4ade80', fillOpacity: 0.3, radius: 200 };
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Live Traffic Hotspots</CardTitle>
                <CardDescription>Circles indicate congestion levels at major junctions.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full p-0 rounded-b-lg overflow-hidden">
                <MapContainer 
                    center={[28.6139, 77.2090]} 
                    zoom={12} 
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    dragging={false}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    {feeds.map(feed => (
                        <Circle
                            key={feed.id}
                            center={feed.coords}
                            pathOptions={getHotspotOptions(feed.status)}
                        />
                    ))}
                </MapContainer>
            </CardContent>
        </Card>
    );
}