/* TD R4: one house strip. Founders and "Also here" were two thin, separate bands of white space before the close.
   They merge into a single two-column band (people left, other work right), so the page lands on the final call faster. */
(function(){
var css='.tdh{display:grid;grid-template-columns:1.3fr 1fr;gap:40px;align-items:start}.tdh>section{margin:0!important;padding:0!important}'+
'main>.tdh-wrap{padding:72px 0}@media(max-width:860px){.tdh{grid-template-columns:1fr;gap:28px}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
var n=0;function run(){
 var f=document.getElementById('the-founders'),a=null;
 document.querySelectorAll('main > section.band').forEach(function(s){if(/^\s*Also here/i.test(s.innerText||''))a=s});
 if(f&&a&&!document.querySelector('.tdh')){var w=document.createElement('section');w.className='tdh-wrap';w.setAttribute('aria-label','The house');
  var g=document.createElement('div');g.className='tdh wrap';w.appendChild(g);f.parentNode.insertBefore(w,f);g.appendChild(f);g.appendChild(a);}
 if(++n<40)setTimeout(run,250)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run()})();
