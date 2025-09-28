// 📂 components/report-incident-form.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { VideoFeed } from '@/app/data/traffic-data';

interface ReportIncidentFormProps {
  feeds: VideoFeed[];
  onIncidentReported: () => void;
}

export function ReportIncidentForm({ feeds, onIncidentReported }: ReportIncidentFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [junctionId, setJunctionId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!junctionId) return;
    setIsSubmitting(true);

    try {
      await fetch(`/api/feeds/${junctionId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'incident' }),
      });
      onIncidentReported(); // Refresh data
      setIsOpen(false);     // Close the dialog
    } catch (error) {
      console.error('Failed to report incident:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Report Incident</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report New Incident</DialogTitle>
          <DialogDescription>
            Select a junction to mark its status as an active incident.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="junction" className="text-right">Junction</Label>
            <Select onValueChange={setJunctionId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a junction" />
              </SelectTrigger>
              <SelectContent>
                {feeds.map(feed => (
                  <SelectItem key={feed.id} value={String(feed.id)}>
                    {feed.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting || !junctionId}>
            {isSubmitting ? 'Reporting...' : 'Report Incident'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}