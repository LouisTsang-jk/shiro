import type { Metadata } from "next";
import Link from "next/link";
import { Frame } from "@/components/frame";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Seal } from "@/components/seal";
import { EndMark } from "@/components/end-mark";
import { MDXContent } from "@/components/mdx";
import { getImagineSuite } from "@/lib/imagine-suite";
import { buildMetadata, buildTitle } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: buildTitle(["Imagine — Visual Creation Suite"]),
  description:
    "The design specification Anthropic injects into Claude's context whenever the model is about to produce a visual reply. Companion archive to Essay 002, When a reply is an interface.",
  path: "/imagine-suite",
  type: "article",
});

function stripModuleNumber(title: string): string {
  return title.replace(/^\d+\s*—\s*/, "");
}

function moduleNumber(slug: string): string {
  const match = slug.match(/^\d+/);
  return match ? match[0] : "—";
}

export default async function ImagineSuitePage() {
  const chapters = await getImagineSuite();

  return (
    <Frame>
      <Header path="/imagine-suite" lang="en" locales={["en"]} />

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
            <span className="t-label">Companion archive</span>
            <span style={{ width: 32, height: "0.5px", background: "var(--ink-4)" }} />
            <Link href="/essays/when-a-reply-is-an-interface" className="quiet-link">
              <span className="t-meta">Essay № 002</span>
            </Link>
          </div>

          <h1
            style={{
              margin: "40px 0 0",
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 44,
              lineHeight: 1.18,
              letterSpacing: "0.005em",
              color: "var(--ink)",
            }}
          >
            Imagine — Visual Creation Suite
          </h1>
        </div>

        <div style={{ margin: "0 auto 48px" }}>
          <Seal size={6} />
        </div>

        <div className="prose">
          <p>
            What follows is the specification Anthropic injects into Claude&rsquo;s
            context whenever the model is about to produce a visual reply in chat —
            the document the model calls <code>read_me</code> to retrieve before it
            writes any HTML or SVG. Internally it is named <em>Imagine — Visual
            Creation Suite</em>. The spec is structured as a core layer shared
            across five modules (<em>diagram</em>, <em>mockup</em>,{" "}
            <em>interactive</em>, <em>chart</em>, <em>art</em>), loaded à la carte
            by the model&rsquo;s pick.
          </p>
          <p>
            The text is preserved verbatim, including the author&rsquo;s working
            annotations where they appear. It is reproduced here because{" "}
            <Link href="/essays/when-a-reply-is-an-interface" className="quiet-link">
              Essay 002
            </Link>{" "}
            argues that consistency in a streaming, single-pass medium cannot be
            enforced by a framework — only narrated in advance, through the prompt.
            This is that prompt.
          </p>
        </div>

        {chapters.map((chapter, i) => (
          <section
            key={chapter.slug}
            style={{
              paddingTop: i === 0 ? 96 : 128,
              borderTop:
                i === 0 ? "0.5px solid var(--bone)" : undefined,
              marginTop: i === 0 ? 64 : 0,
            }}
          >
            <header style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                <span className="t-num">№ {moduleNumber(chapter.slug)}</span>
                <span style={{ flex: 1, height: "0.5px", background: "var(--ink-4)" }} />
                <span className="t-label">Module</span>
              </div>
              <h2
                style={{
                  margin: "16px 0 0",
                  fontFamily: "var(--font-display)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  fontSize: 36,
                  lineHeight: 1.2,
                  letterSpacing: "0.005em",
                  color: "var(--ink)",
                }}
              >
                {stripModuleNumber(chapter.title)}
              </h2>
            </header>
            <div className="prose">
              <MDXContent source={chapter.body} />
            </div>
          </section>
        ))}

        <div style={{ paddingTop: 96 }}>
          <div className="prose">
            <EndMark />
            <p style={{ textAlign: "center", marginTop: 48 }}>
              <Link href="/essays/when-a-reply-is-an-interface" className="quiet-link">
                ↑ Return to Essay 002
              </Link>
            </p>
          </div>
        </div>
      </article>

      <Footer />
    </Frame>
  );
}
