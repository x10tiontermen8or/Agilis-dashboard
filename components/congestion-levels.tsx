// 📂 components/congestion-levels.tsx
'use client';

import { useData } from "@/app/context/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function CongestionLevels() {
    const { feeds, isLoading } = useData();

    // Calculate a congestion percentage for each feed
    const congestionData = feeds.map(feed => ({
        ...feed,
        congestionPercent: Math.min(100, Math.round(feed.vehicleCount * 1.5 + feed.queueLength * 2)),
        // Simulate incident count for display
        incidentCount: Math.floor(Math.random() * 5)
    }));

    if (isLoading) {
        return <p>Loading congestion data...</p>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Junction Congestion Levels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {congestionData.map(data => (
                    <div key={data.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 text-sm">
                        <span>{data.name}</span>
                        <Progress value={data.congestionPercent} className="h-2" indicatorClassName={data.congestionPercent > 90 ? 'bg-red-500' : 'bg-primary'} />
                        <div className="flex items-center gap-2 w-28 justify-end">
                          {data.incidentCount > 0 && <Badge variant="destructive">{data.incidentCount} incidents</Badge>}
                          <span className="font-semibold w-10 text-right">{data.congestionPercent}%</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}