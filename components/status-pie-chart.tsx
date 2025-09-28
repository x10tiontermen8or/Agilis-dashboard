// 📂 components/status-pie-chart.tsx

'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { VideoFeed } from '@/app/data/traffic-data';

interface StatusPieChartProps {
  feeds: VideoFeed[];
}

export function StatusPieChart({ feeds }: StatusPieChartProps) {
  const statusCounts = feeds.reduce((acc, feed) => {
    acc[feed.status] = (acc[feed.status] || 0) + 1;
    return acc;
  }, {} as Record<VideoFeed['status'], number>);

  const data = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  const COLORS = {
    normal: '#22c55e', // green-500
    congested: '#f59e0b', // amber-500
    incident: '#ef4444', // red-500
    offline: '#6b7280', // gray-500
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Junction Status Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}