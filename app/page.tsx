import type { Metadata } from "next";
import { Frame } from "@/components/frame";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { IndexList } from "@/components/index-list";
import { getAllEssays } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const description =
  "Writing by Louis Tsang — long-form essays and brief notes on craft, design, and observation.";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — Essays and Notes`,
  description,
  path: "/",
  type: "website",
});

export default async function HomePage() {
  const essays = await getAllEssays();

  return (
    <Frame>
      <Header pathname="/" />
      <IndexList essays={essays} />
      <Hero />
      <Footer />
    </Frame>
  );
}
