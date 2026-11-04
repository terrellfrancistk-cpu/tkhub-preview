/* TD R1: tell the apps once. The "Every app" reel and the scrolling logo rail were the third retelling of the same ten apps
   (after the quote's proof and the "Built here. Live now." showcase). Both go; the showcase is the single proof. The chapter
   rail's "Apps" stop goes with them. */
(function(){var n=0;function run(){
 ['#the-reel','main > .logo-rail'].forEach(function(s){var e=document.querySelector(s);if(e)e.remove()});
 var r=document.querySelector('#ux4-rail a[href="#the-reel"]');if(r)r.remove();
 if(++n<40)setTimeout(run,250)}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run()})();
