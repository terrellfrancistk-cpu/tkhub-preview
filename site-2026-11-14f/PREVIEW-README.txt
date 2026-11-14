TK Hub preview: site-2026-11-14f (NOT live)

Base: what is live on tkhub.app now (site-2026-11-13r). Includes everything in 14c (sitemap, link previews,
search-engine fix), plus Terrell's Nov 13 10:01 PM logo and splash rules:

1. Real TK Hub logo everywhere, sharp (see item 4): browser-tab icon now carries
   16/32/48/64 px images (was 16 px only); home-screen icon is the TK Hub mark on every page (80 pages used APEX's icon,
   30 pointed at a missing file); the install manifest lists 192/512 px TK Hub icons; every page has the 1200x630 TK Hub
   share image.
2. Splash only while loading: the homepage launch screen no longer holds for a second. It appears only if the page is
   still loading after a quarter second and leaves the moment loading finishes. Fast or cached visits never see it.
   One screen: the sharp TK Hub mark.
3. Drive review page: its loading screen (real progress) now fades out in 0.2 s instead of 0.8 s. /drive/ unchanged.

4. Terrell's TK Hub logo master (brand/tkhub-logo-master) is now the source of every TK Hub logo on the site: headers,
   the splash (vector SVG), browser-tab icons, home-screen and install icons, and the share image. Same look and layout
   as before, just sharp. Each old file is kept beside the new one as name-original. (The 512 px file used in 14d was
   itself an upscale of the 300 px logo; this replaces it.)
5. So people who visited before also get the sharp logos right away (the site tells browsers to keep images for 30
   days), every logo address now carries a small version tag. No visible change beyond item 4.
