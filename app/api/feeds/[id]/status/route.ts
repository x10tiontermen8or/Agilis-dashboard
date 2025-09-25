// In app/api/feeds/[id]/status/route.ts

import { NextResponse } from "next/server";
import { updateFeedStatus } from "@/app/data/traffic-data";
import type { VideoFeed } from "@/app/data/traffic-data";

interface PostParams {
  params: {
    id: string;
  };
}

export async function POST(request: Request, { params }: PostParams) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['normal', 'congested', 'incident', 'offline'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status provided' }, { status: 400 });
    }

    const feedId = parseInt(id, 10);
    const updatedFeed = updateFeedStatus(feedId, status as VideoFeed['status']);

    if (updatedFeed) {
      return NextResponse.json(updatedFeed);
    } else {
      return NextResponse.json({ error: 'Feed not found' }, { status: 404 });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}