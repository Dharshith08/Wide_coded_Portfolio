import { createHash, randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

type AnalyticsEvent = {
  id: string;
  type: string;
  section?: string;
  target?: string;
  path?: string;
  userAgent?: string;
  ipHash: string;
  timestamp: string;
};

type ContactLead = {
  id: string;
  name: string;
  email: string;
  message: string;
  phone?: string;
  source?: string;
  timestamp: string;
  ipHash: string;
};

type DbShape = {
  analytics: AnalyticsEvent[];
  contacts: ContactLead[];
};

const runtimeDir = path.join(process.cwd(), "data", "runtime");
const dbPath = path.join(runtimeDir, "portfolio-db.json");
let useMemoryOnly = false;
let memoryDb: DbShape = { analytics: [], contacts: [] };

function cloneDb(db: DbShape): DbShape {
  return {
    analytics: [...db.analytics],
    contacts: [...db.contacts]
  };
}

async function ensureDb() {
  if (useMemoryOnly) {
    return;
  }

  try {
    await mkdir(runtimeDir, { recursive: true });
    await readFile(dbPath, "utf8");
  } catch {
    try {
      const empty: DbShape = { analytics: [], contacts: [] };
      await writeFile(dbPath, JSON.stringify(empty, null, 2), "utf8");
    } catch {
      useMemoryOnly = true;
    }
  }
}

async function loadDb(): Promise<DbShape> {
  await ensureDb();

  if (useMemoryOnly) {
    return cloneDb(memoryDb);
  }

  try {
    const raw = await readFile(dbPath, "utf8");
    return JSON.parse(raw) as DbShape;
  } catch {
    useMemoryOnly = true;
    return cloneDb(memoryDb);
  }
}

async function saveDb(db: DbShape) {
  if (useMemoryOnly) {
    memoryDb = cloneDb(db);
    return;
  }

  try {
    await writeFile(dbPath, JSON.stringify(db, null, 2), "utf8");
  } catch {
    useMemoryOnly = true;
    memoryDb = cloneDb(db);
  }
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

export async function trackEvent(event: Omit<AnalyticsEvent, "id" | "timestamp">) {
  const db = await loadDb();

  db.analytics.push({
    ...event,
    id: randomUUID(),
    timestamp: new Date().toISOString()
  });

  if (db.analytics.length > 5000) {
    db.analytics = db.analytics.slice(-5000);
  }

  await saveDb(db);
}

export async function addContact(lead: Omit<ContactLead, "id" | "timestamp">) {
  const db = await loadDb();

  const savedLead = {
    ...lead,
    id: randomUUID(),
    timestamp: new Date().toISOString()
  };

  db.contacts.push(savedLead);

  if (db.contacts.length > 1000) {
    db.contacts = db.contacts.slice(-1000);
  }

  await saveDb(db);
  return savedLead;
}

export async function getAnalyticsSummary() {
  const db = await loadDb();

  const byType: Record<string, number> = {};
  const bySection: Record<string, number> = {};
  const byPath: Record<string, number> = {};

  for (const event of db.analytics) {
    byType[event.type] = (byType[event.type] || 0) + 1;

    if (event.section) {
      bySection[event.section] = (bySection[event.section] || 0) + 1;
    }

    if (event.path) {
      byPath[event.path] = (byPath[event.path] || 0) + 1;
    }
  }

  return {
    totalEvents: db.analytics.length,
    totalContacts: db.contacts.length,
    uniqueVisitors: new Set(db.analytics.map((event) => event.ipHash)).size,
    byType,
    bySection,
    byPath,
    recentContacts: db.contacts.slice(-5).reverse(),
    lastEventAt: db.analytics.at(-1)?.timestamp || null
  };
}
