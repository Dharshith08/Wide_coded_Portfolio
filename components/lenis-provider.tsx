"use client";

import Lenis from "@studio-freight/lenis";
import { ReactNode, useEffect } from "react";

export default function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ecoPreference = localStorage.getItem("portfolio-eco");
    const fxPreference = localStorage.getItem("portfolio-fx");
    const ecoMode = ecoPreference ? ecoPreference === "true" : document.body.dataset.eco === "true";
    const fxMode = fxPreference ? fxPreference === "true" : document.body.dataset.fx !== "false";

    if (prefersReducedMotion || ecoMode || !fxMode) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.8,
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.0
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
