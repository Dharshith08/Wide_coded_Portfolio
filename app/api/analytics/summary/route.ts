import { NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/backend-store";

export async function GET() {
  try {
    const summary = await getAnalyticsSummary();
    return NextResponse.json(summary);
  } catch {
    return NextResponse.json({ error: "Unable to load analytics" }, { status: 500 });
  }
}
