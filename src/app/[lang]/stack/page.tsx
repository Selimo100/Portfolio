import { notFound } from "next/navigation";
import { STACK, TRANSLATIONS } from "@/lib/content";
import { LANGS, isLang, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = TRANSLATIONS[isLang(lang) ? lang : "en"];
  return { title: `${t.stack.title} · Selina Mogicato`, description: t.stack.sub };
}

export default async function StackPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = TRANSLATIONS[lang as Lang];

  return (
    <main className="page shell" style={{ padding: "72px 36px 96px" }}>
      <h1 className="pageTitle">{t.stack.title}</h1>
      <p className="lede" style={{ maxWidth: "56ch" }}>
        {t.stack.sub}
      </p>
      <div className="stackGrid">
        {STACK.map((g) => (
          <section className="stackGroup" key={g.group}>
            <div className="stackHead">
              <h2 className="eyebrow" style={{ margin: 0, fontSize: 10.5 }}>
                {g.group}
              </h2>
              <span className="stackCount">{String(g.items.length).padStart(2, "0")}</span>
            </div>
            <div className="chips">
              {g.items.map((i) => (
                <span className="chip" key={i}>
                  {i}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
