/* DS R2 (Nov 5): one price block. The hero's two dark price doors, their "Price a site / Price an app" links and the
   "Not sure yet?" note said the same $1,000 / $5,000 that the quote builder says one scroll later. The doors go and the quote
   builder becomes the hero's action, starting right under the headline, so the first screen shows the live price and the
   Start button. Two dead pieces go with it: the "Every price on one card" fold (its card list is already hidden, so it opened
   to nothing) and the cream refund strip, whose full wording moves into the quote card's fine print so the terms stay word for word. */
(function(){
var hs=document.createElement('style');
hs.textContent='section.hero .ux1-doors,section.hero .ux1-note,main details.tkr-all,main p.tkr-fine{display:none!important}'+
'section.hero{padding-bottom:clamp(28px,5vw,56px)!important}'+
'section.hero .deck{margin-bottom:0!important}'+
'#quote.tkq{padding-top:clamp(36px,6vw,64px)!important;padding-bottom:clamp(36px,6vw,64px)!important;border-top:0}'+
'.ds2-cue{white-space:nowrap;display:inline-flex;align-items:center;gap:10px;margin-top:22px;min-height:48px;padding:0 22px;border-radius:999px;background:#090a0c;color:#f4f0e6;font-weight:700;text-decoration:none}'+
'.ds2-cue:hover{filter:brightness(1.15)}.ds2-cue:focus-visible{outline:3px solid #00CBF6;outline-offset:3px}'+
'html[data-theme=dark] .ds2-cue{background:#00CBF6;color:#04141a}';
document.head.appendChild(hs);
var FULL="Website and app builds are non-refundable. Your payment pays for work we start producing for you right away, so we can't refund deposits or milestone payments once you pay. Questions: ";
function run(){
 var hero=document.querySelector('section.hero'),q=document.getElementById('quote');
 if(!hero||!q)return false;
 ['.ux1-doors','.ux1-note'].forEach(function(s){var e=hero.querySelector(s);if(e)e.remove()});
 var d=document.querySelector('main details.tkr-all');if(d)d.remove();
 var f=document.querySelector('main p.tkr-fine');if(f)f.remove();
 var fine=q.querySelector('.tkq-fine');
 if(fine&&!fine.dataset.ds2){fine.dataset.ds2='1';var a=fine.querySelector('a');fine.textContent=FULL;if(a)fine.appendChild(a)}
 /* one short cue under the deck: a jump to the builder right below */
 var deck=hero.querySelector('.deck');
 if(deck&&!hero.querySelector('.ds2-cue')){var c=document.createElement('a');c.className='ds2-cue';c.href='#quote';
  c.innerHTML='Price your build <span aria-hidden="true">&#8595;</span>';deck.insertAdjacentElement('afterend',c)}
 return !!(fine&&fine.dataset.ds2);
}
var n=0;function go(){if(document.readyState!=='complete'){addEventListener('load',go,{once:true});return}
 setTimeout(function w(){if(run()&&n>8)return;if(n++<60)setTimeout(w,150)},300)}
go();
})();
