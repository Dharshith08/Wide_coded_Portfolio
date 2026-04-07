"use client";

import { useEffect, useState } from "react";

type AnalyticsSummary = {
  totalEvents: number;
  totalContacts: number;
  uniqueVisitors: number;
  byType: Record<string, number>;
  bySection: Record<string, number>;
  lastEventAt: string | null;
};

export default function AnalyticsPanel() {
  const [data, setData] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch("/api/analytics/summary", { cache: "no-store" });
        const summary = (await response.json()) as AnalyticsSummary;
        if (mounted) setData(summary);
      } catch {
        if (mounted) setData(null);
      }
    };

    void load();
    const interval = setInterval(() => void load(), 15000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mt-6 rounded-2xl border border-white/12 bg-slate-950/35 p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Live Analytics</p>
        <span className="text-[11px] text-muted">refresh 15s</span>
      </div>

      {data ? (
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg border border-white/10 p-3">
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted">Events</p>
            <p className="mt-1 text-lg font-semibold text-text">{data.totalEvents}</p>
          </div>
          <div className="rounded-lg border border-white/10 p-3">
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted">Visitors</p>
            <p className="mt-1 text-lg font-semibold text-text">{data.uniqueVisitors}</p>
          </div>
          <div className="rounded-lg border border-white/10 p-3">
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted">Contacts</p>
            <p className="mt-1 text-lg font-semibold text-text">{data.totalContacts}</p>
          </div>
          <div className="rounded-lg border border-white/10 p-3">
            <p className="text-[11px] uppercase tracking-[0.15em] text-muted">Assistant</p>
            <p className="mt-1 text-lg font-semibold text-text">{data.byType.assistant_prompt || 0}</p>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted">Analytics unavailable.</p>
      )}
    </div>
  );
}
