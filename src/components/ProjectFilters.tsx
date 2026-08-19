"use client";

import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { PROJECTS, type Category, type Translation } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

const FILTERS = ["all", "personal", "professional"] as const;

type Filter = (typeof FILTERS)[number];

export default function ProjectFilters({
  lang,
  filters: labels,
  heading,
}: {
  lang: Lang;
  filters: Translation["filters"];
  heading: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = PROJECTS.filter((p) => filter === "all" || p.cat === (filter as Category));

  return (
    <>
      <div className="filters" role="group" aria-label={heading}>
        {FILTERS.map((f) => (
          <button
            className="filter"
            key={f}
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
          >
            {labels[f]}
          </button>
        ))}
      </div>
      <div className="cardGrid" style={{ animation: "rise .4s ease both" }} key={filter}>
        {shown.map((p) => (
          <ProjectCard key={p.id} project={p} lang={lang} filters={labels} />
        ))}
      </div>
    </>
  );
}
