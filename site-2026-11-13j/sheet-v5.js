/* TK Hub Round 5: booking never leaves the page. Every Start/Order link opens a slide-over order sheet (the real /order/ brief inside). Full page stays one tap away. Nothing removed. */
(function(){
var CSS="\
.tks-dlg{position:fixed;inset:0 0 0 auto;margin:0;width:min(560px,100vw);max-width:100vw;height:100dvh;max-height:100dvh;padding:0;border:0;background:var(--bg,#0b0f14);color:inherit;box-shadow:-24px 0 80px rgba(0,0,0,.35);display:flex;flex-direction:column;transform:translateX(100%);transition:transform .42s cubic-bezier(.2,.8,.2,1)}\
.tks-dlg:not([open]){display:none}.tks-dlg.is-in{transform:none}\
.tks-dlg::backdrop{background:rgba(5,8,12,.55);backdrop-filter:blur(6px)}\
@media (max-width:640px){.tks-dlg{inset:auto 0 0 0;width:100vw;height:94dvh;border-radius:20px 20px 0 0;transform:translateY(100%)}}\
.tks-top{display:flex;align-items:center;gap:12px;padding:16px 18px 10px;border-bottom:1px solid rgba(127,127,127,.2)}\
.tks-top h2{margin:0;font-size:1.15rem;flex:1}\
.tks-x{min-width:44px;min-height:44px;border-radius:999px;border:1px solid rgba(127,127,127,.35);background:transparent;color:inherit;font-size:1.3rem;cursor:pointer}\
.tks-seg{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:12px 18px}\
.tks-seg button{min-height:52px;border-radius:14px;border:1px solid rgba(127,127,127,.35);background:transparent;color:inherit;cursor:pointer;text-align:left;padding:8px 12px;font:inherit}\
.tks-seg button b{display:block}.tks-seg button small{opacity:.75}\
.tks-seg button[aria-pressed=true]{border-color:#00CBF6;box-shadow:inset 0 0 0 1px #00CBF6}\
.tks-frame{flex:1;width:100%;border:0;background:transparent;min-height:0}\
.tks-foot{display:flex;flex-wrap:wrap;gap:6px 16px;padding:10px 18px calc(12px + env(safe-area-inset-bottom));font-size:.85rem;border-top:1px solid rgba(127,127,127,.2)}\
.tks-foot a{color:inherit}\
.tks-x:focus-visible,.tks-seg button:focus-visible,.tks-foot a:focus-visible,.site-header .tks-cta:focus-visible{outline:2px solid #00CBF6;outline-offset:2px}\
html.tks-lock{overflow:hidden}\
@media (prefers-reduced-motion:reduce){.tks-dlg{transition:none}.tks-dlg::backdrop{backdrop-filter:none}}";
var st=document.createElement('style');st.id='tks-css';st.textContent=CSS;document.head.appendChild(st);
var dlg,frame,full,last,kind='site';
function el(){if(dlg)return;dlg=document.createElement('dialog');dlg.className='tks-dlg';dlg.setAttribute('aria-labelledby','tks-h');
dlg.innerHTML='<div class="tks-top"><h2 id="tks-h">Start your build</h2><button type="button" class="tks-x" aria-label="Close order sheet">&times;</button></div>'+
'<div class="tks-seg" role="group" aria-label="What are we building?"><button type="button" data-k="site" aria-pressed="true"><b>Website</b><small>$1,000 · $250 starts it</small></button><button type="button" data-k="app" aria-pressed="false"><b>App</b><small>$5,000 · $500 starts it</small></button></div>'+
'<iframe class="tks-frame" title="Order brief" loading="lazy"></iframe>'+
'<div class="tks-foot"><a class="tks-full" href="/tkhub-preview/site-2026-11-13j/order/">Open the full order page</a><a href="tel:+14699031262">469-903-1262</a><a href="mailto:support@tkhub.app">support@tkhub.app</a></div>';
document.body.appendChild(dlg);frame=dlg.querySelector('iframe');full=dlg.querySelector('.tks-full');
dlg.querySelector('.tks-x').onclick=close;
dlg.addEventListener('click',function(e){if(e.target===dlg)close()});
dlg.addEventListener('cancel',function(e){e.preventDefault();close()});
dlg.querySelectorAll('.tks-seg button').forEach(function(b){b.onclick=function(){load(b.dataset.k)}});
frame.addEventListener('load',function(){try{var d=frame.contentDocument,s=d.createElement('style');
s.textContent='.site-header,footer,.boot{display:none!important}body{background:transparent!important}main{padding-top:8px!important}';d.head.appendChild(s);
d.querySelectorAll('a[href]').forEach(function(a){var h=a.getAttribute('href');if(h&&h.charAt(0)==='/tkhub-preview/site-2026-11-13j/'&&h.indexOf('/tkhub-preview/site-2026-11-13j/order')!==0)a.target='_top'})}catch(e){}})}
function load(k){kind=k==='app'?'app':'site';var u='/tkhub-preview/site-2026-11-13j/order/?kind='+kind;frame.src=u;full.href=u;
dlg.querySelectorAll('.tks-seg button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.k===kind))})}
function open(k){el();last=document.activeElement;load(k);document.documentElement.classList.add('tks-lock');dlg.showModal();
requestAnimationFrame(function(){requestAnimationFrame(function(){dlg.classList.add('is-in')})});dlg.querySelector('.tks-x').focus()}
function close(){if(!dlg||!dlg.open)return;dlg.classList.remove('is-in');var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
setTimeout(function(){dlg.close();document.documentElement.classList.remove('tks-lock');if(last&&last.focus)last.focus()},rm?0:380)}
document.addEventListener('click',function(e){if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
var a=e.target.closest&&e.target.closest('a[href]');if(!a||(dlg&&dlg.contains(a)))return;
var u;try{u=new URL(a.href,location.href)}catch(x){return}if(u.origin!==location.origin||!/^\/order\/?$/.test(u.pathname))return;
var k=u.searchParams.get('kind');if(k&&k!=='site'&&k!=='app')return;e.preventDefault();open(k||'site')},true);
/* one persistent action in the header */
function hy(e){for(var k in e){if(k.indexOf('__react')===0)return true}return false}
function hdr(){var m=document.querySelector('main');if(!m||(!hy(m)&&n<60))return false;var b=document.querySelector('.site-header .header-actions a[href^="/tkhub-preview/site-2026-11-13j/order/"]');if(!b)return false;
if(!b.classList.contains('tks-cta')){b.classList.add('tks-cta');var s=b.querySelector('span')||b;s.textContent='Start for $250'}return true}
var n=0;(function w(){if(hdr()&&n>40)return;if(n++>200)return;setTimeout(w,100)})();
if(location.hash==='#start')setTimeout(function(){open('site')},600);
})();
