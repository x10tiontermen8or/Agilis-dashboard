// 📂 components/junction-status-cards.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { VideoFeed } from '@/app/data/traffic-data';
import { Car } from 'lucide-react';

// A small, reusable component for the progress circle
const ProgressCircle = ({ value, status }: { value: number; status: VideoFeed['status'] }) => {
  const percentage = Math.min(100, Math.max(0, value));
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const offset = circumference - (percentage / 100) * circumference;

  const colorClasses = {
    normal: 'text-green-500',
    congested: 'text-yellow-500',
    incident: 'text-red-500',
    offline: 'text-gray-400',
  };

  return (
    <div className="relative h-24 w-24">
      <svg className="h-full w-full" viewBox="0 0 100 100">
        <circle
          className="stroke-current text-gray-200 dark:text-gray-700"
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
        />
        <circle
          className={`stroke-current ${colorClasses[status]}`}
          strokeWidth="10"
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
        {Math.round(percentage)}
      </div>
    </div>
  );
};

interface StatusCardsProps {
  feeds: VideoFeed[];
}

export function JunctionStatusCards({ feeds }: StatusCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {feeds.map(feed => (
        <Card key={feed.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{feed.name}</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-lg font-bold capitalize">{feed.status}</p>
            </div>
            <ProgressCircle value={feed.vehicleCount} status={feed.status} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}