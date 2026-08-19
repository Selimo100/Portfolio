import { notFound } from "next/navigation";
import { TRANSLATIONS } from "@/lib/content";
import { LANGS, isLang, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = TRANSLATIONS[isLang(lang) ? lang : "en"];
  return { title: `${t.imprint.title} · Selina Mogicato`, robots: { index: false } };
}

export default async function ImprintPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = TRANSLATIONS[lang as Lang];

  return (
    <main className="page" style={{ maxWidth: 820, margin: "0 auto", padding: "72px 36px 96px" }}>
      <h1 className="pageTitle" style={{ fontSize: "clamp(34px, 5vw, 48px)" }}>
        {t.imprint.title}
      </h1>
      <dl style={{ marginTop: 38, display: "flex", flexDirection: "column" }}>
        {t.imprintBlocks.map((b) => (
          <div className="imprintRow" key={b.k}>
            <dt className="metaKey" style={{ paddingTop: 3 }}>
              {b.k}
            </dt>
            <dd>{b.v}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
