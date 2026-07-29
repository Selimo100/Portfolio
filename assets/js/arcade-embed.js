/**
 * Lazily mounts the arcade iframe on the home page.
 *
 * The arcade is a whole second site; loading it eagerly would cost the home
 * page its Core Web Vitals for content most visitors scroll past. The iframe
 * src is only set once the section is close to the viewport. The section
 * always contains a plain link to the arcade, so it works without JS.
 */
(function () {
  "use strict";

  var holder = document.querySelector("[data-arcade-embed]");
  if (!holder) return;

  var src = holder.getAttribute("data-arcade-embed");
  if (!src) return;

  function mount() {
    if (holder.querySelector("iframe")) return;
    var iframe = document.createElement("iframe");
    iframe.src = src;
    iframe.title = "Selina's Arcade — playable preview";
    iframe.loading = "lazy";
    holder.appendChild(iframe);
  }

  if (!("IntersectionObserver" in window)) {
    mount();
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].isIntersecting) {
        mount();
        observer.disconnect();
      }
    },
    { rootMargin: "300px 0px" }
  );

  observer.observe(holder);
})();
