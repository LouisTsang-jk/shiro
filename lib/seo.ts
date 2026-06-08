import type { Metadata } from "next";
import { site } from "./site";
import { isoDate } from "./format";
import type { Essay, Note } from "./content";
import {
  DEFAULT_LOCALE,
  LOCALES,
  OG_LOCALE,
  localizedPath,
  t,
  type Locale,
} from "./i18n";

const SEPARATOR = " — ";

export function buildTitle(parts: string[]): string {
  return [...parts, site.name].filter(Boolean).join(SEPARATOR);
}

type CommonMetadataInput = {
  title: string;
  description: string;
  /** Canonical (English) path, e.g. "/essays/x" or "/". */
  path: string;
  lang?: Locale;
  /** Locales for which this path exists; defaults to every locale. */
  alternateLocales?: Locale[];
  ogImage?: string;
  type?: "article" | "website";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

const DEFAULT_OG_IMAGE = new URL("/opengraph-image", site.url).toString();

function absolute(lang: Locale, path: string): string {
  return new URL(localizedPath(lang, path), site.url).toString();
}

export function buildMetadata(input: CommonMetadataInput): Metadata {
  const lang = input.lang ?? DEFAULT_LOCALE;
  const locales = input.alternateLocales ?? [...LOCALES];
  const canonical = absolute(lang, input.path);

  // hreflang map for every available translation, plus x-default -> English.
  const languages: Record<string, string> = {};
  for (const loc of locales) languages[loc] = absolute(loc, input.path);
  languages["x-default"] = absolute(DEFAULT_LOCALE, input.path);

  // openGraph is shallow-merged across segments, so a child segment that sets
  // openGraph without images would shadow the root opengraph-image file
  // convention. Always set an image — either the page's own or the site
  // default — so social cards never come back empty.
  const image = input.ogImage
    ? new URL(input.ogImage, site.url).toString()
    : DEFAULT_OG_IMAGE;

  return {
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical, languages },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: site.name,
      locale: OG_LOCALE[lang],
      type: input.type ?? "website",
      images: [{ url: image, width: 1200, height: 630 }],
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
      authors: input.authors,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
  };
}

export function essayMetadata(
  essay: Essay,
  alternateLocales: Locale[] = [essay.lang],
): Metadata {
  return buildMetadata({
    title: buildTitle([essay.title]),
    description: essay.excerpt,
    path: `/essays/${essay.slug}`,
    lang: essay.lang,
    alternateLocales,
    ogImage: essay.ogImage,
    type: "article",
    publishedTime: isoDate(essay.date),
    authors: [site.author.name],
  });
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}

function noteHeadline(body: string, max: number): string {
  const flat = body.replace(/\s+/g, " ").trim();
  const sentence = flat.match(/^[^.!?。！？]*[.!?。！？]/);
  return truncate((sentence?.[0] ?? flat).trim(), max);
}

export function noteMetadata(
  note: Note,
  alternateLocales: Locale[] = [note.lang],
): Metadata {
  const summary = note.body.replace(/\s+/g, " ").trim();
  const description = truncate(summary, 160);
  return buildMetadata({
    title: buildTitle([noteHeadline(note.body, 70)]),
    description,
    path: `/notes/${note.slug}`,
    lang: note.lang,
    alternateLocales,
    type: "article",
    publishedTime: isoDate(note.date),
    authors: [site.author.name],
  });
}

export function essayJsonLd(essay: Essay) {
  const url = absolute(essay.lang, `/essays/${essay.slug}`);
  const wordCount = essay.body.split(/\s+/).filter(Boolean).length;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: truncate(essay.title, 110),
    description: essay.excerpt,
    datePublished: isoDate(essay.date),
    dateModified: isoDate(essay.date),
    inLanguage: essay.lang,
    wordCount,
    author: {
      "@type": "Person",
      name: site.author.name,
      url: site.url,
    },
    publisher: {
      "@type": "Person",
      name: site.author.name,
      url: site.url,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(essay.ogImage
      ? { image: [new URL(essay.ogImage, site.url).toString()] }
      : {}),
  };
}

export function noteJsonLd(note: Note) {
  const url = absolute(note.lang, `/notes/${note.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "ShortStory",
    headline: noteHeadline(note.body, 110),
    articleBody: note.body,
    datePublished: isoDate(note.date),
    inLanguage: note.lang,
    author: { "@type": "Person", name: site.author.name, url: site.url },
    publisher: { "@type": "Person", name: site.author.name, url: site.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

export function websiteJsonLd(lang: Locale = DEFAULT_LOCALE) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    description: t(lang).meta.site,
    url: absolute(lang, "/"),
    inLanguage: lang,
    publisher: {
      "@type": "Person",
      name: site.author.name,
      url: site.url,
      sameAs: [site.author.github],
    },
  };
}
