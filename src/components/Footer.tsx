import Link from "next/link";
import { href, type Lang } from "@/lib/i18n";
import type { Translation } from "@/lib/content";

export default function Footer({ lang, t }: { lang: Lang; t: Translation }) {
  return (
    <footer className="footer">
      <div className="footerInner">
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span className="brandName">Selina Mogicato</span>
          <span style={{ fontSize: 12.5, color: "var(--mu)" }}>{t.footer.tag}</span>
        </div>
        <div className="footerLinks">
          <a href="https://github.com/Selimo100" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/selina-mogicato-a48166316"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:selimo.contact@gmail.com">Email</a>
          <Link href={href(lang, "imprint")}>{t.footer.imprint}</Link>
        </div>
        <span className="footerNote">
          © {new Date().getFullYear()} · {t.footer.made}
        </span>
      </div>
    </footer>
  );
}
