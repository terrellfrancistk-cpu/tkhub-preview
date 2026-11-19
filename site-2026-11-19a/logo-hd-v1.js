/* logo-hd-v1.js (Nov 13): full-resolution app icons on high-density screens. Any <img> that points at a
   /logos/w96/ or /logos/w160/ icon gets a srcset with the sharp /logos/hd/ version when one exists, so phones and
   Retina screens never upscale a 96 px icon. The original src stays as the 1x fallback. Covers icons that other
   scripts add later (the proof phones) via a MutationObserver. */
(function () {
  var HD = { zilt: 512, curb: 512, people: 512, booked: 180, apex: 291, works: 512, dental: 512, fouram: 512, 'tkhub-mark': 512, afterglow: 160, noir: 160, radr: 160, role: 180, wrace: 160 };
  function up(img) {
    if (!img || img.srcset || !img.getAttribute) return;
    var s = img.getAttribute('src') || '', m = s.match(/\/logos\/(w96|w160)\/([a-z-]+)\.webp/) || s.match(/\/logos\/()([a-z-]+)\.png/);
    if (!m || !HD[m[2]]) return;
    var w = m[1] === 'w96' ? 96 : m[1] === 'w160' ? 160 : (img.naturalWidth || 160);
    if (HD[m[2]] <= w) return; // the page already shows the full-size original
    var base = s.slice(0, s.indexOf('logos/')); /* works at the site root, under ../, or under a preview sub-path */
    var r = img.getBoundingClientRect().width || +img.getAttribute('width') || 48;
    img.sizes = Math.max(24, Math.round(Math.min(r, 160))) + 'px';
    img.srcset = s + ' ' + w + 'w, ' + base + 'logos/hd/' + m[2] + '.webp?v=1 ' + HD[m[2]] + 'w';
  }
  function scan(root) { (root.querySelectorAll ? root.querySelectorAll('img') : []).forEach(up); }
  scan(document);
  new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) { if (n.tagName === 'IMG') up(n); else scan(n); } }); }); })
    .observe(document.documentElement, { childList: true, subtree: true });
})();
