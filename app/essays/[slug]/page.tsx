import type { Metadata } from "next";
import { EssayView } from "@/components/views";
import { getAllEssays, getEssay, essayLocales } from "@/lib/content";
import { essayMetadata } from "@/lib/seo";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const essays = await getAllEssays("en");
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssay(slug, "en");
  if (!essay) return {};
  return essayMetadata(essay, await essayLocales(slug));
}

export default async function EssayPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  return <EssayView lang="en" slug={slug} />;
}
