// 📂 app/alerts/page.tsx
'use client';

import { useState } from 'react';
import { AlertStatCards } from '@/components/alert-stat-cards';
import { AlertCard } from '@/components/alert-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BellRing, Volume2, VolumeX } from 'lucide-react';
import { useData } from '@/app/context/data-context';
import { AnimatePresence } from 'framer-motion';
import { CreateAlertForm } from '@/components/create-alert-form';

export default function AlertsPage() {
  const [filter, setFilter] = useState('active');
  const [soundOn, setSoundOn] = useState(true);
  const { alerts, isLoading } = useData();

  if (isLoading) {
    return <div className="p-4">Loading Alerts...</div>;
  }

  const filteredAlerts = alerts.filter(alert => alert.status === filter).sort((a,b) => b.id - a.id);

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-500">
      <AlertStatCards />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <BellRing className="h-6 w-6" /> Alert Management
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSoundOn(!soundOn)}>
            {soundOn ? <Volume2 className="h-4 w-4 mr-2" /> : <VolumeX className="h-4 w-4 mr-2" />}
            Sound {soundOn ? 'On' : 'Off'}
          </Button>
          <CreateAlertForm />
        </div>
      </div>
      <Tabs defaultValue="active" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({alerts.filter(a => a.status === 'active').length})</TabsTrigger>
          <TabsTrigger value="acknowledged">Acknowledged ({alerts.filter(a => a.status === 'acknowledged').length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({alerts.filter(a => a.status === 'resolved').length})</TabsTrigger>
        </TabsList>
        <TabsContent value={filter} className="mt-4">
          <div className="space-y-4">
            <AnimatePresence>
              {filteredAlerts.length === 0 ? (
                  <p className="p-4 text-center text-muted-foreground">No {filter} alerts.</p>
              ) : (
                  filteredAlerts.map(alert => (
                      <AlertCard key={alert.id} alert={alert} />
                  ))
              )}
            </AnimatePresence>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}