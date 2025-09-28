// 📂 components/analytics-stat-cards.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Clock, BarChart } from 'lucide-react';

export function AnalyticsStatCards() {
    const stats = [
        { title: 'System Efficiency', value: '87.2%', change: '+5.2%', icon: CheckCircle, color: 'text-green-500' },
        { title: 'Active Incidents', value: '3', change: '-2 from yesterday', icon: AlertCircle, color: 'text-red-500' },
        { title: 'Avg Response Time', value: '2.8min', change: '-0.4min', icon: Clock, color: 'text-blue-500' },
        { title: 'Peak Hour Load', value: '92%', change: 'High', icon: BarChart, color: 'text-yellow-500' },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map(stat => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className={`h-4 w-4 ${stat.color}`} />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-muted-foreground'}`}>{stat.change}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}