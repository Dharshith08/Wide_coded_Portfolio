import { profile, projects, stack } from "@/data/portfolio";

type Intent =
  | "skills"
  | "projects"
  | "about"
  | "contact"
  | "github"
  | "title"
  | "unknown";

const intentKeywords: Record<Intent, string[]> = {
  skills: ["skill", "stack", "tech", "technology", "tools", "framework"],
  projects: ["project", "build", "work", "portfolio", "case study"],
  about: ["about", "bio", "who", "experience", "background"],
  contact: ["contact", "email", "hire", "reach", "linkedin", "x"],
  github: ["github", "repo", "repositories", "code"],
  title: ["title", "role", "position", "specialize", "speciality"],
  unknown: []
};

function detectIntent(input: string): Intent {
  const normalized = input.toLowerCase();

  for (const [intent, words] of Object.entries(intentKeywords) as [Intent, string[]][]) {
    if (words.some((word) => normalized.includes(word))) {
      return intent;
    }
  }

  return "unknown";
}

function localReply(intent: Intent): string {
  switch (intent) {
    case "skills":
      return `Dharshith works across ${stack.join(", ")}. Strongest focus: realtime systems, scalable backends, and AI application architecture.`;
    case "projects":
      return `Featured projects include ${projects
        .map((project) => project.name)
        .join(", ")}. Ask me for details on any one project.`;
    case "about":
      return profile.bio;
    case "contact":
      return `You can reach Dharshith via email at ${profile.emailAddress}, phone ${profile.phone}, WhatsApp, LinkedIn, Instagram, or X from the contact section.`;
    case "github":
      return `GitHub: ${profile.github}. Repositories include realtime ops tools, AI logistics workflows, and collaboration systems.`;
    case "title":
      return profile.title;
    default:
      return "I can answer about Dharshith's skills, projects, architecture focus, and contact details.";
  }
}

async function huggingFaceReply(question: string): Promise<string | null> {
  const token = process.env.HF_API_TOKEN;
  const model = process.env.HF_MODEL || "mistralai/Mistral-7B-Instruct-v0.2";

  if (!token) {
    return null;
  }

  const context = {
    name: profile.name,
    title: profile.title,
    subtext: profile.subtext,
    bio: profile.bio,
    skills: stack,
    projects: projects.map((project) => ({
      name: project.name,
      description: project.description,
      tech: project.tech,
      link: project.link
    }))
  };

  const prompt = `You are Dharshith's portfolio assistant. Answer clearly and concisely.\n\nContext:\n${JSON.stringify(
    context,
    null,
    2
  )}\n\nUser question: ${question}`;

  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt,
        options: {
          wait_for_model: false,
          use_cache: true
        },
        parameters: {
          max_new_tokens: 180,
          temperature: 0.25,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      return null;
    }

    const body: unknown = await response.json();

    if (Array.isArray(body) && typeof body[0]?.generated_text === "string") {
      return body[0].generated_text.trim();
    }

    if (typeof body === "object" && body !== null && "generated_text" in body) {
      const value = (body as { generated_text?: unknown }).generated_text;
      return typeof value === "string" ? value.trim() : null;
    }

    return null;
  } catch {
    return null;
  }
}

export async function getAssistantResponse(message: string): Promise<{ source: "local" | "hf"; reply: string }> {
  const intent = detectIntent(message);

  if (intent !== "unknown") {
    return {
      source: "local",
      reply: localReply(intent)
    };
  }

  const hf = await huggingFaceReply(message);

  if (hf) {
    return {
      source: "hf",
      reply: hf
    };
  }

  return {
    source: "local",
    reply: localReply("unknown")
  };
}
