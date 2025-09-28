// 📂 components/traffic-flow-chart.tsx
'use client';

import { useState, useEffect } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HourlyData {
    time: string;
    vehicles: number;
}

export function TrafficFlowChart() {
    const [data, setData] = useState<HourlyData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/hourly-traffic');
            const jsonData = await res.json();
            setData(jsonData);
        };
        fetchData();
        const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Real-time Traffic Flow</CardTitle>
                <CardDescription>Vehicle volume from 06:00 to 15:00.</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--background))',
                                borderColor: 'hsl(var(--border))',
                            }}
                        />
                        <Area type="monotone" dataKey="vehicles" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}