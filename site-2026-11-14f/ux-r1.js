/* UX R1: decision-first hero. Price + both doors above the fold; the detour button goes. */
(function(){
  function run(){
    var hero=document.querySelector('section.hero'), choose=document.getElementById('choose');
    if(!hero||!choose||hero.querySelector('.ux1-doors'))return;
    var h1=hero.querySelector('h1'), deck=hero.querySelector('.deck'), go=hero.querySelector('.tkf-go');
    if(h1)h1.innerHTML='Your website or app,&nbsp; at a price you can say <em>out loud.</em>';
    if(deck)deck.textContent='Flat prices, written down before we start. A small deposit opens the job and counts toward the total. Built by the studio behind the apps below.';
    if(go)go.remove();
    var d=document.createElement('div');d.className='ux1-doors';
    d.innerHTML=[
      ['site','Website','$1,000','$250 to start','counts toward the total','Start a site'],
      ['app','App','$5,000','$500 to start','counts toward the total','Start an app']
    ].map(function(x){return '<a class="ux1-door" href="/tkhub-preview/site-2026-11-14f/order/?kind='+x[0]+'"><span class="ux1-k">'+x[1]+'</span><span class="ux1-p">'+x[2]+'</span><span class="ux1-s">'+x[3]+' · '+x[4]+'</span><span class="ux1-c">'+x[5]+' <b aria-hidden="true">→</b></span></a>';}).join('');
    (deck||h1).insertAdjacentElement('afterend',d);
    var n=document.createElement('p');n.className='ux1-note';n.innerHTML='Not sure yet? <a href="#choose">Compare both</a> or email <a href="mailto:support@tkhub.app">support@tkhub.app</a>.';
    d.insertAdjacentElement('afterend',n);
  }
  if(document.readyState!=='loading')run();else document.addEventListener('DOMContentLoaded',run);
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();
