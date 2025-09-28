// 📂 app/analytics/page.tsx
'use client';

import { AnalyticsStatCards } from '@/components/analytics-stat-cards';
import { TrafficFlowChart } from '@/components/traffic-flow-chart';
import { CongestionLevels } from '@/components/congestion-levels';
import { WeeklyTrendsChart } from '@/components/weekly-trends-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <AnalyticsStatCards />
      
      <Tabs defaultValue="traffic-flow">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="traffic-flow">Traffic Flow</TabsTrigger>
          <TabsTrigger value="congestion">Congestion</TabsTrigger>
          <TabsTrigger value="signal-efficiency">Signal Efficiency</TabsTrigger>
          <TabsTrigger value="weekly-trends">Weekly Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="traffic-flow" className="mt-4">
          <TrafficFlowChart />
        </TabsContent>
        <TabsContent value="congestion" className="mt-4">
          <CongestionLevels />
        </TabsContent>
        <TabsContent value="weekly-trends" className="mt-4">
          <WeeklyTrendsChart />
        </TabsContent>
        <TabsContent value="signal-efficiency" className="mt-4">
            <p className="p-10 text-center text-muted-foreground">Signal Efficiency charts will go here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}