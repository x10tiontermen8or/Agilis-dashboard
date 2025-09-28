// 📂 components/traffic-dashboard.tsx
'use client';

import { useData } from '@/app/context/data-context';
import { LiveVideoFeeds } from "@/components/live-video-feeds";
import { LiveStats } from './live-stats';
import { AlertBanner } from './alert-banner';

export function TrafficDashboard() {
  const { feeds, isLoading } = useData(); // 👈 1. Get `feeds` from the context

  if (isLoading) {
    return <div>Loading Overview...</div>;
  }

  return (
    <div className="space-y-4">
      <AlertBanner />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main content on the left */}
        <div className="lg:col-span-2">
          <LiveVideoFeeds feeds={feeds} /> {/* 👈 2. Pass `feeds` as a prop */}
        </div>
        
        {/* Stats panel on the right */}
        <div className="space-y-4">
          <LiveStats />
        </div>
      </div>
    </div>
  );
}