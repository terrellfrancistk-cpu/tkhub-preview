/*
 * RADR web service worker (2026-11-14).
 *
 * Lets the web app reopen without signal and keeps the map you recently
 * looked at: the app shell, its build files, the map style and models, the
 * fonts, and recently viewed map tiles (capped). Nothing is sent anywhere;
 * everything stays in this browser. Pages always try the network first, so a
 * new release shows as soon as there is a connection. Searches, routes,
 * limits, accounts and every other service are never cached here.
 */
const VERSION = "2026-11-14c";
const SHELL = `radr-shell-${VERSION}`;
const ASSETS = `radr-assets-${VERSION}`;
const TILES = "radr-tiles-v1"; // kept across releases: tiles do not change with the app
const KEEP = [SHELL, ASSETS, TILES];

/** Most tiles kept per host; oldest go first. */
const TILE_LIMITS = {
  "tiles.openfreemap.org": 2500,
  "tiles.mapterhorn.com": 800,
  "tiles.maps.eox.at": 800,
};
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

/**
 * What to do with a request: "page" (network first, offline copy of the app),
 * "asset" (build files: cache first), "fresh" (map style, models, fonts: use
 * the copy, refresh it in the background), "tile" (cache first, capped) or
 * null (leave it alone).
 */
function classify(url, method, mode, scopeOrigin) {
  if (method !== "GET") return null;
  if (url.origin === scopeOrigin) {
    if (mode === "navigate") return "page";
    if (/\/assets\/[^/]+\.(js|css|mjs|woff2?|png|jpe?g|svg|webp)$/.test(url.pathname)) return "asset";
    if (/\/map3d\//.test(url.pathname)) return "fresh";
    // Site images (logo, store badges, icons); not the developer kit.
    if (!/\/devkit\//.test(url.pathname) && /\.(png|jpe?g|svg|webp|ico)$/.test(url.pathname)) return "fresh";
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (Object.prototype.hasOwnProperty.call(TILE_LIMITS, url.hostname)) return "tile";
  if (FONT_HOSTS.includes(url.hostname)) return "fresh";
  return null;
}

self.RADR_SW = { classify, TILE_LIMITS, VERSION };

if (typeof self.addEventListener === "function" && typeof caches !== "undefined") {
  self.addEventListener("install", (event) => {
    event.waitUntil(
      caches
        .open(SHELL)
        .then((cache) => cache.add(new Request(self.registration.scope, { cache: "reload" })))
        .catch(() => undefined)
        .then(() => self.skipWaiting()),
    );
    // Keep every page's files so routes not opened yet still work offline.
    // Best effort, in the background: a missing file never blocks the update.
    event.waitUntil(precache());
  });

  async function precache() {
    try {
      const list = await fetch(new URL("sw-assets.json", self.registration.scope), { cache: "no-store" });
      if (!list.ok) return;
      const { files } = await list.json();
      const cache = await caches.open(ASSETS);
      for (const file of files) {
        const url = new URL(file, self.registration.scope);
        if (await cache.match(url, { ignoreVary: true })) continue;
        await cache.add(url).catch(() => undefined);
      }
    } catch {
      /* offline or no list: pages are kept as they are opened instead */
    }
  }

  self.addEventListener("activate", (event) => {
    event.waitUntil(
      caches
        .keys()
        .then((names) => Promise.all(names.filter((n) => n.startsWith("radr-") && !KEEP.includes(n)).map((n) => caches.delete(n))))
        .then(() => self.clients.claim()),
    );
  });

  self.addEventListener("fetch", (event) => {
    const request = event.request;
    if (request.headers.has("range")) return;
    const url = new URL(request.url);
    const kind = classify(url, request.method, request.mode, self.location.origin);
    if (!kind) return;
    if (kind === "page") event.respondWith(page(request));
    else if (kind === "asset") event.respondWith(cacheFirst(request, ASSETS));
    else if (kind === "fresh") event.respondWith(staleWhileRevalidate(request, event));
    else event.respondWith(tile(request, url.hostname, event));
  });
}

async function page(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(SHELL);
      await cache.put(self.registration.scope, response.clone());
    }
    return response;
  } catch {
    // Offline: every route is the same single-page app.
    const cached =
      (await caches.match(self.registration.scope, { cacheName: SHELL, ignoreVary: true })) ?? (await caches.match(request, { ignoreVary: true }));
    if (cached) return cached;
    return new Response("<!doctype html><meta charset=utf-8><title>RADR</title><p style=\"font-family:sans-serif\">RADR needs a connection to open the first time.</p>", {
      status: 503,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
}

async function cacheFirst(request, name) {
  // Hashed file names: the same URL is always the same bytes, so ignore Vary.
  const cached = await caches.match(request, { cacheName: name, ignoreVary: true });
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(name);
    await cache.put(request, response.clone());
  }
  return response;
}

async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(ASSETS);
  const cached = await cache.match(request, { ignoreVary: true });
  const refresh = fetch(request)
    .then((response) => {
      if (response.ok) return cache.put(request, response.clone()).then(() => response);
      return response;
    })
    .catch(() => undefined);
  if (cached) {
    event.waitUntil(refresh);
    return cached;
  }
  return (await refresh) ?? Response.error();
}

const putsSinceTrim = {};

async function tile(request, host, event) {
  const cache = await caches.open(TILES);
  const cached = await cache.match(request, { ignoreVary: true });
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
    putsSinceTrim[host] = (putsSinceTrim[host] ?? 0) + 1;
    if (putsSinceTrim[host] >= 50) {
      putsSinceTrim[host] = 0;
      event.waitUntil(trim(cache, host));
    }
  }
  return response;
}

async function trim(cache, host) {
  const keys = (await cache.keys()).filter((req) => new URL(req.url).hostname === host);
  const extra = keys.length - TILE_LIMITS[host];
  for (let i = 0; i < extra; i++) await cache.delete(keys[i]);
}
