// 📂 components/system-status-banner.tsx
'use client';
import { useData } from '@/app/context/data-context';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export function SystemStatusBanner() {
    const { feeds } = useData();
    const stats = {
        'Active Junctions': feeds.length,
        'Auto Mode': feeds.filter(f => f.autoMode).length,
        'Overrides': feeds.filter(f => f.controlStatus === 'override').length,
        'Emergencies': feeds.filter(f => f.controlStatus === 'emergency').length,
    };
    return (
        <Card>
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 font-medium">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    System Status
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 text-center">
                    {Object.entries(stats).map(([label, value]) => (
                        <div key={label}>
                            <p className="text-2xl font-bold">{value}</p>
                            <p className="text-xs text-muted-foreground">{label}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}