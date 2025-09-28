// 📂 components/live-clock.tsx

'use client';

import { useState, useEffect } from 'react';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    return <div className="w-48 h-14" />; // Placeholder to prevent layout shift
  }

  const timeString = time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
  });
  const [hourMinute, second, ampm] = timeString.split(/:| /);

  return (
    <div className="relative rounded-lg p-px bg-gradient-to-b from-primary/20 to-transparent">
        <div className="rounded-[7px] bg-background px-3 py-1.5">
            <div className="text-xl font-bold font-mono tracking-wider">
                <span>{hourMinute}</span>
                <span className="animate-pulse">:</span>
                <span>{second}</span>
                <span className="text-sm ml-1">{ampm}</span>
            </div>
            <div className="text-xs text-muted-foreground text-center">{getGreeting()}</div>
        </div>
        <div className="absolute -inset-1 rounded-lg bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-20 blur-sm animate-border-spin" />
    </div>
  );
}