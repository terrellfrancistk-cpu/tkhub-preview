/* zip-check-v1.js (Nov 13). VISION: every button does the thing it says; if it cannot, it is disabled and one sentence
   says why. /get-zip links /TKHUB-BLIP-ADS.zip, which is not on the host (404 on tkhub.app, Nov 13). The link stays in
   the page. This checks the file: if it is there the button works as before; if not, the button is shown as off with
   one sentence and a link to the ad set that is on the host. Uploading the zip turns the button back on by itself. */
(function () {
  var links = document.querySelectorAll('a[href$=".zip"][download]');
  links.forEach(function (a) {
    fetch(a.getAttribute("href"), { method: "HEAD", cache: "no-store" }).then(function (r) {
      var type = r.headers.get("content-type") || "";
      if (r.ok && type.indexOf("text/html") === -1) return;   /* the file is there: leave the button alone */
      off(a);
    }).catch(function () { off(a); });
  });
  function off(a) {
    if (a.getAttribute("aria-disabled") === "true") return;
    a.setAttribute("aria-disabled", "true");
    a.setAttribute("aria-describedby", "zip-off-note");
    a.removeAttribute("download");
    a.dataset.href = a.getAttribute("href");
    a.removeAttribute("href");
    a.setAttribute("role", "link");
    a.style.opacity = "0.45"; a.style.cursor = "not-allowed";
    var p = document.createElement("p");
    p.id = "zip-off-note";
    p.style.cssText = "margin:12px 0 0;font-size:16px;line-height:1.45";
    p.innerHTML = 'This zip is not on the site yet. The full ad set is on <a href="/tkhub-preview/site-2026-11-14h/ads/" style="text-decoration:underline;font-weight:800">tkhub.app/ads</a>.';
    a.insertAdjacentElement("afterend", p);
  }
})();
