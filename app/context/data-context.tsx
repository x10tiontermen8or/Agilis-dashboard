// 📂 app/context/data-context.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { VideoFeed } from '@/app/data/traffic-data';

interface DataContextType {
  feeds: VideoFeed[];
  isLoading: boolean;
  refreshFeeds: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [feeds, setFeeds] = useState<VideoFeed[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeeds = async () => {
    try {
      const response = await fetch('/api/feeds');
      const data = await response.json();
      setFeeds(data);
    } catch (error) {
      console.error("Failed to fetch feeds:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
    const interval = setInterval(fetchFeeds, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DataContext.Provider value={{ feeds, isLoading, refreshFeeds: fetchFeeds }}>
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