import { MotionLink as Link } from "./motion-link";

type Direction = "essay" | "note";

type Neighbor = {
  href: string;
  label: string;
};

type ArticlePaginationProps = {
  prev: Neighbor | null;
  next: Neighbor | null;
  prevKicker: string;
  nextKicker: string;
  homeLabel: string;
  homeHref: string;
  direction: Direction;
};

export function ArticlePagination({
  prev,
  next,
  prevKicker,
  nextKicker,
  homeLabel,
  homeHref,
  direction,
}: ArticlePaginationProps) {
  const labelStyle = direction === "essay"
    ? {
        fontFamily: "var(--font-display)",
        fontStyle: "italic" as const,
        fontWeight: 300,
        fontSize: 18,
        color: "var(--ink)",
        letterSpacing: "0.005em",
        lineHeight: 1.3,
      }
    : {
        fontFamily: "var(--font-body)",
        fontStyle: "italic" as const,
        fontSize: 14,
        color: "var(--ink-2)",
        letterSpacing: "0.005em",
        lineHeight: 1.45,
      };

  return (
    <nav
      style={{
        marginTop: direction === "essay" ? 96 : 160,
        paddingTop: 32,
        borderTop: "0.5px solid var(--bone)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 32,
        alignItems: "start",
      }}
    >
      <div style={{ textAlign: "left", opacity: prev ? 1 : 0.3 }}>
        {prev ? (
          <Link href={prev.href} style={{ display: "block", color: "inherit" }}>
            <div className="t-label">← {prevKicker}</div>
            <div style={{ marginTop: 12, ...labelStyle }}>{prev.label}</div>
          </Link>
        ) : (
          <div className="t-label">← {prevKicker}</div>
        )}
      </div>

      <div style={{ textAlign: "center" }}>
        <Link href={homeHref} style={{ display: "block", color: "inherit" }}>
          <div className="t-label">{homeLabel}</div>
        </Link>
      </div>

      <div style={{ textAlign: "right", opacity: next ? 1 : 0.3 }}>
        {next ? (
          <Link href={next.href} style={{ display: "block", color: "inherit" }}>
            <div className="t-label">{nextKicker} →</div>
            <div style={{ marginTop: 12, ...labelStyle }}>{next.label}</div>
          </Link>
        ) : (
          <div className="t-label">{nextKicker} →</div>
        )}
      </div>
    </nav>
  );
}
