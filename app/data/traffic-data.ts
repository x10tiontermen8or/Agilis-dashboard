// 📂 app/data/traffic-data.ts

export interface VideoFeed {
  id: number;
  name: string;
  location: string;
  status: "normal" | "congested" | "incident" | "offline";
  controlStatus: "normal" | "override" | "emergency";
  queue: number;
  cycle: number;
  autoMode: boolean;
  lastOverride?: string;
  vehicleCount: number;
  waitTime: string;
  coords: [number, number];
  signalState: { ns: 'green' | 'yellow' | 'red'; ew: 'green' | 'yellow' | 'red' };
}

export interface TrafficAlert {
  id: number;
  type: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  isAutoDetected: boolean;
  description: string;
  location: string;
  timeAgo: string;
  duration: string;
  routesAffected?: string[];
  icon: string;
}

let feeds: VideoFeed[] = [
  { id: 1, name: "Junction Alpha", location: "Main St & 1st Ave", status: "normal", vehicleCount: 23, queue: 20, waitTime: "2.3min", cycle: 120, autoMode: true, controlStatus: 'normal', coords: [28.6139, 77.2090], signalState: { ns: 'green', ew: 'red' } },
  { id: 2, name: "Junction Beta", location: "Broadway & 2nd St", status: "congested", vehicleCount: 47, queue: 23, waitTime: "4.1min", cycle: 90, autoMode: false, controlStatus: 'override', lastOverride: '5 min ago', coords: [28.6304, 77.2177], signalState: { ns: 'red', ew: 'green' } },
  { id: 3, name: "Junction Gamma", location: "Park Ave & 3rd St", status: "incident", vehicleCount: 12, queue: 24, waitTime: "5.2min", cycle: 100, autoMode: true, controlStatus: 'emergency', coords: [28.5921, 77.2183], signalState: { ns: 'red', ew: 'yellow' } },
  { id: 4, name: "Junction Delta", location: "Oak St & 4th Ave", status: "normal", vehicleCount: 31, queue: 15, waitTime: "1.8min", cycle: 110, autoMode: true, controlStatus: 'normal', coords: [28.5562, 77.1000], signalState: { ns: 'red', ew: 'green' } },
];

let alerts: TrafficAlert[] = [
  { id: 1, type: "Multi-vehicle collision", priority: "high", status: "active", isAutoDetected: true, description: "Three-car accident blocking two lanes.", location: "Main St & 5th Ave", timeAgo: "2 min ago", duration: "45 min", routesAffected: ["Route 1", "Route 5"], icon: "carCrash" },
  { id: 2, type: "Emergency vehicle priority", priority: "critical", status: "active", isAutoDetected: true, description: "Ambulance requesting priority route.", location: "Broadway & 2nd St", timeAgo: "1 min ago", duration: "5 min", routesAffected: ["Broadway"], icon: "ambulance" },
  { id: 3, type: "Planned road closure", priority: "high", status: "acknowledged", isAutoDetected: false, description: "Construction work blocking eastbound lanes.", location: "Park Ave & 3rd St", timeAgo: "15 min ago", duration: "2 hours", icon: "construction" },
];

// ✅ Hourly traffic data
export const getHourlyTrafficData = () => {
  const data = [
    { time: '06:00', vehicles: 150 }, { time: '07:00', vehicles: 300 },
    { time: '08:00', vehicles: 450 }, { time: '09:00', vehicles: 380 },
    { time: '10:00', vehicles: 250 }, { time: '11:00', vehicles: 200 },
    { time: '12:00', vehicles: 300 }, { time: '13:00', vehicles: 280 },
    { time: '14:00', vehicles: 180 }, { time: '15:00', vehicles: 150 },
  ];
  return data.map(d => ({ ...d, vehicles: d.vehicles + Math.floor(Math.random() * 20) }));
};

// ✅ Weekly trends (sample data)
export const getWeeklyTrendsData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map(day => ({
    day,
    avgVehicles: 200 + Math.floor(Math.random() * 300),
    incidents: Math.floor(Math.random() * 5)
  }));
};

// ✅ Signal efficiency data (sample data)
export const getSignalEfficiencyData = () => {
  return feeds.map(feed => ({
    id: feed.id,
    name: feed.name,
    efficiency: Math.floor(Math.random() * 40) + 60 // 60%–100%
  }));
};

// ✅ Create new alert
export const createAlert = (newAlertData: Omit<TrafficAlert, 'id' | 'timeAgo' | 'duration'>) => {
  const newId = Math.max(0, ...alerts.map(a => a.id)) + 1;
  const newAlert: TrafficAlert = { ...newAlertData, id: newId, timeAgo: "just now", duration: "N/A" };
  alerts.unshift(newAlert);
  return newAlert;
};

// Auto-updating feeds simulation
setInterval(() => {
  feeds.forEach(feed => {
    if (feed.autoMode) {
      if (feed.queue > 25) feed.cycle = Math.max(80, feed.cycle - 5);
      else if (feed.queue < 10) feed.cycle = Math.min(120, feed.cycle + 5);
    }
  });

  const prevFeeds = JSON.parse(JSON.stringify(feeds));
  feeds = feeds.map(feed => {
    if (Math.random() > 0.9) {
      const statuses: VideoFeed['status'][] = ["normal", "congested", "incident"];
      feed.status = statuses[Math.floor(Math.random() * statuses.length)];
    }
    return feed;
  });

  feeds.forEach((currentFeed, index) => {
    const prevFeed = prevFeeds[index];
    if (currentFeed.status === 'incident' && prevFeed.status !== 'incident') {
      const existingAlert = alerts.find(a => a.location === currentFeed.location && a.status !== 'resolved');
      if (!existingAlert) {
        createAlert({
          type: "New Incident Detected",
          priority: "high",
          status: "active",
          isAutoDetected: true,
          description: `High congestion at ${currentFeed.name}.`,
          location: currentFeed.location,
          icon: "warning"
        });
      }
    }
  });
}, 5000);

// ✅ Utility functions
export const getFeeds = () => feeds;
export const getAlerts = () => alerts;

export const updateAlertStatus = (id: number, newStatus: TrafficAlert['status']) => {
  const alert = alerts.find(a => a.id === id);
  if (alert) {
    alert.status = newStatus;
    return alert;
  }
  return null;
};

export const updateFeedStatus = (id: number, status: VideoFeed['status']) => {
  const feedIndex = feeds.findIndex(f => f.id === id);
  if (feedIndex !== -1) {
    feeds[feedIndex].status = status;
    return feeds[feedIndex];
  }
  return null;
};

export const updateSignalState = (id: number, direction: 'ns' | 'ew') => {
  const feedIndex = feeds.findIndex(f => f.id === id);
  if (feedIndex !== -1) {
    const newState = feeds[feedIndex].signalState[direction] === 'green' ? 'red' : 'green';
    feeds[feedIndex].signalState[direction] = newState as 'green' | 'red' | 'yellow';
    return feeds[feedIndex];
  }
  return null;
};

export const updateControlState = (id: number, updates: Partial<VideoFeed>) => {
  const feedIndex = feeds.findIndex(f => f.id === id);
  if (feedIndex !== -1) {
    feeds[feedIndex] = { ...feeds[feedIndex], ...updates };
    return feeds[feedIndex];
  }
  return null;
};
