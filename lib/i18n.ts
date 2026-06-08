import type { NoteKind } from "./content";

// ──────────────────────────────────────────────────────────────────────────
// Locales. English is the default and is served unprefixed at the root.
// Chinese carries a URL prefix that doubles as the content-file suffix and
// the BCP-47 lang / hreflang code, so there is one identifier per locale and
// no mapping table to keep in sync.
// ──────────────────────────────────────────────────────────────────────────

export const LOCALES = ["en", "zh-Hans", "zh-Hant"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

// Locales that carry a `/<locale>` URL prefix (everything but the default).
export const PREFIXED_LOCALES = ["zh-Hans", "zh-Hant"] as const;
export type PrefixedLocale = (typeof PREFIXED_LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function isPrefixedLocale(value: string): value is PrefixedLocale {
  return (PREFIXED_LOCALES as readonly string[]).includes(value);
}

// Map a canonical (English) path to its path within a given locale.
//   localizedPath("en", "/essays/x")      -> "/essays/x"
//   localizedPath("zh-Hans", "/essays/x") -> "/zh-Hans/essays/x"
//   localizedPath("zh-Hans", "/")         -> "/zh-Hans"
export function localizedPath(lang: Locale, canonicalPath: string): string {
  const path = canonicalPath === "" ? "/" : canonicalPath;
  if (lang === DEFAULT_LOCALE) return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}

// og:locale codes.
export const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  "zh-Hans": "zh_CN",
  "zh-Hant": "zh_TW",
};

// Short label for the language switcher.
export const LOCALE_LABEL: Record<Locale, string> = {
  en: "EN",
  "zh-Hans": "简",
  "zh-Hant": "繁",
};

export function formatReadingTime(lang: Locale, minutes: number): string {
  const m = Math.max(1, Math.round(minutes));
  if (lang === "zh-Hans") return `${m} 分钟`;
  if (lang === "zh-Hant") return `${m} 分鐘`;
  return `${m} min`;
}

// ──────────────────────────────────────────────────────────────────────────
// UI dictionary. These strings are published copy — keep them in the blog's
// register (quiet, literary), not machine-translation register.
// ──────────────────────────────────────────────────────────────────────────

const MONTHS_EN = [
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

export type Dictionary = {
  nav: { essays: string; notes: string };
  essaysTitle: string;
  notesTitle: string;
  essay: { prev: string; next: string; index: string };
  note: { prev: string; next: string; index: string };
  notFound: { title: string; home: string };
  homeTitleSuffix: string;
  meta: { site: string; home: string; essays: string; notes: string };
  noteTag: Record<NoteKind, string>;
  monthYear: (year: number, month: number) => string; // month is 1-12
};

const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: { essays: "Essays", notes: "Notes" },
    essaysTitle: "Essays",
    notesTitle: "Notes",
    essay: { prev: "Previous", next: "Next", index: "↑ Return to index" },
    note: { prev: "Earlier note", next: "Later note", index: "↑ All notes" },
    notFound: { title: "Nothing here.", home: "↑ Return home" },
    homeTitleSuffix: "Essays and Notes",
    meta: {
      site: "Writing by Louis Tsang.",
      home: "Writing by Louis Tsang — long-form essays and brief notes on craft, design, and observation.",
      essays: "The complete archive of essays by Louis Tsang, grouped by year.",
      notes: "Short notes and observations by Louis Tsang, grouped by month.",
    },
    noteTag: {
      Observation: "Observation",
      Fragment: "Fragment",
      Found: "Found",
      Marginalia: "Marginalia",
    },
    monthYear: (year, month) => `${MONTHS_EN[month - 1]} · ${year}`,
  },
  "zh-Hans": {
    nav: { essays: "随笔", notes: "札记" },
    essaysTitle: "随笔",
    notesTitle: "札记",
    essay: { prev: "上一篇", next: "下一篇", index: "↑ 返回目录" },
    note: { prev: "更早的札记", next: "更晚的札记", index: "↑ 全部札记" },
    notFound: { title: "这里什么都没有。", home: "↑ 返回首页" },
    homeTitleSuffix: "随笔与札记",
    meta: {
      site: "Louis Tsang 的写作。",
      home: "Louis Tsang 的写作——关于手艺、设计与观察的长篇随笔与简短札记。",
      essays: "Louis Tsang 全部随笔的归档，按年份排列。",
      notes: "Louis Tsang 的简短札记与观察，按月份排列。",
    },
    noteTag: {
      Observation: "观察",
      Fragment: "碎片",
      Found: "拾得",
      Marginalia: "旁注",
    },
    monthYear: (year, month) => `${year} 年 ${month} 月`,
  },
  "zh-Hant": {
    nav: { essays: "隨筆", notes: "札記" },
    essaysTitle: "隨筆",
    notesTitle: "札記",
    essay: { prev: "上一篇", next: "下一篇", index: "↑ 返回目錄" },
    note: { prev: "更早的札記", next: "更晚的札記", index: "↑ 全部札記" },
    notFound: { title: "這裡什麼都沒有。", home: "↑ 返回首頁" },
    homeTitleSuffix: "隨筆與札記",
    meta: {
      site: "Louis Tsang 的寫作。",
      home: "Louis Tsang 的寫作——關於手藝、設計與觀察的長篇隨筆與簡短札記。",
      essays: "Louis Tsang 全部隨筆的歸檔，按年份排列。",
      notes: "Louis Tsang 的簡短札記與觀察，按月份排列。",
    },
    noteTag: {
      Observation: "觀察",
      Fragment: "碎片",
      Found: "拾得",
      Marginalia: "旁註",
    },
    monthYear: (year, month) => `${year} 年 ${month} 月`,
  },
};

export function t(lang: Locale): Dictionary {
  return dictionaries[lang];
}
