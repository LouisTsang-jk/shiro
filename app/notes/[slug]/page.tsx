import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Frame } from "@/components/frame";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Seal } from "@/components/seal";
import { MDXContent } from "@/components/mdx";
import { ArticlePagination } from "@/components/article-pagination";
import { getAllNotes, getNote } from "@/lib/content";
import { noteMetadata, noteJsonLd } from "@/lib/seo";
import { formatDateDotted, isoDate } from "@/lib/format";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const notes = await getAllNotes();
  return notes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) return {};
  return noteMetadata(note);
}

function firstSentence(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^[^.!?]*[.!?]/);
  return (match?.[0] ?? trimmed).trim();
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const note = await getNote(slug);
  if (!note) notFound();

  const all = await getAllNotes();
  const idx = all.findIndex((n) => n.slug === note.slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <Frame>
      <Header pathname={`/notes/${note.slug}`} />

      <article style={{ maxWidth: 680, margin: "0 auto", paddingTop: 64 }}>
        <h1 className="sr-only">{firstSentence(note.body)}</h1>
        <div style={{ textAlign: "center", paddingBottom: 80 }}>
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
              style={{ viewTransitionName: `note-n-${note.slug}` }}
            >
              № {note.n}
            </span>
            <span style={{ width: 32, height: "0.5px", background: "var(--ink-4)" }} />
            <time className="t-meta" dateTime={isoDate(note.date)}>
              {formatDateDotted(note.date)}
            </time>
            <span style={{ width: 32, height: "0.5px", background: "var(--ink-4)" }} />
            <span className="t-label">{note.tag}</span>
          </div>
        </div>

        <div
          style={{
            margin: 0,
            fontFamily: "var(--font-body)",
            fontSize: 24,
            lineHeight: 1.7,
            letterSpacing: "0.005em",
            color: "var(--ink)",
            textAlign: "left",
            hangingPunctuation: "first allow-end",
          }}
        >
          <MDXContent source={note.body} />
        </div>

        <div style={{ margin: "80px auto 0" }}>
          <Seal size={5} />
        </div>

        <ArticlePagination
          prev={
            prev
              ? { slug: `/notes/${prev.slug}`, label: `${firstSentence(prev.body)}` }
              : null
          }
          next={
            next
              ? { slug: `/notes/${next.slug}`, label: `${firstSentence(next.body)}` }
              : null
          }
          homeLabel="↑ All notes"
          homeHref="/notes"
          direction="note"
        />
      </article>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(noteJsonLd(note)) }}
      />
    </Frame>
  );
}
