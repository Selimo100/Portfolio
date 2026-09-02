/* =============================================================================
   Selina Mogicato – Karate Journey
   Scroll-gesteuerte Journey-Grafik, Reveals, Navigation.
   ============================================================================= */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  var mobile = window.matchMedia("(max-width: 52rem)");

  /* --------------------------------------------------------------------- */
  /* Daten – Stationen des Karate-Wegs                                      */
  /* --------------------------------------------------------------------- */
  var STATIONS = [
    {
      x: 620, y: 70,
      tag: "2015",
      title: "Gründungsmitglied",
      note: "Als kleine Freundesgruppe starten wir Kaisho Karate Bassersdorf."
    },
    {
      x: 190, y: 197,
      tag: "seit 2023",
      title: "Erste Wettkämpfe",
      note: "Kantonale, nationale und internationale Turniere in Kata und Kumite."
    },
    {
      x: 700, y: 324,
      tag: "Juli 2024",
      title: "Zürcher Kantonalmeisterschaft",
      note: "3. Platz an der kantonalen Meisterschaft."
    },
    {
      x: 175, y: 451,
      tag: "Mai 2025",
      title: "Nicki Cup, Österreich",
      note: "3. Platz im Kumite und 5. Platz in Kata."
    },
    {
      x: 710, y: 578,
      tag: "Juli 2025",
      title: "Zürcher Kantonalmeisterschaft",
      note: "2. Platz in Kata und 5. Platz im Kumite."
    },
    {
      x: 185, y: 705,
      tag: "Mai 2026",
      title: "Nicki Cup & Start U21",
      note: "3. Platz in Kata gegen Athletinnen aus mehreren Nationen."
    },
    {
      x: 690, y: 832,
      tag: "Juni 2026",
      title: "J+S 1418Coach",
      note: "Ausbildung zur Begleitung und Förderung junger Sportlerinnen und Sportler."
    },
    {
      x: 270, y: 959,
      tag: "1. Oktober 2026",
      title: "Prüfung zum 2. Kyu",
      note: "Der nächste Schritt auf dem Weg zum Dan."
    }
  ];

  /* --------------------------------------------------------------------- */
  /* Hilfsfunktionen                                                        */
  /* --------------------------------------------------------------------- */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function buildPath(pts) {
    var d = "M " + pts[0].x + "," + pts[0].y;
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1];
      var c1 = a.y + (b.y - a.y) * 0.55;
      var c2 = a.y + (b.y - a.y) * 0.45;
      d += " C " + a.x + "," + c1 + " " + b.x + "," + c2 + " " + b.x + "," + b.y;
    }
    return d;
  }

  /* Länge entlang des Pfads, die einem Punkt am nächsten liegt. */
  function lengthAt(path, total, pt) {
    var best = 0, bestDist = Infinity, steps = 400;
    for (var i = 0; i <= steps; i++) {
      var l = (i / steps) * total;
      var p = path.getPointAtLength(l);
      var dist = (p.x - pt.x) * (p.x - pt.x) + (p.y - pt.y) * (p.y - pt.y);
      if (dist < bestDist) { bestDist = dist; best = l; }
    }
    return best;
  }

  /* --------------------------------------------------------------------- */
  /* Reveal-Beobachter                                                      */
  /* --------------------------------------------------------------------- */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

  function observeReveals(root) {
    (root || document).querySelectorAll(".reveal").forEach(function (el) {
      var delay = el.getAttribute("data-delay");
      if (delay) el.style.setProperty("--d", delay);
      revealObserver.observe(el);
    });
  }

  /* --------------------------------------------------------------------- */
  /* Zählanimation im Kurzprofil                                            */
  /* --------------------------------------------------------------------- */
  function initCounters() {
    var counters = document.querySelectorAll(".count");
    if (!counters.length || reduced.matches) return;

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var start = performance.now();
        var dur = 900;
        (function step(now) {
          var t = clamp((now - start) / dur, 0, 1);
          var eased = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(step);
        })(start);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { el.textContent = "0"; obs.observe(el); });
  }

  /* --------------------------------------------------------------------- */
  /* Kopfzeile + Scroll-Fortschritt + aktiver Navigationslink               */
  /* --------------------------------------------------------------------- */
  function initChrome() {
    var header = document.querySelector(".site-header");
    var bar = document.querySelector(".scroll-progress");
    var links = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);

    function update() {
      var y = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.setProperty("--p", max > 0 ? clamp(y / max, 0, 1) : 0);
      if (header) header.classList.toggle("is-stuck", y > 12);

      var current = -1;
      sections.forEach(function (sec, i) {
        if (sec.getBoundingClientRect().top <= window.innerHeight * 0.35) current = i;
      });
      links.forEach(function (a, i) { a.classList.toggle("is-active", i === current); });
    }

    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { update(); ticking = false; });
    }, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* --------------------------------------------------------------------- */
  /* Zeitleiste als Liste (mobil, Druck, Screenreader-Fallback)             */
  /* --------------------------------------------------------------------- */
  function buildList() {
    var list = document.querySelector(".journey-list");
    if (!list) return;
    list.innerHTML = STATIONS.map(function (s) {
      return (
        "<li class=\"reveal\">" +
        "<span class=\"cp-tag\">" + s.tag + "</span>" +
        "<div class=\"cp-title\">" + s.title + "</div>" +
        "<p class=\"cp-note\">" + s.note + "</p>" +
        "</li>"
      );
    }).join("");
    observeReveals(list);
  }

  /* --------------------------------------------------------------------- */
  /* Journey-Grafik                                                         */
  /* --------------------------------------------------------------------- */
  function initJourney() {
    var section = document.querySelector(".journey");
    var svg = document.querySelector(".journey-svg");
    if (!section || !svg) return;

    var track = svg.querySelector(".journey-track");
    var fill = svg.querySelector(".journey-fill");
    var nodesGroup = svg.querySelector(".journey-nodes");
    var ripple = svg.querySelector(".journey-ripple");
    var halo = svg.querySelector(".journey-halo");
    var dot = svg.querySelector(".journey-dot");
    var labelBox = document.querySelector(".journey-labels");

    var d = buildPath(STATIONS);
    track.setAttribute("d", d);
    fill.setAttribute("d", d);

    var total = fill.getTotalLength();
    fill.style.strokeDasharray = total;
    fill.style.strokeDashoffset = total;

    /* Knotenpunkte + Beschriftungen */
    var NS = "http://www.w3.org/2000/svg";
    var nodes = STATIONS.map(function (s, i) {
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("class", "journey-node");
      c.setAttribute("cx", s.x);
      c.setAttribute("cy", s.y);
      c.setAttribute("r", i === 0 || i === STATIONS.length - 1 ? 8 : 6.5);
      c.style.fill = "#7f9099";
      nodesGroup.appendChild(c);
      return c;
    });

    /* Beschriftung immer nach aussen setzen, damit sie die Kurve nie kreuzt.
       Die ausführliche Beschreibung steht in der Listenansicht. */
    var labels = STATIONS.map(function (s) {
      var right = s.x >= 450;
      var el = document.createElement("div");
      el.className = "journey-checkpoint";
      el.style.opacity = "0";
      el.style.textAlign = right ? "left" : "right";
      el.innerHTML =
        "<span class=\"cp-tag\">" + s.tag + "</span>" +
        "<div class=\"cp-title\">" + s.title + "</div>";
      labelBox.appendChild(el);
      return { el: el, right: right, lit: false };
    });

    /* Beschriftungen exakt an den gezeichneten Knoten ausrichten.
       getScreenCTM bildet viewBox-Koordinaten auf tatsächliche Pixel ab und
       berücksichtigt damit die Skalierung durch preserveAspectRatio. */
    function placeLabels() {
      var ctm = svg.getScreenCTM();
      var box = labelBox.getBoundingClientRect();
      if (!ctm || !box.width) return;
      var gap = Math.max(18, Math.min(34, box.width * 0.028));

      labels.forEach(function (l, i) {
        var p = svg.createSVGPoint();
        p.x = STATIONS[i].x;
        p.y = STATIONS[i].y;
        var s = p.matrixTransform(ctm);
        var nx = s.x - box.left;
        var ny = s.y - box.top;

        l.el.style.top = ny + "px";
        if (l.right) {
          l.el.style.left = nx + gap + "px";
          l.el.style.right = "auto";
        } else {
          l.el.style.right = box.width - nx + gap + "px";
          l.el.style.left = "auto";
        }
      });
    }

    var stops = STATIONS.map(function (s) { return lengthAt(fill, total, s); });

    var currentLen = 0;
    var targetLen = 0;
    var rippleStart = -1;
    var rippleAt = null;
    var raf = null;

    function paint(len) {
      var p = fill.getPointAtLength(len);
      fill.style.strokeDashoffset = total - len;
      halo.setAttribute("cx", p.x); halo.setAttribute("cy", p.y);
      dot.setAttribute("cx", p.x); dot.setAttribute("cy", p.y);

      labels.forEach(function (l, i) {
        var lit = len >= stops[i] - 4;
        if (lit !== l.lit) {
          l.lit = lit;
          l.el.classList.toggle("is-lit", lit);
          nodes[i].style.fill = lit ? "var(--accent)" : "#7f9099";
          if (lit) { rippleAt = STATIONS[i]; rippleStart = performance.now(); }
        }
        /* sanftes Ein-/Ausblenden kurz vor dem Erreichen des Knotens */
        var dist = stops[i] - len;
        var o = clamp(1 - dist / 150, 0, 1);
        l.el.style.opacity = o;
        l.el.style.transform =
          "translateY(-50%) translateX(" + (1 - o) * (l.right ? 20 : -20) + "px)";
      });

      /* Impuls-Ring beim Erreichen einer Station */
      if (rippleAt) {
        var t = (performance.now() - rippleStart) / 750;
        if (t >= 1) { ripple.setAttribute("opacity", "0"); rippleAt = null; }
        else {
          ripple.setAttribute("cx", rippleAt.x);
          ripple.setAttribute("cy", rippleAt.y);
          ripple.setAttribute("r", 7 + t * 44);
          ripple.setAttribute("opacity", (1 - t) * 0.55);
        }
      }
    }

    function tick() {
      var diff = targetLen - currentLen;
      currentLen += diff * 0.12;
      if (Math.abs(diff) < 0.4) currentLen = targetLen;
      paint(currentLen);
      raf = Math.abs(diff) < 0.4 && !rippleAt ? null : requestAnimationFrame(tick);
    }

    function onScroll() {
      var rect = section.getBoundingClientRect();
      var span = section.offsetHeight - window.innerHeight;
      var progress = span > 0 ? clamp(-rect.top / span, 0, 1) : (rect.top < 0 ? 1 : 0);
      targetLen = progress * total;
      if (reduced.matches) { currentLen = targetLen; paint(currentLen); return; }
      if (raf === null) raf = requestAnimationFrame(tick);
    }

    /* Scrollhöhe: pro Station ein Bildschirmanteil, damit alles Zeit hat */
    function sizeSection() {
      if (mobile.matches || reduced.matches) { section.style.minHeight = ""; return; }
      section.style.minHeight = 100 + STATIONS.length * 24 + "vh";
    }

    function refresh() { sizeSection(); placeLabels(); onScroll(); }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeLabels);
    refresh();
  }

  /* --------------------------------------------------------------------- */
  function boot() {
    observeReveals(document);
    initCounters();
    initChrome();
    buildList();
    initJourney();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
