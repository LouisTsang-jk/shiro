import type { Metadata } from "next";
import { NotesView } from "@/components/views";
import { buildMetadata, buildTitle } from "@/lib/seo";
import { t } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata({
  title: buildTitle([t("en").notesTitle]),
  description: t("en").meta.notes,
  path: "/notes",
  lang: "en",
});

export default function NotesIndexPage() {
  return <NotesView lang="en" />;
}
