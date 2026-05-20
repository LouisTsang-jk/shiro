"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  type ComponentProps,
  type MouseEvent,
} from "react";

type LinkProps = ComponentProps<typeof Link>;

type Pending = { resolve: () => void; target: string };

// One in-flight navigation at a time. Module-level so a second click can
// supersede the previous one cleanly without leaking promises.
let pending: Pending | null = null;

function resolvePending() {
  if (!pending) return;
  const p = pending;
  pending = null;
  p.resolve();
}

function isModifiedClick(e: MouseEvent<HTMLAnchorElement>): boolean {
  return (
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  );
}

function isExternalHref(href: LinkProps["href"]): boolean {
  if (typeof href !== "string") return false;
  return (
    /^[a-z][a-z0-9+.-]*:\/\//i.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

function pathnameOf(href: string): string {
  return href.split("?")[0]!.split("#")[0]!;
}

type StartVT = (cb: () => unknown) => unknown;

function getStartViewTransition(): StartVT | null {
  if (typeof document === "undefined") return null;
  const fn = (document as Document & { startViewTransition?: StartVT })
    .startViewTransition;
  return typeof fn === "function" ? fn.bind(document) : null;
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

function runTransition(target: string, navigate?: () => void): boolean {
  const startVT = getStartViewTransition();
  if (!startVT || prefersReducedMotion()) {
    navigate?.();
    return false;
  }
  startVT(
    () =>
      new Promise<void>((resolve) => {
        resolvePending();
        pending = { resolve, target };
        navigate?.();
        window.setTimeout(() => {
          if (pending?.resolve === resolve) resolvePending();
        }, 600);
      }),
  );
  return true;
}

export function MotionLink({
  href,
  onClick,
  replace,
  scroll,
  ...rest
}: LinkProps) {
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (isModifiedClick(e)) return;
    if (rest.target && rest.target !== "_self") return;
    if (isExternalHref(href)) return;
    if (typeof href !== "string") return;

    if (!getStartViewTransition() || prefersReducedMotion()) return;

    e.preventDefault();

    runTransition(pathnameOf(href), () => {
      if (replace) router.replace(href, { scroll });
      else router.push(href, { scroll });
    });
  }

  return (
    <Link
      {...rest}
      href={href}
      replace={replace}
      scroll={scroll}
      onClick={handleClick}
    />
  );
}

export function MotionPathnameWatcher() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pending || pathname !== pending.target) return;
    // Wait one frame so the previous page has fully unmounted before
    // the browser snapshots the new DOM — avoids name collisions.
    const raf = requestAnimationFrame(resolvePending);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // Back/forward (popstate) doesn't go through MotionLink, so wrap it here.
  // At popstate time the URL is already updated but React hasn't committed
  // the new page — so capture wraps the old DOM, and the effect above
  // resolves once `usePathname()` catches up.
  useEffect(() => {
    function handlePopstate() {
      runTransition(window.location.pathname);
    }
    window.addEventListener("popstate", handlePopstate);
    return () => window.removeEventListener("popstate", handlePopstate);
  }, []);

  return null;
}
