/* DS R4 (Nov 5): one straight path. The page is now about 4,300px, so two things that made sense on the old 15,000px page get in
   the way: the floating chapter pill (it sits over every heading on phones) and the "Take the night shift" game banner wedged
   between the proof and the people. The pill goes. The path becomes Price -> Proof -> People -> Start your build, and the game
   banner moves after the closing call, just above the footer, as an after-hours extra instead of a detour before the ask.
   Order is pinned once, after the earlier rounds have finished moving sections, so it no longer depends on script timing. */
(function(){
var hs=document.createElement('style');
hs.textContent='#ux4-rail{display:none!important}'+
'.ds4-after{background:var(--bg,#f4f0e6);padding:clamp(24px,5vw,56px) 0 clamp(8px,2vw,16px)}'+
'.ds4-after #drive.tdd{margin-top:0!important;margin-bottom:0!important}';
document.head.appendChild(hs);
function order(){
 var main=document.querySelector('main');if(!main)return false;
 var q=document.getElementById('quote'),w=document.querySelector('main > #work'),h=main.querySelector(':scope > .tdh-wrap'),c=main.querySelector(':scope > .tkf-close'),d=document.getElementById('drive');
 if(!q||!w||!c||!d)return false;
 if(q.nextElementSibling!==w)q.insertAdjacentElement('afterend',w);
 var last=w;if(h){if(w.nextElementSibling!==h)w.insertAdjacentElement('afterend',h);last=h}
 if(last.nextElementSibling!==c)last.insertAdjacentElement('afterend',c);
 var box=document.querySelector('.ds4-after');
 if(!box){box=document.createElement('div');box.className='ds4-after';main.insertAdjacentElement('afterend',box)}
 if(d.parentNode!==box)box.appendChild(d);
 return true}
var n=0,ok=0;function run(){if(document.readyState!=='complete'){addEventListener('load',run,{once:true});return}
 /* earlier rounds keep nudging sections for a few seconds after load; re-pin until they settle */
 setTimeout(function w(){if(order())ok++;if(n++<40)setTimeout(w,200)},400)}
run();
})();
