/* UX R7 (round 2): one ending. "Start your build" sat in the middle of the page and literally said "pick it above, or start here",
   a second copy of the hero doors. It moves to the very end of the page as the single closing call, after the cars, the film
   and the founders, and the line that pointed back up goes. In "Also here", the "Web and app services: sites and apps, built
   here" card goes, because that is what the whole page already sells. Dental IT and 4AM Files stay. */
(function(){
  var moves=0;
  function run(){
    var main=document.querySelector('main'), close=main&&main.querySelector(':scope > .tkf-close');
    if(close){
      var last=null; for(var i=main.children.length-1;i>=0;i--){var c=main.children[i]; if(c.tagName==='SECTION'&&c!==close){last=c;break;}}
      if(last&&last.nextElementSibling!==close&&close.previousElementSibling!==last&&moves<8){moves++;last.insertAdjacentElement('afterend',close);}
      var s=close.querySelector('.tkf-s'); if(s&&/Pick it above/.test(s.textContent))s.textContent='Call if you would rather talk. We pick up.';
    }
    var w=document.querySelector('.other-list a[href$="/tkhub-preview/site-2026-11-13e/works"]'); if(w&&!w.classList.contains('ux7-gone'))w.classList.add('ux7-gone');
  }
  if(document.readyState!=='loading')run();else document.addEventListener('DOMContentLoaded',run);
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();
