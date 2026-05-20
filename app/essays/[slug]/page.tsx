import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Frame } from "@/components/frame";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Seal } from "@/components/seal";
import { EndMark } from "@/components/end-mark";
import { MDXContent } from "@/components/mdx";
import { ArticlePagination } from "@/components/article-pagination";
import { getAllEssays, getEssay } from "@/lib/content";
import { essayMetadata, essayJsonLd } from "@/lib/seo";
import { formatDateDotted, isoDate } from "@/lib/format";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const essays = await getAllEssays();
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) return {};
  return essayMetadata(essay);
}

export default async function EssayPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const essay = await getEssay(slug);
  if (!essay) notFound();

  const all = await getAllEssays();
  const idx = all.findIndex((e) => e.slug === essay.slug);
  // Reverse-chronological list: `prev` is the more recent essay (idx - 1),
  // `next` is the older one (idx + 1). Reading order follows the archive.
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <Frame>
      <Header pathname={`/essays/${essay.slug}`} />

      <article
        style={{ maxWidth: 680, margin: "0 auto", paddingTop: 24 }}
      >
        <div style={{ textAlign: "center", paddingBottom: 64 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span
              className="t-num"
              style={{ viewTransitionName: `essay-n-${essay.slug}` }}
            >
              № {essay.n}
            </span>
            <span style={{ width: 32, height: "0.5px", background: "var(--ink-4)" }} />
            <time className="t-meta" dateTime={isoDate(essay.date)}>
              {formatDateDotted(essay.date)}
            </time>
            <span style={{ width: 32, height: "0.5px", background: "var(--ink-4)" }} />
            <span className="t-meta">{essay.read}</span>
          </div>

          <h1
            className="reading-title"
            style={{
              margin: "48px 0 0",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 52,
              lineHeight: 1.18,
              letterSpacing: "0.005em",
              color: "var(--ink)",
              viewTransitionName: `essay-title-${essay.slug}`,
            }}
          >
            {essay.title}
          </h1>
        </div>

        <div style={{ margin: "0 auto 48px" }}>
          <Seal size={6} />
        </div>

        <div className="prose">
          <MDXContent source={essay.body} />
          <EndMark />
        </div>

        <ArticlePagination
          prev={prev ? { slug: `/essays/${prev.slug}`, label: prev.title } : null}
          next={next ? { slug: `/essays/${next.slug}`, label: next.title } : null}
          homeLabel="↑ Return to index"
          homeHref="/"
          direction="essay"
        />
      </article>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(essayJsonLd(essay)) }}
      />
    </Frame>
  );
}
