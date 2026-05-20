import { MotionLink as Link } from "./motion-link";
import type { Essay } from "@/lib/content";
import { formatDateDotted, isoDate } from "@/lib/format";

type IndexListProps = {
  essays: Essay[];
};

export function IndexList({ essays }: IndexListProps) {
  if (essays.length === 0) return null;
  return (
    <section>
      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {essays.map((essay, i) => (
          <IndexRow key={essay.slug} essay={essay} last={i === essays.length - 1} />
        ))}
      </ol>
    </section>
  );
}

function IndexRow({ essay, last }: { essay: Essay; last: boolean }) {
  return (
    <li className="row index-row" style={{ borderBottom: last ? "0.5px solid var(--bone)" : "none" }}>
      <Link
        href={`/essays/${essay.slug}`}
        style={{
          display: "grid",
          gridTemplateColumns: "72px 2fr 1.4fr 120px 64px",
          columnGap: 32,
          alignItems: "baseline",
          padding: "32px 24px",
          color: "inherit",
        }}
        className="index-row__inner"
      >
        <div
          className="t-num"
          style={{
            alignSelf: "start",
            paddingTop: 8,
            viewTransitionName: `essay-n-${essay.slug}`,
          }}
        >
          № {essay.n}
        </div>

        <div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 400,
              fontSize: 28,
              lineHeight: 1.2,
              letterSpacing: "0.005em",
              color: "var(--ink)",
              viewTransitionName: `essay-title-${essay.slug}`,
            }}
          >
            {essay.title}
          </div>
        </div>

        <div
          className="index-row__excerpt"
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--ink-3)",
            letterSpacing: "0.005em",
            maxWidth: 360,
          }}
        >
          {essay.excerpt}
        </div>

        <div className="index-row__date" style={{ textAlign: "right" }}>
          <time className="t-meta" dateTime={isoDate(essay.date)}>
            {formatDateDotted(essay.date)}
          </time>
        </div>

        <div style={{ textAlign: "right", alignSelf: "start", paddingTop: 10 }}>
          <span className="reveal-arrow" aria-hidden="true">
            →
          </span>
        </div>
      </Link>
    </li>
  );
}
