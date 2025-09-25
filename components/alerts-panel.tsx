// 📂 components/alerts-panel.tsx

'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ShieldCheck } from "lucide-react"
import type { VideoFeed } from "@/app/data/traffic-data"

interface AlertsPanelProps {
  feeds: VideoFeed[];
}

export function AlertsPanel({ feeds }: AlertsPanelProps) {
  const incidentFeeds = feeds.filter(feed => feed.status === 'incident');

  const handleClearIncident = async (feedId: number) => {
    try {
      await fetch(`/api/feeds/${feedId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'normal' }),
      });
    } catch (error) {
      console.error("Failed to clear incident:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <span>Active Alerts</span>
          <Badge variant="destructive">{incidentFeeds.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {incidentFeeds.length > 0 ? (
          <ul className="space-y-3">
            {incidentFeeds.map(feed => (
              <li key={feed.id} className="flex items-center justify-between p-2 rounded-lg bg-destructive/10">
                <div>
                  <p className="font-semibold">{feed.name}</p>
                  <p className="text-sm text-muted-foreground">{feed.location}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleClearIncident(feed.id)}
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted-foreground py-4">
            <ShieldCheck className="w-8 h-8 mx-auto mb-2" />
            <p>No active incidents. System is clear.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}