import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import { compareDateDesc, parseDate } from "./format";
import { DEFAULT_LOCALE, formatReadingTime, type Locale } from "./i18n";

const ESSAYS_DIR = path.join(process.cwd(), "content", "essays");
const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export type EssayMeta = {
  slug: string;
  n: string;
  title: string;
  date: string;
  excerpt: string;
  read: string;
  lang: Locale;
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
  lang: Locale;
  draft?: boolean;
};

export type Note = NoteMeta & {
  body: string;
};

type RawDoc = {
  filePath: string;
  slug: string;
  locale: Locale;
  frontmatter: Record<string, unknown>;
  body: string;
};

// "<slug>.mdx" -> { slug, en }; "<slug>.zh-Hans.mdx" -> { slug, zh-Hans }.
function parseEntry(entry: string): { slug: string; locale: Locale } {
  const base = entry.replace(/\.mdx?$/, "");
  const m = base.match(/^(.+)\.(zh-Hans|zh-Hant)$/);
  if (m) return { slug: m[1]!, locale: m[2] as Locale };
  return { slug: base, locale: DEFAULT_LOCALE };
}

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
    const { slug, locale } = parseEntry(entry);
    docs.push({ filePath, slug, locale, frontmatter: data, body: content });
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

// reading-time counts whitespace-delimited tokens, which collapses for CJK.
// For Chinese, estimate from character count at ~400 chars/minute instead.
function estimateMinutes(body: string, locale: Locale): number {
  if (locale === DEFAULT_LOCALE) return readingTime(body).minutes;
  const chars = body.replace(/\s+/g, "").length;
  return chars / 400;
}

const allEssaysByLocale = cache(async (lang: Locale): Promise<Essay[]> => {
  const docs = (await readAllMdx(ESSAYS_DIR)).filter((d) => d.locale === lang);
  const essays = docs.map((doc): Essay => {
    const { frontmatter, body, filePath, slug, locale } = doc;
    const minutes = estimateMinutes(body, locale);
    return {
      slug,
      n: requireString(frontmatter.n, "n", filePath),
      title: requireString(frontmatter.title, "title", filePath),
      date: requireString(frontmatter.date, "date", filePath),
      excerpt: requireString(frontmatter.excerpt, "excerpt", filePath),
      read: optionalString(frontmatter.read) ?? formatReadingTime(locale, minutes),
      lang: locale,
      draft: frontmatter.draft === true,
      tags: optionalStringArray(frontmatter.tags),
      ogImage: optionalString(frontmatter.ogImage),
      body,
      readingMinutes: minutes,
    };
  });

  const visible = essays.filter(
    (e) => !e.draft || process.env.NODE_ENV !== "production",
  );
  visible.sort((a, b) => compareDateDesc(a.date, b.date));
  return visible;
});

export function getAllEssays(lang: Locale = DEFAULT_LOCALE): Promise<Essay[]> {
  return allEssaysByLocale(lang);
}

export async function getEssay(
  slug: string,
  lang: Locale = DEFAULT_LOCALE,
): Promise<Essay | null> {
  const essays = await getAllEssays(lang);
  return essays.find((e) => e.slug === slug) ?? null;
}

const allNotesByLocale = cache(async (lang: Locale): Promise<Note[]> => {
  const docs = (await readAllMdx(NOTES_DIR)).filter((d) => d.locale === lang);
  const notes = docs.map((doc): Note => {
    const { frontmatter, body, filePath, slug, locale } = doc;
    return {
      slug,
      n: requireString(frontmatter.n, "n", filePath),
      date: requireString(frontmatter.date, "date", filePath),
      tag: validateNoteKind(frontmatter.tag, filePath),
      lang: locale,
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

export function getAllNotes(lang: Locale = DEFAULT_LOCALE): Promise<Note[]> {
  return allNotesByLocale(lang);
}

export async function getNote(
  slug: string,
  lang: Locale = DEFAULT_LOCALE,
): Promise<Note | null> {
  const notes = await getAllNotes(lang);
  return notes.find((n) => n.slug === slug) ?? null;
}

// Locales (other than the document's own) that carry a translation of a slug.
// Used to emit hreflang only for versions that actually exist.
export async function essayLocales(slug: string): Promise<Locale[]> {
  const docs = (await readAllMdx(ESSAYS_DIR)).filter((d) => d.slug === slug);
  return docs.map((d) => d.locale);
}

export async function noteLocales(slug: string): Promise<Locale[]> {
  const docs = (await readAllMdx(NOTES_DIR)).filter((d) => d.slug === slug);
  return docs.map((d) => d.locale);
}

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
  year: number;
  month: number; // 1-12
  entries: Note[];
}> {
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
      return { key, year: Number(y), month: Number(m), entries };
    });
}

const slugger = new GithubSlugger();

export function reserveHeadingId(text: string): string {
  return slugger.slug(text);
}
