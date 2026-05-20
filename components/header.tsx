import { MotionLink as Link } from "./motion-link";
import { site, navItems } from "@/lib/site";
import { NavLabel } from "./nav-label";

type HeaderProps = {
  pathname: string;
};

function isActive(pathname: string, match: readonly string[]): boolean {
  return match.some((m) => {
    if (m === "/") return pathname === "/";
    return pathname === m || pathname.startsWith(`${m}/`);
  });
}

export function Header({ pathname }: HeaderProps) {
  return (
    <header
      className="header-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "baseline",
        paddingBottom: 56,
        borderBottom: "0.5px solid var(--bone)",
        marginBottom: 80,
      }}
    >
      <div />

      <Link
        href="/"
        className="header-grid__masthead"
        style={{ textAlign: "center", display: "block" }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 26,
            letterSpacing: "0.02em",
            color: "var(--ink)",
            lineHeight: 1,
          }}
        >
          {site.name}
        </div>
      </Link>

      <nav style={{ justifySelf: "end", display: "flex", gap: 28 }}>
        {navItems.map((item) => (
          <NavLabel
            key={item.href}
            label={item.label}
            href={item.href}
            active={isActive(pathname, item.match)}
          />
        ))}
      </nav>
    </header>
  );
}
