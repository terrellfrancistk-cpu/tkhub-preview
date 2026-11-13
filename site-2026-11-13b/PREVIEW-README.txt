TK Hub preview: site-2026-11-13b (NOT live; tkhub.app is unchanged)

Base: the current live site (porkbun-live 3b1142b: the Nov 9 site + the Drive game), with only these changes:

1. Homepage: the "After hours / Take the night shift / Drive it" section is back (removed Nov 8 without approval).
2. App icons: full-resolution versions on high-density screens (srcset), from each app's own published icon or the
   largest original on file. Nothing upscaled.
3. No build-tool or AI vendor names in anything a visitor sees (devices page, install manifest). Technical IDs unchanged.
4. Drive: /drive/ is the live game, untouched (game-v29). The improved build is a separate page for review only:
   /drive/v30.html  (crisp Clear sky, real Fog, a visible sun with glare and time of day, "Live time" button / L key,
   photo-scanned CC0 road, sidewalk and wall materials; every car, mode, sound and control kept).

Preview-only limits (served under /tkhub-preview/site-2026-11-13b/, not at a domain root): the Sites, Pass, Founders,
Contact, Order and Account pages log 404s for background prefetches (pages and links work); /about's old bundle cannot
load under a sub-path. robots.txt disallows indexing.
