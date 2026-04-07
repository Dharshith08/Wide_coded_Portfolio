"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import TiltCard from "@/components/tilt-card";

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="snap-section px-6 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="mb-6 md:mb-8">
          <p className="font-display text-xs uppercase tracking-[0.22em] text-accent">Projects</p>
          <h3 className="mt-3 font-display text-3xl text-text md:text-4xl">Selected Work</h3>
        </Reveal>

        <StaggerGroup className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <TiltCard
                onClick={() => setActiveProject(project)}
                className="soft-card h-full w-full rounded-2xl p-6 text-left"
              >
                <h4 className="font-display text-2xl text-text">{project.name}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span
                      key={`${project.id}-${item}`}
                      className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-text/85"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <AnimatePresence>
        {activeProject ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center bg-black/65 p-4 md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.28 }}
              className="soft-card w-full max-w-xl rounded-3xl p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-display text-2xl text-text">{activeProject.name}</h4>
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="rounded-lg border border-white/15 p-2 text-muted transition hover:text-text"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{activeProject.details}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {activeProject.tech.map((item) => (
                  <span key={item} className="rounded-full border border-accent/35 px-3 py-1 text-xs text-accent">
                    {item}
                  </span>
                ))}
              </div>
              <a
                href={activeProject.link}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
              >
                Open Project
                <ExternalLink size={15} />
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
