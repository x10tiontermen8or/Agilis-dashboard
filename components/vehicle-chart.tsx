// 📂 components/vehicle-chart.tsx

'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { VideoFeed } from '@/app/data/traffic-data'
import { LineChart } from 'lucide-react'

interface VehicleChartProps {
  feeds: VideoFeed[];
}

export function VehicleChart({ feeds }: VehicleChartProps) {
  // We need to format the data slightly for the chart
  const chartData = feeds.map(feed => ({
    name: feed.name.replace('Junction ', ''), // Use a shorter name like "Alpha"
    vehicles: feed.vehicleCount,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5" />
            <span>Vehicle Count by Junction</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                }}
              />
              <Bar dataKey="vehicles" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}