/* tkhub.app homepage runtime (Nov 7, PERFECT round 1). The homepage is now one static page: the layout the 27 overlay
   scripts used to build after React hydrated is baked into index.html. This file carries the only behavior the page needs:
   the quote builder total, the phone buy bar, the menu and the theme buttons. The proof phones (try-v1.js) and the order
   sheet (sheet-v5.js) load next to it. No framework, no timers, nothing left running. */
(function () {
  var d = document, root = d.documentElement;
  function q(s, r) { return (r || d).querySelector(s); }

  /* Quote builder (was quote-v1.js) */
  function v(n) { var e = q('input[name="' + n + '"]:checked'); return e ? e.value : ''; }
  function money(c) { return '$' + (c / 100).toLocaleString('en-US', { maximumFractionDigits: 2 }); }
  function up() {
    var tot = q('#tkq-total'); if (!tot) return;
    var b = v('tkq-build'), p = v('tkq-pass'), site = b !== 'app', app = b !== 'site';
    q('#tkq-l-site').hidden = !site; q('#tkq-l-app').hidden = !app; q('#tkq-l-pass').hidden = p === 'none';
    if (p === 'month') { q('#tkq-l-pass-n').textContent = 'The Pass (monthly)'; q('#tkq-l-pass-v').textContent = '$24.99/mo'; }
    if (p === 'year') { q('#tkq-l-pass-n').textContent = 'The Pass (yearly)'; q('#tkq-l-pass-v').textContent = '$224.99'; }
    tot.textContent = money((site ? 100000 : 0) + (app ? 500000 : 0));
    q('#tkq-dep').textContent = site && app ? '$250 + $500' : (site ? '$250' : '$500');
    var go = q('#tkq-go'); go.href = '/tkhub-preview/site-2026-11-14j/order/?kind=' + (site ? 'site' : 'app');
    go.textContent = site ? (app ? 'Start the site for $250' : 'Start for $250') : 'Start for $500';
    q('#tkq-alt').hidden = !(site && app); q('#tkq-pass').hidden = p === 'none';
    syncBar();
  }
  d.addEventListener('change', function (e) { var n = e.target && e.target.name; if (n && n.indexOf('tkq-') === 0) up(); });

  /* Phone buy bar (was ds-r3.js): mirrors the total while the builder is on screen and the real card is not. */
  var bar, barT, barB;
  function syncBar() { if (!bar) return; barT.textContent = q('#tkq-total').textContent; barB.textContent = q('#tkq-go').textContent; }
  (function () {
    var quote = q('#quote'), card = quote && q('.tkq-card', quote);
    if (!card || !('IntersectionObserver' in window)) return;
    bar = d.createElement('div'); bar.className = 'ds3-bar'; bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<span class="ds3-l"><small>Your build total</small><span class="ds3-t"></span></span><button type="button" class="ds3-go" tabindex="-1"></button>';
    d.body.appendChild(bar); barT = q('.ds3-t', bar); barB = q('.ds3-go', bar); syncBar();
    barB.addEventListener('click', function () { q('#tkq-go').click(); });
    var inQ = false, cardOn = false;
    function upd() { bar.classList.toggle('is-on', inQ && !cardOn); }
    new IntersectionObserver(function (e) { inQ = e[0].isIntersecting; upd(); }, { rootMargin: '-30% 0px -10% 0px' }).observe(quote);
    new IntersectionObserver(function (e) { cardOn = e[0].isIntersecting; upd(); }, { threshold: 0.25 }).observe(card);
  })();

  /* Menu (was React): full-screen panel, Escape closes, focus returns to the button. */
  var menuBtn = q('.site-header .menu-word'), panel = null;
  var MENU = '<nav class="mercury-menu" aria-label="Primary"><div class="mercury-top"><a class="brand" aria-label="Home" href="/tkhub-preview/site-2026-11-14j/"><img alt="" src="/tkhub-preview/site-2026-11-14j/logos/w160/tkhub-mark.webp?v=m1" width="160" height="160"></a><button type="button" class="menu-word" aria-expanded="true">Close</button></div><div class="mercury-body"><div class="mercury-links"><a class="is-on" href="/tkhub-preview/site-2026-11-14j/" aria-current="page" style="animation-delay:80ms"><em>01</em>House</a><a href="/tkhub-preview/site-2026-11-14j/sites/" style="animation-delay:150ms"><em>02</em>Sites</a><a href="/tkhub-preview/site-2026-11-14j/pass/" style="animation-delay:220ms"><em>03</em>Pass</a><a href="/tkhub-preview/site-2026-11-14j/founders/" style="animation-delay:290ms"><em>04</em>Founders</a><a href="/tkhub-preview/site-2026-11-14j/contact/" style="animation-delay:360ms"><em>05</em>Contact</a></div><aside class="mercury-side"><p>Websites are one thousand dollars. Apps are five thousand.</p><a href="tel:+14699031262">469-903-1262</a><a href="/tkhub-preview/site-2026-11-14j/order/?kind=site">Start a site</a><a href="/tkhub-preview/site-2026-11-14j/account/">Sign in</a></aside></div></nav>';
  function closeMenu() {
    if (!panel) return; panel.remove(); panel = null; root.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.textContent = 'Menu'; menuBtn.focus();
    d.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape') closeMenu(); }
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.addEventListener('click', function () {
      if (panel) { closeMenu(); return; }
      var t = d.createElement('template'); t.innerHTML = MENU; panel = t.content.firstChild;
      q('.site-header').after(panel); root.classList.add('menu-open');
      menuBtn.setAttribute('aria-expanded', 'true'); menuBtn.textContent = 'Close';
      q('.menu-word', panel).addEventListener('click', closeMenu);
      panel.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
      d.addEventListener('keydown', onKey);
      var first = q('.mercury-links a', panel); if (first) first.focus();
    });
  }

  /* Theme buttons in the footer (was React). Same storage key as the inline head script. */
  var themeBtns = [].slice.call(d.querySelectorAll('.site-footer button[aria-pressed]'));
  function choice() { try { return localStorage.getItem('tk-theme') || 'system'; } catch (e) { return 'system'; } }
  function apply(c) {
    var dark = c === 'dark' || (c === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    root.setAttribute('data-theme', dark ? 'dark' : 'light'); root.setAttribute('data-theme-choice', c);
    themeBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(key(b) === c)); });
  }
  function key(b) { var t = b.textContent.trim().toLowerCase(); return t === 'auto' ? 'system' : t; }
  themeBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var c = key(b);
      try { if (c === 'system') localStorage.removeItem('tk-theme'); else localStorage.setItem('tk-theme', c); } catch (e) { }
      apply(c);
    });
  });
  if (themeBtns.length) {
    apply(choice());
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { if (choice() === 'system') apply('system'); });
  }

  /* R2: the header's Start button stays hidden while the hero's own is on screen (one primary at a time) */
  (function () {
    var go = q('.r2-go');
    if (!go || !('IntersectionObserver' in window)) { root.classList.remove('r2-hero-on'); return; }
    new IntersectionObserver(function (e) { root.classList.toggle('r2-hero-on', e[0].isIntersecting); }, { rootMargin: '-64px 0px 0px 0px' }).observe(go);
  })();

  up();
})();
