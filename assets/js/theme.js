/**
 * Theme toggle.
 *
 * The initial value is already applied by theme-init.js; this module only
 * wires the control, keeps the icon and meta theme-colour in sync, and
 * follows the system preference until the user makes an explicit choice.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "theme";
  var root = document.documentElement;

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function syncControls(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      var isDark = theme === "dark";
      var icon = button.querySelector(".bi");
      if (icon) {
        icon.className = isDark ? "bi bi-sun-fill" : "bi bi-moon-fill";
      }
      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
      button.setAttribute("aria-pressed", String(isDark));
    });

    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    meta.content = theme === "dark" ? "#000000" : "#ffffff";
  }

  function apply(theme, persist) {
    root.setAttribute("data-theme", theme);
    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {
        /* storage unavailable — the theme still applies for this session */
      }
    }
    syncControls(theme);
  }

  syncControls(current());

  document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      apply(current() === "dark" ? "light" : "dark", true);
    });
  });

  // Keep tabs in sync.
  window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY && event.newValue) {
      apply(event.newValue, false);
    }
  });

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function (event) {
      var stored = null;
      try {
        stored = localStorage.getItem(STORAGE_KEY);
      } catch (e) {
        /* ignore */
      }
      if (!stored) {
        apply(event.matches ? "dark" : "light", false);
      }
    });
})();
