/* auth-honest-v2.js (Nov 13; Terrell approved D16 as interim). VISION: "Apple and X stay visibly off until the
   provider is really wired. Do not fake the tap." Both buttons stay on the page, visibly off, with one sentence why.
   A provider turns back on by itself when auth-config-v1.js lists it (Supabase bridge, auth-bridge-v1.js).
   v2 matches the buttons by their text: the email/password submit button shares the "auth-apple" class and must
   never be switched off. Google, password and email link are untouched. */
(function () {
  var cfg = window.TK_AUTH_CFG || {}, ready = !!(cfg.supabaseUrl && cfg.anonKey), on = (cfg.providers || []);
  var OFF = { apple: !(ready && on.indexOf("apple") >= 0), x: !(ready && on.indexOf("x") >= 0) };
  window.TK_AUTH_ON = { apple: !OFF.apple, x: !OFF.x };
  if (!OFF.apple && !OFF.x) return;
  var MSG = "Apple and X sign-in open once they are set up for tkhub.app. Use Google, a password, or an email link.";
  if (OFF.apple !== OFF.x) MSG = (OFF.apple ? "Apple" : "X") + " sign-in opens once it is set up for tkhub.app. Use another way to sign in.";
  function which(b) {
    if (!b || b.tagName !== "BUTTON" || b.type === "submit") return null;
    var t = (b.textContent || "").trim();
    if (/^Continue with Apple$/.test(t)) return "apple";
    if (/^Continue with X$/.test(t)) return "x";
    return null;
  }
  function offBtn(b) { var k = which(b); return k && OFF[k] ? k : null; }
  function mark() {
    var last = null;
    document.querySelectorAll("button.auth-btn").forEach(function (b) {
      if (!offBtn(b)) return;
      b.disabled = true;
      b.setAttribute("aria-disabled", "true");
      b.setAttribute("aria-describedby", "auth-off-note");
      b.style.opacity = "0.45"; b.style.cursor = "not-allowed";
      last = b;
    });
    if (last && !document.getElementById("auth-off-note")) {
      var p = document.createElement("p");
      p.id = "auth-off-note"; p.textContent = MSG;
      p.style.cssText = "margin:6px 0 10px;font-size:14px;line-height:1.4;opacity:.85";
      var after = last;
      while (after.nextElementSibling && after.nextElementSibling.classList.contains("auth-btn") && after.nextElementSibling.type !== "submit") after = after.nextElementSibling;
      after.parentNode.insertBefore(p, after.nextSibling);
    }
  }
  /* React can re-mount a button between renders: block an off provider's tap in the capture phase too. */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("button");
    if (offBtn(b)) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  new MutationObserver(mark).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState !== "loading") mark(); else document.addEventListener("DOMContentLoaded", mark);
})();
