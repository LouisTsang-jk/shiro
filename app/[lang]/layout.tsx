import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { isPrefixedLocale } from "@/lib/i18n";

// Google Fonts serves Source Han Serif / Sans (Noto Serif / Sans CJK) split
// into unicode-range chunks, so the browser only fetches the subsets whose
// glyphs actually render. Loaded here — never on the English root.
const FONT_HREF: Record<string, string> = {
  "zh-Hans":
    "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&family=Noto+Serif+SC:wght@400;500&display=swap",
  "zh-Hant":
    "https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500&family=Noto+Serif+TC:wght@400;500&display=swap",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href={FONT_HREF[lang]} precedence="default" />
      <div lang={lang}>{children}</div>
    </>
  );
}
