// 📂 app/api/signal-efficiency/route.ts
import { NextResponse } from "next/server";
import { getSignalEfficiencyData } from "@/app/data/traffic-data";

export async function GET() {
    const data = getSignalEfficiencyData();
    return NextResponse.json(data);
}