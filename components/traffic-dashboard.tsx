// 📂 components/traffic-dashboard.tsx
'use client';

import { useData } from '@/app/context/data-context';
import { LiveVideoFeeds } from "@/components/live-video-feeds";
import { LiveStats } from './live-stats';
import { AlertBanner } from './alert-banner';
import { AlertsPanel } from './alerts-panel';
import { LiveEventLog } from './live-event-log';

export function TrafficDashboard() {
  const { feeds, isLoading } = useData();

  if (isLoading) {
    return <div className="p-4">Loading Overview...</div>;
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <AlertBanner />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <LiveVideoFeeds feeds={feeds} />
        </div>
        <div className="space-y-4">
          <LiveStats />
          <AlertsPanel />
          <LiveEventLog />
        </div>
      </div>
    </div>
  );
}