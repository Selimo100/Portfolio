import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Momo from "@/components/Momo";
import Reveal from "@/components/Reveal";
import ArcadeHotkey from "@/components/ArcadeHotkey";
import { TRANSLATIONS } from "@/lib/content";
import { LANGS, isLang } from "@/lib/i18n";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const t = TRANSLATIONS[lang];

  return (
    <div className="appShell" data-lang={lang}>
      {/* The <html> element is rendered by the root layout, which cannot know
          the locale, so each exported page stamps its own language here. */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(lang)};`,
        }}
      />
      <a className="skipLink" href="#main">
        Skip to content
      </a>
      <Header lang={lang} nav={t.nav} />
      <div id="main" className="appMain">
        {children}
      </div>
      <Footer lang={lang} t={t} />
      <ArcadeHotkey />
      <Momo lang={lang} momo={t.momo} />
      <Reveal />
    </div>
  );
}
