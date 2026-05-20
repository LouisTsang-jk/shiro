import { MotionLink as Link } from "./motion-link";

type NavLabelProps = {
  label: string;
  href: string;
  active: boolean;
};

export function NavLabel({ label, href, active }: NavLabelProps) {
  return (
    <Link
      href={href}
      className="t-label"
      style={{
        color: active ? "var(--ink)" : "var(--ink-3)",
        transition: "color 0.25s ease",
      }}
    >
      {label}
    </Link>
  );
}
