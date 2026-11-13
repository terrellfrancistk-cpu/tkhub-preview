/* TK Hub splash v1: product logo -> "TK Hub" screen (~1 s) -> content. Runs synchronously from <head>, once per tab session. */
(function () {
  try { if (sessionStorage.getItem('tk-splash')) return; sessionStorage.setItem('tk-splash', '1'); } catch (e) { }
  var rm = false; try { rm = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { }
  var css = '#tk-splash{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;background:#07080a;color:#fff;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;transition:opacity .4s ease}' +
    '#tk-splash.off{opacity:0;pointer-events:none}#tk-splash .s{position:absolute;inset:0;display:grid;place-items:center;opacity:0;transform:scale(.96);transition:opacity .32s ease,transform .5s cubic-bezier(.2,.8,.2,1)}#tk-splash .s.on{opacity:1;transform:none}' +
    '#tk-splash img{width:min(132px,30vw);height:auto;filter:drop-shadow(0 0 28px rgba(0,203,246,.35))}#tk-splash .w{text-align:center}#tk-splash .w b{display:block;font-size:clamp(28px,6vw,54px);font-weight:800;letter-spacing:-.03em;line-height:1}' +
    '#tk-splash .w span{display:block;margin-top:10px;font-size:11px;letter-spacing:.34em;text-transform:uppercase;color:#00CBF6;font-weight:700}#tk-splash .bar{position:absolute;left:50%;bottom:34px;width:120px;height:3px;margin-left:-60px;border-radius:3px;background:rgba(255,255,255,.1);overflow:hidden}' +
    '#tk-splash .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#0aa7cc,#00CBF6);transition:width 1.9s linear}#tk-splash.go .bar i{width:100%}body.tk-splashing .boot{display:none!important}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  var el = document.createElement('div'); el.id = 'tk-splash'; el.setAttribute('role', 'status'); el.setAttribute('aria-label', 'Loading TK Hub');
  el.innerHTML = '<div class="s a on"><img src="/tkhub-preview/site-2026-11-13j/logos/tkhub-mark.png" alt="" width="132" height="132"></div><div class="s b"><div class="w"><b>TK Hub</b><span>One house</span></div></div><div class="bar"><i></i></div>';
  function mount() { if (!document.body) return setTimeout(mount, 5); document.body.classList.add('tk-splashing'); document.body.appendChild(el); requestAnimationFrame(function () { el.classList.add('go'); }); }
  mount();
  var t1 = rm ? 500 : 900, t2 = rm ? 900 : 1950;
  setTimeout(function () { var a = el.querySelector('.a'), b = el.querySelector('.b'); a.classList.remove('on'); b.classList.add('on'); }, t1);
  setTimeout(function () { el.classList.add('off'); document.body.classList.remove('tk-splashing'); setTimeout(function () { el.remove(); }, 450); }, t2);
})();
