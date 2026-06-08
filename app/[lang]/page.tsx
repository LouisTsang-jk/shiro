import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeView } from "@/components/views";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PREFIXED_LOCALES, isPrefixedLocale, t } from "@/lib/i18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) return {};
  return buildMetadata({
    title: `${site.name} — ${t(lang).homeTitleSuffix}`,
    description: t(lang).meta.home,
    path: "/",
    lang,
    type: "website",
  });
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return <HomeView lang={lang} />;
}
