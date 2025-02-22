document.addEventListener("DOMContentLoaded", () => {
  // Smooth Scrolling für Navigationslinks
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Formular-Submit (Platzhalter)
  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Form submitted! (This is a placeholder action)");
    });
  }
});
