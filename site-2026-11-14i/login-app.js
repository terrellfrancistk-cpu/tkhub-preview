(function () {
  var mode = "in";
  var method = "pass";
  var q = new URLSearchParams(location.search);
  document.querySelectorAll("[data-m]").forEach(function (b) {
    b.onclick = function () {
      method = b.getAttribute("data-m");
      document.querySelectorAll("[data-m]").forEach(function (x) {
        x.classList.toggle("on", x === b);
      });
    };
  });
  document.getElementById("auth-toggle").onclick = function () {
    mode = mode === "in" ? "up" : "in";
    document.getElementById("auth-go").textContent = mode === "up" ? "Create account" : "Continue";
    this.textContent = mode === "up" ? "Have an account? Sign in" : "New here? Create account";
  };
  document.getElementById("auth-form").onsubmit = async function (e) {
    e.preventDefault();
    var err = document.getElementById("auth-err");
    var msg = document.getElementById("auth-msg");
    err.textContent = "";
    msg.textContent = "";
    var email = document.getElementById("auth-email").value;
    var pass = document.getElementById("auth-pass").value;
    var name = document.getElementById("auth-name").value;
    var phone = document.getElementById("auth-phone").value;
    var code = document.getElementById("auth-code").value;
    try {
      if (method === "pass") {
        if (mode === "up") await TKPortal.signup(email, pass, name);
        else await TKPortal.login(email, pass);
        location.href = q.get("next") || "/tkhub-preview/site-2026-11-14i/account/";
      } else if (method === "ecode") {
        if (!code) {
          var c = TKPortal.emailCodeStart(email);
          msg.textContent = "Code sent to mail. On this static host the code is " + c.code + " (10 min).";
          location.href = c.mailto;
        } else {
          TKPortal.emailCodeVerify(email, code);
          location.href = q.get("next") || "/tkhub-preview/site-2026-11-14i/account/";
        }
      } else if (method === "mfa") {
        if (!TKPortal.session()) {
          if (email && pass) await TKPortal.login(email, pass);
          else throw new Error("Password sign-in first, then authenticator.");
        }
        if (!code) {
          var t = await TKPortal.totpSetup();
          msg.textContent = "Add this secret to Google Authenticator / Authy: " + t.secret;
        } else {
          await TKPortal.totpVerify(code);
          location.href = q.get("next") || "/tkhub-preview/site-2026-11-14i/account/";
        }
      }
    } catch (ex) {
      err.textContent = ex.message;
    }
  };
})();
