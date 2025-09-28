// 📂 app/api/feeds/[id]/control/route.ts
import { NextResponse } from "next/server";
import { updateControlState } from "@/app/data/traffic-data";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    const updates = await request.json();
    const feedId = parseInt(id, 10);
    
    const updatedFeed = updateControlState(feedId, updates);
    
    if (updatedFeed) {
        return NextResponse.json(updatedFeed);
    }
    return NextResponse.json({ error: 'Feed not found' }, { status: 404 });
}