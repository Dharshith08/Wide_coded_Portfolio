"use client";

import { profile, stack } from "@/data/portfolio";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import LiveProfileInsights from "@/components/live-profile-insights";

export default function AboutSection() {
  return (
    <section id="about" className="snap-section px-6 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_1fr]">
        <Reveal className="soft-card rounded-3xl p-7 md:p-10">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">About</p>
          <h3 className="mt-4 font-display text-3xl text-text md:text-4xl">Tech Stack & Direction</h3>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{profile.bio}</p>
        </Reveal>

        <StaggerGroup className="soft-card rounded-3xl p-7 md:p-10">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">Stack</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {stack.map((item) => (
              <StaggerItem key={item}>
                <div className="rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-sm text-text/90 transition hover:border-accent/50 hover:text-accent">
                  {item}
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </div>

      <div className="mx-auto mt-6 w-full max-w-6xl">
        <LiveProfileInsights />
      </div>
    </section>
  );
}
