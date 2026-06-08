import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NoteView } from "@/components/views";
import { getAllNotes, getNote, noteLocales } from "@/lib/content";
import { noteMetadata } from "@/lib/seo";
import { PREFIXED_LOCALES, isPrefixedLocale } from "@/lib/i18n";

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];
  for (const lang of PREFIXED_LOCALES) {
    const notes = await getAllNotes(lang);
    for (const n of notes) params.push({ lang, slug: n.slug });
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
  const note = await getNote(slug, lang);
  if (!note) return {};
  return noteMetadata(note, await noteLocales(slug));
}

export default async function LocaleNotePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isPrefixedLocale(lang)) notFound();
  return <NoteView lang={lang} slug={slug} />;
}
