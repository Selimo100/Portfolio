import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import { TRANSLATIONS } from "@/lib/content";
import { LANGS, isLang, type Lang } from "@/lib/i18n";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = TRANSLATIONS[isLang(lang) ? lang : "en"];
  return { title: `${t.contact.title} · Selina Mogicato`, description: t.contact.blurb };
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = TRANSLATIONS[lang as Lang];

  return (
    <main className="page shell" style={{ padding: "72px 36px 96px" }}>
      <div className="contactGrid">
        <div>
          <h1 className="pageTitle">{t.contact.title}</h1>
          <p className="lede" style={{ maxWidth: "44ch", marginTop: 22, lineHeight: 1.75 }}>
            {t.contact.blurb}
          </p>
          <div style={{ marginTop: 44, display: "flex", flexDirection: "column" }}>
            {t.links.map((l) => (
              <a
                className="linkRow"
                key={l.k}
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <span className="metaKey">{l.k}</span>
                <span>{l.v}</span>
              </a>
            ))}
          </div>
        </div>
        <ContactForm t={t.contact} />
      </div>
    </main>
  );
}
