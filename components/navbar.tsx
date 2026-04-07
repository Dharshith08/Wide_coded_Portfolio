"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Stack", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Assistant", href: "#assistant" },
  { label: "Contact", href: "#contact" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "projects", "assistant", "contact"];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: [0.35, 0.6, 0.85],
        rootMargin: "-15% 0px -40% 0px"
      }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.8, 0.25, 1] }}
      className="fixed left-1/2 top-5 z-50 w-[min(94vw,1040px)] -translate-x-1/2 rounded-2xl border border-white/10 bg-glass px-4 py-3 shadow-glow backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <a href="#hero" className="font-display text-sm uppercase tracking-[0.22em] text-text/95">
          {profile.siteName}
        </a>
        <div className="hidden items-center gap-5 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-accent ${
                activeSection === item.href.slice(1) ? "text-accent" : "text-muted"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <motion.a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl border border-accent/45 bg-accent/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent transition hover:bg-accent/20"
        >
          GitHub
        </motion.a>
      </div>
    </motion.nav>
  );
}
