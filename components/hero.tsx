import { site } from "@/lib/site";

const SIZE = 420;
const CENTER = SIZE / 2;
const RADIUS = 160;
const REPEATS = 10;

export function Hero() {
  const word = `${site.heroWord} · `;
  const text = word.repeat(REPEATS);
  const circumference = 2 * Math.PI * RADIUS;
  const pathD =
    `M ${CENTER},${CENTER - RADIUS} ` +
    `a ${RADIUS},${RADIUS} 0 1,1 0,${RADIUS * 2} ` +
    `a ${RADIUS},${RADIUS} 0 1,1 0,-${RADIUS * 2}`;

  return (
    <section
      className="hero"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px 0 56px",
        minHeight: 420,
      }}
      aria-label={site.heroWord}
    >
      <h1 className="sr-only">{site.name} — Essays and Notes</h1>
      <svg
        className="hero__loop"
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-hidden="true"
      >
        <defs>
          <path id="hero-loop-path" d={pathD} fill="none" />
        </defs>
        <text
          fill="var(--ink)"
          fontFamily="var(--font-display)"
          fontStyle="italic"
          fontWeight={300}
          fontSize={48}
          dominantBaseline="middle"
        >
          <textPath
            href="#hero-loop-path"
            startOffset={0}
            textLength={circumference}
            lengthAdjust="spacing"
          >
            {text}
          </textPath>
        </text>
      </svg>
    </section>
  );
}
