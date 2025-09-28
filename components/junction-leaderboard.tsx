// 📂 components/junction-leaderboard.tsx

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { VideoFeed } from '@/app/data/traffic-data';
import { TrendingDown, TrendingUp, BarChartHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface LeaderboardProps {
  feeds: VideoFeed[];
}

export function JunctionLeaderboard({ feeds }: LeaderboardProps) {
  const rankedFeeds = feeds
    .map(feed => ({
      ...feed,
      // Calculate a simple congestion score
      congestionScore: Math.round((feed.vehicleCount * 0.6) + (feed.queueLength * 1.4)),
    }))
    .sort((a, b) => b.congestionScore - a.congestionScore); // Sort descending

  const mostCongested = rankedFeeds[0];
  const leastCongested = rankedFeeds[rankedFeeds.length - 1];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <BarChartHorizontal className="h-5 w-5" />
            Junction Leaderboard
        </CardTitle>
        <CardDescription>Performance ranking by congestion score.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-red-500" /> Most Congested
            </h4>
            <div className="flex justify-between items-center p-2 rounded-md bg-muted">
                <span className="font-medium">{mostCongested.name}</span>
                <Badge variant="destructive">{mostCongested.congestionScore}</Badge>
            </div>
        </div>
        <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <TrendingDown className="h-4 w-4 text-green-500" /> Least Congested
            </h4>
            <div className="flex justify-between items-center p-2 rounded-md bg-muted">
                <span className="font-medium">{leastCongested.name}</span>
                <Badge variant="secondary">{leastCongested.congestionScore}</Badge>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}