import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, TRANSLATIONS } from "@/lib/content";
import { LANGS, href, isLang, type Lang } from "@/lib/i18n";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = TRANSLATIONS[lang as Lang];

  return (
    <main className="page">
      {/* Hero — variant C of the design: full-bleed wordmark over a portrait. */}
      <section className="heroSection">
        <div className="heroTop">
          <h1 className="heroName">
            <span className="mask">
              <span>Selina</span>
            </span>
            <span className="mask">
              <span>Mogicato</span>
            </span>
          </h1>
          <div className="heroRule" />
        </div>
        <div className="heroBody">
          <div className="heroPortrait">
            <img src="/assets/images/Portrait.png" alt="Selina Mogicato" />
          </div>
          <div>
            <p className="heroBlurb">{t.hero.blurb}</p>
            <dl className="heroMeta">
              {t.heroMeta.map((m) => (
                <div key={m.k}>
                  <dt className="metaKey">{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
            <div className="heroActions">
              <Link className="btn btnPrimary" href={href(lang, "work")}>
                {t.hero.cta}
              </Link>
              <Link className="btn btnGhost" href={href(lang, "contact")}>
                {t.hero.cta2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="statsInner">
          {t.stats.map((s) => (
            <div className="stat" data-reveal="1" key={s.label}>
              <div className="statValue">{s.value}</div>
              <div className="statLabel">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="shell" style={{ padding: "84px 36px" }}>
        <div className="sectionHead">
          <div>
            <span className="eyebrow">{t.work.title}</span>
            <p>{t.work.sub}</p>
          </div>
          <Link href={href(lang, "work")} style={{ fontSize: 13.5 }}>
            {t.work.all} →
          </Link>
        </div>
        <div className="cardGrid">
          {PROJECTS.slice(0, 3).map((p) => (
            <ProjectCard key={p.id} project={p} lang={lang} filters={t.filters} reveal />
          ))}
        </div>
      </section>

      <section className="shell" style={{ padding: "0 36px 96px" }}>
        <div className="ctaBand">
          <div>
            <h2>{t.cta.title}</h2>
            <p>{t.cta.blurb}</p>
          </div>
          <Link className="btn btnPrimary" href={href(lang, "contact")}>
            {t.cta.button}
          </Link>
        </div>
      </section>
    </main>
  );
}
