import { NextResponse } from "next/server";

export const revalidate = 3600;

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  updated_at: string;
  topics?: string[];
};

type User = {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string | null;
  name: string | null;
};

function topItems(counter: Record<string, number>, n = 8) {
  return Object.entries(counter)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([key, value]) => ({ key, value }));
}

export async function GET() {
  const username = process.env.GITHUB_USERNAME || "dharshith";

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
        },
        next: { revalidate }
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {})
        },
        next: { revalidate }
      })
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error("GitHub API unavailable");
    }

    const user = (await userRes.json()) as User;
    const repos = (await reposRes.json()) as Repo[];

    const publicRepos = repos.filter((repo) => !repo.fork);
    const languageCounter: Record<string, number> = {};
    const topicCounter: Record<string, number> = {};

    for (const repo of publicRepos) {
      if (repo.language) languageCounter[repo.language] = (languageCounter[repo.language] || 0) + 1;

      for (const topic of repo.topics || []) {
        topicCounter[topic] = (topicCounter[topic] || 0) + 1;
      }
    }

    return NextResponse.json({
      ok: true,
      source: "github",
      profile: {
        username: user.login,
        name: user.name,
        bio: user.bio,
        url: user.html_url,
        avatar: user.avatar_url,
        repos: user.public_repos,
        followers: user.followers,
        following: user.following
      },
      topLanguages: topItems(languageCounter),
      topTopics: topItems(topicCounter),
      recentProjects: publicRepos.slice(0, 6).map((repo) => ({
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        url: repo.html_url,
        updatedAt: repo.updated_at
      }))
    });
  } catch {
    return NextResponse.json({
      ok: false,
      source: "fallback",
      profile: null,
      topLanguages: [],
      topTopics: [],
      recentProjects: []
    });
  }
}
