/**
 * Hidden extras: the Konami code, the "a" shortcut to the arcade, and a set
 * of console commands. All of these predate the redesign and are preserved.
 */
(function () {
  "use strict";

  var ARCADE_URL = "assets/arcade/arcade.html";

  var konami = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a"
  ];
  var konamiIndex = 0;

  function isTyping() {
    var el = document.activeElement;
    if (!el) return false;
    return (
      el.tagName === "INPUT" ||
      el.tagName === "TEXTAREA" ||
      el.tagName === "SELECT" ||
      el.isContentEditable
    );
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === konami[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konami.length) {
        announceCommands();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }

    // Press "a" anywhere outside a text field to open the arcade.
    if (e.key === "a" && !e.ctrlKey && !e.altKey && !e.metaKey && !isTyping()) {
      window.open(ARCADE_URL, "_blank", "noopener");
    }
  });

  function announceCommands() {
    console.log(
      "%c🎮 Secret arcade unlocked",
      "font-size:18px;font-weight:600;color:#2997ff;"
    );
    console.log("%cTry these commands:", "color:#858585");
    console.log("%c  showArcade()", "color:#2997ff");
    console.log("%c  showKarateJourney()", "color:#2997ff");
    console.log("%c  showSecretProject()", "color:#2997ff");
    console.log("%c  matrix()", "color:#2997ff");
  }

  /* --- Arcade overlay --------------------------------------------------- */

  window.showArcade = function () {
    if (document.querySelector(".arcade-overlay")) return;

    var lastFocused = document.activeElement;
    var overlay = document.createElement("div");
    overlay.className = "arcade-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Secret arcade");
    overlay.innerHTML =
      '<div class="arcade-overlay__panel">' +
      '<div class="arcade-overlay__bar">' +
      '<p class="title-xs">🎮 Secret Arcade</p>' +
      '<button type="button" class="arcade-overlay__close" aria-label="Close arcade">' +
      '<i class="bi bi-x-lg" aria-hidden="true"></i></button>' +
      "</div>" +
      '<iframe src="' +
      ARCADE_URL +
      '" title="Selina\'s Arcade"></iframe>' +
      "</div>";

    function close() {
      overlay.remove();
      document.body.classList.remove("nav-open");
      document.removeEventListener("keydown", onKeydown);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    function onKeydown(e) {
      if (e.key === "Escape") close();
    }

    document.body.appendChild(overlay);
    document.body.classList.add("nav-open");
    overlay.querySelector(".arcade-overlay__close").addEventListener("click", close);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", onKeydown);
    overlay.querySelector(".arcade-overlay__close").focus();
  };

  window.showKarateJourney = function () {
    console.log(
      "%c🥋 My karate journey",
      "font-size:18px;font-weight:600;color:#2997ff;"
    );
    console.log("2016  Started karate at Kaisho Karate Bassersdorf");
    console.log("2024  First regional podium");
    console.log("2025  Started teaching children · Brown belt");
    console.log("2026  Nicki Cup Austria · J&S 1418Coach");
    console.log("Full timeline → /karate");
  };

  window.showSecretProject = function () {
    console.log(
      "%c🚀 Opening Rummy…",
      "font-size:18px;font-weight:600;color:#2997ff;"
    );
    setTimeout(function () {
      window.location.href = "https://rummy.mogicato.ch/";
    }, 1200);
  };

  window.matrix = function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      console.log("Reduced motion is on — skipping the matrix.");
      return;
    }
    if (document.querySelector(".matrix-canvas")) return;

    var canvas = document.createElement("canvas");
    canvas.className = "matrix-canvas";
    document.body.appendChild(canvas);

    var ctx = canvas.getContext("2d");
    var chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    var fontSize = 14;
    var drops = [];
    var running = true;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drops = new Array(Math.ceil(canvas.width / fontSize)).fill(0);
    }

    function frame() {
      if (!running) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#2997ff";
      ctx.font = fontSize + "px monospace";

      for (var i = 0; i < drops.length; i++) {
        var char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize);
    frame();

    setTimeout(function () {
      running = false;
      window.removeEventListener("resize", resize);
      canvas.remove();
    }, 8000);
  };
})();
