"use client";

import { FormEvent, useMemo, useState } from "react";
import { LoaderCircle, SendHorizonal, Sparkles } from "lucide-react";
import { Reveal } from "@/components/motion";
import { trackClientEvent } from "@/components/analytics-client";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
  source?: "local" | "hf";
};

const starters = [
  "What are Dharshith's strongest skills?",
  "Tell me about recent projects.",
  "Give me one nerdy joke and then show contact info.",
  "Roast my stack gently and suggest better tools."
];

export default function AssistantSection() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "I am Dharshith's assistant. Ask about projects, architecture strengths, tech stack, contact details, or ask for one clean engineer joke.",
      source: "local"
    }
  ]);

  const canSend = useMemo(() => input.trim().length > 1 && !loading, [input, loading]);

  const ask = async (message: string) => {
    setError(null);
    setLoading(true);

    trackClientEvent({ type: "assistant_prompt", target: message.slice(0, 120), path: "/" });

    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = (await response.json()) as { reply?: string; source?: "local" | "hf"; error?: string };

      const reply = data.reply;

      if (!response.ok || !reply) {
        throw new Error(data.error || "Assistant request failed.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply, source: data.source || "local" }
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I hit a temporary issue. I can still answer using local portfolio knowledge about stack, projects, and contact details.",
          source: "local"
        }
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSend) {
      return;
    }

    await ask(input.trim());
  };

  return (
    <section id="assistant" className="snap-section px-6 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="soft-card rounded-3xl p-6 md:p-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">AI Assistant</p>
              <h3 className="mt-2 font-display text-3xl text-text md:text-4xl">Ask About Dharshith</h3>
            </div>
            <Sparkles className="text-accent" size={20} />
          </div>

          <div className="fade-mask h-[300px] overflow-y-auto rounded-2xl border border-white/12 bg-slate-950/35 p-4">
            <div className="space-y-3">
              {messages.map((message, idx) => (
                <div
                  key={`${message.role}-${idx}`}
                  className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "ml-auto bg-accent text-slate-950"
                      : "border border-white/12 bg-white/[0.04] text-text"
                  }`}
                >
                  <p>{message.content}</p>
                  {message.role === "assistant" && message.source ? (
                    <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted">source: {message.source}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {starters.map((starter) => (
              <button
                key={starter}
                type="button"
                onClick={() => void ask(starter)}
                disabled={loading}
                className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-muted transition hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-65"
              >
                {starter}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about stack, projects, architecture, contact, or ask for a joke"
              className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-text outline-none transition focus:border-accent/55"
              aria-label="Ask portfolio assistant"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? <LoaderCircle className="animate-spin" size={17} /> : <SendHorizonal size={17} />}
            </button>
          </form>

          {error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
