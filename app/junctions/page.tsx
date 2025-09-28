// 📂 app/junctions/page.tsx
'use client';

import { useData } from "@/app/context/data-context";
import { columns, Junction } from '@/components/junction-table-columns';
import { JunctionsDataTable } from '@/components/junctions-data-table';

export default function JunctionsPage() {
  const { feeds, isLoading } = useData();

  if (isLoading) {
    return <div>Loading junctions data...</div>;
  }

  const tableData: Junction[] = feeds.map(feed => ({
    id: feed.id,
    name: feed.name,
    location: feed.location,
    status: feed.status,
    vehicleCount: feed.vehicleCount,
  }));

  return (
    <div className="container mx-auto py-4">
        <JunctionsDataTable columns={columns} data={tableData} />
    </div>
  );
}