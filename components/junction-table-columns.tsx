// 📂 components/junction-table-columns.tsx
'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export type Junction = {
  id: number;
  name: string;
  location: string;
  status: "normal" | "congested" | "incident" | "offline";
  vehicleCount: number;
};

const getStatusBadge = (status: Junction['status']) => {
    const variant = {
        normal: 'secondary',
        congested: 'outline',
        incident: 'destructive',
        offline: 'default',
    }[status];
    return <Badge variant={variant as any}>{status}</Badge>;
};

export const columns: ColumnDef<Junction>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                Junction Name <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    { accessorKey: 'location', header: 'Location' },
    { accessorKey: 'status', header: 'Status', cell: ({ row }) => getStatusBadge(row.getValue('status')) },
    { accessorKey: 'vehicleCount', header: 'Vehicle Count' },
    {
        id: 'actions',
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem><Link href="/signal-controls">Control Signals</Link></DropdownMenuItem>
                    <DropdownMenuItem><Link href="/analytics">View Analytics</Link></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];