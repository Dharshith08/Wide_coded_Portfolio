"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.3
  });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-gradient-to-r from-accent via-cyan-300 to-warm"
      style={{ scaleX }}
    />
  );
}
