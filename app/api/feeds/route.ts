// In app/api/feeds/route.ts

import { NextResponse } from "next/server";
import { getFeeds } from "@/app/data/traffic-data";

export async function GET() {
  const feeds = getFeeds();
  return NextResponse.json(feeds);
}

// This line is crucial for Next.js to treat this as a dynamic API route
// that is re-evaluated on every request.
export const dynamic = 'force-dynamic'