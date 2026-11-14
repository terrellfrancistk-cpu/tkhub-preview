/* UX R4: chapter rail. A slim pill that tracks where you are on the long home page (Prices, Proof, Apps, Founders, Cars) and jumps there in one tap. Nothing is removed; it only links to sections already on the page. */
(function(){
  function run(){
    if(document.getElementById('ux4-rail'))return;
    var hero=document.querySelector('section.hero'); if(!hero)return;
    var reel=document.querySelector('section.reel'); if(reel&&!reel.id)reel.id='the-reel';
    var fk=document.querySelector('a.kicker[href="/tkhub-preview/site-2026-11-14e/founders/"]'); var fb=fk&&fk.closest('section'); if(fb&&!fb.id)fb.id='the-founders';
    var items=[['quote','Prices'],['work','Proof'],['the-reel','Apps'],['the-founders','Founders'],['the-cars','Cars']].filter(function(i){return document.getElementById(i[0]);});
    if(items.length<3)return;
    var nav=document.createElement('nav'); nav.id='ux4-rail'; nav.setAttribute('aria-label','On this page');
    nav.style.cssText='position:fixed;left:50%;top:76px;transform:translate(-50%,-140%);z-index:60;display:flex;gap:2px;padding:4px;border-radius:999px;background:rgba(14,14,16,.72);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.12);box-shadow:0 8px 30px rgba(0,0,0,.35);transition:transform .35s ease,opacity .35s;opacity:0;max-width:calc(100vw - 20px);overflow-x:auto;scrollbar-width:none';
    var links={};
    items.forEach(function(i){var a=document.createElement('a');a.href='#'+i[0];a.textContent=i[1];
      a.style.cssText='padding:7px 13px;border-radius:999px;font:600 13px/1 system-ui,sans-serif;color:rgba(255,255,255,.78);text-decoration:none;white-space:nowrap;transition:background .2s,color .2s';
      a.addEventListener('click',function(e){var t=document.getElementById(i[0]);if(!t)return;e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+scrollY-120,behavior:'smooth'});});
      nav.appendChild(a);links[i[0]]=a;});
    document.body.appendChild(nav);
    function tick(){var show=hero.getBoundingClientRect().bottom<0;nav.style.opacity=show?'1':'0';nav.style.transform=show?'translate(-50%,0)':'translate(-50%,-140%)';nav.style.pointerEvents=show?'auto':'none';
      var cur=null;items.forEach(function(i){var el=document.getElementById(i[0]);if(el&&el.offsetHeight&&el.getBoundingClientRect().top<innerHeight*.45)cur=i[0];});
      items.forEach(function(i){var a=links[i[0]],on=i[0]===cur;a.style.background=on?'#f3efe6':'transparent';a.style.color=on?'#111':'rgba(255,255,255,.78)';});}
    addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick);tick();
  }
  if(document.readyState!=='loading')setTimeout(run,300);else document.addEventListener('DOMContentLoaded',function(){setTimeout(run,300);});
})();
