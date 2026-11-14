/* TK Hub Round 3: pinned horizontal showcase of real TK Hub builds.
   v4: each card shows a fresh screenshot of the live site (desktop + mobile WebP, shot 2026-11-01) and loads the real site
   in a lazy iframe on hover (desktop) or via the Live button (touch). Falls back to the screenshot if the frame fails. TORQ unchanged. */
(function(){
var P=[['zilt','Zilt','Social video','Post. Play. Get paid.','https://tryzilt.app'],
['booked','Booked','Local pros','Keep more of the job.','https://trybooked.app'],
['curb','Curb','Rides and food','From both seats. Driver-built. Rider-ready.','https://getoncurb.app'],
['afterglow','Afterglow','Nights out','Nights that pay you back.','https://tryafterglow.app'],
['people','Our People','Family circle','Friends. Real circle. Teens join with a parent.','https://tryourpeople.app'],
['radr','RADR','Alerts','See it before it hits.','/tkhub-preview/site-2026-11-14a/radr'],
['noir','NOIR','After dark · 18+','After dark. Open to play. 18+.','https://trynoir.app'],
['apex','APEX','Care','Get to the apex.','https://apexpeakofcare.app'],
['torq','TORQ','Racing','From Quarter Mile to Grand Prix','/'],
['role','ROLE','Careers','One role. One packet. No fiction.','https://tryrole.app']];
function vis(u){return u==='/tkhub-preview/site-2026-11-14a/radr'?'Try RADR':u==='/tkhub-preview/site-2026-11-14a/'?'Visit tkhub.app':'Visit '+u.replace('https://','')}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function html(){var c=P.map(function(p,i){var n=String(i+1).padStart(2,'0');
return '<li class="tkw-card"><a class="tkw-link" href="'+p[4]+'" target="_blank" rel="noopener" aria-label="'+esc(p[1])+', '+esc(p[3])+' Opens '+vis(p[4])+' in a new tab">'+
'<span class="tkw-shot"><img src="/tkhub-preview/site-2026-11-14a/work/'+p[0]+'-site.webp?v=20261101b" srcset="/tkhub-preview/site-2026-11-14a/work/'+p[0]+'-site-s.webp?v=20261101b 640w, /work/'+p[0]+'-site.webp?v=20261101b 1280w" sizes="(max-width:759px) 86vw, 640px" width="1280" height="800" alt="'+esc(p[1])+' website at '+vis(p[4])+'" loading="lazy" decoding="async">'+'</span>'+
'<span class="tkw-meta"><span class="tkw-n">'+n+'</span><span class="tkw-name">'+esc(p[1])+'</span><span class="tkw-line">'+esc(p[3])+'</span><span class="tkw-visit">'+vis(p[4])+' <span aria-hidden="true">&#8599;</span></span></span></a>'+('<button type="button" class="tkw-live" data-src="'+p[4]+'" aria-label="Live preview of '+esc(p[1])+'">Live</button>')+'</li>'}).join('');
return '<section class="tkw" id="work" aria-labelledby="tkw-h"><div class="tkw-pin"><div class="tkw-head"><p class="tkw-k">The work</p><h2 id="tkw-h">Built here. Live now.</h2><p class="tkw-count" aria-hidden="true"><span id="tkw-i">01</span> / '+P.length+'</p></div><ol class="tkw-track" role="list">'+c+'</ol><div class="tkw-bar" aria-hidden="true"><i></i></div></div></section>'}
var sec,track,pin,bar,cnt,on=false,raf=0;
var mq=matchMedia('(min-width:760px) and (hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)');
function size(){on=mq.matches;sec.classList.toggle('tkw-pinned',on);
 if(on){var extra=track.scrollWidth-innerWidth;sec.style.height=(innerHeight+Math.max(0,extra))+'px'}else{sec.style.height='';track.style.transform=''}tick()}
function prog(){var r=sec.getBoundingClientRect(),d=sec.offsetHeight-innerHeight;return d>0?Math.min(1,Math.max(0,-r.top/d)):0}
function tick(){raf=0;var p;
 if(on){p=prog();var x=(track.scrollWidth-innerWidth)*p;track.style.transform='translate3d('+(-x)+'px,0,0)'}
 else{var m=track.scrollWidth-track.clientWidth;p=m>0?track.scrollLeft/m:0}
 bar.style.transform='scaleX('+(0.06+0.94*p)+')';cnt.textContent=String(Math.round(p*(P.length-1))+1).padStart(2,'0')}
function req(){if(!raf)raf=requestAnimationFrame(tick)}
function mount(){var close=document.querySelector('main > .tkf-close');if(!close)return false;if(document.getElementById('work'))return true;
 var t=document.createElement('template');t.innerHTML=html();sec=t.content.firstChild;close.before(sec);
 track=sec.querySelector('.tkw-track');pin=sec.querySelector('.tkw-pin');bar=sec.querySelector('.tkw-bar i');cnt=sec.querySelector('#tkw-i');
 addEventListener('scroll',req,{passive:true});track.addEventListener('scroll',req,{passive:true});addEventListener('resize',size);
 mq.addEventListener?mq.addEventListener('change',size):mq.addListener(size);
 /* keyboard: bring a focused card into view in pinned mode */
 track.addEventListener("focusin",function(e){if(!on)return;pin.scrollLeft=0;pin.scrollTop=0;var li=e.target.closest('.tkw-card');var i=[].indexOf.call(track.children,li);
  var d=sec.offsetHeight-innerHeight,maxX=track.scrollWidth-innerWidth;var x=Math.min(maxX,Math.max(0,li.offsetLeft-(innerWidth-li.offsetWidth)/2));
  scrollTo(0,sec.getBoundingClientRect().top+scrollY+(maxX>0?x/maxX*d:0))});
 size();
 new MutationObserver(function(){if(!document.getElementById('work')){var c=document.querySelector('main > .tkf-close');c&&c.before(sec);size()}}).observe(document.querySelector('main'),{childList:true});
 return true}
/* v4 live preview: lazy iframe of the real site over the screenshot */
var css=document.createElement('style');css.textContent='.tkw-card{position:relative}.tkw-shot{position:relative;overflow:hidden}.tkw-shot picture{display:contents}.tkw-frame{position:absolute;left:0;top:0;width:1280px;height:800px;border:0;transform-origin:0 0;pointer-events:none;opacity:0;transition:opacity .4s;background:#fff}.tkw-shot img{object-fit:contain!important;object-position:top!important;transform:none!important}.tkw-frame.is-ready{opacity:1}.tkw-frame.is-live{pointer-events:auto}.tkw-track{touch-action:pan-x pan-y}.tkw-shot,.tkw-shot img{-webkit-user-drag:none;user-select:none}.tkw-live{position:absolute;top:10px;right:10px;z-index:3;font:600 12px/1 system-ui,sans-serif;padding:7px 11px;border-radius:999px;border:1px solid rgba(255,255,255,.35);background:rgba(0,0,0,.6);color:#fff;cursor:pointer}.tkw-live.is-on{background:#c8ff3d;color:#000}@media (hover:hover) and (pointer:fine){.tkw-live{display:none}}';document.head.appendChild(css);
function frameOn(li){var b=li.querySelector('.tkw-live'),sh=li.querySelector('.tkw-shot');if(!b||li.querySelector('.tkw-frame')||/\/\/(www\.)?tkhub\.app/.test(b.dataset.src))return;
 var f=document.createElement('iframe');f.className='tkw-frame';f.src=b.dataset.src;f.loading='lazy';f.title='Live preview';f.tabIndex=-1;f.setAttribute('aria-hidden','true');
 f.setAttribute('sandbox','allow-scripts allow-same-origin');f.referrerPolicy='no-referrer';
 var sc=function(){f.style.transform='scale('+(sh.clientWidth/1280)+')'};sc();
 var t=setTimeout(function(){f.remove();b.classList.remove('is-on')},12000);f.onload=function(){clearTimeout(t);sc();f.classList.add('is-ready')};sh.appendChild(f);b.classList.add('is-on')}
function frameOff(li){var f=li.querySelector('.tkw-frame'),b=li.querySelector('.tkw-live');if(f)f.remove();if(b)b.classList.remove('is-on')}
function wire(){if(!sec||sec.dataset.live)return;sec.dataset.live='1';
 [].forEach.call(sec.querySelectorAll('.tkw-card'),function(li){var h=0;
  li.addEventListener('mouseenter',function(){if(!matchMedia('(hover:hover) and (pointer:fine)').matches)return;h=setTimeout(function(){frameOn(li)},450)});
  li.addEventListener('mouseleave',function(){clearTimeout(h);frameOff(li)});
  var b=li.querySelector('.tkw-live');b&&b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(li.querySelector('.tkw-frame'))frameOff(li);else{frameOn(li);var f=li.querySelector('.tkw-frame');f&&f.classList.add('is-live')}})})}
var n=0;(function w(){if(mount()){wire();return}if(n++>160)return;setTimeout(w,50)})();
})();
