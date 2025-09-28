// 📂 components/data-cards.tsx

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Car, Clock } from 'lucide-react';
import type { VideoFeed } from '@/app/data/traffic-data';

interface FlippableCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
  backContent: React.ReactNode;
}

// This is the individual card component with the updated flip logic
function FlippableCard({ icon, title, value, description, backContent }: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    // 👇 The onClick handler is now on the main container div
    <div className="[perspective:1000px] h-36 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <div
        className={`relative h-full w-full rounded-lg text-center transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front of the card */}
        <Card className="absolute h-full w-full [backface-visibility:hidden]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </CardContent>
        </Card>

        {/* Back of the card */}
        <Card className="absolute h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{title} Details</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-left">
                {backContent}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}


// This is the main component that arranges the cards
export function DataCards({ feeds }: { feeds: VideoFeed[] }) {
  const totalVehicles = feeds.reduce((sum, feed) => sum + feed.vehicleCount, 0);
  const totalQueued = feeds.reduce((sum, feed) => sum + feed.queueLength, 0);
  const incidentCount = feeds.filter(feed => feed.status === 'incident').length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <FlippableCard
        icon={<Car className="h-4 w-4 text-muted-foreground" />}
        title="Total Vehicles"
        value={totalVehicles}
        description="Click to see breakdown" // Updated description
        backContent={
            <ul className="space-y-1">
                {feeds.map(f => <li key={f.id} className="flex justify-between"><span>{f.name.replace('Junction ','')}:</span> <strong>{f.vehicleCount}</strong></li>)}
            </ul>
        }
      />
      <FlippableCard
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        title="Vehicles Queued"
        value={totalQueued}
        description="Click to see breakdown" // Updated description
        backContent={
             <ul className="space-y-1">
                {feeds.map(f => <li key={f.id} className="flex justify-between"><span>{f.name.replace('Junction ','')}:</span> <strong>{f.queueLength}</strong></li>)}
            </ul>
        }
      />
      <FlippableCard
        icon={<Clock className="h-4 w-4 text-muted-foreground" />}
        title="Active Incidents"
        value={incidentCount}
        description="Click to see details" // Updated description
        backContent={
            <ul className="space-y-1">
                {feeds.filter(f=>f.status==='incident').map(f => <li key={f.id}>{f.name}</li>)}
                {incidentCount === 0 && <p>No active incidents.</p>}
            </ul>
        }
      />
    </div>
  );
}