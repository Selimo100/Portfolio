import type { Lang } from "@/lib/i18n";
import type { Project, Translation } from "@/lib/content";

/**
 * A project tile. Links out to the live deployment when the project has one,
 * and is a plain article otherwise.
 */
export default function ProjectCard({
  project,
  lang,
  filters,
  reveal = false,
}: {
  project: Project;
  lang: Lang;
  filters: Translation["filters"];
  reveal?: boolean;
}) {
  const inner = (
    <>
      <div className="cardShot">
        <img src={`/assets/images/${project.shot}`} alt="" loading="lazy" />
      </div>
      <div className="cardBody">
        <div className="cardMeta">
          <span className="cardCat">{filters[project.cat]}</span>
          <span className="cardPeriod">{project.period[lang]}</span>
        </div>
        <h3 className="cardName">{project.name}</h3>
        <p className="cardDesc" style={{ margin: 0 }}>
          {project.desc[lang]}
        </p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const props = { className: "card", ...(reveal ? { "data-reveal": "1" } : {}) };

  return project.url ? (
    <a {...props} href={project.url} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <article {...props}>{inner}</article>
  );
}
