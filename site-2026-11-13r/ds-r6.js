/* DS R6 (Nov 5): a footer you can scan. The footer listed thirteen apps, each with the same support@tkhub.app under it
   (about 1,100px on a phone, a quarter of the page). The one support address, phone and map stay once at the top of the
   footer; the list becomes a compact grid of app chips (logo + name) that open each app's own site instead of thirteen
   copies of one email link. The racing game chip points to /drive/ (the /wrace and /torq paths stay retired). */
(function(){
var MAP={'zilt':'https://tryzilt.app','booked':'https://trybooked.app','curb':'https://getoncurb.app','afterglow':'https://tryafterglow.app',
'people':'https://tryourpeople.app','radr':'/tkhub-preview/site-2026-11-13r/radr','noir':'https://trynoir.app','apex':'https://apexpeakofcare.app','role':'https://tryrole.app',
'wrace':'/tkhub-preview/site-2026-11-13r/drive/','torq':'/tkhub-preview/site-2026-11-13r/drive/','dental':'/tkhub-preview/site-2026-11-13r/dental','works':'/tkhub-preview/site-2026-11-13r/works','fouram':'/tkhub-preview/site-2026-11-13r/4am'};
var hs=document.createElement('style');
hs.textContent='.site-footer .support-grid.ds6{display:grid!important;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px!important;margin-top:18px}'+
'.site-footer .support-grid.ds6 a{display:flex!important;align-items:center;gap:10px;min-height:48px;padding:8px 12px!important;border-radius:14px;border:1px solid rgba(127,127,127,.18);text-decoration:none;color:inherit}'+
'.site-footer .support-grid.ds6 a:hover{border-color:rgba(0,203,246,.6)}.site-footer .support-grid.ds6 a:focus-visible{outline:3px solid #00CBF6;outline-offset:2px}'+
'.site-footer .support-grid.ds6 img{width:24px!important;height:24px!important;flex:0 0 24px;object-fit:contain;border-radius:6px}'+
'.site-footer .support-grid.ds6 strong{font-size:.92rem;font-weight:650;line-height:1.15}'+
'.site-footer .support-grid.ds6 .ds6-x{display:none!important}'+
'@media (max-width:420px){.site-footer .support-grid.ds6{grid-template-columns:1fr 1fr}}';
document.head.appendChild(hs);
function run(){
 var g=document.querySelector('.site-footer .support-grid');if(!g)return false;if(g.classList.contains('ds6'))return true;
 [].forEach.call(g.querySelectorAll(':scope > a'),function(a){
  var im=a.querySelector('img'),key=im?(im.getAttribute('src')||'').replace(/^.*\/logos\//,'').replace(/\.png.*$/,''):'';
  var to=MAP[key];if(!to)return;
  a.setAttribute('href',to);
  if(/^https?:/.test(to)){a.target='_blank';a.rel='noopener'}else{a.removeAttribute('target')}
  var nm=a.querySelector('strong');if(nm){a.setAttribute('aria-label',nm.textContent+(/^https?:/.test(to)?' (opens in a new tab)':''))}
  [].forEach.call(a.querySelectorAll('span span'),function(s){if(/@/.test(s.textContent))s.classList.add('ds6-x')});
 });
 g.classList.add('ds6');return true}
var n=0;function go(){if(document.readyState!=='complete'){addEventListener('load',go,{once:true});return}
 setTimeout(function w(){if(run())return;if(n++<60)setTimeout(w,150)},600)}
go();
})();
