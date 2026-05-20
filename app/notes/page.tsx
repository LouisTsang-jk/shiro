import type { Metadata } from "next";
import { Frame } from "@/components/frame";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { NotesIndex } from "@/components/notes-index";
import { getAllNotes } from "@/lib/content";
import { buildMetadata, buildTitle } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: buildTitle(["Notes"]),
  description: "Short notes and observations by Louis Tsang, grouped by month.",
  path: "/notes",
});

export default async function NotesIndexPage() {
  const notes = await getAllNotes();

  return (
    <Frame>
      <Header pathname="/notes" />
      <NotesIndex notes={notes} />
      <Footer />
    </Frame>
  );
}
