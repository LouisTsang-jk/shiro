import type { Metadata } from "next";
import { ArchivePageView } from "@/components/views";
import { buildMetadata, buildTitle } from "@/lib/seo";
import { t } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata({
  title: buildTitle([t("en").essaysTitle]),
  description: t("en").meta.essays,
  path: "/archive",
  lang: "en",
});

export default function ArchivePage() {
  return <ArchivePageView lang="en" />;
}
