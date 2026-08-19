"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS, type Category, type Project, type Translation } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

const FILTERS = ["all", "personal", "professional"] as const;

type Filter = (typeof FILTERS)[number];

/** Degrees between neighbouring cards, and how far the arc lifts per degree. */
const STEP_DEG = 7;
const ARC_PX_PER_DEG = 2.2;

/**
 * Projects as a fanned hand of cards: hover lifts and straightens one, click
 * opens its details.
 *
 * The fan is a pointer-first idea, so below 900px the CSS collapses it back
 * into a plain responsive grid — six overlapping 230px cards cannot fit a
 * phone, and a horizontally scrolling fan would be worse than no fan.
 */
export default function ProjectFan({
  lang,
  t,
}: {
  lang: Lang;
  t: Pick<Translation, "filters" | "work">;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [liftedId, setLiftedId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => PROJECTS.filter((p) => filter === "all" || p.cat === (filter as Category)),
    [filter],
  );

  /** Momento sits in the middle slot of the fan whatever the filter shows. */
  const fan = useMemo(() => {
    const ordered = [...filtered];
    const momento = ordered.findIndex((p) => p.id === "momento");
    if (momento > -1) {
      const [card] = ordered.splice(momento, 1);
      ordered.splice(Math.floor(ordered.length / 2), 0, card);
    }
    return ordered;
  }, [filtered]);

  const open = openId ? (filtered.find((p) => p.id === openId) ?? null) : null;

  return (
    <>
      <div className="filters" role="group" aria-label={t.work.pageTitle}>
        {FILTERS.map((f) => (
          <button
            className="filter"
            key={f}
            aria-pressed={filter === f}
            onClick={() => {
              setFilter(f);
              setLiftedId(null);
            }}
          >
            {t.filters[f]}
          </button>
        ))}
      </div>

      <div className="fanWrap" key={filter}>
        <div className="fan">
          {fan.map((p, i) => {
            const rot = (i - (fan.length - 1) / 2) * STEP_DEG;
            const lifted = liftedId === p.id;
            return (
              <button
                className="fanCard"
                key={p.id}
                style={{
                  transform: `rotate(${lifted ? 0 : rot}deg) translateY(${
                    lifted ? -34 : Math.abs(rot) * ARC_PX_PER_DEG
                  }px) scale(${lifted ? 1.05 : 1})`,
                  zIndex: lifted ? 40 : i,
                }}
                onMouseEnter={() => setLiftedId(p.id)}
                onMouseLeave={() => setLiftedId((id) => (id === p.id ? null : id))}
                onFocus={() => setLiftedId(p.id)}
                onBlur={() => setLiftedId((id) => (id === p.id ? null : id))}
                onClick={() => setOpenId(p.id)}
              >
                <span className="fanCardInner">
                  <span className="fanShot">
                    <img src={`/assets/images/${p.shot}`} alt="" loading="lazy" />
                  </span>
                  <span className="fanBody">
                    <span className="fanCat">{t.filters[p.cat]}</span>
                    <span className="fanName">{p.name}</span>
                    <span className="fanPeriod">{p.period[lang]}</span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="fanHint">{t.work.fanHint}</p>

      {open && (
        <ProjectModal
          project={open}
          lang={lang}
          t={t}
          onClose={() => {
            setOpenId(null);
            setLiftedId(null);
          }}
        />
      )}
    </>
  );
}

function ProjectModal({
  project,
  lang,
  t,
  onClose,
}: {
  project: Project;
  lang: Lang;
  t: Pick<Translation, "filters" | "work">;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `project-${project.id}`;

  useEffect(() => {
    // Give the dialog the focus, and hand it back to the page on close.
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="scrim" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modalShot">
          <img src={`/assets/images/${project.shot}`} alt="" />
          <button className="modalClose" onClick={onClose} aria-label="Close" ref={closeRef}>
            <span aria-hidden="true">✕</span>
          </button>
        </div>
        <div className="modalBody">
          <div className="cardMeta">
            <span className="cardCat">{t.filters[project.cat]}</span>
            <span className="cardPeriod">{project.period[lang]}</span>
          </div>
          <h3 className="modalTitle" id={titleId}>
            {project.name}
          </h3>
          <p className="modalDesc">{project.desc[lang]}</p>
          <div className="modalTags">
            {project.tags.map((tag) => (
              <span className="modalTag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          {project.url && (
            <a className="btn btnPrimary modalVisit" href={project.url} target="_blank" rel="noreferrer">
              {t.work.visit}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
