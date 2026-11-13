/* tkhub homepage: three drivable cars (v27). Sedan, Coupe, Roadster in one row (stacks on phones). Neutral names, no badges. */
(function(){function go(){var d=document.getElementById('drive'),m=document.querySelector('main');if(!m)return setTimeout(go,150);go.n=(go.n||0)+1;if(!d&&go.n<40)return setTimeout(go,150);if(m.dataset.tkrd)return;m.dataset.tkrd=1;
var css=document.createElement('style');css.id='tkrd-css';css.textContent=
'.tkrd{background:#090a0c;color:#fff;padding:0 0 clamp(2.5rem,6vw,4rem)}'+
'.tkrd .wrap>p.tkrd-k{color:#00CBF6;letter-spacing:.16em;text-transform:uppercase;font-size:11px;font-weight:700;margin:0}'+
'.tkrd-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;width:min(94vw,1280px);margin:1rem auto 0}'+
'.tkrd-card{display:flex;flex-direction:column;background:#0e1013;min-width:0}'+
'.tkrd-tile{position:relative;overflow:hidden;background:#090a0c;display:block;aspect-ratio:1400/745}.tkrd-tile img{display:block;width:100%;height:100%;object-fit:cover}'+
'.tkrd-tile span{position:absolute;left:14px;bottom:10px;color:#fff;font-size:1.7rem;font-weight:800;letter-spacing:-.04em;text-shadow:0 2px 10px #000000bf}'+
'.tkrd-tile em{position:absolute;left:14px;top:12px;font-style:normal;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5EC8FF}'+
'.tkrd-info{padding:16px 18px 16px;display:flex;flex-direction:column;gap:12px;flex:1}'+
'.tkrd-stats{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:10px 14px}.tkrd-stats li{border-top:1px solid rgba(255,255,255,.12);padding-top:7px}'+
'.tkrd-stats b{display:block;font-size:1.3rem;font-weight:800;letter-spacing:-.03em}.tkrd-stats small{opacity:.7;font-size:12px}'+
'.tkrd-note{opacity:.6;font-size:12px;margin:0}.tkrd-go{margin-top:auto;align-self:flex-start;background:#00CBF6;color:#04141a;font-weight:800;padding:11px 20px;border-radius:999px;text-decoration:none}'+
'.tkrd-cc{opacity:.55;font-size:11px;margin:0}.tkrd-cc a{color:inherit}'+
'@media (max-width:980px){.tkrd-row{grid-template-columns:1fr}}';
document.head.appendChild(css);
function card(k,name,tag,alt,stats,note,cc){return '<article class="tkrd-card" id="car-'+k+'"><a class="tkrd-tile" href="/tkhub-preview/claude-v30-2026-11-13/drive/?car='+k+'" target="_blank" rel="noopener"><img src="/tkhub-preview/claude-v30-2026-11-13/media/'+k+'-card.webp?v=27" alt="'+alt+'" width="1400" height="745" loading="lazy" decoding="async"><em>'+tag+'</em><span>'+name+'</span></a>'+
'<div class="tkrd-info"><ul class="tkrd-stats">'+stats.map(function(x){return '<li><b>'+x[0]+'</b><small>'+x[1]+'</small></li>'}).join('')+'</ul><p class="tkrd-note">'+note+'</p>'+
'<a class="tkrd-go" href="/tkhub-preview/claude-v30-2026-11-13/drive/?car='+k+'" target="_blank" rel="noopener">Drive it</a>'+(cc||'')+'</div></article>'}
var s=document.createElement('section');s.id='cars3';s.className='tkrd';s.setAttribute('aria-label','Drivable cars');
s.innerHTML='<span id="roadster"></span><div class="wrap"><p class="tkrd-k">Pick a car</p></div><div class="tkrd-row">'+
card('sedan','Sedan','Twin-turbo V8','Dark super sedan, front three-quarter',[['717 hp','Hybrid V8 system'],['3.4 s','0–60 mph'],['190 mph','Top speed (limited)'],['AWD','Rear-biased']],'Figures are manufacturer claims for the real car this is modeled on. In the game: V8 burble, turbo spool, all-wheel drive.')+
card('coupe','Coupe','Flat-six, 9,000 rpm','Track coupe with big rear wing, front three-quarter',[['518 hp','Naturally aspirated flat-six'],['3.0 s','0–60 mph'],['184 mph','Top speed'],['9,000','rpm redline']],'Figures are manufacturer claims for the real car this is modeled on. In the game: rear-drive, high-revving, lots of downforce.')+
card('roadster','Roadster','Thrust mode','White Roadster, front three-quarter',[['&lt;1.0 s','0–60 mph (Thrust package)'],['230+ mph','Top speed'],['~2 g','Fan downforce'],['F','Fly mode in the game']],'Figures are manufacturer claims, not measured. In the game: boost with the thrusters, hop over traffic, or press F to fly.',
'<p class="tkrd-cc">3D model: <a href="https://sketchfab.com/3d-models/7630c9fe842d4f5ea86fc1f122753b89" target="_blank" rel="noopener">“Tesla Roadtser 2026”</a> by asiphy007, <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a> (modified). Not affiliated with any automaker.</p>')+'</div>';
(d||m.querySelector('#the-cars')||m.lastElementChild).after(s)}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',go):go()})();
