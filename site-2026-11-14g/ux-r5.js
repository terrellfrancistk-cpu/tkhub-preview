/* UX R5 (round 2): say it once. The site and app prices live only in the hero doors, so the duplicate split panel (#choose) and the
   three-card repeat (#pricing) are gone. The Pass, the only thing those cards said that was new, now lives once, in the quote
   builder (with a link to its page), and drops out of the apps list. The hero's "Compare both" link now opens the quote builder. */
(function(){
  function run(){
    var doors=document.querySelector('.ux1-doors'); if(!doors)return;
    document.querySelectorAll('#quote legend').forEach(function(l){
      if(l.dataset.ux5||!/Add The Pass/.test(l.textContent))return; l.dataset.ux5='1';
      var x=document.createElement('span');x.className='ux5-pass';x.innerHTML='All nine apps, one membership. <a href="/tkhub-preview/site-2026-11-14g/pass/">See the pass →</a>';l.appendChild(x);
    });
    var note=document.querySelector('.ux1-note a[href="#choose"]');
    if(note){note.href='#quote';note.textContent='Build a quote';}
    document.querySelectorAll('#the-house p, #the-house div').forEach(function(el){
      if(el.dataset.ux5||el.children.length>3)return;
      if(/The pass is nine of them/.test(el.textContent)&&el.textContent.length<400){el.dataset.ux5='1';el.classList.add('ux5-gone');}
    });
  }
  if(document.readyState!=='loading')run();else document.addEventListener('DOMContentLoaded',run);
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();
