/*
 * Afterglow offline shell.
 *
 * It exists for one sentence in the consent line: "by joining the list you
 * agree to the Terms and the Privacy Policy." Somebody on a train, halfway
 * through the signup, taps TERMS and the tunnel eats the network — and the
 * document they are being asked to agree to is a browser error page. Consent
 * to a document you cannot open is not consent.
 *
 * So the shell and the built bundle are kept, and every page of this site —
 * the terms and the policy among them, since their text ships inside that
 * bundle — stays readable with the network gone.
 *
 * Two rules it holds to:
 *
 *   1. NETWORK FIRST for pages. The cache is a fallback, never a preference:
 *      a legal document served from a stale cache while the live one has
 *      changed is the exact drift this project refuses everywhere else. The
 *      copy is used only when the network genuinely cannot answer.
 *   2. Only this origin, only GET. The launch list, the human check and the
 *      support desk all live on another host and are never cached — a form
 *      answered out of a cache would be a form that never sent anything.
 */

const CACHE = "afterglow-shell-v1";
const SHELL = ["/", "/tkhub-preview/afterglow-1114b/icon.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Pages: try the network, fall back to the shell that was saved while the
  // connection was good. The SPA renders /terms and /privacy from the bundle,
  // so the shell plus the bundle IS the offline document.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put("/", copy));
          }
          return response;
        })
        .catch(() =>
          caches.match("/").then(
            (hit) =>
              hit ??
              new Response("You are offline and this page was never saved.", {
                status: 503,
                headers: { "Content-Type": "text/plain" },
              }),
          ),
        ),
    );
    return;
  }

  // Built assets carry a content hash in their name, so a cached one can never
  // be a stale version of a different file — a new build is a new URL.
  if (url.pathname.startsWith("/assets/") || SHELL.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then(
        (hit) =>
          hit ??
          fetch(request).then((response) => {
            if (response && response.ok) {
              const copy = response.clone();
              caches.open(CACHE).then((cache) => cache.put(request, copy));
            }
            return response;
          }),
      ),
    );
  }
});
