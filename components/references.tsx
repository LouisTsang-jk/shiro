import type { ReactNode } from "react";

export function References({ children }: { children: ReactNode }) {
  return (
    <section className="references">
      <p className="references__label">References</p>
      <ol className="references__list">{children}</ol>
    </section>
  );
}

export function Reference({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <li className="references__item">
      <a
        href={href}
        className="references__link"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </li>
  );
}
