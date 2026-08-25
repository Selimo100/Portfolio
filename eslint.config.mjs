import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * `next lint` was removed in Next 16, so ESLint runs directly against this flat
 * config using the presets eslint-config-next now exports natively.
 */
export default [
  {
    ignores: [
      ".next/",
      "out/",
      "node_modules/",
      // Standalone vanilla-JS arcade bundle, not part of the Next app.
      "public/assets/arcade/",
      // Files pulled off the server before pruning them (see scripts/prune-remote.py).
      ".server-backup/",
      "next-env.d.ts",
    ],
  },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      /**
       * Several components deliberately set state in a mount effect to pick up
       * browser-only state (stored theme, stored layout, matchMedia) that the
       * static export cannot know at prerender time. That is the documented way
       * to stay hydration-safe, so it is reported but does not fail CI.
       */
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  {
    // The root route is a no-JS fallback for the locale redirect: it must emit a
    // real anchor, because <Link> would need a router that has not booted yet.
    files: ["src/app/page.tsx"],
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
];
