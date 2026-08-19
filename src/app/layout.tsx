import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mogicato.ch"),
  title: "Selina Mogicato",
  description:
    "Apprentice application developer in Zurich, building structured web and mobile software.",
  icons: {
    icon: [
      { url: "/assets/images/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/images/favicon/favicon-96x96.png", sizes: "96x96" },
    ],
    shortcut: "/assets/images/favicon/favicon.ico",
    apple: "/assets/images/favicon/apple-touch-icon.png",
  },
  manifest: "/assets/images/favicon/site.webmanifest",
};

/**
 * Applies the stored theme before first paint so the page never flashes the
 * wrong palette. Kept inline and tiny for that reason.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Without scripting nothing ever flips [data-reveal] on, so show it all. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1;transform:none}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
