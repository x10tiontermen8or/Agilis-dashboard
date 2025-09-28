// 📂 components/weekly-trends-chart.tsx
'use client';

import { useState, useEffect } from 'react';
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface WeeklyData {
    day: string;
    avgWait: number;
    efficiency: number;
    incidents: number;
}

// Custom component for the detailed tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-2 bg-background border rounded-md shadow-lg">
        <p className="font-bold">{data.day}</p>
        <p className="text-sm">Avg Wait (min): {data.avgWait}</p>
        <p className="text-sm">Efficiency %: {data.efficiency}</p>
        <p className="text-sm">Incidents: {data.incidents}</p>
      </div>
    );
  }
  return null;
};

// 👇 New custom component for the animated dots
const CustomizedDot = (props: any) => {
    const { cx, cy } = props;
    // Using inline SVG animation for the pulse effect
    return (
        <g>
            <circle cx={cx} cy={cy} r="8" stroke="hsl(var(--primary))" strokeWidth="2" fill="hsl(var(--background))" className="transition-transform duration-300 transform hover:scale-150 cursor-pointer" />
            <circle cx={cx} cy={cy} r="8" fill="hsl(var(--primary))" fillOpacity="0.5">
                <animate attributeName="r" from="8" to="20" dur="1.5s" begin="0s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
            </circle>
        </g>
    );
};


export function WeeklyTrendsChart() {
    const [data, setData] = useState<WeeklyData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch('/api/weekly-trends');
                if (!res.ok) throw new Error('Failed to fetch');
                setData(await res.json());
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
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
                {/* 👇 Added a fade-in animation effect */}
                <div className="animate-in fade-in duration-500 w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis yAxisId="left" dataKey="efficiency" unit="%" domain={[50, 100]} />
                            <YAxis yAxisId="right" dataKey="incidents" orientation="right" unit="" domain={[0, 20]} />
                            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                            {/* 👇 The scatter plot now uses our custom animated dot */}
                            <Scatter yAxisId="left" name="Performance" data={data} shape={<CustomizedDot />} />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}