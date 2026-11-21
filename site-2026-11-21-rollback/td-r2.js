/* TD R2: proof at a glance. The pinned sideways showcase cost about 7,800px of scrolling to see ten apps one at a time.
   It becomes a bento grid: two hero tiles and eight smaller ones, all ten visible in roughly one and a half screens,
   each still a real screenshot linking to the live site. */
(function(){
var css='.tkw.tdb{height:auto!important}.tkw.tdb .tkw-pin{position:static!important;height:auto!important;overflow:visible!important;padding-bottom:64px}'+
'.tkw.tdb .tkw-count,.tkw.tdb .tkw-bar{display:none!important}'+
'.tkw.tdb .tkw-track{transform:none!important;display:grid!important;grid-template-columns:repeat(4,1fr);gap:16px;width:auto!important;max-width:1320px;margin:0 auto;padding:0 24px!important;overflow:visible!important;list-style:none}'+
'.tkw.tdb .tkw-card{width:auto!important;min-width:0!important;flex:none!important;margin:0!important}'+
'.tkw.tdb .tkw-card:nth-child(1),.tkw.tdb .tkw-card:nth-child(2){grid-column:span 2}'+
'.tkw.tdb .tkw-shot img{width:100%;height:auto;display:block}'+
'.tkw.tdb .tkw-card:nth-child(n+3) .tkw-line{display:none}'+
'@media(max-width:900px){.tkw.tdb .tkw-track{grid-template-columns:1fr 1fr}.tkw.tdb .tkw-card:nth-child(1),.tkw.tdb .tkw-card:nth-child(2){grid-column:span 2}}'+
'@media(max-width:560px){.tkw.tdb .tkw-track{gap:10px;padding:0 14px!important}.tkw.tdb .tkw-card:nth-child(n+3) .tkw-visit{display:none}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var n=0;function run(){var w=document.getElementById('work');
 if(w){w.classList.add('tdb');w.classList.remove('tkw-pinned');w.style.height='';var t=w.querySelector('.tkw-track');if(t)t.style.transform='';}
 if(++n<40)setTimeout(run,250)}
addEventListener('resize',function(){n=0;run()});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run()})();
