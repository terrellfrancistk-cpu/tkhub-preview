/* auth-bridge-v1.js (Nov 13): real Apple and X sign-in for tkhub.app/account/ through Supabase Auth.
   Off (does nothing) until auth-config-v1.js has a project URL, its public anon key, and the provider listed.
   Loaded in <head> before the page's own code, so it can take the provider's return before the page reads the URL.

   Flow: tap "Continue with Apple|X" -> Supabase /auth/v1/authorize?provider=apple|x -> Apple/X -> Supabase callback
   -> back to this page with #access_token (a Supabase session). The bridge removes the token from the address bar at
   once, asks Supabase who it belongs to (/auth/v1/user), and only if Supabase confirms an email does it hand that
   email to the page's existing provider sign-in step (same path Apple used before), which then asks for the second
   step as usual. No token is stored; the account stays the house account in this browser, like Google today. */
(function () {
  var cfg = window.TK_AUTH_CFG || {}, base = (cfg.supabaseUrl || "").replace(/\/+$/, ""), key = cfg.anonKey || "";
  var on = cfg.providers || [];
  if (!base || !key || !on.length) return;
  var SUPA = { apple: "apple", x: cfg.xProvider || "twitter" }; /* Supabase provider ids */
  var LABEL = { apple: "Apple", x: "X" };
  var here = location.origin + location.pathname;

  function note(msg) {
    function put() {
      var gate = document.querySelector(".auth-card");
      if (!gate) return false;
      var p = document.getElementById("auth-bridge-note") || document.createElement("p");
      p.id = "auth-bridge-note"; p.className = "form-error"; p.setAttribute("role", "alert"); p.textContent = msg;
      if (!p.parentNode) gate.appendChild(p);
      return true;
    }
    if (!put()) { var mo = new MutationObserver(function () { if (put()) mo.disconnect(); }); mo.observe(document.documentElement, { childList: true, subtree: true }); }
  }
  function b64url(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }

  /* 1. Return from Supabase. */
  var pending = null;
  try { pending = sessionStorage.getItem("tk-bridge"); } catch (e) {}
  var h = new URLSearchParams(location.hash.replace(/^#/, ""));
  if (pending && (h.get("access_token") || h.get("error"))) {
    var tok = h.get("access_token"), err = h.get("error_description") || h.get("error");
    history.replaceState(null, "", location.pathname + location.search); /* never leave a token in the address bar */
    try { sessionStorage.removeItem("tk-bridge"); } catch (e) {}
    if (!tok) { note(LABEL[pending] + " did not finish sign-in" + (err ? ": " + err : ".")); return; }
    fetch(base + "/tkhub-preview/site-2026-11-14b/auth/v1/user", { headers: { apikey: key, Authorization: "Bearer " + tok } })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (u) {
        var email = String(u.email || (u.user_metadata && u.user_metadata.email) || "").toLowerCase();
        if (!email || email.indexOf("@") < 1) throw 1;
        try { sessionStorage.setItem("tk-bridge-done", JSON.stringify({ email: email, provider: pending })); } catch (e) {}
        /* Hand the confirmed email to the page's existing provider step (it reads #id_token and takes its email). */
        var claims = b64url(JSON.stringify({ email: email, iss: "tkhub-auth-bridge", via: pending }));
        history.replaceState(null, "", location.pathname + location.search + "#id_token=" + b64url('{"alg":"none"}') + "." + claims + ".");
        location.reload(); /* a hash-only change would not re-run the page's sign-in step */
      })
      .catch(function (e) { note(LABEL[pending] + (e === 1 ? " did not share an email address. Use another way to sign in." : " did not finish sign-in. Try again.")); });
    return;
  }

  /* 2. After hand-off: record which provider it really was (the page labels every id_token sign-in "apple"). */
  var done = null;
  try { done = JSON.parse(sessionStorage.getItem("tk-bridge-done") || "null"); } catch (e) {}
  if (done && done.provider === "x") {
    var tries = 0, fix = setInterval(function () {
      tries++;
      try {
        var a = JSON.parse(localStorage.getItem("tk-accounts") || "[]"), hit = false;
        a.forEach(function (r) { if (r.email === done.email && r.provider === "apple") { r.provider = "x"; hit = true; } });
        if (hit) localStorage.setItem("tk-accounts", JSON.stringify(a));
        document.querySelectorAll(".auth-card .deck").forEach(function (d) { if (d.textContent === "Continue with Apple.") d.textContent = "Continue with X."; });
        if (hit || tries > 40) { clearInterval(fix); sessionStorage.removeItem("tk-bridge-done"); }
      } catch (e) { clearInterval(fix); }
    }, 125);
  } else if (done) { try { sessionStorage.removeItem("tk-bridge-done"); } catch (e) {} }

  /* 3. Tap: send Apple / X through Supabase instead of the old, unregistered client ids. */
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("button.auth-btn");
    if (!b || b.type === "submit") return;
    var t = (b.textContent || "").trim(), p = t === "Continue with Apple" ? "apple" : t === "Continue with X" ? "x" : null;
    if (!p || on.indexOf(p) < 0) return;
    e.preventDefault(); e.stopImmediatePropagation();
    try { sessionStorage.setItem("tk-bridge", p); } catch (x) {}
    location.assign(base + "/tkhub-preview/site-2026-11-14b/auth/v1/authorize?provider=" + encodeURIComponent(SUPA[p]) + "&redirect_to=" + encodeURIComponent(here));
  }, true);
})();
