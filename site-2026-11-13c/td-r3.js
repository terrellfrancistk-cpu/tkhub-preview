/* Nov 4 cleanup: DOM edits wait until after React hydration (fixes React #418 on the homepage); targets are hidden by CSS meanwhile. */
/* TD R3: one door to the drive. The car chapter ran about 2,500px (game embed, three spec cards, a car film) in the middle of
   a studio sales page. It folds into one wide after-hours banner with a single Drive button to /drive/; the spec cards and
   the car film go. The chapter rail's "Cars" stop now lands on the banner. */
(function(){var hs=document.createElement('style');hs.textContent='#cars3,#film,#the-cars{display:none!important}#drive:not(.tdd){visibility:hidden}';document.head.appendChild(hs);
var css='#drive.tdd{padding:0!important;margin:56px auto!important;max-width:1320px}'+
'#drive.tdd .tdd-in{position:relative;display:grid;grid-template-columns:1.1fr 1fr;align-items:center;gap:32px;margin:0 24px;border-radius:24px;overflow:hidden;background:#07090c;color:#fff;min-height:320px}'+
'#drive.tdd .tdd-art{align-self:stretch;background:#000 url(/tkhub-preview/site-2026-11-13c/media/hub-hero.jpg) center/cover;min-height:240px}'+
'#drive.tdd .tdd-copy{padding:40px 40px 40px 0}#drive.tdd h2{font-size:clamp(32px,4vw,56px);line-height:1;margin:6px 0 14px}'+
'#drive.tdd .tdd-copy p{opacity:.75;max-width:40ch;margin:0 0 22px}'+
'#drive.tdd .tdd-go{display:inline-block;padding:14px 22px;border-radius:999px;background:#00c2ff;color:#001018;font-weight:700;text-decoration:none}'+
'@media(max-width:760px){#drive.tdd .tdd-in{grid-template-columns:1fr;margin:0 14px}#drive.tdd .tdd-copy{padding:0 22px 28px}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var n=0;function run(){
 ['#cars3','#film','#the-cars'].forEach(function(s){var e=document.querySelector(s);if(e)e.remove()});
 var d=document.getElementById('drive');
 if(d&&!d.classList.contains('tdd')){d.classList.add('tdd');
  d.innerHTML='<div class="tdd-in"><div class="tdd-art" role="img" aria-label="Night street scene"></div><div class="tdd-copy"><p class="tkg-k">After hours</p><h2>Take the night shift.</h2><p>Three cars, live weather, real crashes. It runs in your browser.</p><a class="tdd-go" href="/tkhub-preview/site-2026-11-13c/drive/">Drive it</a></div></div>';}
 var r=document.querySelector('#ux4-rail a[href="#the-cars"],#ux4-rail a[href="#cars3"]');if(r)r.setAttribute('href','#drive');
 if(++n<40)setTimeout(run,250)}
function go(){setTimeout(run,1200)}if(document.readyState==='complete')go();else window.addEventListener('load',go)})();
