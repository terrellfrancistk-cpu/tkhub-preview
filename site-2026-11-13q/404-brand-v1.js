/* 404-brand-v1.js (Nov 13, D15): adds the way home under the 404 sentence and a TK Hub title. Runs after the page
   has hydrated so React keeps its own markup; re-adds the links if React ever re-renders the block. */
(function () {
  function add() {
    var h = document.querySelector("main .next-error-h1");
    if (!h) return;
    var box = h.parentNode;
    if (!box.querySelector(".tk404-k")) {
      var k = document.createElement("p"); k.className = "tk404-k"; k.textContent = "TK Hub";
      box.insertBefore(k, h);
    }
    if (!box.querySelector(".tk404-acts")) {
      var d = document.createElement("div"); d.className = "tk404-acts";
      d.innerHTML = '<a class="tk404-home" href="/tkhub-preview/site-2026-11-13q/">Back to TK Hub</a><a href="/tkhub-preview/site-2026-11-13q/contact/">Contact</a>';
      box.appendChild(d);
    }
    if (/could not be found/.test(document.title)) document.title = "Page not found · TK Hub";
  }
  function start() {
    setTimeout(function () {
      add();
      var m = document.querySelector("main");
      if (m) new MutationObserver(add).observe(m, { childList: true, subtree: true });
    }, 250);
  }
  if (document.readyState === "complete") start(); else window.addEventListener("load", start);
})();
