// 📂 app/map/page.tsx
'use client';

import { useData } from '@/app/context/data-context';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/map-view').then(mod => mod.MapView), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});

export default function MapPage() {
  const { feeds, isLoading } = useData();

  if (isLoading) {
    return <div>Loading map data...</div>
  }

  return (
    <div className="h-full w-full flex-grow">
        <div className="h-[calc(100vh-120px)] w-full rounded-lg border overflow-hidden">
            <MapView feeds={feeds} />
        </div>
    </div>
  )
}