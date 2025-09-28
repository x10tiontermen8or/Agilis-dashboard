// 📂 app/api/weekly-trends/route.ts
import { NextResponse } from "next/server";
import { getWeeklyTrendsData } from "@/app/data/traffic-data";

export async function GET() {
    const data = getWeeklyTrendsData();
    return NextResponse.json(data);
}