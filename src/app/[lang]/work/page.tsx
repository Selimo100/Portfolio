import { notFound } from "next/navigation";
import ProjectFilters from "@/components/ProjectFilters";
import { TRANSLATIONS } from "@/lib/content";
import { LANGS, isLang, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = TRANSLATIONS[isLang(lang) ? lang : "en"];
  return { title: `${t.work.pageTitle} · Selina Mogicato`, description: t.work.pageSub };
}

export default async function WorkPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = TRANSLATIONS[lang as Lang];

  return (
    <main className="page shell" style={{ padding: "72px 36px 96px" }}>
      <h1 className="pageTitle">{t.work.pageTitle}</h1>
      <p className="lede">{t.work.pageSub}</p>
      <ProjectFilters lang={lang} filters={t.filters} heading={t.work.pageTitle} />
    </main>
  );
}
