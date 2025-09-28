// 📂 app/api/alerts/route.ts

import { NextResponse } from "next/server";
import { getAlerts, updateAlertStatus, createAlert } from "@/app/data/traffic-data";

export async function GET() {
    return NextResponse.json(getAlerts());
}

export async function POST(request: Request) {
    const body = await request.json();
    const { id, status, ...newAlertData } = body;
    
    if (id && status) {
        const updatedAlert = updateAlertStatus(Number(id), status);
        if (updatedAlert) return NextResponse.json(updatedAlert);
        return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }
    
    if (newAlertData.type && newAlertData.priority && newAlertData.location) {
        const createdAlert = createAlert(newAlertData);
        return NextResponse.json(createdAlert, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
}