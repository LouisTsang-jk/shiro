import type { Metadata } from "next";
import { HomeView } from "@/components/views";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { t } from "@/lib/i18n";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${t("en").homeTitleSuffix}`,
  description: t("en").meta.home,
  path: "/",
  lang: "en",
  type: "website",
});

export default function HomePage() {
  return <HomeView lang="en" />;
}
