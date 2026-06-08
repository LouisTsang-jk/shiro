import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { MotionLink as Link } from "./motion-link";

const FILE = path.join(
  process.cwd(),
  "content",
  "imagine-suite",
  "00-core.md",
);

const extractRulesSection = cache(async (): Promise<string> => {
  const raw = await fs.readFile(FILE, "utf8");
  const lines = raw.split("\n");
  const start = lines.findIndex((l) => l.trim() === "## Rules");
  if (start === -1) return "";
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (/^##\s/.test(lines[i])) {
      end = i;
      break;
    }
  }
  return lines
    .slice(start, end)
    .join("\n")
    .trimEnd();
});

export async function ImagineSpecSource() {
  const block = await extractRulesSection();
  return (
    <figure
      style={{
        margin: "32px 0 12px",
      }}
    >
      <div
        style={{
          maxHeight: 420,
          overflow: "auto",
          background: "var(--paper-2)",
          border: "0.5px solid var(--bone)",
        }}
      >
        <pre
          style={{
            margin: 0,
            padding: "20px 24px",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            lineHeight: 1.65,
            background: "transparent",
            border: 0,
            color: "var(--ink)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          <code>{block}</code>
        </pre>
      </div>
      <figcaption
        style={{
          margin: "12px 0 36px",
          fontStyle: "italic",
          fontSize: 13,
          color: "var(--ink-3)",
          textAlign: "center",
        }}
      >
        Excerpt: the <em>Rules</em> block from <code>00-core</code>. The full
        spec is the{" "}
        <Link href="/imagine-suite" className="quiet-link">
          companion archive
        </Link>
        .
      </figcaption>
    </figure>
  );
}
