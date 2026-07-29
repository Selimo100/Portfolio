/**
 * Applies the stored (or system) theme before first paint.
 * Kept as a tiny blocking script in <head> so there is no colour flash.
 * It must never hide content — the page stays readable even if it fails.
 */
(function () {
  "use strict";

  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
