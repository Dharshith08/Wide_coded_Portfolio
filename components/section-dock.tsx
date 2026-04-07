"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "assistant", label: "AI" },
  { id: "contact", label: "Contact" }
];

export default function SectionDock() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      {
        threshold: [0.3, 0.55, 0.8],
        rootMargin: "-18% 0px -38% 0px"
      }
    );

    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="fixed right-3 top-1/2 z-[55] hidden -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-900/50 p-2 backdrop-blur-md lg:block">
      <div className="flex flex-col gap-2">
        {sections.map((section) => {
          const isActive = active === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
              className={`group flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition ${
                isActive ? "bg-accent/20 text-accent" : "text-muted hover:text-text"
              }`}
              aria-label={`Jump to ${section.label}`}
            >
              <span
                className={`h-2 w-2 rounded-full transition ${isActive ? "bg-accent shadow-[0_0_10px_rgba(54,215,183,0.8)]" : "bg-muted/70"}`}
              />
              <span className="w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover:w-16 group-hover:opacity-100">
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
