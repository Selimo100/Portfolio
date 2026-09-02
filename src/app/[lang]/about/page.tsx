import Link from "next/link";
import { notFound } from "next/navigation";
import AboutMiniGame from "@/components/minigame/AboutMiniGame";
import TopTracks from "@/components/TopTracks";
import { MUSIC_COPY, TRANSLATIONS } from "@/lib/content";
import { LANGS, href, isLang, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = TRANSLATIONS[isLang(lang) ? lang : "en"];
  return { title: `${t.about.title} · Selina Mogicato`, description: t.about.p1 };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = TRANSLATIONS[lang as Lang];

  return (
    <main className="page shell" style={{ padding: "72px 36px 96px" }}>
      <div className="aboutGrid">
        <div>
          <h1 className="pageTitle">{t.about.title}</h1>
          <p className="aboutLead">{t.about.p1}</p>
          <p className="aboutBody">{t.about.p2}</p>

          <p className="aboutBody" style={{ marginTop: 40, color: "var(--tx2)" }} data-reveal="1">
            {MUSIC_COPY[lang].intro}
          </p>
          <TopTracks lang={lang} />

          <AboutMiniGame />

          <h2 className="eyebrow" style={{ display: "block", margin: "52px 0 0" }}>
            {t.about.valuesTitle}
          </h2>
          <ul className="valueList">
            {t.values.map((v) => (
              <li key={v}>
                <span className="dot" aria-hidden="true" />
                {v}
              </li>
            ))}
          </ul>

          <h2 className="eyebrow" style={{ display: "block", margin: "56px 0 0" }}>
            {t.about.pathTitle}
          </h2>
          <div className="timeline">
            {t.timeline.map((e) => (
              <div className="timelineRow" key={e.what}>
                <span className="timelineWhen">{e.when}</span>
                <div>
                  <div className="timelineWhat">{e.what}</div>
                  <div className="timelineWhere">{e.where}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="aside">
          <div className="asidePortrait">
            <img src="/assets/images/selina-working.png" alt="Selina at work" loading="lazy" />
          </div>
          <dl className="factCard">
            {t.facts.map((f) => (
              <div key={f.k}>
                <dt className="metaKey">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
            <Link
              className="btn btnPrimary"
              href={href(lang, "contact")}
              style={{ marginTop: 2, padding: 12, fontSize: 13.5 }}
            >
              {t.about.cv}
            </Link>
          </dl>
        </aside>
      </div>
    </main>
  );
}
