"use client";

import { useEffect, useRef, useState } from "react";
import { DE, GB, IT } from "country-flag-icons/react/3x2";

/** The flag components carry their own props type, so mirror it here. */
type FlagComponent = typeof GB;
import { LANG_OPTIONS } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

const FLAG_BY_LANG: Record<Lang, FlagComponent> = {
  en: GB,
  de: DE,
  it: IT,
};

/**
 * Switches locale while staying on the current page: only the leading segment
 * of the path changes.
 */
export default function LangMenu({ lang, path }: { lang: Lang; path: string }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocument(event: MouseEvent) {
      if (!wrap.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocument);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocument);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LANG_OPTIONS.find((l) => l.key === lang) ?? LANG_OPTIONS[0];
  const CurrentFlag = FLAG_BY_LANG[current.key];

  return (
    <div style={{ position: "relative" }} ref={wrap}>
      <button
        className="langBtn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Language: ${current.name}`}
      >
        <span className="langFlag" aria-hidden="true">
          <CurrentFlag title={current.name} />
        </span>
        <span className="langCode">{current.code}</span>
        <span aria-hidden="true" style={{ fontSize: 9, color: "var(--mu)" }}>
          ▾
        </span>
      </button>
      {open && (
        <ul className="langMenu">
          {LANG_OPTIONS.map((l) => {
            const Flag = FLAG_BY_LANG[l.key];
            return (
              <li key={l.key}>
                <a
                  className="langItem"
                  href={`/${l.key}${path}`}
                  aria-current={l.key === lang ? "true" : undefined}
                >
                  <span className="langLabel">
                    <span className="langFlag" aria-hidden="true">
                      <Flag title={l.name} />
                    </span>
                    {l.name}
                  </span>
                  <span>{l.code}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
