TK Hub preview: claude-v30-2026-11-13 (NOT live; tkhub.app is unchanged)

Base: the current live site, porkbun-live 3b1142b (Nov 9 site + the Drive game), with only these changes:

1. Drive (/drive/) v30
   - Clear: clean blue sky, real distance visibility, no haze (Clear was hazier than Fog before).
   - Fog / Rain / Storm / Snow / Sleet: the horizon really disappears (sky veil in the fog colour).
   - A visible sun: HDR disc with glare (bloom), hidden by buildings; colour and strength by time of day
     (air mass), warm and low at golden hour; shadows follow it; car reflections follow it.
   - Day starts 4:30 pm. New "Live time" button / L key: Live (running clock, as before), 8:30 am, Noon, 4:30 pm,
     Golden hour. Night mode unchanged.
   - Photo-scanned CC0 road, sidewalk and wall materials (Poly Haven), 2K desktop / 1K phones.
   - Every car, paint, mode, sound and control kept (same 3 cars, 6 weathers, drag strip, top speed run, race,
     record, photo, repair). Compare with the live build at https://tkhub.app/drive/.
2. Homepage: the "After hours / Take the night shift / Drive it" section is back (removed Nov 8 without OK).
3. App icons: full-resolution versions on high-density screens (srcset), from each app's own published icon or
   the largest original on file; nothing upscaled.

Preview-only limits (GitHub Pages serves this under /tkhub-preview/claude-v30-2026-11-13/, not at a domain root):
   - The Next.js pages (Sites, Pass, Founders, Contact, Order, Account) log 404s for background prefetches; the pages
     and links work.
   - /about's old app bundle cannot load under a sub-path (it redirects to Founders on tkhub.app as before).
   - robots.txt disallows indexing.
Source: github.com/terrellfrancistk-cpu/tkhub-site branch claude/hopeful-lovelace-qklz08 (porkbun-live/ folder).
