"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/portfolio";

type Action = {
  id: string;
  label: string;
  keywords: string;
  onRun: () => void;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions: Action[] = useMemo(
    () => [
      {
        id: "hero",
        label: "Go to Hero",
        keywords: "home hero start",
        onRun: () => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
      },
      {
        id: "stack",
        label: "Go to Tech Stack",
        keywords: "about stack skills",
        onRun: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
      },
      {
        id: "projects",
        label: "Go to Projects",
        keywords: "work project case study",
        onRun: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
      },
      {
        id: "assistant",
        label: "Open AI Assistant",
        keywords: "chat ai ask",
        onRun: () => document.getElementById("assistant")?.scrollIntoView({ behavior: "smooth" })
      },
      {
        id: "contact",
        label: "Go to Contact",
        keywords: "mail hire linkedin",
        onRun: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
      },
      {
        id: "github",
        label: "Open GitHub",
        keywords: "repo code profile",
        onRun: () => window.open(profile.github, "_blank", "noopener,noreferrer")
      },
      {
        id: "email",
        label: "Copy Email",
        keywords: "email mail reach out",
        onRun: () => {
          void navigator.clipboard.writeText(profile.emailAddress);
        }
      }
    ],
    []
  );

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return actions;

    return actions.filter(
      (action) => action.label.toLowerCase().includes(normalized) || action.keywords.includes(normalized)
    );
  }, [actions, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const isOpenPalette = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isOpenPalette) {
        event.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      if (!open) return;

      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, Math.max(filtered.length - 1, 0)));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const current = filtered[selectedIndex];
        if (current) {
          current.onRun();
          setOpen(false);
          setQuery("");
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [filtered, open, selectedIndex]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[60] rounded-xl border border-white/15 bg-slate-900/75 px-3 py-2 text-xs text-muted backdrop-blur-md transition hover:border-accent/60 hover:text-accent"
      >
        Ctrl/Cmd + K
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center bg-black/55 p-4 pt-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/15 bg-slate-950/95 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="border-b border-white/10 px-4 py-3">
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search actions..."
                  className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted"
                />
              </div>
              <div className="max-h-[50vh] overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <p className="px-3 py-4 text-sm text-muted">No actions found.</p>
                ) : (
                  filtered.map((action, index) => (
                    <button
                      key={action.id}
                      type="button"
                      onClick={() => {
                        action.onRun();
                        setOpen(false);
                        setQuery("");
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                        index === selectedIndex ? "bg-accent/20 text-accent" : "text-text hover:bg-white/5"
                      }`}
                    >
                      <span>{action.label}</span>
                      <span className="text-[11px] uppercase tracking-[0.15em] text-muted">Enter</span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
