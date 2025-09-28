// 📂 components/live-stats.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Clock, Zap, Users } from 'lucide-react';
import { useData } from '@/app/context/data-context';

export function LiveStats() {
  const { feeds } = useData();

  const totalVehicles = feeds.reduce((sum, feed) => sum + feed.vehicleCount, 0);
  const avgWaitTime = (feeds.reduce((sum, feed) => sum + parseFloat(feed.waitTime), 0) / feeds.length).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Traffic Stats</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center">
          <Car className="h-6 w-6 mr-4 text-muted-foreground" />
          <div>
            <div className="font-bold text-2xl">{totalVehicles.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Active Vehicles</div>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="h-6 w-6 mr-4 text-muted-foreground" />
          <div>
            <div className="font-bold text-2xl">{avgWaitTime} min</div>
            <div className="text-sm text-muted-foreground">Avg Wait Time</div>
          </div>
        </div>
        <div className="flex items-center">
          <Zap className="h-6 w-6 mr-4 text-muted-foreground" />
          <div>
            <div className="font-bold text-2xl text-green-500">+12%</div>
            <div className="text-sm text-muted-foreground">Efficiency</div>
          </div>
        </div>
        <div className="flex items-center">
          <Users className="h-6 w-6 mr-4 text-muted-foreground" />
          <div>
            <div className="font-bold text-2xl">87%</div>
            <div className="text-sm text-muted-foreground">Peak Hour Load</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}