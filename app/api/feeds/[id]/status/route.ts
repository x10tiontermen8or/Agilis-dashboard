// 📂 app/api/feeds/[id]/status/route.ts

import { NextResponse } from "next/server";
import { updateFeedStatus } from "@/app/data/traffic-data";
import type { VideoFeed } from "@/app/data/traffic-data";

interface PostParams {
  params: { id: string; };
}

export async function POST(request: Request, { params }: PostParams) {
    const { id } = params;
    const body = await request.json();
    const { status } = body;
    const feedId = parseInt(id, 10);
    const updatedFeed = updateFeedStatus(feedId, status as VideoFeed['status']);

    if (updatedFeed) {
        return NextResponse.json(updatedFeed);
    }
    return NextResponse.json({ error: 'Feed not found' }, { status: 404 });
}