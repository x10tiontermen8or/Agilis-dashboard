// 📂 components/live-event-log.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { List } from 'lucide-react';
import { useData } from '@/app/context/data-context';
import type { VideoFeed } from '@/app/data/traffic-data';

interface LogEntry {
  id: number;
  time: string;
  message: string;
}

export function LiveEventLog() {
  const { feeds } = useData();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const prevFeedsRef = useRef<VideoFeed[]>([]);

  useEffect(() => {
    if (feeds && feeds.length > 0) {
      const newLogs: LogEntry[] = [];
      const currentTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      feeds.forEach(currentFeed => {
        const prevFeed = prevFeedsRef.current.find(pf => pf.id === currentFeed.id);
        if (prevFeed && currentFeed.status !== prevFeed.status) {
          newLogs.push({
            id: Date.now() + Math.random(),
            time: currentTime,
            message: `${currentFeed.name} status changed to ${currentFeed.status}.`,
          });
        }
      });
      
      if (newLogs.length > 0) {
          setLogs(prev => [...newLogs, ...prev].slice(0, 10));
      }
      prevFeedsRef.current = feeds;
    }
  }, [feeds]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <List className="h-5 w-5" />
          Live Event Log
        </CardTitle>
        <CardDescription>A real-time log of status changes.</CardDescription>
      </CardHeader> {/* 👈 This line was fixed */}
      <CardContent className="h-[200px] overflow-y-auto pr-2">
        <ul className="space-y-2">
          {logs.map(log => (
            <li key={log.id} className="text-xs">
              <span className="font-mono text-muted-foreground mr-2">{log.time}</span>
              <span>{log.message}</span>
            </li>
          ))}
          {logs.length === 0 && <p className="text-xs text-center text-muted-foreground pt-8">Awaiting new events...</p>}
        </ul>
      </CardContent>
    </Card>
  );
}