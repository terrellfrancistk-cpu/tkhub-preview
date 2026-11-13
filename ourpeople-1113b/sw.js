/*
 * Our People offline shell (SPEC: "the emergency card is available offline").
 *
 * Registered only on the web app (/app), never for marketing-site visitors.
 * - Pages: network first. Online, the page is always fetched fresh, so a
 *   deploy is never hidden behind an old copy. Only when the network fails is
 *   the last good app page served, so the app (and the encrypted card it keeps
 *   in this browser) opens offline.
 * - /assets/*: build files with a content hash in the name never change, so
 *   they are served from the cache. This build's list is fetched on install;
 *   files from older builds are pruned when the new worker takes over.
 * - Only this site's own GET requests are touched. Supabase and every other
 *   origin go straight to the network; no account data is cached here.
 * Kill switch: publish a sw.js whose install handler calls
 * self.registration.unregister(); every browser drops this worker on its next visit.
 */
const BUILD = "b9zpc4i";
const CACHE = "op-shell";
const SHELL = "/__op_shell__.html";

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    try {
      const listed = await fetch("/sw-assets.json", { cache: "no-store" });
      const files = listed.ok ? await listed.json() : [];
      await Promise.all(files.map(async (file) => {
        if (await cache.match(file, { ignoreVary: true })) return;
        try {
          const res = await fetch(file, { cache: "no-store" });
          if (res.ok) await cache.put(file, res);
        } catch { /* fetched again when the page asks for it */ }
      }));
    } catch { /* no list: assets are cached as the page uses them */ }
    try {
      const shell = await fetch("/app", { cache: "no-store" });
      if (shell.ok) await cache.put(SHELL, shell);
    } catch { /* cached on the next online page load */ }
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const name of await caches.keys()) if (name !== CACHE) await caches.delete(name);
    try {
      const listed = await fetch("/sw-assets.json", { cache: "no-store" });
      if (listed.ok) {
        const keep = new Set(await listed.json());
        const cache = await caches.open(CACHE);
        for (const req of await cache.keys()) {
          const path = new URL(req.url).pathname;
          if (path.startsWith("/assets/") && !keep.has(path)) await cache.delete(req);
        }
      }
    } catch { /* offline: prune next time */ }
    await self.clients.claim();
  })());
});

async function page(request) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(request);
    const path = new URL(request.url).pathname;
    // App routes have no file extension; keep the latest good one as the shell.
    if (res.ok && !/\.[a-z0-9]+$/i.test(path) && (res.headers.get("content-type") || "").includes("text/html")) {
      await cache.put(SHELL, res.clone());
    }
    return res;
  } catch (error) {
    const shell = await cache.match(SHELL, { ignoreVary: true });
    if (shell) return shell;
    throw error;
  }
}

async function asset(request) {
  const cache = await caches.open(CACHE);
  // Module scripts send an Origin header and the server answers "Vary: Origin";
  // a hashed file is the same bytes for every origin, so ignore Vary here.
  const hit = await cache.match(request, { ignoreVary: true });
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok) await cache.put(request, res.clone());
  return res;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === "navigate") event.respondWith(page(request));
  else if (url.pathname.startsWith("/assets/")) event.respondWith(asset(request));
});

// The build id changes with every build, so the browser installs the new worker.
self.__opBuild = BUILD;
