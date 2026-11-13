/* tkhub homepage: Roadster card (v26). Same tile language as the car chooser (.chooser-grid): full-bleed still, big white label bottom-left. */
(function(){function go(){var d=document.getElementById('drive'),m=document.querySelector('main');if(!m)return setTimeout(go,150);go.n=(go.n||0)+1;if(!d&&go.n<40)return setTimeout(go,150);if(m.dataset.tkrd)return;m.dataset.tkrd=1;
var css=document.createElement('style');css.id='tkrd-css';css.textContent=
'.tkrd{background:#090a0c;color:#fff;padding:0 0 clamp(2.5rem,6vw,4rem)}'+
'.tkrd .wrap>p.tkrd-k{color:#00CBF6;letter-spacing:.16em;text-transform:uppercase;font-size:11px;font-weight:700;margin:0}'+
'.tkrd-card{display:grid;grid-template-columns:1.35fr 1fr;gap:4px;width:min(94vw,1280px);margin:1rem auto 0;background:#090a0c}'+
'.tkrd-tile{position:relative;overflow:hidden;background:#090a0c;display:block}.tkrd-tile img{display:block;width:100%;height:100%;min-height:42vh;object-fit:cover}'+
'.tkrd-tile span{position:absolute;left:16px;bottom:14px;color:#fff;font-size:2rem;font-weight:800;letter-spacing:-.04em;text-shadow:0 2px 10px #000000bf}'+
'.tkrd-tile em{position:absolute;left:16px;top:14px;font-style:normal;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5EC8FF}'+
'.tkrd-info{background:#0e1013;padding:22px 22px 18px;display:flex;flex-direction:column;gap:14px}'+
'.tkrd-stats{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:12px 16px}.tkrd-stats li{border-top:1px solid rgba(255,255,255,.12);padding-top:8px}'+
'.tkrd-stats b{display:block;font-size:1.6rem;font-weight:800;letter-spacing:-.03em}.tkrd-stats small{opacity:.7;font-size:12px}'+
'.tkrd-note{opacity:.6;font-size:12px;margin:0}.tkrd-go{align-self:flex-start;background:#00CBF6;color:#04141a;font-weight:800;padding:12px 22px;border-radius:999px;text-decoration:none}'+
'.tkrd-cc{opacity:.55;font-size:11px;margin:0}.tkrd-cc a{color:inherit}'+
'@media (max-width:800px){.tkrd-card{grid-template-columns:1fr}.tkrd-tile img{min-height:28vh}.tkrd-stats b{font-size:1.3rem}}';
document.head.appendChild(css);
var s=document.createElement('section');s.id='roadster';s.className='tkrd';s.setAttribute('aria-label','Roadster');
s.innerHTML='<div class="wrap"><p class="tkrd-k">New in the drive</p></div><div class="tkrd-card">'+
'<a class="tkrd-tile" href="/tkhub-preview/site-2026-11-13q/drive/?car=roadster" target="_blank" rel="noopener"><img src="/tkhub-preview/site-2026-11-13q/media/roadster-card.webp" alt="White Roadster, front three-quarter" width="1400" height="745" loading="lazy" decoding="async"><em>Thrust mode</em><span>Roadster</span></a>'+
'<div class="tkrd-info"><ul class="tkrd-stats"><li><b>&lt;1.0 s</b><small>0–60 mph (Thrust package)</small></li><li><b>230+ mph</b><small>Top speed</small></li><li><b>~2 g</b><small>Fan downforce</small></li><li><b>10</b><small>Cold-gas thrusters</small></li><li><b>2028</b><small>Production planned</small></li></ul>'+
'<p class="tkrd-note">Figures are manufacturer claims, not measured. In the game: boost with the thrusters, hop over traffic.</p>'+
'<a class="tkrd-go" href="/tkhub-preview/site-2026-11-13q/drive/?car=roadster" target="_blank" rel="noopener">Drive it</a>'+
'<p class="tkrd-cc">3D model: <a href="https://sketchfab.com/3d-models/7630c9fe842d4f5ea86fc1f122753b89" target="_blank" rel="noopener">“Tesla Roadtser 2026”</a> by asiphy007, <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a> (modified). Not affiliated with any automaker.</p></div></div>';
(d||m.querySelector('#the-cars')||m.lastElementChild).after(s)}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go()})();
