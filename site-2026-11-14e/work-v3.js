/* TK Hub Round 3: pinned horizontal showcase of real TK Hub builds. */
(function(){
var P=[['zilt','Zilt','Social video','Post. Play. Get paid.','https://tryzilt.app'],
['booked','Booked','Local pros','Keep more of the job.','https://trybooked.app'],
['curb','Curb','Rides and food','From both seats. Driver-built. Rider-ready.','https://getoncurb.app'],
['afterglow','Afterglow','Nights out','Nights that pay you back.','https://tryafterglow.app'],
['people','Our People','Family circle','Friends. Real circle. Teens join with a parent.','https://tryourpeople.app'],
['radr','RADR','Alerts','See it before it hits.','https://tkhub.app/radr'],
['noir','NOIR','After dark · 18+','After dark. Open to play. 18+.','https://tkhub.app/noir'],
['apex','APEX','Care','Get to the apex.','https://apexpeakofcare.app'],
['wrace','TORQ','Racing','From Quarter Mile to Grand Prix','/'],
['role','ROLE','Careers','One role. One packet. No fiction.','https://tryrole.app']];
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function html(){var c=P.map(function(p,i){var n=String(i+1).padStart(2,'0');
return '<li class="tkw-card"><a class="tkw-link" href="'+p[4]+'" target="_blank" rel="noopener" aria-label="'+esc(p[1])+', '+esc(p[3])+' Opens '+p[4].replace('https://','')+' in a new tab">'+
'<span class="tkw-shot"><img src="/tkhub-preview/site-2026-11-14e/work/'+p[0]+'.jpg" width="1280" height="800" alt="" loading="lazy" decoding="async"></span>'+
'<span class="tkw-meta"><span class="tkw-n">'+n+'</span><span class="tkw-name">'+esc(p[1])+'</span><span class="tkw-line">'+esc(p[3])+'</span><span class="tkw-visit">Visit '+p[4].replace('https://','')+' <span aria-hidden="true">&#8599;</span></span></span></a></li>'}).join('');
return '<section class="tkw" id="work" aria-labelledby="tkw-h"><div class="tkw-pin"><div class="tkw-head"><p class="tkw-k">The work</p><h2 id="tkw-h">Built here. Live now.</h2><p class="tkw-count" aria-hidden="true"><span id="tkw-i">01</span> / '+P.length+'</p></div><ol class="tkw-track" role="list">'+c+'</ol><div class="tkw-bar" aria-hidden="true"><i></i></div></div></section>'}
var sec,track,pin,bar,cnt,on=false,raf=0;
var mq=matchMedia('(min-width:760px) and (prefers-reduced-motion:no-preference)');
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
var n=0;(function w(){if(mount()||n++>160)return;setTimeout(w,50)})();
})();
