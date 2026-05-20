import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { compareDateDesc, parseDate } from "./format";

const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");
const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export type EssayMeta = {
  slug: string;
  n: string;
  title: string;
  date: string;
  excerpt: string;
  read: string;
  draft?: boolean;
  tags?: string[];
  ogImage?: string;
};

export type Essay = EssayMeta & {
  body: string;
  readingMinutes: number;
};

export type NoteKind = "Observation" | "Fragment" | "Found" | "Marginalia";

export type NoteMeta = {
  slug: string;
  n: string;
  date: string;
  tag: NoteKind;
  draft?: boolean;
};

export type Note = NoteMeta & {
  body: string;
};

type RawDoc = {
  filePath: string;
  slug: string;
  frontmatter: Record<string, unknown>;
  body: string;
};

async function readAllMdx(dir: string): Promise<RawDoc[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
  const docs: RawDoc[] = [];
  for (const entry of entries) {
    if (!entry.endsWith(".mdx") && !entry.endsWith(".md")) continue;
    const filePath = path.join(dir, entry);
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) continue;
    const raw = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(raw);
    const slug = entry.replace(/\.mdx?$/, "");
    docs.push({ filePath, slug, frontmatter: data, body: content });
  }
  return docs;
}

function requireString(value: unknown, field: string, file: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Missing required frontmatter "${field}" in ${file}`);
  }
  return value;
}

function optionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function optionalStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.filter((v): v is string => typeof v === "string");
}

function validateNoteKind(value: unknown, file: string): NoteKind {
  const allowed: NoteKind[] = ["Observation", "Fragment", "Found", "Marginalia"];
  if (typeof value !== "string" || !allowed.includes(value as NoteKind)) {
    throw new Error(
      `Invalid note tag in ${file}: must be one of ${allowed.join(", ")}`,
    );
  }
  return value as NoteKind;
}

export const getAllEssays = cache(async (): Promise<Essay[]> => {
  const docs = await readAllMdx(ESSAYS_DIR);
  const essays = docs.map((doc): Essay => {
    const { frontmatter, body, filePath, slug } = doc;
    const rt = readingTime(body);
    const readField = optionalString(frontmatter.read);
    return {
      slug,
      n: requireString(frontmatter.n, "n", filePath),
      title: requireString(frontmatter.title, "title", filePath),
      date: requireString(frontmatter.date, "date", filePath),
      excerpt: requireString(frontmatter.excerpt, "excerpt", filePath),
      read: readField ?? `${Math.max(1, Math.round(rt.minutes))} min`,
      draft: frontmatter.draft === true,
      tags: optionalStringArray(frontmatter.tags),
      ogImage: optionalString(frontmatter.ogImage),
      body,
      readingMinutes: rt.minutes,
    };
  });

  const visible = essays.filter(
    (e) => !e.draft || process.env.NODE_ENV !== "production",
  );
  visible.sort((a, b) => compareDateDesc(a.date, b.date));
  return visible;
});

export const getEssay = cache(async (slug: string): Promise<Essay | null> => {
  const essays = await getAllEssays();
  return essays.find((e) => e.slug === slug) ?? null;
});

export const getAllNotes = cache(async (): Promise<Note[]> => {
  const docs = await readAllMdx(NOTES_DIR);
  const notes = docs.map((doc): Note => {
    const { frontmatter, body, filePath, slug } = doc;
    return {
      slug,
      n: requireString(frontmatter.n, "n", filePath),
      date: requireString(frontmatter.date, "date", filePath),
      tag: validateNoteKind(frontmatter.tag, filePath),
      draft: frontmatter.draft === true,
      body: body.trim(),
    };
  });

  const visible = notes.filter(
    (n) => !n.draft || process.env.NODE_ENV !== "production",
  );
  visible.sort((a, b) => compareDateDesc(a.date, b.date));
  return visible;
});

export const getNote = cache(async (slug: string): Promise<Note | null> => {
  const notes = await getAllNotes();
  return notes.find((n) => n.slug === slug) ?? null;
});

export function groupEssaysByYear(essays: Essay[]): Array<{
  year: string;
  entries: Essay[];
}> {
  const groups = new Map<string, Essay[]>();
  for (const e of essays) {
    const year = String(parseDate(e.date).getFullYear());
    const list = groups.get(year) ?? [];
    list.push(e);
    groups.set(year, list);
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, entries]) => ({ year, entries }));
}

export function groupNotesByMonth(notes: Note[]): Array<{
  key: string;
  label: string;
  entries: Note[];
}> {
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const groups = new Map<string, Note[]>();
  for (const n of notes) {
    const d = parseDate(n.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const list = groups.get(key) ?? [];
    list.push(n);
    groups.set(key, list);
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, entries]) => {
      const [y, m] = key.split("-");
      const label = `${MONTHS[Number(m) - 1]} · ${y}`;
      return { key, label, entries };
    });
}

const slugger = new GithubSlugger();

export function reserveHeadingId(text: string): string {
  return slugger.slug(text);
}
