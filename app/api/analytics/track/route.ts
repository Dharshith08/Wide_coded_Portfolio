import { NextRequest, NextResponse } from "next/server";
import { hashIp, trackEvent } from "@/lib/backend-store";

const allowedTypes = new Set(["page_view", "section_view", "outbound_click", "assistant_prompt", "contact_submit"]);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      type?: string;
      section?: string;
      target?: string;
      path?: string;
    };

    if (!body?.type || !allowedTypes.has(body.type)) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    const forwarded = req.headers.get("x-forwarded-for") || "";
    const ip = forwarded.split(",")[0]?.trim() || "0.0.0.0";

    await trackEvent({
      type: body.type,
      section: body.section?.slice(0, 50),
      target: body.target?.slice(0, 300),
      path: body.path?.slice(0, 120),
      userAgent: req.headers.get("user-agent")?.slice(0, 300),
      ipHash: hashIp(ip)
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to track event" }, { status: 500 });
  }
}
