"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Fades elements marked with [data-reveal] in as they enter the viewport. The
 * styles live in globals.css; this only flips the class.
 *
 * This lives in the persistent layout, so it re-arms on every navigation —
 * otherwise the next page's marked elements would stay stuck at opacity 0.
 */
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"),
    );
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    targets.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 5) * 80}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
