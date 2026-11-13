================================================================
PHONE SCREENSHOTS - WHAT GOES HERE AND WHY THEY ARE NOT IN THE ZIP
================================================================

The spec asks for 4 vertical 1080x1920 PNGs of REAL screens, not
mockups. Those have to be captured off a running Android build, and
that is the one thing this environment cannot do:

- The Android screenshot capture tool is not enabled in this session
  (it needs a capture skill that is not installed here).
- The iOS capture path exists but only offers iPhone and iPad
  devices. iPhone frames on a Play listing are both wrong and
  against Play's own asset rules.
- Generating them with an image model was considered and rejected.
  A mocked-up UI in a store listing is fake-UI grounds for
  rejection, and the four screens below already exist on the real
  build sitting on your Play internal track.

So nothing was faked to fill this folder.

----------------------------------------------------------------
HOW TO GET THEM (about 3 minutes)
----------------------------------------------------------------
1. Install Zilt from your Play internal testing link on an Android
   phone. The current build is versionCode 1789658352 ("1.5.9").
2. Take 4 screenshots with the phone (power + volume down).
3. Send them back in this chat and they get resized/padded to
   exactly 1080x1920, flattened to 24-bit RGB with no alpha, named
   01-04 in order, and dropped into this folder in the zip.

Any modern phone screenshot works as a source - 1080x2400,
1080x2340, 1440x3120 are all fine. Play accepts 320-3840px per side
with the long side no more than twice the short side, so 1080x1920
(16:9) is inside the rules and is what the spec asked for.

----------------------------------------------------------------
THE FOUR SCREENS, IN LISTING ORDER
----------------------------------------------------------------
01-login.png     The sign-in gate.
                 Settings (gear on The Current) -> sign out if you
                 are already in, then the "YOUR ACCOUNT" card on
                 The Current -> Continue with Google. Capture the
                 card with the Google button visible, or the
                 two-step code screen behind it. Do NOT capture a
                 screen showing a real six-digit code.

02-home.png      The Current - the feed.
                 The app's start screen. Capture it scrolled to a
                 Pulse with the ZILT wordmark and the tab bar
                 visible. This is the one shot that has to look
                 like the product, so pick the best-looking Pulse.

03-zone.png      The Zone - the main action.
                 Tab bar -> The Zone, then open the Watt Wheel.
                 Best frame is the wheel with the streak and the
                 spin count visible, or a win with the BOLT strike
                 on screen.

04-settings.png  Settings.
                 Gear button on The Current. Capture the top of the
                 list so Appearance/Theme, Privacy and the House
                 data pool row are all in frame.

----------------------------------------------------------------
BEFORE YOU SHOOT
----------------------------------------------------------------
- Full battery icon and full signal read better than 14% and one bar.
- Turn off any notification banner - a half-drawn notification in a
  store screenshot looks like a broken app.
- No real email addresses, no real six-digit codes, no personal
  chat content in frame. Play reviewers flag personal data in
  listing images.
- Same theme on all four (Voltage, the lime default, is what the
  icon and feature graphic are built on).
