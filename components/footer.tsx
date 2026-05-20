import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer
      className="footer-grid"
      style={{
        marginTop: 160,
        paddingTop: 32,
        borderTop: "0.5px solid var(--bone)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 32,
      }}
    >
      <div>
        <div className="t-label">{site.author.name}</div>
      </div>
      <div style={{ justifySelf: "center", textAlign: "center" }}>
        <a
          href={`mailto:${site.author.email}`}
          className="t-label"
          style={{ display: "inline-block" }}
        >
          {site.author.email}
        </a>
      </div>
      <div style={{ justifySelf: "end", textAlign: "right" }}>
        <a
          href={site.author.github}
          target="_blank"
          rel="noopener noreferrer"
          className="t-label"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
