// 📂 components/alert-banner.tsx
'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Info } from 'lucide-react';

export function AlertBanner() {
  // This uses static data for now, but could be fed from your context later
  return (
    <div className="space-y-2">
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Accident</AlertTitle>
            <AlertDescription>at Main St & 5th Ave - 2 min ago</AlertDescription>
        </Alert>
        <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Congestion</AlertTitle>
            <AlertDescription>at Highway 101 North - 5 min ago</AlertDescription>
        </Alert>
    </div>
  );
}