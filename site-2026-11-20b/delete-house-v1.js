/* delete-house-v1.js (Nov 13). VISION: "Delete only after the person types DELETE. That app's account only."
   This clears the copy of the house account,
   its session, orders and messages on tkhub.app in this browser. It keeps the Light/Dark choice. Other TK Hub apps
   live on their own domains, so their data is never touched from here. */
(function () {
  var f = document.getElementById("hd-form"); if (!f) return;
  var inp = document.getElementById("hd-type"), out = document.getElementById("hd-out"), btn = document.getElementById("hd-go");
  var KEYS = ["tk-accounts", "tk-session", "tk-orders", "tk-messages", "tk-x", "tkhub-portal-v1", "tk-bridge", "tk-bridge-done"];
  function sync() { btn.disabled = inp.value.trim() !== "DELETE"; }
  inp.addEventListener("input", sync); sync();
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    if (inp.value.trim() !== "DELETE") { out.textContent = "Type DELETE in capitals to confirm."; return; }
    var n = 0;
    try {
      KEYS.forEach(function (k) {
        if (localStorage.getItem(k) !== null) { localStorage.removeItem(k); n++; }
        if (sessionStorage.getItem(k) !== null) { sessionStorage.removeItem(k); n++; }
      });
    } catch (err) { out.textContent = "This browser blocked access to its storage. Clear tkhub.app's site data in the browser settings instead."; return; }
    inp.value = ""; sync();
    out.textContent = n ? "Done. The TK Hub house account in this browser is deleted." : "There was no TK Hub house account in this browser.";
  });
})();
