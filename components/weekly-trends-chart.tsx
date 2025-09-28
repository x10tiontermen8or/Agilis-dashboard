// 📂 components/weekly-trends-chart.tsx
'use client';

import { useState, useEffect } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeeklyData {
    day: string;
    efficiency: number;
}

export function WeeklyTrendsChart() {
    const [data, setData] = useState<WeeklyData[]>([]);
    const [isLoading, setIsLoading] = useState(true); // 👈 Added loading state

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 👈 Set loading to true before fetch
            try {
                const res = await fetch('/api/weekly-trends');
                if (!res.ok) {
                    throw new Error('Failed to fetch weekly data');
                }
                setData(await res.json());
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false); // 👈 Set loading to false after fetch
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <Card>
                <CardHeader><CardTitle>Weekly Performance Trends</CardTitle></CardHeader>
                <CardContent className="h-[350px] w-full flex items-center justify-center">
                    <p>Loading chart data...</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Weekly Performance Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis yAxisId="left" dataKey="efficiency" unit="%" domain={[60, 100]} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--background))',
                                borderColor: 'hsl(var(--border))',
                            }}
                        />
                        <Line yAxisId="left" type="monotone" dataKey="efficiency" strokeWidth={2} stroke="hsl(var(--primary))" />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}