"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import LenisProvider from "@/components/lenis-provider";
import UiEffects from "@/components/ui-effects";
import ScrollProgress from "@/components/scroll-progress";
import SectionDock from "@/components/section-dock";
import CommandPalette from "@/components/command-palette";
import AnalyticsClient from "@/components/analytics-client";

const AssistantSection = dynamic(() => import("@/components/assistant-section"), {
  loading: () => (
    <section className="snap-section px-6 md:px-10">
      <div className="mx-auto w-full max-w-6xl rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-sm text-muted">Loading assistant...</p>
      </div>
    </section>
  )
});

export default function PortfolioShell() {
  return (
    <LenisProvider>
      <AnalyticsClient />
      <ScrollProgress />
      <UiEffects />
      <SectionDock />
      <CommandPalette />
      <Navbar />
      <main className="snap-container px-0">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <AssistantSection />
        <ContactSection />
      </main>
    </LenisProvider>
  );
}
