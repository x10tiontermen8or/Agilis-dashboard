// 📂 components/alert-card.tsx
'use client';

import type { TrafficAlert } from '@/app/data/traffic-data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CarFront, Ambulance, Construction, Clock, MapPin, Route, Eye, CheckCircle, SquareCheckBig } from 'lucide-react';
import { motion } from 'framer-motion';
import { useData } from '@/app/context/data-context';
import { toast } from 'sonner';

const iconMap: { [key: string]: any } = {
  carCrash: CarFront,
  ambulance: Ambulance,
  construction: Construction,
  warning: AlertTriangle,
  default: AlertTriangle,
};
    
const getPriorityBadgeClass = (priority: TrafficAlert['priority']) => {
  switch (priority) {
    case 'critical': return { badge: 'bg-red-600 hover:bg-red-700', border: 'border-l-4 border-red-600' };
    case 'high': return { badge: 'bg-orange-500 hover:bg-orange-600', border: 'border-l-4 border-orange-500' };
    case 'medium': return { badge: 'bg-yellow-500 hover:bg-yellow-600', border: 'border-l-4 border-yellow-500' };
    default: return { badge: 'bg-blue-500 hover:bg-blue-600', border: 'border-l-4 border-blue-500' };
  }
};

export function AlertCard({ alert }: { alert: TrafficAlert }) {
  const { refreshData } = useData();
  const AlertIcon = iconMap[alert.icon] || AlertTriangle;
  const styles = getPriorityBadgeClass(alert.priority);

  const handleUpdateStatus = async (newStatus: TrafficAlert['status']) => {
    await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: alert.id, status: newStatus }),
    });
    refreshData();
    toast.info(`Alert #${alert.id} has been ${newStatus}.`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Card className={`overflow-hidden ${styles.border}`}>
        <CardContent className="p-4 flex gap-4 items-center">
          <div className="flex-grow space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <AlertIcon className="h-5 w-5" />
              <h3 className="font-semibold text-lg">{alert.type}</h3>
              <Badge className={styles.badge}>{alert.priority}</Badge>
              {alert.isAutoDetected && <Badge variant="secondary">Auto-detected</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{alert.description}</p>
            <div className="flex items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {alert.location}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {alert.timeAgo}</span>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-2 flex-shrink-0 w-32">
            {alert.status === 'active' && (
              <Button variant="outline" size="sm" onClick={() => handleUpdateStatus('acknowledged')} className="flex items-center gap-1">
                <Eye className="h-4 w-4" /> Acknowledge
              </Button>
            )}
            {alert.status === 'acknowledged' && (
              <Button size="sm" onClick={() => handleUpdateStatus('resolved')} className="flex items-center gap-1">
                <SquareCheckBig className="h-4 w-4" /> Resolve
              </Button>
            )}
            {alert.status === 'resolved' && (
              <div className="flex items-center justify-center gap-1 text-sm text-green-600 font-medium">
                <CheckCircle className="h-4 w-4" /> Resolved
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}