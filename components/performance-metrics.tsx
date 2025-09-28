// 📂 components/performance-metrics.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Metric {
    name: string;
    value: number | string;
}

export function PerformanceMetrics({ data }: { data: Metric[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {data.map(metric => (
                    <div key={metric.name} className="space-y-1">
                        <div className="flex justify-between text-sm">
                            <span>{metric.name}</span>
                            <span>{typeof metric.value === 'number' ? `${metric.value}%` : metric.value}</span>
                        </div>
                        <Progress value={typeof metric.value === 'number' ? metric.value : 0} className="h-2" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}