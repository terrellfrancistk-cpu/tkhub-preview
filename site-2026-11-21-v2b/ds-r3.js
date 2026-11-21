/* DS R3 (Nov 5): the price follows your thumb. On phones, tablets and folded foldables the quote builder stacks into a
   ~1,250px column, so the "Your build total" card and its Start button sit a full screen below the choices: you tap
   Website / App / Pass and never see the total move. Two changes, narrow screens only (under 860px):
   1. The choices become compact full-width rows (name left, price right) instead of wrapping two-up cards with an orphan.
   2. A slim bar pinned to the bottom of the screen mirrors the live total and the Start button while the builder is in view,
      Apple buy-bar style. It hides once the real card is on screen, so the price is never shown twice at once.
   Desktop is unchanged (the card is already sticky beside the choices). */
(function(){
var css='@media (max-width:859px){'+
'.tkq .tkq-opts{grid-template-columns:1fr!important;gap:8px!important}'+
'.tkq .tkq-opt span{min-height:56px!important;flex-direction:row!important;align-items:center;justify-content:space-between;gap:12px!important;padding:10px 16px!important;border-radius:14px!important}'+
'.tkq .tkq-opt small{text-align:right;max-width:58%}'+
'.ds3-bar{position:fixed;left:12px;right:12px;bottom:max(12px,env(safe-area-inset-bottom));z-index:60;display:flex;align-items:center;gap:12px;padding:10px 10px 10px 18px;border-radius:20px;background:rgba(12,16,18,.92);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border:1px solid rgba(0,203,246,.4);box-shadow:0 18px 50px -12px rgba(0,0,0,.6);color:#f4f0e6;transform:translateY(140%);opacity:0;transition:transform .35s cubic-bezier(.2,.8,.2,1),opacity .25s;pointer-events:none}'+
'.ds3-bar.is-on{transform:none;opacity:1;pointer-events:auto}'+
'.ds3-l{flex:1;min-width:0;display:flex;flex-direction:column;line-height:1.1}'+
'.ds3-l small{font-size:.75rem;color:#b1a898}'+
'.ds3-t{font-size:1.45rem;font-weight:800;letter-spacing:-.03em;color:#00CBF6;font-variant-numeric:tabular-nums;white-space:nowrap}'+
'.ds3-go{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border:0;border-radius:999px;background:#00CBF6;color:#041416;font:800 1rem/1 inherit;cursor:pointer;white-space:nowrap}'+
'.ds3-go:focus-visible{outline:3px solid #f4f0e6;outline-offset:3px}'+
'}@media (min-width:860px){.ds3-bar{display:none!important}}'+
'@media (prefers-reduced-motion:reduce){.ds3-bar{transition:opacity .2s}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
function build(){
 var q=document.getElementById('quote'),tot=document.getElementById('tkq-total'),go=document.getElementById('tkq-go'),card=q&&q.querySelector('.tkq-card');
 if(!q||!tot||!go||!card)return false;if(document.querySelector('.ds3-bar'))return true;
 var bar=document.createElement('div');bar.className='ds3-bar';bar.setAttribute('aria-hidden','true');
 bar.innerHTML='<span class="ds3-l"><small>Your build total</small><span class="ds3-t"></span></span><button type="button" class="ds3-go" tabindex="-1"></button>';
 document.body.appendChild(bar);
 var t=bar.querySelector('.ds3-t'),b=bar.querySelector('.ds3-go');
 function sync(){t.textContent=tot.textContent;b.textContent=go.textContent}
 sync();new MutationObserver(sync).observe(card,{subtree:true,childList:true,characterData:true,attributes:true});
 b.addEventListener('click',function(){go.click()});
 /* shown while the builder is on screen and the real card is not; screen readers and keyboards use the real card */
 var inQ=false,cardOn=false;
 function upd(){var on=inQ&&!cardOn;bar.classList.toggle('is-on',on)}
 if('IntersectionObserver' in window){
  new IntersectionObserver(function(e){inQ=e[0].isIntersecting;upd()},{rootMargin:'-30% 0px -10% 0px'}).observe(q);
  new IntersectionObserver(function(e){cardOn=e[0].isIntersecting;upd()},{threshold:.25}).observe(card);
 }
 return true}
var n=0;function run(){if(document.readyState!=='complete'){addEventListener('load',run,{once:true});return}
 setTimeout(function w(){if(build())return;if(n++<80)setTimeout(w,150)},300)}
run();
})();
