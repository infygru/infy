import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Never cache this route

export async function GET() {
    return NextResponse.json(
        {
            status: "ok",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV,
        },
        { status: 200 }
    );
}
