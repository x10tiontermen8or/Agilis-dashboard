// 📂 app/analytics/page.tsx
'use client';

import { AnalyticsStatCards } from '@/components/analytics-stat-cards';
import { TrafficFlowChart } from '@/components/traffic-flow-chart';
import { CongestionLevels } from '@/components/congestion-levels';
import { WeeklyTrendsChart } from '@/components/weekly-trends-chart';
import { SignalEfficiencyTab } from '@/components/signal-efficiency-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import dynamic from 'next/dynamic';

// Lazily load the map to improve initial page speed
const TrafficHotspotsMap = dynamic(() =>
    import('@/components/traffic-hotspots-map').then(mod => mod.TrafficHotspotsMap),
    { 
        ssr: false,
        loading: () => <div className="h-[300px] w-full flex items-center justify-center"><p>Loading map...</p></div>
    }
);

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
            <AnalyticsStatCards />
        </div>
        <div>
            <TrafficHotspotsMap />
        </div>
      </div>
      
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
          <SignalEfficiencyTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}