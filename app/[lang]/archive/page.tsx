import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchivePageView } from "@/components/views";
import { buildMetadata, buildTitle } from "@/lib/seo";
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
    title: buildTitle([t(lang).essaysTitle]),
    description: t(lang).meta.essays,
    path: "/archive",
    lang,
  });
}

export default async function LocaleArchivePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return <ArchivePageView lang={lang} />;
}
