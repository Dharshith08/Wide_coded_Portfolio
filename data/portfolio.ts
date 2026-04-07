export type SocialLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  details: string;
  tech: string[];
  link: string;
};

export const profile = {
  name: "Dharshith",
  siteName: "Dharshith.vercel.app",
  title: "Full Stack Engineer • AI Systems Builder • Distributed Architect",
  subtext: "real-time systems • AI apps • scalable backends",
  bio: "I design resilient product systems with an obsession for low-latency interaction, event-driven architecture, and AI-first workflows that scale from prototype to production.",
  email: "mailto:dharsithyeswa@gmail.com",
  emailAddress: "dharsithyeswa@gmail.com",
  phone: "+91 86680 59519",
  phoneRaw: "+918668059519",
  whatsapp: "https://wa.me/918668059519",
  location: "India",
  github: "https://github.com/Dharshith08",
  linkedin: "https://www.linkedin.com/in/dharshith-b08lll/",
  x: "https://x.com/Dharsith111",
  instagram: "https://www.instagram.com/dharshith_08.1/"
};

export const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "Firebase",
  "WebRTC",
  "Redis",
  "GraphQL",
  "AI/LLM",
  "OpenAI",
  "LangChain",
  "Flutter",
  "Tailwind",
  "Framer Motion"
];

export const projects: Project[] = [
  {
    id: "pulsegrid",
    name: "PulseGrid Realtime Ops",
    description:
      "Realtime incident response dashboard with multi-region event streaming and operational analytics.",
    details:
      "Built around event sourcing, bounded contexts, and websocket fan-out. Includes live SLA prediction and incident timeline reconstruction.",
    tech: ["Next.js", "Node.js", "Redis", "PostgreSQL", "Docker"],
    link: "https://github.com/dharshith/pulsegrid"
  },
  {
    id: "routelens",
    name: "RouteLens AI Logistics",
    description:
      "AI-assisted planning platform for fleet routing with dynamic constraints and cost-aware scheduling.",
    details:
      "Combines graph optimization with LLM planning hints. Reduced dispatch latency and improved route utilization for peak demand windows.",
    tech: ["TypeScript", "GraphQL", "MongoDB", "OpenAI", "LangChain"],
    link: "https://github.com/dharshith/routelens"
  },
  {
    id: "syncframe",
    name: "SyncFrame Collaboration",
    description:
      "Low-latency collaborative workspace with voice channels, CRDT state sync, and persistent rooms.",
    details:
      "Engineered WebRTC signaling and CRDT merging for reliable concurrent edits. Session replay and room analytics included.",
    tech: ["WebRTC", "Firebase", "Node.js", "React", "Tailwind"],
    link: "https://github.com/dharshith/syncframe"
  },
  {
    id: "forgeflow",
    name: "ForgeFlow Dev Orchestrator",
    description:
      "Developer workflow automation suite with CI intelligence, release guardrails, and rollback recommendations.",
    details:
      "Uses rule engine plus model-assisted summaries to detect deployment risk. Integrates with GitHub webhooks and container registries.",
    tech: ["Next.js", "Docker", "Redis", "PostgreSQL", "AI/LLM"],
    link: "https://github.com/dharshith/forgeflow"
  }
];

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Instagram", href: profile.instagram },
  { label: "X", href: profile.x }
];
