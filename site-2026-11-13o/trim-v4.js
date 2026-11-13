/* TK Hub Round 4: trim pass. Prices live in the choice panels + quote builder; story sections move below the close. Nothing removed. */
(function(){
function q(s){return document.querySelector(s)}
function run(){var m=q('main'),close=q('main > .tkf-close'),quote=q('#quote'),work=q('#work');
 if(!m||!close||!quote||!work||m.dataset.tkr)return !!(m&&m.dataset.tkr);m.dataset.tkr='1';
 /* 1. one price place: full price list folds into a details under the quote; non-refundable line stays visible */
 var pr=q('#pricing'),fine=q('main > p.fine');
 var d=document.createElement('details');d.className='tkr-all wrap';d.innerHTML='<summary>Every price on one card, including The Pass</summary>';
 if(pr){pr.classList.add('tkr-cards');d.appendChild(pr)}
 quote.after(d);if(fine){fine.classList.add('tkr-fine');d.before(fine)}
 /* 2. below the close: Also from the house */
 var bands=[].slice.call(m.querySelectorAll(':scope > section.band'));
 var founders=bands.filter(function(b){return /Founders/.test(b.textContent)&&!b.id})[0];
 var alsoHere=bands.filter(function(b){return /Also here/.test(b.textContent)&&!/Founders/.test(b.textContent)})[0];
 var h=document.createElement('section');h.className='tkr-also';h.setAttribute('aria-labelledby','tkr-also-h');
 h.innerHTML='<div class="wrap"><p class="tkr-k">Also from the house</p><h2 id="tkr-also-h">The cars, the film, the people.</h2><a class="tkr-jump" href="#the-cars">Play the drive game <span aria-hidden="true">&#8595;</span></a></div>';
 var after=[h,q('#the-cars'),q('#film'),q('#the-house'),founders,alsoHere];
 var ref=close;after.forEach(function(n){if(n){ref.after(n);ref=n}});
 if(q('#film'))q('#film').classList.add('tkr-film');
 return true}
var n=0;(function w(){if(run()||n++>200)return;setTimeout(w,50)})();
})();
