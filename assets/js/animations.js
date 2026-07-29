/**
 * Scroll reveals.
 *
 * Elements marked `.reveal` / `.reveal-stagger` are visible by default. This
 * script "arms" them (hides them) only once it runs, so content is never
 * hidden behind JavaScript, and reveals them as they enter the viewport.
 */
(function () {
  "use strict";

  var targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!targets.length) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach(function (el) {
    el.classList.add("is-armed");
    observer.observe(el);
  });
})();
