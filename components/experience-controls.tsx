"use client";

import { useEffect, useState } from "react";
import { Leaf, Zap } from "lucide-react";

type ConnectionWithSaveData = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

function setBodyFlag(key: "eco" | "fx", enabled: boolean) {
  document.body.dataset[key] = enabled ? "true" : "false";
}

export default function ExperienceControls() {
  const [eco, setEco] = useState(false);
  const [fx, setFx] = useState(true);

  useEffect(() => {
    const savedEco = localStorage.getItem("portfolio-eco");
    const savedFx = localStorage.getItem("portfolio-fx");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as ConnectionWithSaveData).connection?.saveData === true;

    const nextEco = savedEco ? savedEco === "true" : saveData || prefersReducedMotion;
    const nextFx = savedFx ? savedFx === "true" : !prefersReducedMotion;

    setEco(nextEco);
    setFx(nextFx && !nextEco);

    setBodyFlag("eco", nextEco);
    setBodyFlag("fx", nextFx && !nextEco);
  }, []);

  const toggleEco = () => {
    const next = !eco;
    setEco(next);
    localStorage.setItem("portfolio-eco", String(next));
    setBodyFlag("eco", next);

    if (next) {
      setFx(false);
      localStorage.setItem("portfolio-fx", "false");
      setBodyFlag("fx", false);
    }
  };

  const toggleFx = () => {
    if (eco) {
      return;
    }

    const next = !fx;
    setFx(next);
    localStorage.setItem("portfolio-fx", String(next));
    setBodyFlag("fx", next);
  };

  return (
    <div className="fixed bottom-5 left-4 z-[62] flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 p-2 backdrop-blur-md">
      <button
        type="button"
        onClick={toggleEco}
        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs transition ${
          eco ? "eco-pill" : "border border-white/15 text-muted hover:border-accent/55 hover:text-accent"
        }`}
      >
        <Leaf size={13} /> Eco
      </button>
      <button
        type="button"
        onClick={toggleFx}
        disabled={eco}
        className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs transition ${
          fx && !eco
            ? "border border-warm/45 bg-warm/15 text-warm"
            : "border border-white/15 text-muted hover:border-warm/55 hover:text-warm"
        } disabled:cursor-not-allowed disabled:opacity-55`}
      >
        <Zap size={13} /> FX
      </button>
    </div>
  );
}
