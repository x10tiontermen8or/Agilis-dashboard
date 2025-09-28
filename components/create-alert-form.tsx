// 📂 components/create-alert-form.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useData } from '@/app/context/data-context';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function CreateAlertForm() {
  const { feeds, refreshData } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
      type: '',
      priority: '',
      location: '',
      description: '',
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ...formData,
            status: 'active',
            isAutoDetected: false,
            icon: 'warning',
        }),
      });
      refreshData();
      toast.success(`New alert for "${formData.type}" has been created.`);
      setIsOpen(false);
      setFormData({ type: '', priority: '', location: '', description: '' });
    } catch (error) {
      console.error('Failed to create alert:', error);
      toast.error("Failed to create alert.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Create Alert
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Manual Alert</DialogTitle>
          <DialogDescription>Manually create a new alert in the system.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="Alert Type (e.g., Roadwork)" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} />
          <Input placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <Select onValueChange={value => setFormData({...formData, priority: value})}>
            <SelectTrigger><SelectValue placeholder="Select Priority" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={value => setFormData({...formData, location: value})}>
            <SelectTrigger><SelectValue placeholder="Select Location" /></SelectTrigger>
            <SelectContent>
              {feeds.map(feed => <SelectItem key={feed.id} value={feed.location}>{feed.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting || !formData.type || !formData.priority || !formData.location}>
            {isSubmitting ? 'Creating...' : 'Create Alert'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}