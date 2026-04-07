"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion";

type LiveProfileResponse = {
  ok: boolean;
  source: "github" | "fallback";
  profile: {
    username: string;
    name: string | null;
    bio: string | null;
    url: string;
    avatar: string;
    repos: number;
    followers: number;
    following: number;
  } | null;
  topLanguages: { key: string; value: number }[];
  topTopics: { key: string; value: number }[];
  recentProjects: {
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    url: string;
    updatedAt: string;
  }[];
};

export default function LiveProfileInsights() {
  const [data, setData] = useState<LiveProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch("/api/profile/live", { cache: "no-store" });
        const json = (await response.json()) as LiveProfileResponse;
        if (mounted) setData(json);
      } catch {
        if (mounted) {
          setData({
            ok: false,
            source: "fallback",
            profile: null,
            topLanguages: [],
            topTopics: [],
            recentProjects: []
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void load();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <Reveal className="soft-card rounded-3xl p-7 md:p-10">
        <p className="text-sm text-muted">Loading live GitHub insights...</p>
      </Reveal>
    );
  }

  return (
    <Reveal className="soft-card rounded-3xl p-7 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">Live Insights</p>
        <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-muted">
          source: {data?.source || "fallback"}
        </span>
      </div>

      {data?.profile ? (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-white/12 bg-white/[0.03] p-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted">Repos</p>
            <p className="mt-1 font-display text-2xl text-text">{data.profile.repos}</p>
          </div>
          <div className="rounded-xl border border-white/12 bg-white/[0.03] p-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted">Followers</p>
            <p className="mt-1 font-display text-2xl text-text">{data.profile.followers}</p>
          </div>
          <div className="rounded-xl border border-white/12 bg-white/[0.03] p-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted">Languages</p>
            <p className="mt-1 font-display text-2xl text-text">{data.topLanguages.length}</p>
          </div>
          <div className="rounded-xl border border-white/12 bg-white/[0.03] p-3">
            <p className="text-[11px] uppercase tracking-[0.14em] text-muted">Topics</p>
            <p className="mt-1 font-display text-2xl text-text">{data.topTopics.length}</p>
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted">GitHub profile data not available right now. Static portfolio data remains active.</p>
      )}

      <div className="mt-5">
        <p className="text-xs uppercase tracking-[0.15em] text-muted">Top Languages</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {data?.topLanguages.length ? (
            data.topLanguages.map((item) => (
              <span key={item.key} className="rounded-full border border-accent/35 px-3 py-1 text-xs text-accent">
                {item.key} ({item.value})
              </span>
            ))
          ) : (
            <span className="text-sm text-muted">No public language data yet.</span>
          )}
        </div>
      </div>
    </Reveal>
  );
}
