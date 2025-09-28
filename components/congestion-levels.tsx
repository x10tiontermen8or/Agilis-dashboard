// 📂 components/congestion-levels.tsx
'use client';

import { useData } from "@/app/context/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export function CongestionLevels() {
    const { feeds, isLoading } = useData(); // Use the single isLoading flag

    if (isLoading) {
        return (
            <Card>
                <CardHeader><CardTitle>Junction Congestion Levels</CardTitle></CardHeader>
                <CardContent><p>Loading congestion data...</p></CardContent>
            </Card>
        );
    }

    const congestionData = feeds.map(feed => ({ /* ... */ })); // Keep existing calculation

    return (
        <Card>
            {/* ... The rest of your CongestionLevels JSX is the same ... */}
        </Card>
    );
}