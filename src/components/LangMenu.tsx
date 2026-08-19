"use client";

import { useEffect, useRef, useState } from "react";
import { LANG_OPTIONS } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

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

  return (
    <div style={{ position: "relative" }} ref={wrap}>
      <button
        className="langBtn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Language: ${current.name}`}
      >
        <span aria-hidden="true" style={{ fontSize: 13 }}>
          ◍
        </span>
        <span className="langCode">{current.code}</span>
        <span aria-hidden="true" style={{ fontSize: 9, color: "var(--mu)" }}>
          ▾
        </span>
      </button>
      {open && (
        <ul className="langMenu">
          {LANG_OPTIONS.map((l) => (
            <li key={l.key}>
              <a
                className="langItem"
                href={`/${l.key}${path}`}
                aria-current={l.key === lang ? "true" : undefined}
              >
                {l.name}
                <span>{l.code}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
