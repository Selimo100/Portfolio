import Link from "next/link";
import AppStoreBadge from "@/components/AppStoreBadge";
import PhoneSimulator from "@/components/PhoneSimulator";
import ProjectCard from "@/components/ProjectCard";
import { PROJECTS, TRANSLATIONS } from "@/lib/content";
import { LANGS, href, isLang, type Lang } from "@/lib/i18n";
import { notFound } from "next/navigation";

function renderHeroWord(word: string) {
  return word.split("").map((letter, index) => (
    <span
      key={`${word}-${index}`}
      className="heroLetter"
      style={{ transitionDelay: `${index * 18}ms` }}
    >
      {letter}
    </span>
  ));
}

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = TRANSLATIONS[lang as Lang];
  const momento = PROJECTS.find((p) => p.id === "momento");

  return (
    <main className="page">
      {/* Hero — variant C of the design: full-bleed wordmark over a portrait. */}
      <section className="heroSection">
        <div className="heroTop">
          <p className="heroSubtitle">{t.hero.eyebrow}</p>
          <h1 className="heroName">
            <span className="mask">
              <span className="heroWord">{renderHeroWord("Selina")}</span>
            </span>
            <span className="mask">
              <span className="heroWord">{renderHeroWord("Mogicato")}</span>
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

      {momento?.appStore && (
        <section className="shell launchSection" aria-labelledby="launch-title">
          <div className="launchBand" data-reveal="1">
            <div className="launchCopy">
              <div className="launchHead">
                <img className="launchIcon" src="/assets/images/icons/momento.png" alt="" />
                <span className="launchEyebrow">
                  <span className="launchDot" aria-hidden="true" />
                  {t.launch.eyebrow}
                </span>
              </div>
              <h2 id="launch-title">{t.launch.title}</h2>
              <p>{t.launch.blurb}</p>
              <div className="launchActions">
                <AppStoreBadge href={momento.appStore} top={t.launch.badgeTop} label={t.launch.badge} />
                {momento.url && (
                  <a className="btn btnGhost" href={momento.url} target="_blank" rel="noreferrer">
                    {t.launch.more} →
                  </a>
                )}
              </div>
            </div>
            <a className="launchShot" href={momento.appStore} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
              <img src={`/assets/images/${momento.shot}`} alt="" loading="lazy" />
            </a>
          </div>
        </section>
      )}

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
            <ProjectCard key={p.id} project={p} lang={lang} filters={t.filters} pill={t.launch.pill} reveal />
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

      <section className="shell phoneSection">
        <div className="phoneCopy">
          <span className="eyebrow">{t.phone.eyebrow}</span>
          <h2>{t.phone.title}</h2>
          <p>{t.phone.blurb}</p>
        </div>
        <PhoneSimulator lang={lang} t={{ phone: t.phone, filters: t.filters, nav: t.nav, ui: t.ui, launch: t.launch }} />
      </section>
    </main>
  );
}
