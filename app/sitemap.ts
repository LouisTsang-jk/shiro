import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import {
  getAllEssays,
  getAllNotes,
  essayLocales,
  noteLocales,
} from "@/lib/content";
import { isoDate } from "@/lib/format";
import { DEFAULT_LOCALE, LOCALES, localizedPath, type Locale } from "@/lib/i18n";

function abs(lang: Locale, path: string): string {
  return new URL(localizedPath(lang, path), site.url).toString();
}

// hreflang map for a path across the locales that actually serve it.
function alternates(path: string, locales: Locale[]): { languages: Record<string, string> } {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = abs(l, path);
  languages["x-default"] = abs(DEFAULT_LOCALE, path);
  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [essays, notes] = await Promise.all([getAllEssays(), getAllNotes()]);
  const allLocales = [...LOCALES];

  type StaticRoute = {
    path: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
    locales: Locale[];
  };

  const staticRoutes: StaticRoute[] = [
    { path: "/", changeFrequency: "weekly", priority: 1, locales: allLocales },
    { path: "/archive", changeFrequency: "monthly", priority: 0.8, locales: allLocales },
    { path: "/notes", changeFrequency: "weekly", priority: 0.9, locales: allLocales },
    { path: "/imagine-suite", changeFrequency: "yearly", priority: 0.4, locales: [DEFAULT_LOCALE] },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    route.locales.map((lang) => ({
      url: abs(lang, route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(route.locales.length > 1
        ? { alternates: alternates(route.path, route.locales) }
        : {}),
    })),
  );

  const essayEntries: MetadataRoute.Sitemap = (
    await Promise.all(
      essays.map(async (e) => {
        const locales = await essayLocales(e.slug);
        const path = `/essays/${e.slug}`;
        return locales.map((lang) => ({
          url: abs(lang, path),
          lastModified: new Date(isoDate(e.date)),
          changeFrequency: "yearly" as const,
          priority: 0.7,
          ...(locales.length > 1 ? { alternates: alternates(path, locales) } : {}),
        }));
      }),
    )
  ).flat();

  const noteEntries: MetadataRoute.Sitemap = (
    await Promise.all(
      notes.map(async (n) => {
        const locales = await noteLocales(n.slug);
        const path = `/notes/${n.slug}`;
        return locales.map((lang) => ({
          url: abs(lang, path),
          lastModified: new Date(isoDate(n.date)),
          changeFrequency: "yearly" as const,
          priority: 0.5,
          ...(locales.length > 1 ? { alternates: alternates(path, locales) } : {}),
        }));
      }),
    )
  ).flat();

  return [...staticEntries, ...essayEntries, ...noteEntries];
}
