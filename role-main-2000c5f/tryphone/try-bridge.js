// Demo bridge: tells the host page about taps (for the "get the app" prompt).
// The demo runs entirely in this page: no network writes of any kind.
(function(){var n=0;document.addEventListener('pointerdown',function(){n++;try{parent.postMessage({type:'try-interaction',n:n},location.origin)}catch(e){}},{passive:true});})();
