import { notFound } from "next/navigation";
import { TRANSLATIONS } from "@/lib/content";
import { LANGS, isLang, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = TRANSLATIONS[isLang(lang) ? lang : "en"];
  return { title: `${t.nav.karate} · Selina Mogicato`, description: t.karate.blurb };
}

export default async function KaratePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = TRANSLATIONS[lang as Lang];

  return (
    <main className="page">
      <section className="shell" style={{ padding: "72px 36px 56px" }}>
        <span className="eyebrow">{t.karate.eyebrow}</span>
        <h1
          className="pageTitle"
          style={{ margin: "16px 0 0", fontSize: "clamp(38px, 6vw, 58px)", lineHeight: 1.02, maxWidth: "22ch" }}
        >
          {t.karate.title}
        </h1>
        <p className="lede" style={{ marginTop: 22, lineHeight: 1.75 }}>
          {t.karate.blurb}
        </p>
        <div className="karateBanner">
          <img src="/assets/images/Kaisho_Logo.JPG" alt="Kaisho Karate Bassersdorf" loading="lazy" />
        </div>
      </section>

      <section className="karateCards">
        {t.karateCards.map((k) => (
          <article className="karateCard" key={k.title} data-reveal="1">
            <div className="metaKey">{k.k}</div>
            <h2 className="karateCardTitle">{k.title}</h2>
            <p className="karateCardText">{k.text}</p>
          </article>
        ))}
      </section>

      <section className="shell" style={{ padding: "40px 36px 90px" }}>
        <h2 className="eyebrow" style={{ display: "block", margin: "0 0 22px" }}>
          {t.karate.milestones}
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {t.karateTimeline.map((e) => (
            <div
              className="timelineRow"
              style={{ gridTemplateColumns: "130px 1fr", alignItems: "baseline", padding: "18px 0" }}
              key={e.what}
            >
              <span className="milestoneWhen">{e.when}</span>
              <div>
                <div className="timelineWhat">{e.what}</div>
                <div className="timelineWhere" style={{ maxWidth: "60ch", marginTop: 5 }}>
                  {e.note}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
