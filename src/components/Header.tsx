"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LangMenu from "./LangMenu";
import ThemeToggle from "./ThemeToggle";
import { PAGES, pagePath, href, type Lang } from "@/lib/i18n";
import type { Translation } from "@/lib/content";

export default function Header({ lang, nav }: { lang: Lang; nav: Translation["nav"] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? href(lang);

  // Everything after the locale segment, reused by the language switcher so a
  // visitor changing language stays on the page they were reading.
  const rest = pathname.replace(/^\/[a-z]{2}/, "") || "/";

  return (
    <header className="header">
      <div className="headerInner">
        <Link className="brand" href={href(lang)} onClick={() => setOpen(false)}>
          <span className="brandMark" aria-hidden="true">
            <Image src="/assets/images/Logo.png" alt="" width={31} height={31} />
          </span>
          <span className="brandName">Selina Mogicato</span>
        </Link>

        <button
          className="iconBtn navToggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
        >
          <span aria-hidden="true">{open ? "✕" : "☰"}</span>
        </button>

        <nav className="nav" data-open={open} aria-label="Main">
          {PAGES.map((page) => {
            const target = href(lang, pagePath(page));
            return (
              <Link
                key={page}
                className="navLink"
                href={target}
                aria-current={pathname === target ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {nav[page]}
              </Link>
            );
          })}
        </nav>

        <div className="headerTools">
          <ThemeToggle label="Theme" />
          <LangMenu lang={lang} path={rest} />
        </div>
      </div>
    </header>
  );
}
