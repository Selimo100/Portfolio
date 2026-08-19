import type { NextConfig } from "next";

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
};

export default nextConfig;
