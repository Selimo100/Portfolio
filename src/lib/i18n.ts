/** The three locales the site is published in. English is the fallback. */
export const LANGS = ["en", "de", "it"] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = "en";

export function isLang(value: string): value is Lang {
  return (LANGS as readonly string[]).includes(value);
}

/** Every page lives under a locale prefix, so links always carry one. */
export function href(lang: Lang, path = ""): string {
  return `/${lang}${path ? `/${path}` : ""}/`;
}

/** The pages that appear in the header, in order. */
export const PAGES = ["home", "work", "about", "stack", "karate", "contact"] as const;

export type Page = (typeof PAGES)[number];

export function pagePath(page: Page): string {
  return page === "home" ? "" : page;
}
