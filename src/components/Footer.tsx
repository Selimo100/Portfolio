import Link from "next/link";
import { PAGES, href, pagePath, type Lang } from "@/lib/i18n";
import type { Translation } from "@/lib/content";

/**
 * Two-tier footer carried over from the previous site: brand, tagline and
 * social icons on the left, the full page list on the right, then a rule and
 * the copyright line.
 *
 * The icons are inline SVG (Bootstrap Icons paths) — the redesign dropped the
 * icon font, and three glyphs are not worth a webfont.
 */
const ICONS = {
  linkedin:
    "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z",
  github:
    "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8",
  email:
    "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z",
};

export default function Footer({ lang, t }: { lang: Lang; t: Translation }) {
  const socials = [
    { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/selina-mogicato-a48166316" },
    { key: "github", label: "GitHub", href: "https://github.com/Selimo100" },
    { key: "email", label: "Email", href: "mailto:selimo.contact@gmail.com" },
  ] as const;

  return (
    <footer className="footer">
      <div className="footerInner">
        <div className="footerTop">
          <div className="footerBrand">
            <p className="footerBrandName">Selina Mogicato</p>
            <p className="footerTagline">{t.footer.tag}</p>
            <div className="footerSocials">
              {socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  {...(s.key === "email" ? {} : { target: "_blank", rel: "noreferrer" })}
                >
                  <svg viewBox="0 0 16 16" width="17" height="17" fill="currentColor" aria-hidden="true">
                    <path d={ICONS[s.key]} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav className="footerNav" aria-label="Footer">
            <ul>
              {PAGES.map((page) => (
                <li key={page}>
                  <Link href={href(lang, pagePath(page))}>{t.nav[page]}</Link>
                </li>
              ))}
              <li>
                <Link href={href(lang, "imprint")}>{t.footer.imprint}</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footerBottom">
          <p>
            © {new Date().getFullYear()} Selina Mogicato. {t.footer.rights}
          </p>
          <p>{t.footer.made}</p>
        </div>
      </div>
    </footer>
  );
}
