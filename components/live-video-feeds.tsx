// 📂 components/live-video-feeds.tsx

'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Camera, Maximize2, Volume2, VolumeX, RotateCcw, Settings } from "lucide-react"
import type { VideoFeed } from "@/app/data/traffic-data"

// Helper functions (getStatusColor, getStatusVariant)
const getStatusColor = (status: string) => {
  switch (status) {
    case "normal": return "bg-green-500";
    case "congested": return "bg-yellow-500";
    case "incident": return "bg-red-500";
    default: return "bg-gray-500";
  }
};
const getStatusVariant = (status: string): "secondary" | "outline" | "destructive" => {
  switch (status) {
    case "incident": return "destructive";
    case "congested": return "outline";
    default: return "secondary";
  }
};

interface LiveVideoFeedsProps {
  feeds: VideoFeed[];
}

export function LiveVideoFeeds({ feeds }: LiveVideoFeedsProps) {
  const [selectedFeed, setSelectedFeed] = useState<number | null>(null)
  const [audioEnabled, setAudioEnabled] = useState<Record<number, boolean>>({})

  const toggleAudio = (feedId: number) => {
    setAudioEnabled((prev) => ({ ...prev, [feedId]: !prev[feedId] }));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5" /> Live Video Feeds
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {feeds.length} Active Cameras
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {feeds.map((feed) => (
            <div
              key={feed.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedFeed(selectedFeed === feed.id ? null : feed.id)}
            >
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border-2 border-transparent group-hover:border-primary transition-colors">
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-white">
                  <div>
                    <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="font-semibold">{feed.name}</p>
                    <p className="text-xs opacity-75">{feed.location}</p>
                  </div>
                </div>
                <div className="absolute top-2 left-2">
                  <Badge variant={getStatusVariant(feed.status)} className="text-xs">
                    <div className={`w-2 h-2 rounded-full mr-1.5 ${getStatusColor(feed.status)}`} />
                    {feed.status.charAt(0).toUpperCase() + feed.status.slice(1)}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="destructive" className="text-xs">
                    <div className="w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse" />
                    LIVE
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-2">
                    <div className="flex gap-1">
                        <Button size="icon" className="h-7 w-7" variant="secondary" onClick={(e) => { e.stopPropagation(); toggleAudio(feed.id); }}>
                            {audioEnabled[feed.id] ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                        </Button>
                        <Button size="icon" className="h-7 w-7" variant="secondary" onClick={(e) => e.stopPropagation()}>
                            <Maximize2 className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
              </div>

              {selectedFeed === feed.id && (
                <div className="mt-2 p-3 bg-card border rounded-lg">
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="text-muted-foreground">Vehicles</p>
                      <p className="font-semibold">{feed.vehicleCount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Queue</p>
                      <p className="font-semibold">{feed.queueLength}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Wait</p>
                      <p className="font-semibold">{feed.waitTime}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}