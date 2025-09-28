// 📂 components/anomaly-feed.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { VideoFeed } from '@/app/data/traffic-data';
import { Siren, Zap, Car } from 'lucide-react';

interface Anomaly {
  id: number;
  time: string;
  message: string;
  type: 'incident' | 'spike' | 'clear';
}

interface AnomalyFeedProps {
  feeds: VideoFeed[];
}

// Helper to get an icon based on anomaly type
const AnomalyIcon = ({ type }: { type: Anomaly['type'] }) => {
  if (type === 'incident') return <Siren className="h-4 w-4 text-red-500" />;
  if (type === 'spike') return <Zap className="h-4 w-4 text-yellow-500" />;
  return <Car className="h-4 w-4 text-green-500" />;
};

export function AnomalyFeed({ feeds }: AnomalyFeedProps) {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const prevFeedsRef = useRef<VideoFeed[]>([]);

  useEffect(() => {
    // Compare current feeds with previous feeds to detect changes
    const newAnomalies: Anomaly[] = [];
    const currentTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    feeds.forEach(currentFeed => {
      const prevFeed = prevFeedsRef.current.find(pf => pf.id === currentFeed.id);
      if (prevFeed) {
        // Detect new incident
        if (currentFeed.status === 'incident' && prevFeed.status !== 'incident') {
          newAnomalies.push({
            id: Date.now() + Math.random(),
            time: currentTime,
            message: `New incident detected at ${currentFeed.name}.`,
            type: 'incident',
          });
        }
        // Detect major traffic spike
        if (currentFeed.vehicleCount > prevFeed.vehicleCount + 10) {
            newAnomalies.push({
              id: Date.now() + Math.random(),
              time: currentTime,
              message: `Traffic spike at ${currentFeed.name} (+${currentFeed.vehicleCount - prevFeed.vehicleCount} vehicles).`,
              type: 'spike',
            });
        }
      }
    });
    
    if (newAnomalies.length > 0) {
        setAnomalies(prev => [...newAnomalies, ...prev].slice(0, 5)); // Add new anomalies and keep the list size at 5
    }

    // Update the ref for the next comparison
    prevFeedsRef.current = feeds;
  }, [feeds]); // This effect runs every time the feeds data changes

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Anomaly Feed</CardTitle>
        <CardDescription>Real-time automated system alerts.</CardDescription>
      </CardHeader>
      <CardContent>
        {anomalies.length > 0 ? (
          <ul className="space-y-3">
            {anomalies.map(anomaly => (
              <li key={anomaly.id} className="flex items-start gap-3">
                <div className="pt-1"><AnomalyIcon type={anomaly.type} /></div>
                <div>
                  <p className="text-sm font-medium">{anomaly.message}</p>
                  <p className="text-xs text-muted-foreground">{anomaly.time}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-center text-muted-foreground py-4">No anomalies detected. System normal.</p>
        )}
      </CardContent>
    </Card>
  );
}