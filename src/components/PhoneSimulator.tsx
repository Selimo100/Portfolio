"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { PROJECTS, type Project, type Translation } from "@/lib/content";
import { href, type Lang } from "@/lib/i18n";

type Copy = Pick<Translation, "phone" | "filters" | "nav" | "ui">;

type Screen = "lock" | "home";

/** How far (px) a drag has to travel upwards before it counts as a swipe. */
const SWIPE_PX = 36;

/** Matches the `phoneAppOut` animation, so the app unmounts once it has shrunk away. */
const CLOSE_MS = 260;

/**
 * App icons, cut from each project's own artwork (public/assets/images/icons).
 * `pad` insets logos that need breathing room; photos and full icons fill the tile.
 */
const ICONS: Record<string, { src: string; bg: string; pad?: boolean }> = {
  momento: { src: "momento.png", bg: "#e6f0ee" },
  vibra: { src: "vibra.svg", bg: "#101011" },
  homelab: { src: "homelab.png", bg: "#1a222b" },
  yumigo: { src: "yumigo.png", bg: "#ffffff" },
  work: { src: "work.png", bg: "linear-gradient(145deg, #16283a, #0a0e13)", pad: true },
  kaisho: { src: "kaisho.png", bg: "#ffffff", pad: true },
  rummy: { src: "rummy.png", bg: "#4fa587" },
};

const DOCK = ["about", "stack", "karate", "contact"] as const;

/** A project's icon, or a lettered tile in the site accent when it has none yet. */
function AppIcon({ id, name, className = "" }: { id: string; name: string; className?: string }) {
  const icon = ICONS[id];
  return (
    <span
      className={`phoneAppIcon ${className}`}
      style={{ background: icon?.bg ?? "linear-gradient(145deg, #8ecae6, #155570)" }}
      data-pad={icon?.pad ?? false}
      aria-hidden="true"
    >
      {icon ? <img src={`/assets/images/icons/${icon.src}`} alt="" draggable={false} /> : name.charAt(0)}
    </span>
  );
}

function locale(lang: Lang) {
  return lang === "en" ? "en-GB" : `${lang}-CH`;
}

/**
 * A working phone on the home page: a lock screen, a home screen whose apps
 * are the projects, and an app view per project. Swipe up on the bottom bar
 * (or click it, or press Esc) to go home; the side button locks it again.
 *
 * The clock only renders after mount, so the static export never ships a
 * stale build-time time.
 */
export default function PhoneSimulator({ lang, t }: { lang: Lang; t: Copy }) {
  const [screen, setScreen] = useState<Screen>("lock");
  const [openId, setOpenId] = useState<string | null>(null);
  const [closing, setClosing] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [now, setNow] = useState<Date | null>(null);
  const [battery, setBattery] = useState<number | null>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 10_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(id);
    };
  }, []);

  // Chromium exposes the real battery; elsewhere the indicator just reads full.
  useEffect(() => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<{ level: number }> };
    nav.getBattery?.().then((b) => setBattery(Math.round(b.level * 100))).catch(() => {});
  }, []);

  useEffect(() => () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }, []);

  const goHome = useCallback(() => {
    if (!openId || closing) return;
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setOpenId(null);
      setClosing(false);
    }, CLOSE_MS);
  }, [openId, closing]);

  useEffect(() => {
    if (!openId) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") goHome();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, goHome]);

  function openApp(project: Project, from: HTMLElement) {
    const screenBox = screenRef.current?.getBoundingClientRect();
    const icon = from.getBoundingClientRect();
    if (screenBox) {
      // The app grows out of the icon it was opened from.
      const x = icon.left + icon.width / 2 - screenBox.left;
      const y = icon.top + icon.height / 2 - screenBox.top;
      setOrigin(`${x}px ${y}px`);
    }
    setOpenId(project.id);
  }

  function lock() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenId(null);
    setClosing(false);
    setScreen("lock");
  }

  const swipe = useSwipeUp(screen === "lock" ? () => setScreen("home") : goHome);
  const open = openId ? (PROJECTS.find((p) => p.id === openId) ?? null) : null;

  const time = now
    ? new Intl.DateTimeFormat(locale(lang), { hour: "2-digit", minute: "2-digit", hour12: false }).format(now)
    : "";
  const date = now
    ? new Intl.DateTimeFormat(locale(lang), { weekday: "long", day: "numeric", month: "long" }).format(now)
    : "";

  return (
    <div className="phone" role="region" aria-label={t.phone.label}>
      <button type="button" className="phoneSide phoneSidePower" onClick={lock} aria-label={t.phone.lock} />
      <span className="phoneSide phoneSideVolUp" aria-hidden="true" />
      <span className="phoneSide phoneSideVolDown" aria-hidden="true" />

      <div className="phoneScreen" ref={screenRef}>
        <div className="phoneWallpaper" data-blur={screen === "home"} aria-hidden="true" />
        <div className="phoneIsland" aria-hidden="true" />

        <div className="phoneStatus" data-dark={!!open && !closing} aria-hidden="true">
          <span className="phoneStatusTime">{screen === "lock" ? "" : time}</span>
          <span className="phoneStatusIcons">
            <SignalIcon />
            <WifiIcon />
            <span className="phoneBattery" title={battery === null ? undefined : `${battery}%`}>
              <span style={{ width: `${battery ?? 100}%` }} />
            </span>
          </span>
        </div>

        {screen === "lock" ? (
          <div className="phoneLock" {...swipe} onClick={() => setScreen("home")}>
            <p className="phoneLockDate">{date}</p>
            <p className="phoneLockTime">{time}</p>
            <div className="phoneLockNote">
              <AppIcon id="work" name="Selina" className="phoneLockNoteIcon" />
              <span>
                <strong>Selina Mogicato</strong>
                <span>{t.phone.title}</span>
              </span>
            </div>
            <button type="button" className="phoneLockHint">
              {t.phone.unlock}
            </button>
          </div>
        ) : (
          <div className="phoneHome" inert={!!open}>
            <div className="phoneWidget">
              <span className="phoneWidgetDay">{date}</span>
              <span className="phoneWidgetTime">{time}</span>
              <span className="phoneWidgetSub">
                {PROJECTS.length} · {t.phone.widget}
              </span>
            </div>

            <ul className="phoneGrid">
              {PROJECTS.map((p) => (
                <li key={p.id}>
                  <button type="button" className="phoneApp" onClick={(e) => openApp(p, e.currentTarget)}>
                    <AppIcon id={p.id} name={p.name} />
                    <span className="phoneAppName">{p.name.replace(/ (App|Website)$/, "")}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="phoneDock">
              {DOCK.map((page) => (
                <Link key={page} href={href(lang, page)} className="phoneDockApp" aria-label={t.nav[page]}>
                  <span className="phoneAppIcon phoneDockIcon" aria-hidden="true">
                    <DockIcon page={page} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {open && (
          <AppView
            key={open.id}
            project={open}
            lang={lang}
            t={t}
            closing={closing}
            origin={origin}
          />
        )}

        <button
          type="button"
          className="phoneHomeBar"
          data-dark={!!open && !closing}
          aria-label={screen === "lock" ? t.phone.unlock : t.phone.home}
          onClick={screen === "lock" ? () => setScreen("home") : goHome}
          {...swipe}
        >
          <span />
        </button>
      </div>
    </div>
  );
}

function AppView({
  project,
  lang,
  t,
  closing,
  origin,
}: {
  project: Project;
  lang: Lang;
  t: Copy;
  closing: boolean;
  origin: string;
}) {
  const [playing, setPlaying] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div
      className="phoneAppView"
      data-closing={closing}
      style={{ transformOrigin: origin }}
      aria-labelledby={`phone-${project.id}`}
      role="group"
    >
      <div className="phoneAppShot">
        {playing && project.video ? (
          <video src={`/assets/images/${project.video}`} controls autoPlay playsInline />
        ) : (
          <img src={`/assets/images/${project.shot}`} alt="" />
        )}
      </div>
      <div className="phoneAppBody">
        <div className="phoneAppHead">
          <AppIcon id={project.id} name={project.name} className="phoneAppIconSm" />
          <div>
            <h3 className="phoneAppTitle" id={`phone-${project.id}`} ref={titleRef} tabIndex={-1}>
              {project.name}
            </h3>
            <p className="phoneAppMeta">
              {t.filters[project.cat]} · {project.period[lang]}
            </p>
          </div>
        </div>

        <div className="phoneAppActions">
          {project.url && (
            <a className="phoneAppBtn" href={project.url} target="_blank" rel="noreferrer">
              {t.phone.visit}
            </a>
          )}
          {project.video && !playing && (
            <button type="button" className="phoneAppBtn phoneAppBtnGhost" onClick={() => setPlaying(true)}>
              ▶ {t.ui.demo}
            </button>
          )}
        </div>

        <p className="phoneAppDesc">{project.desc[lang]}</p>

        <ul className="phoneAppTags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Pointer handlers that call `onSwipe` when a drag travels far enough upwards.
 * Taps are left to the element's own click handler.
 */
function useSwipeUp(onSwipe: () => void) {
  const start = useRef<number | null>(null);
  return {
    onPointerDown(event: PointerEvent<HTMLElement>) {
      start.current = event.clientY;
    },
    onPointerUp(event: PointerEvent<HTMLElement>) {
      if (start.current !== null && start.current - event.clientY > SWIPE_PX) onSwipe();
      start.current = null;
    },
    onPointerCancel() {
      start.current = null;
    },
  };
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 18 12" width="18" height="12" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 16 12" width="16" height="12" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M1.5 4.2a9.5 9.5 0 0 1 13 0" />
      <path d="M4 7a5.8 5.8 0 0 1 8 0" />
      <circle cx="8" cy="10" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DockIcon({ page }: { page: (typeof DOCK)[number] }) {
  const common = { viewBox: "0 0 24 24", width: "56%", height: "56%", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (page) {
    case "about":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        </svg>
      );
    case "stack":
      return (
        <svg {...common}>
          <path d="M12 3 3 8l9 5 9-5-9-5Z" />
          <path d="m3 13 9 5 9-5" />
        </svg>
      );
    case "karate":
      return (
        <svg {...common}>
          <path d="M4 9h16l-2 3H6L4 9Z" />
          <path d="M10 12l-2 8M14 12l2 8" />
        </svg>
      );
    case "contact":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
  }
}
