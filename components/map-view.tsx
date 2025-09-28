// 📂 components/map-view.tsx

'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
// The API now sends a combined 'coords' property, so we adjust the type here.
// Note: We are no longer importing 'Junction' from Prisma on the client-side.
type Feed = {
  id: number;
  name: string;
  location: string;
  status: 'normal' | 'congested' | 'incident' | 'offline';
  vehicleCount: number;
  coords: [number, number];
};

// Fix for default icon issue with React-Leaflet
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});

const getStatusIcon = (status: Feed['status']) => {
  const color = {
    normal: 'green',
    congested: 'orange',
    incident: 'red',
    offline: 'grey',
  }[status];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32"><path fill="${color}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`;
  
  return L.divIcon({
    html: svg,
    className: 'dummy',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

interface MapViewProps {
  feeds: Feed[];
}

export function MapView({ feeds }: MapViewProps) {
  const defaultPosition: [number, number] = [28.6139, 77.2090];

  return (
    <MapContainer center={defaultPosition} zoom={12} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {feeds.map(feed => (
        // 👇 This is the corrected line
        <Marker key={feed.id} position={feed.coords} icon={getStatusIcon(feed.status)}>
          <Popup>
            <div className="font-sans">
                <h3 className="font-bold">{feed.name}</h3>
                <p>{feed.location}</p>
                <p>Status: <span className="font-semibold">{feed.status}</span></p>
                <p>Vehicles: <span className="font-semibold">{feed.vehicleCount}</span></p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}