/* N6 R2 (Nov 6): proof on the first screen. The hero says "built by the studio behind the apps below", but the apps are two
   sections down. A row of the ten app icons now sits under "Price your build", Stripe/Linear-customer-strip style. Each icon
   jumps to the proof section with that app already running in the phone (#try-<app>). No new copy blocks, one row. */
(function(){
var A=[['apex','APEX','apex'],['role','ROLE','role'],['booked','Booked','booked'],['curb','Curb','curb'],['zilt','Zilt','zilt'],
['people','Our People','people'],['radr','RADR','radr'],['torq','TORQ','wrace'],['afterglow','Afterglow','afterglow'],['noir','NOIR','noir']];
var css='.n6p{margin-top:clamp(22px,3vw,34px)}'+
'.n6p-k{margin:0 0 10px;font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;font-weight:700;color:rgba(20,20,20,.55)}'+
'.n6p ul{list-style:none;margin:0;padding:0;display:flex;flex-wrap:wrap;gap:8px}'+
'.n6p a{display:block;width:44px;height:44px;border-radius:12px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.08),0 6px 14px -8px rgba(0,0,0,.35);transition:transform .2s,box-shadow .2s;overflow:hidden}'+
'.n6p a:hover{transform:translateY(-2px);box-shadow:0 0 0 1px rgba(0,0,0,.16),0 10px 18px -8px rgba(0,0,0,.4)}'+
'.n6p a:focus-visible{outline:2px solid #0b6b80;outline-offset:3px}'+
'.n6p img{width:100%;height:100%;object-fit:contain;display:block}'+
'@media (max-width:520px){.n6p ul{flex-wrap:nowrap;gap:clamp(4px,1.4vw,7px)}.n6p li{flex:1 1 0;max-width:40px}.n6p a{width:100%;height:auto;aspect-ratio:1;border-radius:9px}}'+
'@media (prefers-reduced-motion:reduce){.n6p a{transition:none}}';
function add(){
 var cue=document.querySelector('section.hero .ds2-cue');if(!cue)return false;
 if(document.querySelector('.n6p'))return true;
 if(!document.getElementById('n6p-css')){var st=document.createElement('style');st.id='n6p-css';st.textContent=css;document.head.appendChild(st)}
 var d=document.createElement('div');d.className='n6p';
 d.innerHTML='<p class="n6p-k" id="n6p-k">10 live apps · tap one to try it</p><ul aria-labelledby="n6p-k">'+
  A.map(function(a){return '<li><a href="#try-'+a[0]+'" aria-label="Try '+a[1]+'" title="'+a[1]+'"><img src="/tkhub-preview/site-2026-11-14e/logos/'+a[2]+'.png?v=3" alt="" width="44" height="44" decoding="async"></a></li>'}).join('')+'</ul>';
 cue.insertAdjacentElement('afterend',d);return true}
var n=0;function run(){if(document.readyState!=='complete'){addEventListener('load',run,{once:true});return}
 /* the earlier overlays and hydration can rebuild the hero for a few seconds; re-add until it settles */
 setTimeout(function w(){add();if(n++<40)setTimeout(w,200)},300)}
run();
})();
