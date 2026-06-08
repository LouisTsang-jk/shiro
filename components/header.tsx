import { MotionLink as Link } from "./motion-link";
import { site, navItems } from "@/lib/site";
import { NavLabel } from "./nav-label";
import { LanguageSwitcher } from "./language-switcher";
import { LOCALES, localizedPath, t, type Locale } from "@/lib/i18n";

type HeaderProps = {
  /** Canonical (English) path of the current page — used for active state. */
  path: string;
  lang: Locale;
  /** Locales in which this page exists; defaults to all. */
  locales?: Locale[];
};

function isActive(path: string, match: readonly string[]): boolean {
  return match.some((m) => {
    if (m === "/") return path === "/";
    return path === m || path.startsWith(`${m}/`);
  });
}

export function Header({ path, lang, locales = [...LOCALES] }: HeaderProps) {
  const dict = t(lang);

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
      <div style={{ justifySelf: "start" }}>
        <LanguageSwitcher path={path} lang={lang} locales={locales} />
      </div>

      <Link
        href={localizedPath(lang, "/")}
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
            key={item.key}
            label={dict.nav[item.key]}
            href={localizedPath(lang, item.href)}
            active={isActive(path, item.match)}
          />
        ))}
      </nav>
    </header>
  );
}
