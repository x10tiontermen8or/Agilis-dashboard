// 📂 app/api/feeds/route.ts

import { NextResponse } from "next/server";
import { getFeeds } from "@/app/data/traffic-data";

export async function GET() {
  const feeds = getFeeds();
  return NextResponse.json(feeds);
}

export const dynamic = 'force-dynamic';