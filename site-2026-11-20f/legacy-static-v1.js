/* Nov 8: the older pages were a server app mirrored as files. Its scripts called endpoints that do not exist on this
   host (404s, a hydration crash), so those pages now ship as plain HTML. This is the little that still needs a script:
   the phone menu and the Light / Dark / Auto switch. */
(function () {
  var menuBtn = document.querySelector('button[aria-label="Menu"]');
  var menu = document.querySelector(".merc-menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", function () {
      var open = !menu.classList.contains("is-open");
      menu.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  var buttons = Array.prototype.filter.call(document.querySelectorAll("footer button[aria-pressed]"), function (b) {
    return /^(light|dark|auto)$/i.test(b.textContent.trim());
  });
  function apply(choice) {
    var dark = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches;
    var mode = choice === "light" ? "light" : choice === "dark" ? "dark" : dark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-theme-choice", choice);
    buttons.forEach(function (b) {
      var c = b.textContent.trim().toLowerCase();
      var on = (c === "auto" ? "system" : c) === choice;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.classList.toggle("bg-fg", on);
      b.classList.toggle("text-bg", on);
      b.classList.toggle("text-muted", !on);
    });
  }
  var saved = "system";
  try {
    var s = localStorage.getItem("tk-theme");
    saved = s === "light" || s === "day" ? "light" : s === "dark" || s === "night" || s === "carbon" ? "dark" : "system";
  } catch (e) {}
  if (buttons.length) apply(saved);
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var c = b.textContent.trim().toLowerCase();
      var choice = c === "auto" ? "system" : c;
      try {
        localStorage.setItem("tk-theme", choice);
      } catch (e) {}
      apply(choice);
    });
  });
})();
