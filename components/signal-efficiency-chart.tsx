// 📂 components/signal-efficiency-chart.tsx
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EfficiencyData {
    name: string;
    value: number;
}

const COLORS = ['#22c55e', '#f59e0b', '#ef4444']; // Green, Amber, Red

export function SignalEfficiencyChart({ data }: { data: EfficiencyData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Signal Timing Efficiency</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}