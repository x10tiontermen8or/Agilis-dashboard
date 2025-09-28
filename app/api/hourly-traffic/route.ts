// 📂 app/api/hourly-traffic/route.ts
    
import { NextResponse } from "next/server";
import { getHourlyTrafficData } from "@/app/data/traffic-data";

export async function GET() {
    const data = getHourlyTrafficData();
    return NextResponse.json(data);
}