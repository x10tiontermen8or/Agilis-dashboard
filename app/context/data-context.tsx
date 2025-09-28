// 📂 app/context/data-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { VideoFeed, TrafficAlert } from '../data/traffic-data';

interface DataContextType {
  feeds: VideoFeed[];
  alerts: TrafficAlert[];
  isLoading: boolean; // We will use a single loading state
  refreshData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [feeds, setFeeds] = useState<VideoFeed[]>([]);
  const [alerts, setAlerts] = useState<TrafficAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // Fetch all data in parallel for speed
      const [feedsRes, alertsRes] = await Promise.all([
        fetch('/api/feeds'),
        fetch('/api/alerts')
      ]);
      
      if (!feedsRes.ok || !alertsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const feedsData = await feedsRes.json();
      const alertsData = await alertsRes.json();

      setFeeds(feedsData);
      setAlerts(alertsData);

    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      // Only stop loading after the first successful fetch
      if (isLoading) {
        setIsLoading(false);
      }
    }
  }, [isLoading]); // Depend on isLoading to run the 'finally' block only once

  useEffect(() => {
    fetchData(); // Fetch initially
    const interval = setInterval(fetchData, 7000); // Refresh data every 7 seconds
    return () => clearInterval(interval);
  }, [fetchData]);

  return (
    <DataContext.Provider value={{ feeds, alerts, isLoading, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}