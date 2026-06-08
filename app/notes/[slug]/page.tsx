import type { Metadata } from "next";
import { NoteView } from "@/components/views";
import { getAllNotes, getNote, noteLocales } from "@/lib/content";
import { noteMetadata } from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const notes = await getAllNotes("en");
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug, "en");
  if (!note) return {};
  return noteMetadata(note, await noteLocales(slug));
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  return <NoteView lang="en" slug={slug} />;
}
