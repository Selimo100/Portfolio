"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { PROJECTS, type Category, type Project, type Translation } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

const FILTERS = ["all", "personal", "professional"] as const;
const LAYOUTS = ["a", "b", "c", "d"] as const;

type Filter = (typeof FILTERS)[number];
type Layout = (typeof LAYOUTS)[number];

/** Degrees between neighbouring fan cards, and how far the arc lifts per degree. */
const STEP_DEG = 7;
const ARC_PX_PER_DEG = 2.2;

const LAYOUT_KEY = "projects-layout";

type Copy = Pick<Translation, "filters" | "work" | "ui">;

/**
 * The Projects page: four layouts the visitor picks between (cards, list,
 * alternating rows, and the fanned hand), one filter row, one detail modal.
 *
 * Every layout opens the same modal, which is where the live link and the demo
 * video live — so a project is reachable whichever layout is on screen.
 */
export default function ProjectsView({ lang, t }: { lang: Lang; t: Copy }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [layout, setLayout] = useState<Layout>("d");
  const [openId, setOpenId] = useState<string | null>(null);

  // The choice is a preference, so it outlives the visit.
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LAYOUT_KEY);
      if (stored && (LAYOUTS as readonly string[]).includes(stored)) setLayout(stored as Layout);
    } catch {
      /* Private browsing — the default layout stands. */
    }
  }, []);

  function chooseLayout(next: Layout) {
    setLayout(next);
    try {
      localStorage.setItem(LAYOUT_KEY, next);
    } catch {
      /* Not persisting is not worth surfacing. */
    }
  }

  const filtered = useMemo(
    () => PROJECTS.filter((p) => filter === "all" || p.cat === (filter as Category)),
    [filter],
  );

  const open = openId ? (filtered.find((p) => p.id === openId) ?? null) : null;

  return (
    <>
      <div className="layoutPicker">
        <span className="layoutPickerLabel">{t.ui.gridVariant}</span>
        <div className="layoutPickerBtns">
          {LAYOUTS.map((l) => (
            <button
              key={l}
              className="layoutBtn"
              aria-pressed={layout === l}
              aria-label={`${t.ui.gridVariant} ${l.toUpperCase()}`}
              onClick={() => chooseLayout(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="filters" role="group" aria-label={t.work.pageTitle}>
        {FILTERS.map((f) => (
          <button
            className="filter"
            key={f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {t.filters[f]}
          </button>
        ))}
      </div>

      <div key={`${layout}-${filter}`}>
        {layout === "a" && <GridA projects={filtered} lang={lang} t={t} onOpen={setOpenId} />}
        {layout === "b" && <GridB projects={filtered} lang={lang} t={t} onOpen={setOpenId} />}
        {layout === "c" && <GridC projects={filtered} lang={lang} t={t} onOpen={setOpenId} />}
        {layout === "d" && <GridD projects={filtered} lang={lang} t={t} onOpen={setOpenId} />}
      </div>

      {open && (
        <ProjectModal project={open} lang={lang} t={t} onClose={() => setOpenId(null)} />
      )}
    </>
  );
}

type LayoutProps = {
  projects: Project[];
  lang: Lang;
  t: Copy;
  onOpen: (id: string) => void;
};

/** A — the card grid. */
function GridA({ projects, lang, t, onOpen }: LayoutProps) {
  return (
    <div className="cardGrid riseIn">
      {projects.map((p) => (
        <button className="card cardButton" key={p.id} onClick={() => onOpen(p.id)}>
          <span className="cardShot">
            <img src={`/assets/images/${p.shot}`} alt="" loading="lazy" />
          </span>
          <span className="cardBody">
            <span className="cardMeta">
              <span className="cardCat">{t.filters[p.cat]}</span>
              <span className="cardPeriod">{p.period[lang]}</span>
            </span>
            <span className="cardName">{p.name}</span>
            <span className="cardDesc">{p.desc[lang]}</span>
            <span className="tags">
              {p.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

/** B — the dense list. */
function GridB({ projects, lang, t, onOpen }: LayoutProps) {
  return (
    <div className="listView riseIn">
      {projects.map((p, i) => (
        <button className="listRow" key={p.id} onClick={() => onOpen(p.id)}>
          <span className="listNum">{String(i + 1).padStart(2, "0")}</span>
          <span className="listMain">
            <span className="listHead">
              <span className="listName">{p.name}</span>
              <span className="cardCat">{t.filters[p.cat]}</span>
            </span>
            <span className="listDesc">{p.desc[lang]}</span>
          </span>
          <span className="tags listTags">
            {p.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </span>
          <span className="listArrow" aria-hidden="true">
            →
          </span>
        </button>
      ))}
    </div>
  );
}

/** C — alternating full-width rows. */
function GridC({ projects, lang, t, onOpen }: LayoutProps) {
  return (
    <div className="altView riseIn">
      {projects.map((p, i) => (
        <button
          className="altRow"
          key={p.id}
          data-flip={i % 2 === 1}
          onClick={() => onOpen(p.id)}
        >
          <span className="altShot">
            <img src={`/assets/images/${p.shot}`} alt="" loading="lazy" />
          </span>
          <span className="altBody">
            <span className="cardMeta">
              <span className="cardCat">{t.filters[p.cat]}</span>
              <span className="cardPeriod">{p.period[lang]}</span>
            </span>
            <span className="altName">{p.name}</span>
            <span className="altDesc">{p.desc[lang]}</span>
            <span className="tags" style={{ marginTop: 6, paddingTop: 0 }}>
              {p.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

/** D — the fanned hand of cards. */
function GridD({ projects, lang, t, onOpen }: LayoutProps) {
  const [liftedId, setLiftedId] = useState<string | null>(null);

  /** Momento sits in the middle slot of the fan whatever the filter shows. */
  const fan = useMemo(() => {
    const ordered = [...projects];
    const momento = ordered.findIndex((p) => p.id === "momento");
    if (momento > -1) {
      const [card] = ordered.splice(momento, 1);
      ordered.splice(Math.floor(ordered.length / 2), 0, card);
    }
    return ordered;
  }, [projects]);

  return (
    <>
      <div className="fanWrap">
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
                onClick={() => onOpen(p.id)}
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
  t: Copy;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(false);
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
        <div className={playing ? "modalShot isVideo" : "modalShot"}>
          {playing && project.video ? (
            <video src={`/assets/images/${project.video}`} controls autoPlay playsInline />
          ) : (
            <img src={`/assets/images/${project.shot}`} alt="" />
          )}
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
          <div className="modalActions">
            {project.url && (
              <a className="btn btnPrimary modalVisit" href={project.url} target="_blank" rel="noreferrer">
                {t.work.visit}
              </a>
            )}
            {project.video && !playing && (
              <button className="btn btnGhost modalVisit" onClick={() => setPlaying(true)}>
                ▶ {t.ui.demo}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
