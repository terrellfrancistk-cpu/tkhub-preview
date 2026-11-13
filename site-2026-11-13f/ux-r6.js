/* UX R6 (round 2): one showcase. The page listed the same ten apps twice, once as a text list ("Ten apps") and again as the
   screenshot showcase ("Built here. Live now."), with the same names, taglines and Visit links. The screenshot showcase is the
   better version, so it moves into the Proof slot right after the quote builder and the text list goes. The "Also from the house"
   signpost goes too, because the chapter rail already jumps to the cars, the film and the people. */
(function(){
  var moves=0;
  function run(){
    var work=document.getElementById('work'), house=document.getElementById('the-house');
    if(work&&house&&house.nextElementSibling!==work&&moves<8){moves++;house.insertAdjacentElement('afterend',work);}
    if(house&&!house.classList.contains('ux6-gone'))house.classList.add('ux6-gone');
    var also=document.querySelector('section.tkr-also'); if(also&&!also.classList.contains('ux6-gone'))also.classList.add('ux6-gone');
    if(work&&!work.dataset.ux6){var k=work.querySelector('.tkw-k');if(k){work.dataset.ux6='1';k.textContent='Proof · ten apps, live';}}
  }
  if(document.readyState!=='loading')run();else document.addEventListener('DOMContentLoaded',run);
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();
