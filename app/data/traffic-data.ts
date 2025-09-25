// 📂 app/data/traffic-data.ts

export interface VideoFeed {
  id: number;
  name: string;
  location: string;
  status: "normal" | "congested" | "incident" | "offline";
  vehicleCount: number;
  queueLength: number;
  waitTime: string;
  coords: [number, number]; // [latitude, longitude]
}

// Our in-memory "database"
let feeds: VideoFeed[] = [
  {
    id: 1,
    name: "Junction Alpha",
    location: "Main St & 1st Ave",
    status: "normal",
    vehicleCount: 23,
    queueLength: 5,
    waitTime: "1.2 min",
    coords: [28.6139, 77.2090], // New Delhi
  },
  {
    id: 2,
    name: "Junction Beta",
    location: "Broadway & 2nd St",
    status: "congested",
    vehicleCount: 47,
    queueLength: 15,
    waitTime: "4.8 min",
    coords: [28.6304, 77.2177], // Connaught Place
  },
  {
    id: 3,
    name: "Junction Gamma",
    location: "Park Ave & 3rd St",
    status: "normal",
    vehicleCount: 12,
    queueLength: 8,
    waitTime: "2.1 min",
    coords: [28.5921, 77.2183], // India Gate
  },
  {
    id: 4,
    name: "Junction Delta",
    location: "Oak St & 4th Ave",
    status: "normal",
    vehicleCount: 31,
    queueLength: 7,
    waitTime: "2.5 min",
    coords: [28.5562, 77.1000], // Near Airport
  },
];

// Function to simulate real-time data changes
function simulateDataUpdate() {
  feeds = feeds.map((feed) => {
    if (Math.random() > 0.7) {
      const statuses: VideoFeed['status'][] = ["normal", "congested", "incident"];
      feed.status = statuses[Math.floor(Math.random() * statuses.length)];
    }
    const vehicleChange = Math.floor(Math.random() * 10) - 5;
    feed.vehicleCount = Math.max(0, feed.vehicleCount + vehicleChange);
    feed.queueLength = Math.max(0, Math.floor(feed.vehicleCount / 3) + Math.floor(Math.random() * 3) - 1);
    feed.waitTime = `${(feed.queueLength * 0.3).toFixed(1)} min`;
    return feed;
  });
}

setInterval(simulateDataUpdate, 5000);

export function getFeeds(): VideoFeed[] {
  return feeds;
}

export function updateFeedStatus(id: number, status: VideoFeed['status']): VideoFeed | null {
  const feedIndex = feeds.findIndex((feed) => feed.id === id);
  if (feedIndex !== -1) {
    feeds[feedIndex].status = status;
    feeds[feedIndex].vehicleCount = Math.floor(Math.random() * 15);
    feeds[feedIndex].queueLength = Math.floor(Math.random() * 5);
    return feeds[feedIndex];
  }
  return null;
}