// 📂 components/alert-stat-cards.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Eye, CheckCircle, Bell } from 'lucide-react';
import { useData } from '@/app/context/data-context';

export function AlertStatCards() {
  const { alerts, isLoading } = useData();

  if (isLoading) {
      const stats = [
        { title: 'Active Alerts', value: '...' }, { title: 'Acknowledged', value: '...' },
        { title: 'Resolved Today', value: '...' }, { title: 'Auto-Detected', value: '...' },
      ];
      return (
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map(stat => <Card key={stat.title}><CardHeader><CardTitle className="text-sm font-medium">{stat.title}</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stat.value}</div></CardContent></Card>)}
        </div>
      );
  }

  const activeCount = alerts.filter(a => a.status === 'active').length;
  const acknowledgedCount = alerts.filter(a => a.status === 'acknowledged').length;
  const resolvedCount = alerts.filter(a => a.status === 'resolved').length;
  const autoDetectedCount = alerts.filter(a => a.isAutoDetected).length;

  const stats = [
    { title: 'Active Alerts', value: activeCount, icon: AlertTriangle, color: 'text-red-500' },
    { title: 'Acknowledged', value: acknowledgedCount, icon: Eye, color: 'text-yellow-500' },
    { title: 'Resolved Today', value: resolvedCount, icon: CheckCircle, color: 'text-green-500' },
    { title: 'Auto-Detected', value: autoDetectedCount, icon: Bell, color: 'text-blue-500' },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map(stat => (
        <Card key={stat.title} className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}