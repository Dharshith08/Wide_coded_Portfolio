"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import HeroMetrics from "@/components/hero-metrics";

export default function HeroSection() {
  return (
    <section id="hero" className="snap-section relative px-6 pt-24 md:px-10">
      <div className="hero-grid pointer-events-none absolute inset-0 bg-hero-grid opacity-45" />
      <div className="pointer-events-none absolute -left-16 top-20 h-40 w-40 rounded-full bg-accent/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-20 h-52 w-52 rounded-full bg-warm/25 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.25, 0.8, 0.25, 1] }}
          className="soft-card rounded-3xl p-7 md:p-12"
        >
          <p className="font-display text-xs uppercase tracking-[0.28em] text-accent">Engineering Portfolio</p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-text sm:text-5xl lg:text-7xl">
            {profile.name}
          </h1>
          <h2 className="mt-4 max-w-4xl text-lg text-text/90 sm:text-2xl md:text-3xl">{profile.title}</h2>
          <p className="mt-4 max-w-3xl text-base text-muted sm:text-lg">{profile.subtext}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              Explore Projects
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-text transition hover:border-accent/70 hover:text-accent"
            >
              Visit GitHub
            </a>
          </div>
          <HeroMetrics />
        </motion.div>
      </div>
    </section>
  );
}
