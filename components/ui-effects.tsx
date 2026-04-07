"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function UiEffects() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [enabled, setEnabled] = useState(true);

  const x = useSpring(mouseX, { stiffness: 130, damping: 22, mass: 0.35 });
  const y = useSpring(mouseY, { stiffness: 130, damping: 22, mass: 0.35 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ecoPreference = localStorage.getItem("portfolio-eco");
    const fxPreference = localStorage.getItem("portfolio-fx");
    const ecoMode = ecoPreference ? ecoPreference === "true" : document.body.dataset.eco === "true";
    const fxMode = fxPreference ? fxPreference === "true" : document.body.dataset.fx !== "false";

    if (prefersReducedMotion || ecoMode || !fxMode) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const onMove = (event: MouseEvent) => {
      mouseX.set(event.clientX - 180);
      mouseY.set(event.clientY - 180);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        aria-hidden
        className="fx-heavy pointer-events-none fixed left-0 top-0 z-[2] h-[360px] w-[360px] rounded-full bg-accent/10 blur-3xl"
        style={{ x, y }}
      />
      <div
        aria-hidden
        className="fx-heavy pointer-events-none fixed inset-0 z-[1] opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,163,187,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,163,187,0.08) 1px, transparent 1px)",
          backgroundSize: "36px 36px"
        }}
      />
      <div aria-hidden className="scanline pointer-events-none fixed inset-0 z-[3] opacity-15" />
    </>
  );
}
