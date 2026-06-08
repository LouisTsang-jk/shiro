import { notFound } from "next/navigation";
import { MotionLink as Link } from "./motion-link";
import { Frame } from "./frame";
import { Header } from "./header";
import { Footer } from "./footer";
import { Hero } from "./hero";
import { Seal } from "./seal";
import { EndMark } from "./end-mark";
import { MDXContent } from "./mdx";
import { IndexList } from "./index-list";
import { ArchiveView } from "./archive-view";
import { NotesIndex } from "./notes-index";
import { ArticlePagination } from "./article-pagination";
import {
  getAllEssays,
  getAllNotes,
  getEssay,
  getNote,
  essayLocales,
  noteLocales,
} from "@/lib/content";
import { essayJsonLd, noteJsonLd } from "@/lib/seo";
import { formatDateDotted, isoDate } from "@/lib/format";
import { localizedPath, t, type Locale } from "@/lib/i18n";

const HAIRLINE = { width: 32, height: "0.5px", background: "var(--ink-4)" } as const;

function firstSentence(text: string): string {
  const trimmed = text.trim();
  const match = trimmed.match(/^[^.!?。！？]*[.!?。！？]/);
  return (match?.[0] ?? trimmed).trim();
}

export async function HomeView({ lang }: { lang: Locale }) {
  const essays = await getAllEssays(lang);
  return (
    <Frame>
      <Header path="/" lang={lang} />
      <IndexList essays={essays} lang={lang} />
      <Hero lang={lang} />
      <Footer />
    </Frame>
  );
}

export async function ArchivePageView({ lang }: { lang: Locale }) {
  const essays = await getAllEssays(lang);
  return (
    <Frame>
      <Header path="/archive" lang={lang} />
      <ArchiveView essays={essays} lang={lang} />
      <Footer />
    </Frame>
  );
}

export async function NotesView({ lang }: { lang: Locale }) {
  const notes = await getAllNotes(lang);
  return (
    <Frame>
      <Header path="/notes" lang={lang} />
      <NotesIndex notes={notes} lang={lang} />
      <Footer />
    </Frame>
  );
}

export async function EssayView({ lang, slug }: { lang: Locale; slug: string }) {
  const essay = await getEssay(slug, lang);
  if (!essay) notFound();

  const all = await getAllEssays(lang);
  const idx = all.findIndex((e) => e.slug === essay.slug);
  // Reverse-chronological list: `prev` is the more recent essay (idx - 1),
  // `next` is the older one (idx + 1). Reading order follows the archive.
  const prev = idx > 0 ? all[idx - 1]! : null;
  const next = idx < all.length - 1 ? all[idx + 1]! : null;
  const locales = await essayLocales(slug);
  const dict = t(lang);

  return (
    <Frame>
      <Header path={`/essays/${essay.slug}`} lang={lang} locales={locales} />

      <article style={{ maxWidth: 680, margin: "0 auto", paddingTop: 24 }}>
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
            <span className="t-num" style={{ viewTransitionName: `essay-n-${essay.slug}` }}>
              № {essay.n}
            </span>
            <span style={HAIRLINE} />
            <time className="t-meta" dateTime={isoDate(essay.date)}>
              {formatDateDotted(essay.date)}
            </time>
            <span style={HAIRLINE} />
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
          prev={prev ? { href: localizedPath(lang, `/essays/${prev.slug}`), label: prev.title } : null}
          next={next ? { href: localizedPath(lang, `/essays/${next.slug}`), label: next.title } : null}
          prevKicker={dict.essay.prev}
          nextKicker={dict.essay.next}
          homeLabel={dict.essay.index}
          homeHref={localizedPath(lang, "/")}
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

export async function NoteView({ lang, slug }: { lang: Locale; slug: string }) {
  const note = await getNote(slug, lang);
  if (!note) notFound();

  const all = await getAllNotes(lang);
  const idx = all.findIndex((n) => n.slug === note.slug);
  const prev = idx > 0 ? all[idx - 1]! : null;
  const next = idx < all.length - 1 ? all[idx + 1]! : null;
  const locales = await noteLocales(slug);
  const dict = t(lang);

  return (
    <Frame>
      <Header path={`/notes/${note.slug}`} lang={lang} locales={locales} />

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
            <span className="t-num" style={{ viewTransitionName: `note-n-${note.slug}` }}>
              № {note.n}
            </span>
            <span style={HAIRLINE} />
            <time className="t-meta" dateTime={isoDate(note.date)}>
              {formatDateDotted(note.date)}
            </time>
            <span style={HAIRLINE} />
            <span className="t-label">{dict.noteTag[note.tag]}</span>
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
          prev={prev ? { href: localizedPath(lang, `/notes/${prev.slug}`), label: firstSentence(prev.body) } : null}
          next={next ? { href: localizedPath(lang, `/notes/${next.slug}`), label: firstSentence(next.body) } : null}
          prevKicker={dict.note.prev}
          nextKicker={dict.note.next}
          homeLabel={dict.note.index}
          homeHref={localizedPath(lang, "/notes")}
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

export function NotFoundView({ lang }: { lang: Locale }) {
  const dict = t(lang);
  return (
    <Frame>
      <Header path="/__404" lang={lang} />

      <section
        style={{
          maxWidth: 680,
          margin: "0 auto",
          paddingTop: 96,
          textAlign: "center",
        }}
      >
        <div className="t-label">404</div>
        <h1
          style={{
            margin: "32px 0 0",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 56,
            lineHeight: 1.18,
            letterSpacing: "0.005em",
            color: "var(--ink)",
          }}
        >
          {dict.notFound.title}
        </h1>

        <div style={{ marginTop: 48 }}>
          <Link href={localizedPath(lang, "/")} className="t-label">
            {dict.notFound.home}
          </Link>
        </div>
      </section>

      <Footer />
    </Frame>
  );
}
