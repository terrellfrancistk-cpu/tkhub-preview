(function () {
  var root = document.getElementById("order-root");
  if (!root) return;
  var HOUSE = "terrell.francis@tkhub.app";
  var QUESTIONS = [
    { id: "service", title: "What do you want built?", hint: "Tap a price. That starts the job." },
    { id: "name", title: "Your name", hint: "The person TK talks to." },
    { id: "business", title: "Business or practice name", hint: "What should appear on the work." },
    { id: "email", title: "Best email", hint: "Order confirmation lands here." },
    { id: "phone", title: "Phone", hint: "TK will text if the brief is thin." },
    { id: "job", title: "What should this do on day one?", hint: "One sentence. Be specific." },
    { id: "who", title: "Who uses it?", hint: "Name the person in the chair." },
    { id: "favorites", title: "3 websites and 3 apps you love", hint: "We'll steal the feeling, never the brand." },
    { id: "v1", title: "What must ship in v1?", hint: "Must-haves only." },
    { id: "deadline", title: "Deadline, and what we must not do", hint: "Date, colors, legal. Empty is fine." },
  ];
  var SERVICES = [
    { id: "website", label: "Website — $1,000", blurb: "$250 deposit. A live site you own." },
    { id: "app", label: "App — $5,000", blurb: "$500 deposit. A phone/web app you own." },
    { id: "both", label: "Website + app", blurb: "The pair. Quote after the brief." },
    { id: "dental", label: "Dental IT", blurb: "MB2 floors. Implementations that stick." },
    { id: "other", label: "Something else", blurb: "Tell us the job." },
  ];
  var form = {
    service: "",
    name: "",
    business: "",
    email: "",
    phone: "",
    job: "",
    who: "",
    websites: ["", "", ""],
    apps: ["", "", ""],
    v1: "",
    deadline: "",
  };
  var h = (location.hash || "").replace("#", "");
  var q0 = new URLSearchParams(location.search).get("service") || h;
  if (["website", "app", "both", "dental", "other"].indexOf(q0) >= 0) form.service = q0;
  var step = form.service ? 1 : 0;

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&")
      .replace(/</g, "<")
      .replace(/>/g, ">")
      .replace(/"/g, """);
  }
  function rorkPrompt(a) {
    return (
      "Build a live preview for this TK Hub job. Do not invent extra brands.\n\n" +
      "Client: " + a.name + "\nBusiness: " + a.business + "\nEmail: " + a.email + "\nPhone: " + a.phone +
      "\nService: " + a.service + "\nDay-one job: " + a.job + "\nWho uses it: " + a.who +
      "\n3 websites they love: " + a.websites.filter(Boolean).join(" · ") +
      "\n3 apps they love: " + a.apps.filter(Boolean).join(" · ") +
      "\nMust ship in v1: " + a.v1 + "\nDeadline / must-not: " + (a.deadline || "(none)") +
      "\n\nRules:\n- Mobile first, even 2-column cards.\n- Dark, high contrast, huge type, honest copy. No stock faces.\n- Put their business name in the header. Day-one job on the hero.\n- Contact: " +
      a.email + " and " + a.phone + ".\n- Footer: tkhub.app · Terrell Francis."
    );
  }
  function previewHtml(a) {
    return (
      "<!DOCTYPE html><html><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width,initial-scale=1'/><title>" +
      esc(a.business || a.name) +
      "</title><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:system-ui,sans-serif;background:#050607;color:#f3f5f7}.wrap{width:min(880px,92vw);margin:0 auto;padding:28px 0 60px}h1{font-size:clamp(36px,9vw,72px);line-height:.9;margin:24px 0 12px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:24px}.card{border:1px solid #24282f;border-radius:16px;padding:16px;background:#101318}.lime{color:#c8ff3d}.mute{color:#9aa3ad}</style></head><body><div class='wrap'><p class='lime'>" +
      esc(a.service) + "</p><h1>" + esc(a.job || a.business || a.name) + "</h1><p class='mute'>For " +
      esc(a.who || "the people who will use it") + ".</p><div class='grid'><div class='card'><p class='lime'>V1</p><p>" +
      esc(a.v1) + "</p></div><div class='card'><p class='lime'>Talk</p><p>" + esc(a.email) + "<br/>" +
      esc(a.phone) + "</p></div></div><p class='mute' style='margin-top:24px'>Preview only. tkhub.app</p></div></body></html>"
    );
  }
  function canNext() {
    var q = QUESTIONS[step];
    if (q.id === "service") return !!form.service;
    if (q.id === "name") return form.name.trim().length > 1;
    if (q.id === "business") return form.business.trim().length > 0;
    if (q.id === "email") return /\S+@\S+\.\S+/.test(form.email);
    if (q.id === "phone") return form.phone.replace(/\D/g, "").length >= 7;
    if (q.id === "job") return form.job.trim().length > 3;
    if (q.id === "who") return form.who.trim().length > 1;
    if (q.id === "favorites")
      return form.websites.filter(function (x) { return x.trim(); }).length === 3 &&
        form.apps.filter(function (x) { return x.trim(); }).length === 3;
    if (q.id === "v1") return form.v1.trim().length > 1;
    return true;
  }
  function field(id, ph, rows) {
    if (rows) return '<textarea class="field" id="f" rows="' + rows + '" placeholder="' + ph + '">' + esc(form[id]) + "</textarea>";
    return '<input class="field" id="f" placeholder="' + ph + '" value="' + esc(form[id]) + '" />';
  }
  function body() {
    var q = QUESTIONS[step];
    var html = "";
    if (q.id === "service") {
      html = '<div class="price">';
      SERVICES.forEach(function (s) {
        html +=
          '<button type="button" class="svc" data-id="' + s.id + '" style="text-align:left;cursor:pointer' +
          (form.service === s.id ? ";border-color:#c8ff3d" : "") +
          '"><p class="mute">' +
          esc(s.label) +
          "</p><p class='amt " +
          (s.id === "app" ? "lime" : "cyan") +
          "'>" +
          (s.id === "website" ? "$1,000" : s.id === "app" ? "$5,000" : "Quote") +
          '</p><p class="mute">' +
          esc(s.blurb) +
          "</p></button>";
      });
      html += "</div>";
    } else if (q.id === "favorites") {
      html =
        '<div class="price"><div><p class="cyan">3 websites</p>' +
        [0, 1, 2]
          .map(function (i) {
            return '<input class="field w" data-i="' + i + '" placeholder="Site ' + (i + 1) + '" value="' + esc(form.websites[i]) + '"/>';
          })
          .join("") +
        '</div><div><p class="cyan">3 apps</p>' +
        [0, 1, 2]
          .map(function (i) {
            return '<input class="field a" data-i="' + i + '" placeholder="App ' + (i + 1) + '" value="' + esc(form.apps[i]) + '"/>';
          })
          .join("") +
        "</div></div>";
    } else {
      var map = {
        name: ["Your name", 0],
        business: ["Practice or company", 0],
        email: ["you@email.com", 0],
        phone: ["469-903-1262", 0],
        job: ["A booking site patients can use from the parking lot.", 4],
        who: ["Front desk + the patient on their phone.", 3],
        v1: ["Must: live link, contact, hours.", 4],
        deadline: ["Need it before the 1st. Do not use stock faces.", 4],
      };
      html = field(q.id, map[q.id][0], map[q.id][1]);
    }
    return html;
  }
  function bind() {
    root.querySelectorAll(".svc").forEach(function (b) {
      b.onclick = function () {
        form.service = b.getAttribute("data-id");
        step = 1;
        draw();
      };
    });
    var f = root.querySelector("#f");
    if (f)
      f.oninput = function () {
        form[QUESTIONS[step].id] = f.value;
        nextBtn();
      };
    root.querySelectorAll(".w").forEach(function (el) {
      el.oninput = function () {
        form.websites[+el.getAttribute("data-i")] = el.value;
        nextBtn();
      };
    });
    root.querySelectorAll(".a").forEach(function (el) {
      el.oninput = function () {
        form.apps[+el.getAttribute("data-i")] = el.value;
        nextBtn();
      };
    });
    var back = root.querySelector("[data-back]");
    if (back)
      back.onclick = function () {
        step = Math.max(0, step - 1);
        draw();
      };
    var go = root.querySelector("[data-go]");
    if (go)
      go.onclick = function () {
        if (!canNext()) return;
        if (step === QUESTIONS.length - 1) return send();
        step += 1;
        draw();
      };
    nextBtn();
  }
  function nextBtn() {
    var go = root.querySelector("[data-go]");
    if (go) go.disabled = !canNext();
  }
  function send() {
    var id = "TK-" + Date.now().toString(36).toUpperCase();
    var prompt = rorkPrompt(form);
    var html = previewHtml(form);
    try {
      localStorage.setItem("tkhub-last-order", JSON.stringify({ id: id, answers: form, html: html, prompt: prompt }));
      if (window.TKPortal && TKPortal.session()) TKPortal.addOrder({ service: form.service, job: form.job, id: id });
    } catch (e) {}
    var body = [
      "TK Hub order " + id,
      "Service: " + form.service,
      "Name: " + form.name,
      "Business: " + form.business,
      "Email: " + form.email,
      "Phone: " + form.phone,
      "Job: " + form.job,
      "Who: " + form.who,
      "Sites: " + form.websites.join(" · "),
      "Apps: " + form.apps.join(" · "),
      "V1: " + form.v1,
      "Deadline: " + form.deadline,
      "",
      "BUILD PROMPT",
      prompt,
    ].join("\n");
    window.location.href =
      "mailto:" + HOUSE + "?subject=" + encodeURIComponent("TK Hub order " + id) + "&body=" + encodeURIComponent(body);
    root.innerHTML =
      '<p class="lime" style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase">Order in</p><h1>WE GOT IT.</h1><p class="lede">Mail is opening for TK. Preview below is the first cut from your brief. The app builder has no public ingest API — copy the prompt so Terrell can paste it and start a preview build while he works the job.</p><p class="cyan">Order ' +
      id +
      '</p><iframe title="Preview" style="width:100%;height:70vh;border:1px solid #24282f;border-radius:16px;margin-top:24px;background:#050607"></iframe><p class="cyan" style="margin-top:24px;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase">Build prompt</p><pre id="rp" class="mute" style="white-space:pre-wrap;border:1px solid #24282f;border-radius:16px;padding:16px;margin-top:12px"></pre><div class="actions"><button class="btn btn-lime" type="button" id="copy">Copy build prompt</button><a class="btn btn-line" href="/tkhub-preview/site-2026-11-14f/login/">Sign in for files</a><a class="btn btn-line" href="tel:+14699031262">469-903-1262</a></div>';
    root.querySelector("iframe").srcdoc = html;
    root.querySelector("#rp").textContent = prompt;
    root.querySelector("#copy").onclick = function () {
      navigator.clipboard.writeText(prompt);
      this.textContent = "Copied";
    };
  }
  function draw() {
    var q = QUESTIONS[step];
    var last = step === QUESTIONS.length - 1;
    root.innerHTML =
      '<p class="lime" style="font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase">Brief ' +
      (step + 1) +
      " / " +
      QUESTIONS.length +
      '</p><div style="height:4px;background:#24282f;border-radius:99px;margin:12px 0 24px"><div style="height:4px;width:' +
      (((step + 1) / QUESTIONS.length) * 100).toFixed(0) +
      '%;background:#c8ff3d"></div></div><h1>' +
      esc(q.title) +
      '</h1><p class="lede">' +
      esc(q.hint) +
      '</p><div style="margin-top:24px">' +
      body() +
      '</div><div class="actions" style="margin-top:28px">' +
      (step > 0 ? '<button class="btn btn-line" type="button" data-back>Back</button>' : "") +
      '<button class="btn btn-lime" type="button" data-go>' +
      (last ? "Send order + preview" : "Next") +
      "</button></div><p class='mute' style='margin-top:16px'>10 questions. Then a live preview. $1,000 sites ($250 start). $5,000 apps ($500 start).</p>";
    bind();
  }
  draw();
})();
