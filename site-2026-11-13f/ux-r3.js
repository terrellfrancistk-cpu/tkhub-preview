/* UX R3: proof before the pitch reel. The shipped-apps list moves up to sit right after the quote builder. */
(function(){
  var moves=0;
  function run(){
    var house=document.getElementById('the-house'), quote=document.getElementById('quote');
    if(!house||!quote)return;
    var anchor=quote.nextElementSibling&&quote.nextElementSibling.matches('p.fine')?quote.nextElementSibling:quote;
    if(anchor.nextElementSibling!==house&&moves<6){moves++;anchor.insertAdjacentElement('afterend',house);}
    if(house.dataset.ux3)return; house.dataset.ux3='1';
    var k=house.querySelector('.kicker'), h=house.querySelector('h2');
    if(k)k.textContent='Proof';
    if(h)h.textContent='Ten apps, built and shipped here.';
    var sub=document.createElement('p');sub.className='deck ux3-sub';sub.textContent='Same people, same process, same prices you see above. Tap any one to visit it.';
    if(h)h.insertAdjacentElement('afterend',sub);
  }
  if(document.readyState!=='loading')run();else document.addEventListener('DOMContentLoaded',run);
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();
