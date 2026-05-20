import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllEssays, getAllNotes } from "@/lib/content";
import { isoDate } from "@/lib/format";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [essays, notes] = await Promise.all([getAllEssays(), getAllNotes()]);
  const base = site.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/archive`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/notes`, changeFrequency: "weekly", priority: 0.9 },
  ];

  const essayRoutes: MetadataRoute.Sitemap = essays.map((e) => ({
    url: `${base}/essays/${e.slug}`,
    lastModified: new Date(isoDate(e.date)),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const noteRoutes: MetadataRoute.Sitemap = notes.map((n) => ({
    url: `${base}/notes/${n.slug}`,
    lastModified: new Date(isoDate(n.date)),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...essayRoutes, ...noteRoutes];
}
