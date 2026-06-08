import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EssayView } from "@/components/views";
import { getAllEssays, getEssay, essayLocales } from "@/lib/content";
import { essayMetadata } from "@/lib/seo";
import { PREFIXED_LOCALES, isPrefixedLocale } from "@/lib/i18n";

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of PREFIXED_LOCALES) {
    const essays = await getAllEssays(lang);
    for (const e of essays) params.push({ lang, slug: e.slug });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isPrefixedLocale(lang)) return {};
  const essay = await getEssay(slug, lang);
  if (!essay) return {};
  return essayMetadata(essay, await essayLocales(slug));
}

export default async function LocaleEssayPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return <EssayView lang={lang} slug={slug} />;
}
