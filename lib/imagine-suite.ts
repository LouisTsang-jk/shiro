import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

const DIR = path.join(process.cwd(), "content", "imagine-suite");

export type SuiteChapter = {
  slug: string;
  title: string;
  body: string;
};

export const getImagineSuite = cache(async (): Promise<SuiteChapter[]> => {
  const entries = await fs.readdir(DIR);
  const files = entries
    .filter((e) => e.endsWith(".md") && e !== "README.md")
    .sort();

  const chapters: SuiteChapter[] = [];
  for (const f of files) {
    const raw = await fs.readFile(path.join(DIR, f), "utf8");
    const lines = raw.split("\n");
    const titleLine = lines[0]?.trim() ?? "";
    const title = titleLine.replace(/^#\s+/, "");
    const body = lines.slice(1).join("\n").trimStart();
    chapters.push({ slug: f.replace(/\.md$/, ""), title, body });
  }
  return chapters;
});
