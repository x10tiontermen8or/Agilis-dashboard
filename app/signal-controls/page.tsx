// 📂 app/signal-controls/page.tsx
'use client';

import { useState } from 'react';
import { useData } from "@/app/context/data-context";
import { SignalControlCard } from "@/components/signal-control-card";
import { SystemStatusBanner } from "@/components/system-status-banner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { AlertTriangle, Search } from "lucide-react";

export default function SignalControlsPage() {
  const { feeds, isLoading } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFeeds = feeds.filter(feed => 
    feed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feed.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading Signal Controls...</div>;
  }

  return (
    <div className="space-y-4">
        <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search by name or location..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Alert variant="destructive" className="flex items-center justify-between w-auto max-w-xs">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <div>
                        <AlertTitle className="font-semibold">Emergency Controls</AlertTitle>
                    </div>
                </div>
                <Switch id="emergency-mode" />
            </Alert>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFeeds.map(feed => (
                <SignalControlCard key={feed.id} feed={feed} />
            ))}
        </div>

        <SystemStatusBanner />
    </div>
  );
}