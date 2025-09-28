// 📂 components/signal-control-card.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MapPin, Settings, CheckCircle, Hand, Siren, Bot } from "lucide-react";
import type { VideoFeed } from "@/app/data/traffic-data";
import { useData } from "@/app/context/data-context";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const SignalLight = ({ color }: { color: string }) => {
  const colorClass = {
    red: 'bg-red-500 shadow-[0_0_8px_2px_#ef4444]',
    yellow: 'bg-yellow-400 shadow-[0_0_8px_2px_#f59e0b]',
    green: 'bg-green-500 shadow-[0_0_8px_2px_#22c55e]',
    gray: 'bg-muted-foreground/20',
  }[color];
  return <div className={cn("h-3 w-3 rounded-full transition-all", colorClass)}></div>;
};

export function SignalControlCard({ feed }: { feed: VideoFeed }) {
  const { refreshData } = useData();

  const handleUpdate = async (updates: Partial<VideoFeed>) => {
    await fetch(`/api/feeds/${feed.id}/control`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...updates, lastOverride: new Date().toLocaleTimeString() }),
    });
    refreshData();
  };
  
  const statusStyles = {
    normal: { icon: CheckCircle, iconColor: "text-green-500" },
    override: { icon: Hand, iconColor: "text-blue-500" },
    emergency: { icon: Siren, iconColor: "text-red-500" },
  };

  const currentStyles = statusStyles[feed.controlStatus];
  const StatusIcon = currentStyles.icon;
  const ns = feed.signalState?.ns ?? 'gray';
  const ew = feed.signalState?.ew ?? 'gray';


  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
        <Card className={cn("transition-all duration-300 border-2", feed.controlStatus === 'emergency' ? "border-red-500/50 animate-pulse" : "border-transparent")}>
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                {feed.autoMode && <Bot className="h-4 w-4 text-blue-500 animate-pulse" title="Smart Adaptive Mode Active" />}
                {feed.name}
              </CardTitle>
              <CardDescription className="flex items-center gap-1 text-xs pt-1"><MapPin className="h-3 w-3" />{feed.location}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Badge variant={feed.controlStatus === 'emergency' ? 'destructive' : 'secondary'} className="capitalize">{feed.controlStatus}</Badge>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-8 w-8"><Settings className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleUpdate({ controlStatus: 'emergency', autoMode: false })}>Force Emergency</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUpdate({ controlStatus: 'normal', autoMode: true })}>Reset to Normal</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center px-4">
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs text-muted-foreground">North-South</p>
                    <div className="flex flex-col items-center space-y-1 p-2 bg-black/50 rounded-lg">
                        <SignalLight color={feed.signalState.ns === 'red' ? 'red' : 'gray'} />
                        <SignalLight color={feed.signalState.ns === 'yellow' ? 'yellow' : 'gray'} />
                        <SignalLight color={feed.signalState.ns === 'green' ? 'green' : 'gray'} />
                    </div>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div key={feed.controlStatus} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
                        <StatusIcon className={cn("h-10 w-10", currentStyles.iconColor)} />
                    </motion.div>
                </AnimatePresence>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-xs text-muted-foreground">East-West</p>
                    <div className="flex flex-col items-center space-y-1 p-2 bg-black/50 rounded-lg">
                        <SignalLight color={feed.signalState.ew === 'red' ? 'red' : 'gray'} />
                        <SignalLight color={feed.signalState.ew === 'yellow' ? 'yellow' : 'gray'} />
                        <SignalLight color={feed.signalState.ew === 'green' ? 'green' : 'gray'} />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-2">
                    <Switch id={`auto-mode-${feed.id}`} checked={feed.autoMode} onCheckedChange={(checked) => handleUpdate({ autoMode: checked, controlStatus: checked ? 'normal' : 'override' })} />
                    <Label htmlFor={`auto-mode-${feed.id}`}>Auto Mode</Label>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleUpdate({ signalState: { ns: 'green', ew: 'red' }, autoMode: false, controlStatus: 'override' })} disabled={feed.signalState.ns === 'green'}>NS Green</Button>
                    <Button size="sm" variant="outline" onClick={() => handleUpdate({ signalState: { ns: 'red', ew: 'green' }, autoMode: false, controlStatus: 'override' })} disabled={feed.signalState.ew === 'green'}>EW Green</Button>
                </div>
            </div>
          </CardContent>
        </Card>
    </motion.div>
  );
}