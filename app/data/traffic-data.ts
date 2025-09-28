// 📂 app/data/traffic-data.ts

export interface VideoFeed {
  id: number;
  name: string;
  location: string;
  status: "normal" | "congested" | "incident" | "offline";
  vehicleCount: number;
  queueLength: number;
  waitTime: string;
  coords: [number, number];
}

let feeds: VideoFeed[] = [
  { id: 1, name: "Junction Alpha", location: "Main St & 1st Ave", status: "normal", vehicleCount: 23, queueLength: 5, waitTime: "1.2 min", coords: [28.6139, 77.2090] },
  { id: 2, name: "Junction Beta", location: "Broadway & 2nd St", status: "congested", vehicleCount: 47, queueLength: 15, waitTime: "4.8 min", coords: [28.6304, 77.2177] },
  { id: 3, name: "Junction Gamma", location: "Park Ave & 3rd St", status: "incident", vehicleCount: 12, queueLength: 8, waitTime: "6.2 min", coords: [28.5921, 77.2183] },
  { id: 4, name: "Junction Delta", location: "Oak St & 4th Ave", status: "normal", vehicleCount: 31, queueLength: 7, waitTime: "2.5 min", coords: [28.5562, 77.1000] },
];

// This makes the data change over time
setInterval(() => {
    feeds = feeds.map(feed => {
        if (Math.random() > 0.8) { // 20% chance to change status
            const statuses: VideoFeed['status'][] = ["normal", "congested", "incident"];
            feed.status = statuses[Math.floor(Math.random() * statuses.length)];
        }
        const vehicleChange = Math.floor(Math.random() * 6) - 3;
        feed.vehicleCount = Math.max(5, feed.vehicleCount + vehicleChange);
        return feed;
    });
}, 5000);

export const getFeeds = () => feeds;
export const updateFeedStatus = (id: number, status: VideoFeed['status']) => {
    const feed = feeds.find(f => f.id === id);
    if (feed) {
        feed.status = status;
        return feed;
    }
    return null;
};