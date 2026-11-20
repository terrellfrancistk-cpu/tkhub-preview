/* UX R2 (live): price panels kept. Original note: say the price once. The giant duplicate price panels fold into the hero doors;
   their "Price it" quote buttons move under each door. The three-card repeat goes too; the live quote builder (which already includes the Pass) is the one place to compare. */
(function(){
  function run(){
    var doors=document.querySelectorAll('.ux1-door'), split=document.getElementById('choose'), cards=document.getElementById('pricing');
    if(doors.length<2||!split||!cards||document.querySelector('.ux2-q'))return;
    var btns=split.querySelectorAll('.tkf-price');
    doors.forEach(function(d,i){
      var w=document.createElement('div');w.className='ux2-cell';d.parentNode.insertBefore(w,d);w.appendChild(d);
      var q=document.createElement('div');q.className='ux2-q';
      if(btns[i]){var src=btns[i],c=src.cloneNode(true);c.addEventListener('click',function(){src.click()});q.appendChild(c);}
      w.appendChild(q);
    });
    /* Live: the price panels and three-card compare stay visible (no content removal); only the door quote buttons are added. */
  }
  if(document.readyState!=='loading')run();else document.addEventListener('DOMContentLoaded',run);
  new MutationObserver(run).observe(document.documentElement,{childList:true,subtree:true});
})();
