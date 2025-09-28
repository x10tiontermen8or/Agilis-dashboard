// 📂 app/map/page.tsx
'use client';

import { useData } from '@/app/context/data-context';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/map-view').then(mod => mod.MapView), {
  ssr: false,
  loading: () => <p className="p-4">Loading map...</p>
});

export default function MapPage() {
  const { feeds, isLoading } = useData(); // Use the single isLoading flag

  if (isLoading) {
    return <div>Loading map data...</div>
  }

  return (
    <div className="h-full w-full flex-grow animate-in fade-in duration-500">
        <div className="h-[calc(100vh-120px)] w-full rounded-lg border overflow-hidden">
            <MapView feeds={feeds} />
        </div>
    </div>
  )
}