/* DS R1 (Nov 5): proof in one screen. The pinned sideways showcase ("Built here. Live now.") took about 7,760px of scroll-jacking
   to show the apps two at a time, and read as a black void on capture and on short screens. It becomes one stage: a single large
   browser frame with the live-site screenshot, and a row of app tabs under it. Tabs swap the frame (auto-advance, pauses on
   hover, focus, hidden tab or reduced motion). All apps reachable in one screen, one column on every device.
   TORQ stays out, per the approved "remove leftover TORQ cards" item. Same screenshots, names, taglines and links as work-v4.js. */
(function(){
var A=[['zilt','Zilt','Post. Play. Get paid.','https://tryzilt.app'],
['booked','Booked','Keep more of the job.','https://trybooked.app'],
['curb','Curb','From both seats. Driver-built. Rider-ready.','https://getoncurb.app'],
['afterglow','Afterglow','Nights that pay you back.','https://tryafterglow.app'],
['people','Our People','Friends. Real circle. Teens join with a parent.','https://tryourpeople.app'],
['radr','RADR','See it before it hits.','/tkhub-preview/site-2026-11-14e/radr'],
['noir','NOIR','After dark. Open to play. 18+.','https://trynoir.app'],
['apex','APEX','Get to the apex.','https://apexpeakofcare.app'],
['role','ROLE','One role. One packet. No fiction.','https://tryrole.app']];
var V='?v=20261101b';
function dom(u){return u==='/tkhub-preview/site-2026-11-14e/radr'?'tkhub.app/radr':u.replace('https://','')}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
var hs=document.createElement('style');hs.textContent='section.tkw{display:none!important}';document.head.appendChild(hs);
var css='.ds1{background:#090a0c;color:#f4f6f8;padding:clamp(56px,9vw,112px) 0 clamp(48px,7vw,88px);scroll-margin-top:80px}'+
'.ds1 *{box-sizing:border-box}.ds1-in{width:min(1180px,100% - 32px);margin:0 auto}'+
'.ds1-k{margin:0 0 10px;color:#00CBF6;letter-spacing:.2em;text-transform:uppercase;font-size:.78rem;font-weight:700}'+
'.ds1-h{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:8px 24px;margin-bottom:clamp(20px,3vw,32px)}'+
'.ds1 h2{margin:0;font-size:clamp(2.2rem,7vw,5.2rem);line-height:.95;letter-spacing:-.04em;color:#fff;font-weight:500}'+
'.ds1-sub{margin:0;color:rgba(244,246,248,.6);max-width:34ch;font-size:1rem;line-height:1.45}'+
'.ds1-stage{position:relative;display:block;border-radius:clamp(14px,2vw,22px);overflow:hidden;background:#15181c;border:1px solid rgba(255,255,255,.1);box-shadow:0 40px 120px -50px rgba(0,203,246,.45);text-decoration:none;color:inherit}'+
'.ds1-bar{display:flex;align-items:center;gap:10px;height:38px;padding:0 14px;background:#121417;border-bottom:1px solid rgba(255,255,255,.08)}'+
'.ds1-dots{display:flex;gap:6px}.ds1-dots i{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,.18)}'+
'.ds1-url{flex:1;max-width:340px;margin:0 auto;text-align:center;font:500 12px/24px system-ui,sans-serif;color:rgba(244,246,248,.65);background:rgba(255,255,255,.06);border-radius:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'.ds1-view{display:block;position:relative;aspect-ratio:16/10;max-height:max(340px,calc(100svh - 330px));width:100%;overflow:hidden}'+
'.ds1-view img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top;opacity:0;transform:scale(1.02);transition:opacity .5s ease,transform 1.2s cubic-bezier(.2,.7,.2,1)}'+
'.ds1-view img.is-on{opacity:1;transform:none}'+
'.ds1-cap{position:absolute;left:0;right:0;bottom:0;display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:12px 20px;padding:clamp(18px,3vw,34px);background:linear-gradient(to top,rgba(5,6,8,.92),rgba(5,6,8,.55) 55%,transparent)}'+
'.ds1-name{display:block;margin:0;font-size:clamp(1.8rem,5vw,3.6rem);line-height:1;letter-spacing:-.03em;font-weight:600;color:#fff}'+
'.ds1-line{margin:6px 0 0;color:rgba(244,246,248,.78);font-size:clamp(.95rem,1.6vw,1.15rem)}'+
'.ds1-go{display:inline-flex;align-items:center;gap:8px;min-height:46px;padding:0 20px;border-radius:999px;background:#00CBF6;color:#04141a;font-weight:800;font-size:.98rem;white-space:nowrap}'+
'.ds1-stage:hover .ds1-go{filter:brightness(1.08)}.ds1-stage:focus-visible{outline:3px solid #00CBF6;outline-offset:4px}'+
'.ds1-tabs{display:flex;gap:8px;margin:16px 0 0;padding:0 0 4px;list-style:none;overflow-x:auto;scroll-snap-type:x proximity;scrollbar-width:none;-webkit-overflow-scrolling:touch}'+
'.ds1-tabs::-webkit-scrollbar{display:none}'+
'.ds1-tab{position:relative;flex:1 0 auto;scroll-snap-align:start;display:flex;align-items:center;gap:8px;min-height:48px;padding:0 14px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:#111316;color:rgba(244,246,248,.72);font:600 .92rem/1 inherit;cursor:pointer;overflow:hidden;transition:border-color .2s,color .2s,background .2s}'+
'.ds1-tab img{width:22px;height:22px;border-radius:6px;object-fit:contain}'+
'.ds1-tab:hover{color:#fff;border-color:rgba(0,203,246,.45)}'+
'.ds1-tab[aria-selected=true]{color:#fff;border-color:#00CBF6;background:rgba(0,203,246,.08)}'+
'.ds1-tab:focus-visible{outline:3px solid #00CBF6;outline-offset:2px}'+
'.ds1-tab i{position:absolute;left:0;bottom:0;height:2px;width:100%;background:#00CBF6;transform:scaleX(0);transform-origin:left}'+
'.ds1-tab[aria-selected=true] i{animation:ds1p var(--ds1t,5s) linear forwards}.ds1.is-paused .ds1-tab i{animation-play-state:paused}'+
'@keyframes ds1p{to{transform:scaleX(1)}}'+
'@media (max-width:640px){.ds1-bar{height:30px}.ds1-dots{display:none}.ds1-view{aspect-ratio:4/3}.ds1-cap{padding:16px;background:linear-gradient(to top,rgba(5,6,8,.96),rgba(5,6,8,.82) 62%,rgba(5,6,8,.2))}.ds1-go{min-height:44px;padding:0 16px;font-size:.92rem}.ds1-tab{flex:0 0 auto}}'+
'@media (prefers-reduced-motion:reduce){.ds1-view img{transition:none;transform:none}.ds1-tab[aria-selected=true] i{animation:none;transform:scaleX(1)}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
function build(){
 var old=document.getElementById('work');if(!old||document.querySelector('.ds1'))return !!document.querySelector('.ds1');
 old.id='work-old';
 var s=document.createElement('section');s.className='ds1';s.id='work';s.setAttribute('aria-labelledby','ds1-h');
 s.innerHTML='<div class="ds1-in"><p class="ds1-k">Proof · '+A.length+' apps, live</p><div class="ds1-h"><h2 id="ds1-h">Built here. Live now.</h2><p class="ds1-sub">The same studio that prices your build ships these. Tap one, then open the real site.</p></div>'+
 '<a class="ds1-stage" id="ds1-panel" role="tabpanel" target="_blank" rel="noopener"><span class="ds1-bar" aria-hidden="true"><span class="ds1-dots"><i></i><i></i><i></i></span><span class="ds1-url"></span></span>'+
 '<span class="ds1-view">'+A.map(function(a,i){return '<img src="/tkhub-preview/site-2026-11-14e/work/'+a[0]+'-site'+(i?'':'')+'.webp'+V+'" srcset="/tkhub-preview/site-2026-11-14e/work/'+a[0]+'-site-s.webp'+V+' 640w, /work/'+a[0]+'-site.webp'+V+' 1280w" sizes="(max-width:1212px) 100vw, 1180px" width="1280" height="800" alt="'+esc(a[1])+' website" '+(i?'loading="lazy" ':'')+'decoding="async">'}).join('')+
 '<span class="ds1-cap"><span><span class="ds1-name"></span><span class="ds1-line" style="display:block"></span></span><span class="ds1-go"><span class="ds1-gt"></span> <span aria-hidden="true">&#8599;</span></span></span></span></a>'+
 '<ul class="ds1-tabs" role="tablist" aria-label="Apps built here">'+A.map(function(a,i){return '<li role="presentation" style="display:contents"><button type="button" class="ds1-tab" role="tab" id="ds1-t'+i+'" aria-controls="ds1-panel" aria-selected="false" tabindex="-1"><img src="/tkhub-preview/site-2026-11-14e/logos/'+a[0]+'.png?v=3" alt="" width="22" height="22">'+esc(a[1])+'<i aria-hidden="true"></i></button></li>'}).join('')+'</ul></div>';
 old.insertAdjacentElement('beforebegin',s);
 var imgs=s.querySelectorAll('.ds1-view img'),tabs=s.querySelectorAll('.ds1-tab'),panel=s.querySelector('.ds1-stage');
 var nm=s.querySelector('.ds1-name'),ln=s.querySelector('.ds1-line'),gt=s.querySelector('.ds1-gt'),url=s.querySelector('.ds1-url');
 var cur=-1,timer=0,DUR=5000,pause=0,seen=false;
 var rm=matchMedia('(prefers-reduced-motion:reduce)');
 function show(i,user){cur=(i+A.length)%A.length;var a=A[cur];
  imgs.forEach(function(im,k){im.classList.toggle('is-on',k===cur)});
  tabs.forEach(function(t,k){var on=k===cur;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;var b=t.querySelector('i');if(b&&on){b.style.animation='none';void b.offsetWidth;b.style.animation=''}});
  nm.textContent=a[1];ln.textContent=a[2];gt.textContent='Visit '+dom(a[3]);url.textContent=dom(a[3]);
  panel.href=a[3];panel.setAttribute('aria-labelledby','ds1-t'+cur);panel.setAttribute('aria-label',a[1]+', '+a[2]+' Opens '+dom(a[3])+' in a new tab');
  if(user){stop();pause|=4;s.classList.add('is-paused');var tb=tabs[cur];if(tb.scrollIntoView&&tb.parentNode.scrollWidth>tb.parentNode.clientWidth)tb.parentNode.scrollTo({left:tb.offsetLeft-16,behavior:rm.matches?'auto':'smooth'})}else arm()}
 function stop(){clearTimeout(timer);timer=0}
 function arm(){stop();if(rm.matches||pause||!seen)return;timer=setTimeout(function(){show(cur+1)},DUR)}
 function setP(bit,on){if(on)pause|=bit;else pause&=~bit;s.classList.toggle('is-paused',!!pause||!seen);if(pause)stop();else arm()}
 tabs.forEach(function(t,k){t.addEventListener('click',function(){show(k,true)});
  t.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:e.key==='Home'?-cur:e.key==='End'?A.length-1-cur:0;if(!d)return;e.preventDefault();show(cur+d,true);tabs[cur].focus()})});
 s.addEventListener('mouseenter',function(){setP(1,true)});s.addEventListener('mouseleave',function(){setP(1,false)});
 s.addEventListener('focusin',function(){setP(2,true)});s.addEventListener('focusout',function(e){if(!s.contains(e.relatedTarget))setP(2,false)});
 document.addEventListener('visibilitychange',function(){setP(8,document.hidden)});
 if('IntersectionObserver' in window)new IntersectionObserver(function(es){seen=es[0].isIntersecting;s.classList.toggle('is-paused',!!pause||!seen);if(seen&&!pause)arm();else stop()},{threshold:.35}).observe(s);else seen=true;
 show(0);
 /* the old pinned section keeps its id-free shell hidden; the chapter rail and every #work link now land here */
 return true}
var n=0;function run(){if(document.readyState!=='complete'){addEventListener('load',run,{once:true});return}
 setTimeout(function w(){if(build())return;if(n++<120)setTimeout(w,100)},300)}
run();
})();
