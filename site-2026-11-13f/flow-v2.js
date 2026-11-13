/* TK Hub Round 2: single focused path. Reorders existing home sections (nothing removed). */
(function(){
function q(s,r){return (r||document).querySelector(s)}
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}
function build(){
  var m=q('main'),hero=q('main > section.hero'),quote=q('#quote');
  if(!m||!hero||!quote||m.dataset.tkf)return false;
  m.dataset.tkf='1';document.documentElement.classList.add('tkf');
  /* 1. Hero: one statement + one action. Original buttons move to the close. */
  var acts=q('.actions',hero),inner=q('.hero-grid > div',hero);
  var go=el('a','tkf-go','<span>Pick your build</span><span aria-hidden="true">&#8595;</span>');go.href='#choose';
  if(inner){var deck=q('.deck',inner);(deck||q('h1',inner)).after(go)}
  /* 2. Two giant choice panels (the existing offer-split) */
  var split=q('main > section.offer-split');
  if(split){split.id='choose';split.classList.add('tkf-choose');split.setAttribute('aria-label','Pick your build');
    [['site','Price a site'],['app','Price an app']].forEach(function(p,i){var d=split.children[i];if(!d)return;d.classList.add('tkf-panel');
      var b=el('button','tkf-price',p[1]+' <span aria-hidden="true">&#8594;</span>');b.type='button';
      b.addEventListener('click',function(){var r=q('input[name="tkq-build"][value="'+p[0]+'"]');if(r){r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}))}
        var t=q('#quote');t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});var tt=q('#tkq-total');tt&&tt.setAttribute('tabindex','-1');tt&&tt.focus({preventScroll:true})});
      var row=q('.offer-row',d);(row||d).appendChild(b)})}
  /* 3. Order: hero > choose > quote > pricing details > proof > story > close */
  var order=[hero,split,quote,q('#pricing'),q('main > p.fine'),q('main > .logo-rail'),q('main > section.reel'),q('#the-house'),q('#film')];
  var rest=[].slice.call(m.children).filter(function(n){return order.indexOf(n)<0&&!n.classList.contains('boot')&&n.nodeType===1});
  order.concat(rest).forEach(function(n){if(n)m.appendChild(n)});
  /* 4. Final full-bleed close */
  var close=el('section','tkf-close','<div class="tkf-close-in"><p class="tkf-k">One house</p><h2>Start your build.</h2><p class="tkf-s">Pick it above, or start here. Call if you would rather talk.</p><div class="tkf-acts"></div><p class="tkf-mail">Questions: <a href="mailto:support@tkhub.app">support@tkhub.app</a></p></div>');
  close.setAttribute('aria-label','Start your build');
  if(acts)q('.tkf-acts',close).appendChild(acts);
  m.appendChild(close);
  if(location.hash==='#choose'||location.hash==='#quote'){var h=q(location.hash);h&&h.scrollIntoView()}
  return true}
var n=0;(function w(){if(build()||n++>120)return;setTimeout(w,50)})();
})();
