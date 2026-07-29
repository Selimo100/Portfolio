/**
 * Site navigation: accessible mobile menu, section scroll-spy and a scroll
 * progress indicator.
 *
 * Scrolling itself is handled by CSS `scroll-behavior`, so there are no
 * scroll handlers doing layout work; position is read from a passive
 * listener that only writes a transform.
 */
(function () {
  "use strict";

  var toggle = document.querySelector("[data-nav-toggle]");
  var panel = document.getElementById("primary-navigation");
  var header = document.querySelector(".site-header");

  /* --- Mobile menu ------------------------------------------------------ */

  function isMobile() {
    return window.matchMedia("(max-width: 860px)").matches;
  }

  function setMenu(open) {
    if (!toggle || !panel) return;
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);

    var icon = toggle.querySelector(".bi");
    if (icon) {
      icon.className = open ? "bi bi-x-lg" : "bi bi-list";
    }

    // Keep the closed menu out of the tab order on small screens.
    if (isMobile()) {
      panel.setAttribute("inert", "");
      if (open) panel.removeAttribute("inert");
    } else {
      panel.removeAttribute("inert");
    }
  }

  if (toggle && panel) {
    setMenu(false);

    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && panel.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });

    window.matchMedia("(max-width: 860px)").addEventListener("change", function () {
      setMenu(false);
    });
  }

  /* --- Scroll progress -------------------------------------------------- */

  var progress = document.querySelector("[data-scroll-progress]");
  var ticking = false;

  function updateProgress() {
    if (!progress) return;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    progress.style.transform = "scaleX(" + ratio + ")";
    ticking = false;
  }

  if (progress) {
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(updateProgress);
        }
      },
      { passive: true }
    );
    updateProgress();
  }

  /* --- Scroll spy ------------------------------------------------------- */

  var spyLinks = Array.prototype.slice.call(
    document.querySelectorAll('[data-nav-spy] a[href^="#"]')
  );

  if (spyLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    var sections = [];

    spyLinks.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = id && document.getElementById(id);
      if (section) {
        byId[id] = link;
        sections.push(section);
      }
    });

    var headerHeight = header ? header.offsetHeight : 48;

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          spyLinks.forEach(function (link) {
            link.classList.remove("is-active");
          });
          var active = byId[entry.target.id];
          if (active) active.classList.add("is-active");
        });
      },
      {
        rootMargin: "-" + (headerHeight + 8) + "px 0px -55% 0px",
        threshold: 0
      }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }
})();
