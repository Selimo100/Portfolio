import { LANGS } from "@/lib/i18n";

/**
 * The static export has no server to redirect with, so the root document sends
 * visitors on to their best-matching locale in the browser. The plain link is
 * the fallback when scripting is unavailable.
 */
const redirectScript = `(function(){var s=${JSON.stringify(LANGS)};var p=(navigator.languages||[navigator.language||"en"]).map(function(l){return String(l).slice(0,2).toLowerCase()});var m=p.find(function(l){return s.indexOf(l)>-1})||"en";location.replace("/"+m+"/");})();`;

export const metadata = { robots: { index: false } };

export default function RootRedirect() {
  return (
    <main className="shell" style={{ padding: "80px 36px" }}>
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <p>
        <a href="/en/">Continue to the site →</a>
      </p>
    </main>
  );
}
