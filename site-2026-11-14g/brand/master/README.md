# TK Hub logo master

Sharp, high-resolution vector master of Terrell Francis's TK Hub logo
(house-shaped cyan outline, cyan house-shaped inner fill with italic black **TK**,
and letter-spaced cyan **HUB** below, on black).

## Source

**Recreated as a clean vector.** No true original at 1024px or larger, and no SVG,
AI, PSD, or PDF master, was found after searching:

- The box (`/workspace`, `/tmp`, `/home/box`, `/cursor/stores`), including every
  `tkhub` / `tk-hub` PNG and SVG in repos, publish trees, and backups
- Gmail (`terrellfrancistk@gmail.com` and `iterrellfrancis@gmail.com`) — the only
  large PNG attached to a self-sent “TK Hub” email was an IRS EIN screenshot,
  not the logo
- Canva (design search for “TK Hub” / “tkhub” / “logo”, brand kits, folders) —
  no logo design or brand kit
- GitHub (`terrellfrancistk-cpu`) — only the same 300px raster is referenced

The best existing copies are all **300×300** (MD5
`bd460e1f43c9b3bded18256ba62003e9`), including
`/workspace/repos/rork-our-people/account-portal/public/tk-hub-logo.png`
(the working reference). Larger files found on disk are **not** usable originals:

- `tkhub-google-logo-1200.png` (1200px) is the **plain TK square**, not this mark
- `apexpeakofcare/public/brand/tk-hub.png` (1200px) and
  `venture/job-apply-service/cover/tkhub-logo-900.png` (900px) are soft upscales
  of the 300px reference (sharpness matches a Lanczos upscale)
- `tkhub-mark-512.png` has a transparent background but the artwork itself is
  only ~212×315 px and uses a slightly different cyan (`#00FFFF`)

This master was **traced and rebuilt as a vector** from the 300px reference:

- Brand cyan sampled from solid fill pixels: **`#00CBF6`** `(0, 203, 246)`
- House outline and inner fill: geometric rounded pentagons (quadratic
  rounded corners), fitted to the reference silhouette
- **TK**: clean geometric italic letterforms with the reference's horizontal
  top bar and ~45° beveled terminals
- **HUB**: **Lexend Peta Regular**, cap height 27.2 px in the 300-unit drawing
  space, left edges at x = 92.8 / 138 / 183, converted to outlines so the SVG
  does not depend on the font being installed

Nothing in any repo or live site was modified. These files live only in this
folder.

Drawing space is a **300×300** viewBox that matches the reference pixel grid
(1 unit = 1 reference pixel), so the vector can be compared directly and then
rendered at any size.

## File list

### Vector masters

- `tkhub-logo.svg` — full lockup, transparent background (use this as the master)
- `tkhub-logo-on-black.svg` — full lockup on black
- `tkhub-mark.svg` — mark only (house + TK, no HUB), vertically centered, transparent
- `tkhub-mark-on-black.svg` — mark only on black

### Raster exports (from the SVG)

Full lockup, transparent background:

- `tkhub-logo-512-transparent.png`
- `tkhub-logo-1024-transparent.png`
- `tkhub-logo-2048-transparent.png`

Full lockup, black background:

- `tkhub-logo-512-black.png`
- `tkhub-logo-1024-black.png`
- `tkhub-logo-2048-black.png`

Mark only (house + TK, no HUB), transparent and black:

- `tkhub-mark-512-transparent.png`
- `tkhub-mark-1024-transparent.png`
- `tkhub-mark-512-black.png`
- `tkhub-mark-1024-black.png`

### Comparison and reference

- `compare-side-by-side-3x.png` — reference vs. recreation at 300px, each shown
  at 3× nearest-neighbor (so pixel structure is visible)
- `compare-reference-vs-master.png` — the same 3× comparison plus a difference
  map (red = in the reference only, green = in the recreation only) and a
  sharpness demo (300px reference upscaled to 1024 vs. the vector rendered at
  1024)
- `_source-reference-300.png` — a copy of the 300px reference used for the rebuild

## Match at 300px

Compared to the reference raster (anti-aliasing on a 300px image will never
match a vector 1:1):

- Cyan-pixel IoU: **0.888**
- Mean absolute error (all channels): **3.00**

The leftover difference is almost entirely along edges (1px anti-aliasing) and
is expected. At 1024px and 2048px the new master is sharp; the old 300px file
goes soft.

## Brand color

| Name        | Hex       | RGB           |
|-------------|-----------|---------------|
| TK Hub cyan | `#00CBF6` | `0, 203, 246` |
| Black       | `#000000` | `0, 0, 0`     |
