// 📂 components/rush-hour-heatmap.tsx

'use client';

import React from 'react'; // 👈 ADD THIS LINE
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { VideoFeed } from '@/app/data/traffic-data';

// Helper function to get color based on traffic volume
const getColorForVolume = (volume: number) => {
  if (volume > 80) return 'bg-red-600 hover:bg-red-500';
  if (volume > 60) return 'bg-orange-500 hover:bg-orange-400';
  if (volume > 40) return 'bg-yellow-400 hover:bg-yellow-300';
  if (volume > 20) return 'bg-green-500 hover:bg-green-400';
  return 'bg-green-700 hover:bg-green-600';
};

// We will simulate 24 hours of data for this component
const generateSimulatedHourlyData = (feeds: VideoFeed[]) => {
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0-23 hours
  return feeds.map(feed => ({
    name: feed.name.replace('Junction ', ''),
    hourlyData: hours.map(hour => {
      // Simulate rush hour peaks around 8-10 AM and 5-7 PM
      const isMorningRush = hour >= 8 && hour <= 10;
      const isEveningRush = hour >= 17 && hour <= 19;
      let volume = Math.floor(Math.random() * 30) + 10; // Base volume
      if (isMorningRush) volume += Math.floor(Math.random() * 50) + 20;
      if (isEveningRush) volume += Math.floor(Math.random() * 60) + 25;
      return {
        hour,
        volume: Math.min(100, volume), // Cap at 100
      };
    }),
  }));
};

interface HeatmapProps {
  feeds: VideoFeed[];
}

export function RushHourHeatmap({ feeds }: HeatmapProps) {
  const simulatedData = generateSimulatedHourlyData(feeds);

  return (
    <Card>
      <CardHeader>
        <CardTitle>24-Hour Traffic Heatmap</CardTitle>
        <CardDescription>Simulated traffic volume by hour for each junction.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
          {/* Y-Axis Labels (Junction Names) */}
          <div className="font-semibold text-right">Junction</div>
          <div></div> {/* Empty corner */}
          {simulatedData.map(junction => (
            <React.Fragment key={junction.name}>
              <div className="font-semibold text-right pt-1">{junction.name}</div>
              <div className="grid grid-cols-24 gap-1">
                {junction.hourlyData.map(({ hour, volume }) => (
                  <div
                    key={hour}
                    className={`w-full aspect-square rounded-sm transition-colors ${getColorForVolume(volume)}`}
                    title={`Hour: ${hour}:00, Volume: ${volume}`} // Simple tooltip on hover
                  />
                ))}
              </div>
            </React.Fragment>
          ))}

          {/* X-Axis Labels (Hours) */}
          <div></div> {/* Empty corner */}
          <div className="grid grid-cols-24 gap-1 mt-2 text-xs text-center text-muted-foreground">
            {Array.from({ length: 24 }, (_, i) => i).map(hour => (
              <div key={hour} className={hour % 2 === 0 ? 'visible' : 'invisible'}>
                {hour}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}