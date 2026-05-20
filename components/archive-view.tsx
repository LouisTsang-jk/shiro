import { MotionLink as Link } from "./motion-link";
import type { Essay } from "@/lib/content";
import { groupEssaysByYear } from "@/lib/content";
import { formatDateDotted, isoDate } from "@/lib/format";

type ArchiveViewProps = {
  essays: Essay[];
};

export function ArchiveView({ essays }: ArchiveViewProps) {
  const years = groupEssaysByYear(essays);

  return (
    <>
      <header style={{ padding: "24px 0 80px" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 64,
            lineHeight: 1,
            letterSpacing: "0.005em",
            color: "var(--ink)",
          }}
        >
          Essays
        </h1>
      </header>
      {years.map(({ year, entries }) => (
        <ArchiveYear key={year} year={year} entries={entries} />
      ))}
    </>
  );
}

function ArchiveYear({ year, entries }: { year: string; entries: Essay[] }) {
  return (
    <section style={{ marginBottom: 80 }}>
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "baseline",
          gap: 40,
          paddingBottom: 32,
        }}
      >
        <h2
          className="archive-year"
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 96,
            lineHeight: 1,
            letterSpacing: "-0.01em",
            color: "var(--ink)",
          }}
        >
          {year}
        </h2>
        <span
          style={{
            height: "0.5px",
            background: "var(--bone)",
            alignSelf: "baseline",
            marginBottom: 24,
          }}
        />
        <span className="t-meta">
          {String(entries.length).padStart(2, "0")}
        </span>
      </header>

      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {entries.map((essay, i) => (
          <ArchiveRow key={essay.slug} essay={essay} last={i === entries.length - 1} />
        ))}
      </ol>
    </section>
  );
}

function ArchiveRow({ essay, last }: { essay: Essay; last: boolean }) {
  return (
    <li className="row archive-row" style={{ borderBottom: last ? "0.5px solid var(--bone)" : "none" }}>
      <Link
        href={`/essays/${essay.slug}`}
        style={{
          display: "grid",
          gridTemplateColumns: "72px 1fr 100px 40px",
          columnGap: 32,
          alignItems: "baseline",
          padding: "20px 0",
          color: "inherit",
        }}
      >
        <div
          className="t-num"
          style={{
            alignSelf: "start",
            paddingTop: 6,
            viewTransitionName: `essay-n-${essay.slug}`,
          }}
        >
          № {essay.n}
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 22,
            lineHeight: 1.25,
            letterSpacing: "0.005em",
            color: "var(--ink)",
            viewTransitionName: `essay-title-${essay.slug}`,
          }}
        >
          {essay.title}
        </div>
        <div className="archive-row__date" style={{ textAlign: "right" }}>
          <time className="t-meta" dateTime={isoDate(essay.date)}>
            {formatDateDotted(essay.date)}
          </time>
        </div>
        <div style={{ textAlign: "right" }}>
          <span className="reveal-arrow" aria-hidden="true">
            →
          </span>
        </div>
      </Link>
    </li>
  );
}
