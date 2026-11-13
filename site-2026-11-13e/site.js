(function(){
  var bar=document.querySelector("header .bar");
  if(bar){
    bar.querySelectorAll('a[href="/tkhub-preview/site-2026-11-13e/ciara/"], .people').forEach(function(n){ n.remove(); });
  }
  var nav=document.querySelector("header .subnav");
  if(!nav) return;
  nav.querySelectorAll('a[href="/tkhub-preview/site-2026-11-13e/ciara/"]').forEach(function(a){ a.remove(); });
  var team=nav.querySelector('a[href="/tkhub-preview/site-2026-11-13e/team/"]');
  var about=nav.querySelector('a[href="/tkhub-preview/site-2026-11-13e/about/"]');
  if(about && team) about.remove();
  else if(about){
    about.textContent="Team";
    about.setAttribute("href","/tkhub-preview/site-2026-11-13e/team/");
  }
})();
/* tkhub 1.6.8 */
document.addEventListener("click", function (e) {
  var a = e.target && e.target.closest ? e.target.closest("a") : null;
  if (!a) return;
  var href = a.getAttribute("href") || "";
  if (href.indexOf("http://") !== 0 && href.indexOf("https://") !== 0) return;
  a.setAttribute("target", "_blank");
  a.setAttribute("rel", "noopener noreferrer");
}, true);
document.addEventListener("play",function(e){
  var t=e.target; if(!(t instanceof HTMLVideoElement)) return;
  if (t.muted) return;
  document.querySelectorAll("video").forEach(function(v){
    if (v!==t){ v.muted=true; }
  });
},true);
document.querySelectorAll("[data-sound]").forEach(function(btn){
  var box=btn.parentElement;
  var v=box && box.querySelector("video");
  if(!v) return;
  function setLabel(){ btn.textContent = v.muted ? "Muted" : "Sound on"; }
  function unmute(){
    v.removeAttribute("muted");
    v.muted=false;
    v.defaultMuted=false;
    v.volume=1;
    v.dataset.sound="on";
    var p=v.play();
    if(p&&p.catch) p.catch(function(){});
    setLabel();
  }
  function mute(){ v.muted=true; v.dataset.sound="off"; setLabel(); }
  btn.addEventListener("click",function(e){
    e.preventDefault();
    e.stopPropagation();
    if(v.muted) unmute(); else mute();
  });
  v.addEventListener("click", function(e){
    e.preventDefault();
    unmute();
  });
  setLabel();
});
(function(){
  var reel=document.querySelector("[data-reel]");
  if(!reel) return;
  var items=window.TK_REEL||[];
  var img=reel.querySelector("img");
  var name=reel.querySelector("[data-name]");
  var tag=reel.querySelector("[data-tag]");
  var blurb=reel.querySelector("[data-blurb]");
  var link=reel.querySelector("a.reel-link");
  var pills=document.querySelectorAll("[data-reel-i]");
  var i=0;
  var locked=false;
  function show(n){
    i=((n%items.length)+items.length)%items.length;
    var p=items[i];
    img.style.animation="none";
    img.src="/tkhub-preview/site-2026-11-13e/"+p.poster+"?v=3";
    void img.offsetWidth;
    img.style.animation="";
    name.textContent=p.name;
    tag.textContent=p.tag;
    blurb.textContent=p.blurb;
    link.href="/tkhub-preview/site-2026-11-13e/apps/"+p.id+"/";
    pills.forEach(function(b,idx){ b.classList.toggle("on", idx===i); });
  }
  pills.forEach(function(b,idx){
    b.addEventListener("pointerenter", function(){ if(!locked) show(idx); });
    b.addEventListener("click", function(){ locked=true; show(idx); });
  });
  setInterval(function(){ if(!locked) show(i+1); }, 10000);
})();
(function(){
  var header=document.querySelector("header");
  if(!header) return;
  var bar=header.querySelector(".bar");
  if(!bar) return;
  if(!header.querySelector(".menu")){
    var b=document.createElement("button");
    b.className="menu";
    b.type="button";
    b.setAttribute("aria-label","Menu");
    b.innerHTML="<span></span>";
    bar.appendChild(b);
    b.addEventListener("click", function(e){
      e.stopPropagation();
      header.classList.toggle("nav-open");
    });
    document.addEventListener("click", function(e){
      if(!header.contains(e.target)) header.classList.remove("nav-open");
    });
  }
})();
(function(){
  function kick(v){
    if(!(v instanceof HTMLVideoElement)) return;
    v.loop = true;
    v.playsInline = true;
    v.setAttribute("playsinline","");
    v.setAttribute("webkit-playsinline","");
    v.setAttribute("loop","");
    if (v.dataset.sound === "on") {
      v.removeAttribute("muted");
      v.muted = false;
      v.volume = 1;
    } else if (!v.dataset.ready) {
      v.muted = true;
      v.dataset.ready = "1";
    }
    var p = v.play();
    if (p && p.catch) p.catch(function(){});
  }
  function all(){ document.querySelectorAll("video").forEach(kick); }
  all();
  document.addEventListener("DOMContentLoaded", all);
  window.addEventListener("load", all);
  document.addEventListener("visibilitychange", function(){ if(!document.hidden) all(); });
  document.addEventListener("pointerdown", all, { once:true });
  document.querySelectorAll("video").forEach(function(v){
    v.addEventListener("pause", function(){
      if (document.hidden) return;
      kick(v);
    });
    v.addEventListener("ended", function(){ kick(v); });
    v.addEventListener("canplay", function(){ if(v.paused) kick(v); });
  });
})();
(function(){
  if (document.getElementById("help-fab")) return;
  var fab = document.createElement("button");
  fab.id = "help-fab";
  fab.className = "help-fab";
  fab.type = "button";
  fab.textContent = "Help";
  var panel = document.createElement("div");
  panel.className = "help-panel";
  panel.innerHTML =
    '<h3>HELP</h3>' +
    '<p>AI first. Live agent Mon–Fri 9am–6pm CT after a ticket.</p>' +
    '<form id="help-gate" class="form-grid">' +
    '<label>Name<input class="field" required id="h-name" placeholder="Full name"></label>' +
    '<label>Email<input class="field" required type="email" id="h-email" placeholder="you@email.com"></label>' +
    '<label>Phone<input class="field" required type="tel" id="h-phone" placeholder="469-903-1262"></label>' +
    '<button class="btn btn-lime" type="submit">Start chat</button>' +
    '</form>' +
    '<div id="help-chat" style="display:none">' +
    '<div class="help-log" id="help-log"></div>' +
    '<input class="field" id="help-q" placeholder="Ask TK Support">' +
    '<div class="actions" style="margin-top:10px">' +
    '<button class="btn btn-lime" type="button" id="help-send">Send</button>' +
    '<button class="btn btn-line" type="button" id="help-ticket">Create ticket</button>' +
    '</div></div>';
  document.body.appendChild(fab);
  document.body.appendChild(panel);
  fab.onclick = function(){ panel.classList.toggle("open"); };
  function helpAway(){
    var ae = document.activeElement;
    var onForm = ae && ae.closest && ae.closest("form") && !ae.closest(".help-panel");
    fab.classList.toggle("help-away", !!onForm);
  }
  document.addEventListener("focusin", helpAway, true);
  document.addEventListener("focusout", function(){ setTimeout(helpAway, 50); }, true);

  function hours(){
    var now = new Date();
    var ct = new Date(now.toLocaleString("en-US", { timeZone: "America/Chicago" }));
    var d = ct.getDay(), h = ct.getHours();
    return d>=1 && d<=5 && h>=9 && h<18;
  }
  var contact = {name:"",email:"",phone:""};
  document.getElementById("help-gate").onsubmit = function(e){
    e.preventDefault();
    contact.name = document.getElementById("h-name").value.trim();
    contact.email = document.getElementById("h-email").value.trim();
    contact.phone = document.getElementById("h-phone").value.trim();
    if (!contact.name || !contact.email || !contact.phone) return;
    document.getElementById("help-gate").style.display = "none";
    document.getElementById("help-chat").style.display = "block";
    add("bot", hours()
      ? "You're in. Live agent hours are open (9am–6pm CT). Ask me first — I'll ticket TK if I can't close it."
      : "You're in. Outside live hours. I can still answer most house questions. Tickets wait until 9am CT.");
  };
  function add(who, text){
    var p = document.createElement("p");
    p.className = who==="me" ? "help-me" : "help-bot";
    p.textContent = (who==="me" ? "You: " : "TK: ") + text;
    document.getElementById("help-log").appendChild(p);
    document.getElementById("help-log").scrollTop = 99999;
  }
  function answer(q){
    q = q.toLowerCase();
    if (/pass|subscri/.test(q)) return "Hub Pass is $19.99/mo or $179/yr. All 8 apps, one bill. Shop stays $1,000 sites ($250 start) and $5,000 apps ($500 start). Open tkhub.app/pass";
    if (/website|site|\$ ?1,?000|deposit/.test(q)) return "Websites $1,000. $250 starts it. Fill the 10-question brief at tkhub.app/order";
    if (/\bapp\b|\$ ?5,?000/.test(q)) return "Apps $5,000. $500 starts it. Brief: tkhub.app/order";
    if (/testflight|beta/.test(q)) return "TestFlight: tkhub.app/beta — request an invite with your Apple ID.";
    if (/dental|mb2|dentrix/.test(q)) return "Dental IT: $299/mo or $175+ per service. Onsite trip $150 with a sub, $250 without. Intake: tkhub.app/dental";
    if (/login|sign ?in|password|mfa/.test(q)) return "Sign in: tkhub.app/login — password or a code you type. Nothing is texted.";
    if (/radr|ticket|cop/.test(q)) return "RADR shows public records. They can be late, incomplete, or wrong. Verify the road yourself. We are not law enforcement.";
    if (/noir|casino|gambl/.test(q)) return "NOIR is a social casino. 18+. Virtual coins have no cash value. Not real-money gambling.";
    if (/llc|ein|trademark/.test(q)) return "Map is on tkhub.app/llc — Texas Form 205, EIN, bank, then marks. Not legal advice.";
    if (/hours|phone|call/.test(q)) return "Call 469-903-1262. Live agent hours Mon–Fri 9am–6pm CT.";
    return null;
  }
  function send(){
    var inp = document.getElementById("help-q");
    var q = inp.value.trim();
    if (!q) return;
    inp.value = "";
    add("me", q);
    var a = answer(q);
    if (a) add("bot", a);
    else add("bot", "I don't have a clean answer. Hit Create ticket — it emails TK with your name, email, and phone.");
  }
  var helpSend=document.getElementById("help-send"); if(!helpSend) return;
  helpSend.onclick = send;
  document.getElementById("help-q").addEventListener("keydown", function(e){ if(e.key==="Enter"){ e.preventDefault(); send(); }});
  document.getElementById("help-ticket").onclick = function(){
    var last = document.getElementById("help-log").innerText;
    var live = hours() ? "LIVE HOURS — pick up" : "AFTER HOURS — queue until 9am CT";
    var body = "TK Hub support ticket\nStatus: "+live+"\nName: "+contact.name+"\nEmail: "+contact.email+"\nPhone: "+contact.phone+"\n\nChat:\n"+last;
    location.href = "mailto:support@tkhub.app?subject="+encodeURIComponent("TK Hub ticket — "+contact.name)+"&body="+encodeURIComponent(body);
  };
})();


