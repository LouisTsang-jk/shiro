import type { Metadata } from "next";
import { MotionLink as Link } from "@/components/motion-link";
import { Frame } from "@/components/frame";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <Frame>
      <Header pathname="/__404" />

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
          Nothing here.
        </h1>

        <div style={{ marginTop: 48 }}>
          <Link href="/" className="t-label">
            ↑ Return home
          </Link>
        </div>
      </section>

      <Footer />
    </Frame>
  );
}
