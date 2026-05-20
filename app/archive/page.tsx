import type { Metadata } from "next";
import { Frame } from "@/components/frame";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArchiveView } from "@/components/archive-view";
import { getAllEssays } from "@/lib/content";
import { buildMetadata, buildTitle } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: buildTitle(["Essays"]),
  description: "The complete archive of essays by Louis Tsang, grouped by year.",
  path: "/archive",
});

export default async function ArchivePage() {
  const essays = await getAllEssays();

  return (
    <Frame>
      <Header pathname="/archive" />
      <ArchiveView essays={essays} />
      <Footer />
    </Frame>
  );
}
