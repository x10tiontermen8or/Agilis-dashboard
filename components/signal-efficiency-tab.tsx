// 📂 components/signal-efficiency-tab.tsx
'use client';

import { useState, useEffect } from 'react';
import { SignalEfficiencyChart } from './signal-efficiency-chart';
import { PerformanceMetrics } from './performance-metrics';

interface EfficiencyData {
    timingEfficiency: { name: string; value: number }[];
    performanceMetrics: { name: string; value: number | string }[];
}

export function SignalEfficiencyTab() {
    const [data, setData] = useState<EfficiencyData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/signal-efficiency');
            setData(await res.json());
        };
        fetchData();
    }, []);

    if (!data) return <p className="p-4">Loading efficiency data...</p>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SignalEfficiencyChart data={data.timingEfficiency} />
            <PerformanceMetrics data={data.performanceMetrics} />
        </div>
    );
}