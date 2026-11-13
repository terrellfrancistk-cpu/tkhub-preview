/* Try the apps (Nov 6): every TK Hub app in one iPhone frame on the homepage. The demos moved here from terrellfrancis.app.
   Each frame loads the app itself (its in-browser app build, already used by that app's own site), never the marketing site,
   so there is no phone-inside-a-phone. RADR runs from a copy hosted here. TORQ has no browser build, so its frame turns
   sideways and shows screens from the iPhone build. One iframe at a time, loaded only when the section is near the screen.
   Round 1 (Nov 6): one proof, not two. The phones take over the proof section (#work) in place of the browser-frame stage of
   marketing screenshots, so the page keeps Price -> Proof -> Start and loses a second app picker (~1,000px). */
(function(){
var A=[
 {id:'apex',n:'APEX',t:'Practice software for dental and healthcare offices.',c:'#b5c934',logo:'apex',u:'https://apexpeakofcare.app/tryphone/index.html',s:'https://apexpeakofcare.app',sd:'apexpeakofcare.app'},
 {id:'role',n:'ROLE',t:'Applies on the company’s own career page.',c:'#2f5d8f',logo:'role',u:'https://tryrole.app/tryphone/index.html',s:'https://tryrole.app',sd:'tryrole.app'},
 {id:'booked',n:'Booked',t:'One job, one verified pro, no lead fees.',c:'#d97706',logo:'booked',u:'https://trybooked.app/tryphone/index.html',s:'https://trybooked.app',sd:'trybooked.app'},
 {id:'curb',n:'Curb',t:'Rides and food. Drivers set the meter.',c:'#15803d',logo:'curb',u:'https://getoncurb.app/tryphone/index.html',s:'https://getoncurb.app',sd:'getoncurb.app'},
 {id:'zilt',n:'Zilt',t:'Short video, circles and arcade games.',c:'#c6f432',logo:'zilt',u:'https://tryzilt.app/tryphone/index.html',s:'https://tryzilt.app',sd:'tryzilt.app'},
 {id:'people',n:'Our People',t:'One quiet place for everyone helping your parent.',c:'#c2622d',logo:'people',u:'https://tryourpeople.app/tryphone/index.html',s:'https://tryourpeople.app',sd:'tryourpeople.app'},
 {id:'radr',n:'RADR',t:'Police, cameras and hazards on the road ahead.',c:'#22c55e',logo:'radr',u:'/tkhub-preview/site-2026-11-13o/try/radr/index.html',s:'/tkhub-preview/site-2026-11-13o/radr',sd:'tkhub.app/radr'},
 {id:'afterglow',n:'Afterglow',t:'Pull the lever. Light the street.',c:'#d4145a',logo:'afterglow',u:'https://tryafterglow.app/try/index.html?demo=1',s:'https://tryafterglow.app',sd:'tryafterglow.app'},
 {id:'noir',n:'NOIR',t:'A social casino. Play coins only. 18+.',c:'#c9a227',logo:'noir',u:'https://trynoir.app/tryphone/index.html',s:'https://trynoir.app',sd:'trynoir.app'}];
var LV='?v=3',SV='?v=1';function logo(n){return '/tkhub-preview/site-2026-11-13o/logos/w96/'+n+'.webp?v=1'}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
var css=
'#work.tka-host{padding:0!important;background:none!important;min-height:0!important}#work.tka-host>:not(.tka){display:none!important}'+
'.tka{background:#efece4;color:#141414;padding:clamp(64px,9vw,120px) 0;scroll-margin-top:80px;overflow:hidden;overflow:clip}'+
'.tka .tka-sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}'+
'.tka-copy,.tka-stage{min-width:0}'+
'.tka *{box-sizing:border-box}.tka-in{width:min(1180px,100% - 32px);margin:0 auto;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:clamp(32px,6vw,88px);align-items:center}'+
'.tka-k{margin:0 0 12px;color:#0b6b80;letter-spacing:.2em;text-transform:uppercase;font-size:.78rem;font-weight:700}'+
'.tka h2{margin:0;font-size:clamp(2.4rem,6.2vw,4.9rem);line-height:.94;letter-spacing:-.045em;font-weight:500;color:#111}'+
'.tka-sub{margin:18px 0 0;max-width:38ch;font-size:1.06rem;line-height:1.5;color:rgba(20,20,20,.66)}'+
'.tka-list{list-style:none;margin:clamp(24px,3.4vw,36px) 0 0;padding:0;display:grid;grid-template-columns:1fr 1fr;gap:8px}'+
'.tka-tab{all:unset;box-sizing:border-box;display:flex;align-items:center;gap:12px;width:100%;min-height:60px;padding:9px 12px;border-radius:16px;cursor:pointer;border:1px solid rgba(0,0,0,.08);background:rgba(255,255,255,.55);transition:background .2s,border-color .2s,box-shadow .2s,transform .2s}'+
'.tka-tab:hover{background:#fff;border-color:rgba(0,0,0,.14)}'+
'.tka-tab:focus-visible{outline:2px solid #0b6b80;outline-offset:2px}'+
'.tka-tab[aria-selected=true]{background:#111;border-color:#111;color:#fff;box-shadow:0 14px 30px -18px rgba(0,0,0,.6)}'+
'.tka-tab img{width:38px;height:38px;border-radius:10px;object-fit:contain;flex:none;background:#fff}'+
'.tka-tab b{display:block;font-size:.98rem;font-weight:650;letter-spacing:-.01em;line-height:1.2}'+
'.tka-tab small{display:block;margin-top:2px;font-size:.78rem;line-height:1.3;opacity:.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:22ch}'+
'.tka-tab span{min-width:0}'+
'.tka-stage{display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:calc(var(--pp) * 2.17 + 140px)}'+
'.tka{--pp:min(340px,78vw);--pw:var(--pp)}'+
'.tka-phone{position:relative;width:var(--pw);padding:calc(var(--pw) * .036);border-radius:calc(var(--pw) * .17);background:linear-gradient(150deg,#3b3d42,#141518 45%,#2a2b2f);box-shadow:0 0 0 1.5px #55575d inset,0 0 0 1px rgba(0,0,0,.4),0 50px 90px -40px rgba(0,0,0,.55),0 20px 40px -24px rgba(0,0,0,.35);transition:width .55s cubic-bezier(.2,.8,.2,1),border-radius .55s,padding .55s}'+
'.tka-phone:before,.tka-phone:after{content:"";position:absolute;background:#2c2d31;border-radius:3px}'+
'.tka-phone:before{left:-3px;top:22%;width:3px;height:9%;box-shadow:0 calc(var(--pw) * .16) 0 #2c2d31}'+
'.tka-phone:after{right:-3px;top:28%;width:3px;height:13%}'+
'.tka-phone.tka-kb{outline:2px solid #00CBF6;outline-offset:4px}'+
'.tka-screen{position:relative;width:100%;aspect-ratio:390/844;border-radius:calc(var(--pw) * .135);overflow:hidden;background:#000;isolation:isolate;transition:aspect-ratio .55s,border-radius .55s}'+
'.tka-screen iframe{position:absolute;left:0;top:0;width:390px;height:844px;border:0;transform-origin:0 0;transform:scale(var(--k,1));background:#000}'+
'.tka-island{position:absolute;top:calc(var(--pw) * .028);left:50%;width:31%;height:calc(var(--pw) * .085);margin-left:-15.5%;border-radius:99px;background:#000;z-index:4;pointer-events:none}'+
'.tka-load{position:absolute;inset:0;z-index:3;display:grid;place-items:center;background:radial-gradient(circle at 50% 42%,var(--c),#050505 72%);transition:opacity .35s ease}'+
'.tka-load img{width:30%;max-width:96px;border-radius:22%;box-shadow:0 18px 40px -14px rgba(0,0,0,.6);animation:tkaP 1.6s ease-in-out infinite}'+
'.tka-load.off{opacity:0;pointer-events:none}'+
'@keyframes tkaP{50%{transform:scale(.94);opacity:.82}}'+
'.tka-tap{all:unset;position:absolute;inset:0;z-index:5;display:grid;place-items:center;cursor:pointer}'+
'.tka-tap span{padding:13px 22px;border-radius:999px;background:rgba(0,0,0,.55);border:1px solid rgba(255,255,255,.28);color:#fff;font-weight:700;font-size:.98rem;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}'+
'.tka-tap:focus-visible span{outline:2px solid #fff;outline-offset:3px}'+
'.tka-car{position:absolute;inset:0;display:flex;transition:transform .5s cubic-bezier(.2,.8,.2,1)}'+
'.tka-car img{flex:none;width:100%;height:100%;object-fit:cover;display:block}'+
'.tka.is-land{--pw:min(600px,92vw)}'+
'.tka.is-land .tka-phone{padding:calc(var(--pw) * .02);border-radius:calc(var(--pw) * .085)}'+
'.tka.is-land .tka-phone:before{left:22%;top:-3px;width:9%;height:3px;box-shadow:calc(var(--pw) * .1) 0 0 #2c2d31}'+
'.tka.is-land .tka-phone:after{right:auto;left:auto;top:auto;bottom:-3px;right:30%;width:13%;height:3px}'+
'.tka.is-land .tka-screen{aspect-ratio:874/402;border-radius:calc(var(--pw) * .07)}'+
'.tka.is-land .tka-island{display:none}'+
'.tka-meta{margin-top:22px;width:min(100%,600px);text-align:center}'+
'.tka-meta p{margin:0;font-size:1rem;line-height:1.45;color:rgba(20,20,20,.72)}'+
'.tka-links{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 10px;margin-top:14px}'+
'.tka-links a,.tka-links button{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 18px;border-radius:999px;font-weight:650;font-size:.92rem;cursor:pointer;border:1px solid rgba(0,0,0,.16);color:#111;background:#fff}'+
'.tka-links a.pri{background:#111;color:#fff;border-color:#111}'+
'.tka-links a:hover{border-color:#111}.tka-links a:focus-visible,.tka-links button:focus-visible{outline:2px solid #0b6b80;outline-offset:2px}'+
'.tka-dots{display:flex;justify-content:center;gap:6px;margin-top:14px}'+
'.tka-dots button{all:unset;width:8px;height:8px;border-radius:9px;background:rgba(0,0,0,.2);cursor:pointer;transition:width .3s,background .3s}'+
'.tka-dots button[aria-current=true]{width:22px;background:#111}'+
'.tka-dots button:focus-visible{outline:2px solid #0b6b80;outline-offset:3px}'+
'@media (max-width:900px){.tka-in{grid-template-columns:minmax(0,1fr);gap:24px}.tka-copy{text-align:left}'+
' .tka-list{display:flex;gap:8px;overflow-x:auto;scroll-snap-type:x mandatory;margin:22px -16px 0;padding:2px 16px 8px;scrollbar-width:none}.tka-list::-webkit-scrollbar{display:none}'+
' .tka-list li{flex:none;scroll-snap-align:start}.tka-tab{min-height:48px;padding:6px 14px 6px 6px;border-radius:999px}.tka-tab img{width:34px;height:34px;border-radius:50%}.tka-tab small{display:none}'+
' .tka-stage{justify-content:flex-start}}'+
'@media (prefers-reduced-motion:reduce){.tka-phone,.tka-screen,.tka-car,.tka-load{transition:none}.tka-load img{animation:none}}';

function build(){
 var work=document.getElementById('work');if(!work)return false;
 var s=document.getElementById('try');
 if(s&&s.getAttribute('data-bound'))return true;
 var baked=!!s; /* Nov 7: the static homepage ships this markup and its CSS; only bind to it */
 if(!baked){
 if(!document.querySelector('.ds1'))return false;
 var host=document.querySelector('main > #work')||work;
 var st=document.createElement('style');st.id='tka-css';st.textContent=css;document.head.appendChild(st);
 s=document.createElement('div');s.id='try';s.className='tka';
 var tabs=A.map(function(a,i){return '<li role="presentation"><button type="button" class="tka-tab" role="tab" id="tka-t-'+a.id+'" aria-controls="tka-stage" aria-selected="'+(i?'false':'true')+'" tabindex="'+(i?'-1':'0')+'"><img src="'+logo(a.logo)+'" alt="" width="38" height="38" loading="lazy" decoding="async"><span><b>'+esc(a.n)+'</b><small>'+esc(a.t)+'</small></span></button></li>'}).join('');
 s.innerHTML='<div class="tka-in"><div class="tka-copy"><p class="tka-k">Proof · 9 apps, live</p><h2 id="tka-h">Built here. Live now.</h2>'+
  '<p class="tka-sub">The same studio that prices your build ships these. Each phone runs the app itself: tap, swipe, press buttons. No download, no account.</p>'+
  '<ul class="tka-list" role="tablist" aria-label="Pick an app to try">'+tabs+'</ul></div>'+
  '<div class="tka-stage" id="tka-stage" role="tabpanel"><div class="tka-phone"><div class="tka-screen"><div class="tka-island"></div><div class="tka-load"><img alt="" width="96" height="96"></div></div></div>'+
  '<div class="tka-meta"><p class="tka-t"></p><div class="tka-dots" hidden></div><div class="tka-links"></div></div></div></div>';
 host.classList.add('tka-host');host.setAttribute('aria-labelledby','tka-h');host.removeAttribute('aria-label');host.appendChild(s);
 }
 s.setAttribute('data-bound','1');

 var tb=[].slice.call(s.querySelectorAll('.tka-tab')),screen=s.querySelector('.tka-screen'),load=s.querySelector('.tka-load'),limg=load.querySelector('img'),
  tline=s.querySelector('.tka-t'),links=s.querySelector('.tka-links'),dots=s.querySelector('.tka-dots'),panel=s.querySelector('.tka-stage');
 var cur=0,near=false,armed=!matchMedia('(pointer:coarse)').matches,frame=null,car=null,slide=0,timer=0,loadT=0;
 var rm=matchMedia('(prefers-reduced-motion: reduce)');
 function fit(){var w=screen.clientWidth;if(w)screen.style.setProperty('--k',(w/390).toFixed(4))}
 if('ResizeObserver' in window)new ResizeObserver(fit).observe(screen);else addEventListener('resize',fit);
 function clearScreen(){if(frame){frame.remove();frame=null}if(car){car.remove();car=null}var t=screen.querySelector('.tka-tap');if(t)t.remove();clearInterval(timer);timer=0;clearTimeout(loadT)}
 function showLoad(a){load.style.setProperty('--c',a.c);limg.src=logo(a.logo);load.classList.remove('off')}
 function hideLoad(){load.classList.add('off')}
 function mountFrame(a){
  frame=document.createElement('iframe');frame.title=a.n+' app demo';frame.setAttribute('allow','autoplay; fullscreen');
  frame.setAttribute('referrerpolicy','strict-origin-when-cross-origin');
  frame.addEventListener('load',function(){setTimeout(hideLoad,250)});
  loadT=setTimeout(hideLoad,9000);
  frame.src=a.u;screen.appendChild(frame);fit()}
 function tapGate(a){
  var b=document.createElement('button');b.className='tka-tap';b.type='button';b.innerHTML='<span>Tap to try '+esc(a.n)+'</span>';
  b.addEventListener('click',function(){armed=true;b.remove();mountFrame(a)});screen.appendChild(b)}
 function go(k){var a=A[cur];if(!a.shots)return;slide=(k+a.shots.length)%a.shots.length;car.style.transform='translateX('+(-100*slide)+'%)';
  [].forEach.call(dots.children,function(d,i){d.setAttribute('aria-current',i===slide?'true':'false')});tline.textContent=a.cap[slide]+' · screens from the iPhone build. TORQ plays in the app, not the browser.'}
 function mountShots(a){
  car=document.createElement('div');car.className='tka-car';car.setAttribute('aria-roledescription','carousel');
  car.innerHTML=a.shots.map(function(f,i){return '<img src="/tkhub-preview/site-2026-11-13o/try/torq/'+f+'.webp'+SV+'" alt="TORQ: '+esc(a.cap[i])+'" width="874" height="402" decoding="async"'+(i?' loading="lazy"':'')+'>'}).join('');
  screen.appendChild(car);var first=car.querySelector('img');
  if(first.complete)hideLoad();else{first.addEventListener('load',hideLoad);first.addEventListener('error',hideLoad)}
  dots.innerHTML=a.shots.map(function(f,i){return '<button type="button" aria-label="Show '+esc(a.cap[i])+'"></button>'}).join('');dots.hidden=false;
  [].forEach.call(dots.children,function(d,i){d.addEventListener('click',function(){go(i);clearInterval(timer)})});
  var x0=null;car.addEventListener('pointerdown',function(e){x0=e.clientX});
  car.addEventListener('pointerup',function(e){if(x0===null)return;var dx=e.clientX-x0;x0=null;if(Math.abs(dx)>30){go(slide+(dx<0?1:-1));clearInterval(timer)}});
  go(0);if(!rm.matches)timer=setInterval(function(){if(!document.hidden&&near)go(slide+1)},3200)}
 function render(){
  var a=A[cur];clearScreen();s.classList.toggle('is-land',!!a.shots);dots.hidden=true;showLoad(a);
  panel.setAttribute('aria-labelledby','tka-t-'+a.id);
  if(a.shots){links.innerHTML='';mountShots(a);requestAnimationFrame(fit);return}
  tline.textContent=a.t;
  var ext=/^https?:/.test(a.s);
  links.innerHTML='<a class="pri" href="'+esc(a.u)+'" target="_blank" rel="noopener">Open full screen<span aria-hidden="true"> ↗</span><span class="tka-sr"> (opens in a new tab)</span></a>'+
   '<a href="'+esc(a.s)+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+esc(a.sd)+(ext?'<span aria-hidden="true"> ↗</span>':'')+'</a>';
  if(!near)return;
  if(armed)mountFrame(a);else{hideLoad();tapGate(a)}}
 function pick(k,focus){k=(k+A.length)%A.length;if(k===cur&&(frame||car||!near))return;
  tb[cur].setAttribute('aria-selected','false');tb[cur].tabIndex=-1;cur=k;tb[k].setAttribute('aria-selected','true');tb[k].tabIndex=0;
  if(focus)tb[k].focus();
  var l=tb[k].closest('.tka-list');if(l.scrollWidth>l.clientWidth){var li=tb[k].parentNode;l.scrollTo({left:li.offsetLeft-16,behavior:rm.matches?'auto':'smooth'})}
  render()}
 tb.forEach(function(t,k){t.addEventListener('click',function(){if(k===cur&&!frame&&!car&&near){render();return}if(!armed)armed=true;pick(k)});
  t.addEventListener('keydown',function(e){var d={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(e.key==='Home')d=-cur;if(e.key==='End')d=A.length-1-cur;if(!d)return;e.preventDefault();pick(cur+d,true)})});
 addEventListener('hashchange',function(){var m=location.hash.match(/^#try-([a-z]+)$/);if(!m)return;A.forEach(function(a,i){if(a.id===m[1]){armed=true;near=true;pick(i);s.scrollIntoView({behavior:rm.matches?'auto':'smooth'})}})});
 var h=location.hash.match(/^#try-([a-z]+)$/);if(h){A.forEach(function(a,i){if(a.id===h[1]){tb[0].setAttribute('aria-selected','false');tb[0].tabIndex=-1;cur=i;tb[i].setAttribute('aria-selected','true');tb[i].tabIndex=0}})}
 /* keyboard focus inside a cross-origin frame is invisible to CSS, so ring the phone while the demo has it */
 var kb=false,phoneEl=s.querySelector('.tka-phone');
 document.addEventListener('keydown',function(e){if(e.key==='Tab')kb=true},true);
 document.addEventListener('pointerdown',function(){kb=false},true);
 addEventListener('blur',function(){setTimeout(function(){var f=document.activeElement;phoneEl.classList.toggle('tka-kb',kb&&!!f&&f.tagName==='IFRAME'&&s.contains(f))},0)});
 addEventListener('focus',function(){phoneEl.classList.remove('tka-kb')});
 render();
 if('IntersectionObserver' in window)new IntersectionObserver(function(es){var was=near;near=es[0].isIntersecting;if(near&&!was&&!frame&&!car&&!screen.querySelector('.tka-tap'))render()},{rootMargin:'600px 0px'}).observe(s);
 else{near=true;render()}
 if(h)setTimeout(function(){s.scrollIntoView()},50);
 return true}
var n=0;function run(){if(document.getElementById('try')){build();return}if(document.readyState!=='complete'){addEventListener('load',run,{once:true});return}
 setTimeout(function w(){if(build())return;if(n++<150)setTimeout(w,100)},400)}
run();
})();
