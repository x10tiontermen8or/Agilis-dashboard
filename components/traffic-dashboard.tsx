// 📂 components/traffic-dashboard.tsx

'use client'

import { LiveVideoFeeds } from "@/components/live-video-feeds"
import { AlertsPanel } from "@/components/alerts-panel"
import { VehicleChart } from "@/components/vehicle-chart" // 👈 1. IMPORT the new chart
import { useState, useEffect } from "react"
import type { VideoFeed } from "@/app/data/traffic-data"
import { Badge } from "./ui/badge"

export function TrafficDashboard() {
  const [feeds, setFeeds] = useState<VideoFeed[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await fetch('/api/feeds');
        const data = await response.json();
        setFeeds(data);
      } catch (error) {
        console.error("Failed to fetch feeds:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeeds();
    const interval = setInterval(fetchFeeds, 3000);
    
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <div>Loading Dashboard...</div>
  }

  const incidentCount = feeds.filter(f => f.status === 'incident').length;
  const congestedCount = feeds.filter(f => f.status === 'congested').length;

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
            <Badge variant={incidentCount > 0 ? "destructive" : "secondary"}>
                {incidentCount} Incidents
            </Badge>
            <Badge variant={congestedCount > 0 ? "outline" : "secondary"}>
                {congestedCount} Congested
            </Badge>
        </div>
      </div>
      
      {/* 👇 2. UPDATE the main grid layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <LiveVideoFeeds feeds={feeds} />
        </div>
        
        {/* We'll stack the alerts and chart in the right column */}
        <div className="space-y-4">
            <AlertsPanel feeds={feeds} />
            <VehicleChart feeds={feeds} /> {/* 👈 3. ADD the chart here */}
        </div>
      </div>
    </>
  )
}