TK Hub preview: site-2026-11-13g (NOT live; tkhub.app is unchanged)

Base: site-2026-11-13b (the current live site + the 'Drive it' section, full-res icons, no vendor names,
/drive untouched with the improved build at /drive/v30.html). Only these additions on top:

5. Home footer: Privacy, Terms, Data deletion and Child safety links added after the existing Founders / Order /
   Contact / Account links. Nothing else in the footer changed.
6. Readability (WCAG AA colour contrast): the home page's "See the pass" link in light mode, and 32 older pages
   (4AM, About, Beta, Dental, Desk, Devices, Get-zip, Live, LLC, Privacy, RADR, Studio traffic, Team, Terms, Trust,
   Works). Same colours, slightly deeper so text reads on the light background. No text, link or layout changed.

7. Pages that opened blank on live now say where to go: /app, /bench, /bill, /claims, /imaging, /line, /office,
   /pay, /wire show one sentence ("The APEX ... lives in the APEX app") with a button to apexpeakofcare.app and one
   home, above the original big "APEX" word; /ciara says who Ciara is and links to Founders. Nothing removed.

8. Account (/account/): "Continue with Apple" and "Continue with X" are shown switched off with one sentence why
   (Terrell approved D16 as the interim). Google, password and email link work as before. A sign-in bridge is in
   place that switches Apple and X back on through Supabase once the providers are set up (HANDOFF H22).

9. Terrell's Nov 13 yeses: (R17) the old app links that pointed at the app builder's temporary test servers now go to
   each app's own address (tryzilt.app, getoncurb.app, tryafterglow.app, trynoir.app, /radr); (D15) a mistyped
   address shows a TK Hub 404 page (house type and colours, "Back to TK Hub", Contact) instead of the stock one.
   Try it: /tkhub-preview/site-2026-11-13g/any-wrong-address  (on GitHub Pages the preview's own 404 is GitHub's
   site-wide one; open /tkhub-preview/site-2026-11-13g/404.html to see the TK Hub page).

10. Launch screen: the TK Hub mark on black for about a second, once per visit, on the homepage. It was on the
    site before Nov 7 and stopped loading in that rebuild; same screen, now with the sharp 512 px mark.
11. /privacy: one new section saying plainly what the account, order and contact forms keep in your browser and
    what they send to TK Hub. Every existing sentence stays.
12. /data-deletion: "Delete the TK Hub house account in this browser" (type DELETE), plus a "TK Hub house account"
    choice in the request form.

Still waiting: /get-zip (D17).

Preview-only limits: served under /tkhub-preview/site-2026-11-13g/, not at a domain root: some pages log 404s for
background prefetches; /about's old bundle cannot load under a sub-path. robots.txt disallows indexing.
