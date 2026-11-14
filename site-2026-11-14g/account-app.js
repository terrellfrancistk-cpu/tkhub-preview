(function () {
  if (!window.TKPortal || !TKPortal.me()) {
    location.href = "/tkhub-preview/site-2026-11-14g/login/";
    return;
  }
  document.getElementById("who").textContent = TKPortal.me().email;
  document.getElementById("logout").onclick = function () {
    TKPortal.logout();
    location.href = "/tkhub-preview/site-2026-11-14g/login/";
  };
  var pane = document.getElementById("pane");
  function dollars(c) {
    return "$" + (c / 100).toFixed(2);
  }
  function render(tab) {
    var d = TKPortal.dump();
    document.querySelectorAll("[data-tab]").forEach(function (b) {
      b.classList.toggle("on", b.getAttribute("data-tab") === tab);
    });
    if (tab === "orders") {
      pane.innerHTML =
        "<h2>Orders</h2>" +
        (d.orders.length
          ? d.orders
              .map(function (o) {
                return (
                  "<article class='card' style='padding:18px;margin-top:12px'><div class='tag'>" +
                  o.service +
                  "</div><h3>" +
                  o.job +
                  "</h3></article>"
                );
              })
              .join("")
          : "<p class='mute'>No orders yet.</p>");
    } else if (tab === "messages") {
      pane.innerHTML =
        "<h2>Text + audio to TK</h2><input id='ms' placeholder='Subject' style='width:100%;min-height:44px;margin:8px 0;padding:8px 12px;border-radius:8px;border:1px solid #24282f;background:#101318;color:#fff'/><textarea id='mb' placeholder='What do you need?' style='width:100%;min-height:120px;padding:8px 12px;border-radius:8px;border:1px solid #24282f;background:#101318;color:#fff'></textarea><div class='actions'><button class='btn btn-line' type='button' id='rec'>Record clip</button><button class='btn btn-line' type='button' id='stop'>Stop</button><button class='btn btn-lime' type='button' id='send'>Send to TK</button></div><div id='thread'></div>";
      var audio = "";
      var rec = null;
      var chunks = [];
      document.getElementById("rec").onclick = async function () {
        var s = await navigator.mediaDevices.getUserMedia({ audio: true });
        rec = new MediaRecorder(s);
        chunks = [];
        rec.ondataavailable = function (e) {
          if (e.data.size) chunks.push(e.data);
        };
        rec.onstop = function () {
          var r = new FileReader();
          r.onload = function () {
            audio = String(r.result || "");
          };
          r.readAsDataURL(new Blob(chunks));
          s.getTracks().forEach(function (t) {
            t.stop();
          });
        };
        rec.start();
      };
      document.getElementById("stop").onclick = function () {
        if (rec) rec.stop();
      };
      document.getElementById("send").onclick = function () {
        location.href = TKPortal.addMessage(
          document.getElementById("ms").value || "Message",
          document.getElementById("mb").value,
          audio,
        );
      };
      document.getElementById("thread").innerHTML = d.messages
        .map(function (m) {
          return (
            "<article class='card' style='padding:18px;margin-top:12px'><div class='tag'>" +
            m.kind +
            "</div><h3>" +
            m.subject +
            "</h3><p class='mute'>" +
            m.body +
            "</p>" +
            (m.audio ? "<audio controls src='" + m.audio + "'></audio>" : "") +
            "</article>"
          );
        })
        .join("");
    } else if (tab === "vault") {
      pane.innerHTML =
        "<h2>Behind the paywall</h2>" +
        d.vault
          .map(function (v) {
            return (
              "<article class='card' style='padding:18px;margin-top:12px'><div class='tag'>" +
              v.kind +
              " · " +
              dollars(v.price) +
              "</div><h3>" +
              v.title +
              "</h3>" +
              (v.unlocked
                ? "<p class='mute'>" + v.body + "</p>"
                : "<button class='btn btn-lime' data-un='" + v.id + "'>Unlock</button>") +
              "</article>"
            );
          })
          .join("");
      pane.querySelectorAll("[data-un]").forEach(function (b) {
        b.onclick = function () {
          try {
            TKPortal.unlock(b.getAttribute("data-un"));
            render("vault");
          } catch (ex) {
            alert(ex.message);
          }
        };
      });
    } else if (tab === "pay") {
      pane.innerHTML =
        "<h2>Stripe + Plaid</h2><p class='mute'>Website deposit $250. App $500. 8% TK Hub fee on top.</p><input id='amt' type='number' value='250' style='min-height:44px;margin:12px 0;padding:8px 12px;border-radius:8px;border:1px solid #24282f;background:#101318;color:#fff'/><p id='tot'></p><div class='actions'><button class='btn btn-lime' id='stripe'>Pay card · Stripe</button><button class='btn btn-line' id='plaid'>Pay bank · Plaid</button></div>" +
        d.payments
          .map(function (p) {
            return "<p class='mute'>" + p.method + " " + dollars(p.amount_cents) + " fee " + dollars(p.fee_cents) + "</p>";
          })
          .join("");
      function tot() {
        var a = Number(document.getElementById("amt").value) || 0;
        document.getElementById("tot").textContent =
          "Fee 8% $" + (a * 0.08).toFixed(2) + " · Total $" + (a * 1.08).toFixed(2);
      }
      tot();
      document.getElementById("amt").oninput = tot;
      document.getElementById("stripe").onclick = function () {
        location.href = TKPortal.addPayment("stripe", Number(document.getElementById("amt").value) || 0);
      };
      document.getElementById("plaid").onclick = function () {
        location.href = TKPortal.addPayment("plaid", Number(document.getElementById("amt").value) || 0);
      };
    } else {
      pane.innerHTML =
        "<h2>Dental IT + custom</h2><select id='kind' style='min-height:44px;background:#101318;color:#fff;border:1px solid #24282f;border-radius:8px'><option>dental</option><option>it</option><option>custom</option><option>other</option></select><textarea id='rb' style='width:100%;min-height:120px;margin-top:8px;padding:8px 12px;border-radius:8px;border:1px solid #24282f;background:#101318;color:#fff' placeholder='Offices, floors, what is broken.'></textarea><button class='btn btn-lime' id='rsend' style='margin-top:8px'>Send request</button>" +
        d.requests
          .map(function (r) {
            return "<p class='mute'>" + r.kind + ": " + r.body + "</p>";
          })
          .join("");
      document.getElementById("rsend").onclick = function () {
        location.href = TKPortal.addRequest(document.getElementById("kind").value, document.getElementById("rb").value);
      };
    }
  }
  document.querySelectorAll("[data-tab]").forEach(function (b) {
    b.onclick = function () {
      render(b.getAttribute("data-tab"));
    };
  });
  render("orders");
})();
