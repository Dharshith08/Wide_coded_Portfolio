"use client";

"use client";
import { FormEvent, useState } from "react";
import { profile, socials } from "@/data/portfolio";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import AnalyticsPanel from "@/components/analytics-panel";
import { trackClientEvent } from "@/components/analytics-client";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [mailDelivered, setMailDelivered] = useState(true);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          source: "portfolio"
        })
      });

      if (!response.ok) {
        throw new Error("Contact submit failed");
      }

      const payload = (await response.json()) as { mailSent?: boolean };
      setMailDelivered(payload.mailSent !== false);

      trackClientEvent({ type: "contact_submit", target: "contact_form", path: "/" });

      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setStatus("error");
      setMailDelivered(false);
    }
  };

  return (
    <section id="contact" className="snap-section px-6 pb-8 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="soft-card rounded-3xl p-8 md:p-10">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">Contact</p>
          <h3 className="mt-3 font-display text-3xl text-text md:text-4xl">Let&apos;s Build Something Ambitious</h3>
          <p className="mt-4 text-muted">Open to high-impact engineering, AI systems, and distributed architecture roles.</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={profile.email}
              className="rounded-xl border border-accent/45 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent/20"
            >
              {profile.emailAddress}
            </a>
            <a
              href={`tel:${profile.phoneRaw}`}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-text transition hover:border-accent/55 hover:text-accent"
            >
              {profile.phone}
            </a>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-text transition hover:border-accent/55 hover:text-accent"
            >
              WhatsApp
            </a>
            <button
              type="button"
              onClick={() => void copyEmail()}
              className="rounded-xl border border-white/15 px-4 py-2 text-sm text-text transition hover:border-accent/55 hover:text-accent"
            >
              {copied ? "Email Copied" : "Copy Email"}
            </button>

            <StaggerGroup className="flex flex-wrap gap-3">
              {socials.map((item) => (
                <StaggerItem key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/15 px-4 py-2 text-sm text-text transition hover:border-accent/55 hover:text-accent"
                  >
                    {item.label}
                  </a>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <form onSubmit={submitContact} className="mt-8 grid gap-3 md:grid-cols-2">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              placeholder="Your name"
              className="rounded-xl border border-white/15 bg-slate-950/45 px-4 py-3 text-sm text-text outline-none transition focus:border-accent/50"
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              placeholder="Your email"
              className="rounded-xl border border-white/15 bg-slate-950/45 px-4 py-3 text-sm text-text outline-none transition focus:border-accent/50"
            />
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Phone (optional)"
              className="rounded-xl border border-white/15 bg-slate-950/45 px-4 py-3 text-sm text-text outline-none transition focus:border-accent/50"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110 disabled:opacity-65"
            >
              {status === "sending" ? "Sending..." : "Send Inquiry"}
            </button>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              required
              rows={4}
              placeholder="Project brief or role details"
              className="md:col-span-2 rounded-xl border border-white/15 bg-slate-950/45 px-4 py-3 text-sm text-text outline-none transition focus:border-accent/50"
            />
          </form>

          {status === "sent" && mailDelivered ? (
            <p className="mt-3 text-sm text-emerald-300">Message sent successfully. Dharshith will follow up soon.</p>
          ) : null}
          {status === "sent" && !mailDelivered ? (
            <p className="mt-3 text-sm text-amber-300">Message saved, but email delivery is pending server mail configuration.</p>
          ) : null}
          {status === "error" ? <p className="mt-3 text-sm text-rose-300">Message failed. Try again shortly.</p> : null}

          <AnalyticsPanel />
        </Reveal>
      </div>
    </section>
  );
}
