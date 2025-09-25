// 📂 app/map/page.tsx

'use client'

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import type { VideoFeed } from "@/app/data/traffic-data";

const MapView = dynamic(() => import('@/components/map-view').then(mod => mod.MapView), {
  ssr: false,
  loading: () => <p className="p-4">Loading map...</p>
});

export default function MapPage() {
  const [feeds, setFeeds] = useState<VideoFeed[]>([]);

  useEffect(() => {
    const fetchFeeds = async () => {
      const response = await fetch('/api/feeds');
      const data = await response.json();
      setFeeds(data);
    };

    fetchFeeds();
    const interval = setInterval(fetchFeeds, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
        <h1 className="text-lg font-semibold md:text-2xl mb-4">Live Map View</h1>
        <div className="flex-grow w-full rounded-lg border overflow-hidden">
            <MapView feeds={feeds} />
        </div>
    </div>
  )
}