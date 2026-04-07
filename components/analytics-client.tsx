"use client";

import { useEffect } from "react";

type TrackPayload = {
  type: "page_view" | "section_view" | "outbound_click" | "assistant_prompt" | "contact_submit";
  section?: string;
  target?: string;
  path?: string;
};

export function trackClientEvent(payload: TrackPayload) {
  void fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => undefined);
}

export default function AnalyticsClient() {
  useEffect(() => {
    trackClientEvent({
      type: "page_view",
      path: window.location.pathname
    });

    const observed = new Set<string>();
    const sectionIds = ["hero", "about", "projects", "assistant", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          if (id && !observed.has(id)) {
            observed.add(id);
            trackClientEvent({ type: "section_view", section: id, path: window.location.pathname });
          }
        }
      },
      {
        threshold: 0.65
      }
    );

    for (const id of sectionIds) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");

      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        trackClientEvent({
          type: "outbound_click",
          target: href,
          path: window.location.pathname
        });
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
