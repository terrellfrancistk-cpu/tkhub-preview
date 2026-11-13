/* TK Hub launch (v2, replaces the unshipped v1 that had a progress bar and a caption): solid black screen with the
   centered TK Hub mark for ~1 s, a 200 ms fade, then the site. tkhub.app is TK Hub itself, so there is no separate
   product-logo step. Same timings as the Next source in PR #9. Runs from <head> before first paint, once per tab session;
   skipped for automated browsers. No bar, no caption. The homepage's React hydration can rebuild the document while the
   screen is up, so the overlay re-attaches itself until it is done. */
(function () {
  try { if (navigator.webdriver) return; if (sessionStorage.getItem('tk-launch')) return; sessionStorage.setItem('tk-launch', '1'); } catch (e) { }
  var st = document.createElement('style'); st.id = 'tk-launch-css';
  st.textContent = 'html{background:#000}#tk-launch{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;background:#000;transition:opacity .2s ease-out}#tk-launch img{width:140px;height:140px;object-fit:contain}#tk-launch.off{opacity:0;pointer-events:none}';
  var el = document.createElement('div'); el.id = 'tk-launch'; el.setAttribute('role', 'img'); el.setAttribute('aria-label', 'TK Hub LLC');
  el.innerHTML = '<img src="/tkhub-preview/site-2026-11-13d/brand/tk-hub.png" alt="" width="140" height="140" fetchpriority="high">';
  var done = false;
  function keep() {
    if (done) return;
    if (!st.isConnected) (document.head || document.documentElement).appendChild(st);
    if (!el.isConnected) document.documentElement.appendChild(el);
    requestAnimationFrame(keep);
  }
  keep();
  setTimeout(keep, 0);
  setTimeout(function () { el.classList.add('off'); }, 1000);
  setTimeout(function () { done = true; el.remove(); st.remove(); }, 1200);
})();
