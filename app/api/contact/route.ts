import { NextRequest, NextResponse } from "next/server";
import { addContact, hashIp, trackEvent } from "@/lib/backend-store";
import { sendContactEmail } from "@/lib/contact-mailer";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
      source?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    const forwarded = req.headers.get("x-forwarded-for") || "";
    const ip = forwarded.split(",")[0]?.trim() || "0.0.0.0";
    const ipHash = hashIp(ip);

    const saved = await addContact({
      name: name.slice(0, 120),
      email: email.slice(0, 180),
      phone: phone?.slice(0, 40),
      message: message.slice(0, 2000),
      source: body.source?.slice(0, 80),
      ipHash
    });

    await trackEvent({
      type: "contact_submit",
      path: "/contact",
      target: "contact_form",
      ipHash,
      userAgent: req.headers.get("user-agent") || undefined
    });

    const mailSent = await sendContactEmail({
      name: saved.name,
      email: saved.email,
      phone: saved.phone,
      message: saved.message,
      source: saved.source
    });

    if (!mailSent) {
      await trackEvent({
        type: "contact_email_deferred",
        path: "/contact",
        target: "smtp_unavailable",
        ipHash,
        userAgent: req.headers.get("user-agent") || undefined
      });
    }

    return NextResponse.json({ ok: true, id: saved.id, mailSent });
  } catch {
    return NextResponse.json({ error: "Unable to submit contact request" }, { status: 500 });
  }
}
