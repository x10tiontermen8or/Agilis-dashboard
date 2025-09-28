// 📂 app/analytics/page.tsx

'use client';

import { useData } from '@/app/context/data-context';
import { DataCards } from '@/components/data-cards';
import { StatusPieChart } from '@/components/status-pie-chart';
import { RushHourHeatmap } from '@/components/rush-hour-heatmap';
import { AnomalyFeed } from '@/components/anomaly-feed';
import { JunctionLeaderboard } from '@/components/junction-leaderboard';
import { JunctionStatusCards } from '@/components/junction-status-cards'; // 👈 1. Import

export default function AnalyticsPage() {
  const { feeds, isLoading } = useData();

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 👇 2. Add the Status Cards here */}
      <JunctionStatusCards feeds={feeds} />
      <DataCards feeds={feeds} />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatusPieChart feeds={feeds} />
        <RushHourHeatmap feeds={feeds} />
        <div className="space-y-4">
            <AnomalyFeed feeds={feeds} />
            <JunctionLeaderboard feeds={feeds} />
        </div>
      </div>
    </div>
  );
}