import { NextRequest, NextResponse } from "next/server";
import { getAssistantResponse } from "@/lib/portfolio-ai";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { message?: string };
    const message = body?.message?.trim();

    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const result = await getAssistantResponse(message);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      {
        source: "local",
        reply: "Assistant is temporarily busy. Ask about skills, projects, stack, or contact details.",
        error: "Request failed"
      },
      { status: 200 }
    );
  }
}
