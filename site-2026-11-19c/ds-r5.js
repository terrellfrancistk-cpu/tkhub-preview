/* DS R5 (Nov 5): a human close. Founders and "Also here" sat in their own cream band (about 450px on desktop, 930px on
   phones) right before "Start your build." The founders' faces move into the closing call itself, next to the buttons and the
   phone number, so the last ask has real people on it; each face still opens their founder page. The separate band goes:
   "Also here" (Dental IT, 4AM Files) is already listed in the footer, and Founders stays in the top menu and the footer.
   The two Start buttons become one clear primary and one outline so the dark close has a single obvious next step. */
(function(){
var hs=document.createElement('style');
hs.textContent='main > .tdh-wrap{display:none!important}'+
'.ds5-people{display:flex;align-items:center;justify-content:center;gap:14px;margin:0 auto 26px;color:rgba(244,246,248,.78);font-size:.98rem;flex-wrap:wrap}'+
'.ds5-faces{display:flex}.ds5-faces a{display:block;width:56px;height:56px;border-radius:50%;overflow:hidden;border:3px solid #090a0c;box-shadow:0 0 0 1px rgba(0,203,246,.5);margin-left:-12px;transition:transform .2s}'+
'.ds5-faces a:first-child{margin-left:0}.ds5-faces a:hover,.ds5-faces a:focus-visible{transform:translateY(-3px);z-index:1;position:relative}'+
'.ds5-faces a:focus-visible,.ds5-names a:focus-visible{outline:3px solid #00CBF6;outline-offset:3px}'+
'.ds5-faces img{width:100%;height:100%;object-fit:cover;display:block}'+
'.ds5-names a{color:#f4f6f8;font-weight:700;text-decoration:none;border-bottom:1px solid rgba(0,203,246,.5)}.ds5-names a:hover{color:#00CBF6}'+
'.tkf-close .tkf-acts .actions .btn.ds5-p{background:#00CBF6!important;color:#04141a!important;border-color:#00CBF6!important}'+
'.tkf-close .tkf-acts .actions .btn.ds5-o{background:transparent!important;color:#f4f6f8!important;box-shadow:inset 0 0 0 1.5px rgba(0,203,246,.6)!important}'+
'.tkf-close .tkf-acts .actions .btn.ds5-p span,.tkf-close .tkf-acts .actions .btn.ds5-o span{color:inherit!important;background:none!important;-webkit-text-fill-color:currentColor}';
document.head.appendChild(hs);
function run(){
 var close=document.querySelector('main > .tkf-close'),f=document.getElementById('the-founders');
 if(!close||!f)return false;if(close.querySelector('.ds5-people'))return true;
 var people=[].map.call(f.querySelectorAll('.founders-home > a'),function(a){var s=a.querySelector('strong'),i=a.querySelector('img');return {href:a.getAttribute('href'),name:s?s.textContent:'',src:i?i.getAttribute('src'):''}}).filter(function(p){return p.name&&p.src});
 if(!people.length)return false;
 var box=document.createElement('div');box.className='ds5-people';
 box.innerHTML='<span class="ds5-faces">'+people.map(function(p){return '<a href="'+p.href+'" tabindex="-1" aria-hidden="true"><img src="'+p.src+'" alt="" width="56" height="56" loading="lazy"></a>'}).join('')+'</span>'+
  '<span class="ds5-names">Founded by '+people.map(function(p){return '<a href="'+p.href+'">'+p.name+'</a>'}).join(' and ')+'</span>';
 var acts=close.querySelector('.tkf-acts');(acts||close.querySelector('h2')).insertAdjacentElement('beforebegin',box);
 var b=close.querySelectorAll('.tkf-acts .btn');if(b[0])b[0].classList.add('ds5-p');if(b[1])b[1].classList.add('ds5-o');
 var band=document.querySelector('main > .tdh-wrap');if(band)band.remove();
 return true}
var n=0;function go(){if(document.readyState!=='complete'){addEventListener('load',go,{once:true});return}
 setTimeout(function w(){if(run())return;if(n++<80)setTimeout(w,150)},900)}
go();
})();
