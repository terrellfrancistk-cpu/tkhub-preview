/* Nov 4 cleanup: DOM edits wait until after React hydration (fixes React #418 on the homepage); targets are hidden by CSS meanwhile. */
/* TD R1: tell the apps once. The "Every app" reel and the scrolling logo rail were the third retelling of the same ten apps
   (after the quote's proof and the "Built here. Live now." showcase). Both go; the showcase is the single proof. The chapter
   rail's "Apps" stop goes with them. */
(function(){var hs=document.createElement('style');hs.textContent='#the-reel,main > .logo-rail,#ux4-rail a[href="#the-reel"]{display:none!important}';document.head.appendChild(hs);var n=0;function run(){
 ['#the-reel','main > .logo-rail'].forEach(function(s){var e=document.querySelector(s);if(e)e.remove()});
 var r=document.querySelector('#ux4-rail a[href="#the-reel"]');if(r)r.remove();
 if(++n<40)setTimeout(run,250)}
 function go(){setTimeout(run,1200)}if(document.readyState==='complete')go();else window.addEventListener('load',go)})();
