import type { NextConfig } from "next";

/** Where `npm run php` serves the endpoints during development. */
const PHP_DEV_ORIGIN = process.env.PHP_DEV_ORIGIN ?? "http://localhost:8001";

const isDev = process.env.NODE_ENV === "development";

/**
 * The site ships as a plain static bundle: `next build` writes `out/`, whose
 * contents are uploaded to the Hostfactory web root alongside the PHP endpoints
 * in `server/` (see scripts/copy-server-files.mjs).
 *
 * `trailingSlash` matters — it makes every route a directory with an
 * `index.html`, which is what Apache serves for `/work` without extra rewrites.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },

  /**
   * In production the PHP endpoints sit next to the export and are reached at
   * the same origin. `next dev` cannot run PHP, so during development the same
   * paths are proxied to a `php -S` process instead. Rewrites are not part of a
   * static export, hence the dev-only guard.
   */
  ...(isDev
    ? {
        async rewrites() {
          return [
            { source: "/ask.php", destination: `${PHP_DEV_ORIGIN}/ask.php` },
            { source: "/sendMail.php", destination: `${PHP_DEV_ORIGIN}/sendMail.php` },
            { source: "/spotify-top.php", destination: `${PHP_DEV_ORIGIN}/spotify-top.php` },
          ];
        },
      }
    : {}),
};

export default nextConfig;
