TK Hub preview: site-2026-11-13e (NOT live; tkhub.app is unchanged)

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

Still waiting: /get-zip (D17).

Preview-only limits: served under /tkhub-preview/site-2026-11-13e/, not at a domain root: some pages log 404s for
background prefetches; /about's old bundle cannot load under a sub-path. robots.txt disallows indexing.
