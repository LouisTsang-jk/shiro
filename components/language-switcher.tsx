import { MotionLink as Link } from "./motion-link";
import { LOCALES, LOCALE_LABEL, localizedPath, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  /** Canonical (English) path of the current page. */
  path: string;
  lang: Locale;
  /** Locales in which this page exists; others are hidden to avoid dead links. */
  locales: Locale[];
};

export function LanguageSwitcher({ path, lang, locales }: LanguageSwitcherProps) {
  const shown = LOCALES.filter((l) => l === lang || locales.includes(l));

  return (
    <nav
      aria-label="Language"
      style={{ display: "flex", alignItems: "baseline", gap: 8 }}
    >
      {shown.map((loc, i) => (
        <span
          key={loc}
          style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}
        >
          {i > 0 && (
            <span aria-hidden="true" className="t-label" style={{ color: "var(--ink-4)" }}>
              ·
            </span>
          )}
          {loc === lang ? (
            <span className="t-label" style={{ color: "var(--ink)" }} aria-current="true">
              {LOCALE_LABEL[loc]}
            </span>
          ) : (
            <Link
              href={localizedPath(loc, path)}
              className="t-label"
              style={{ color: "var(--ink-3)", transition: "color 0.25s ease" }}
            >
              {LOCALE_LABEL[loc]}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
