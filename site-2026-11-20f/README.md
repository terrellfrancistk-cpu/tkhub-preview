# tkhub.app: the live site

This branch is the full contents of tkhub.app's Porkbun static hosting. Porkbun's GitHub Connect publishes it, so
every push here goes live.

- Mirrored file for file from the host on Nov 7 2026 (830 files), then the Nov 7 homepage build laid on top.
- The homepage build comes from tkhub-site `ops/build-home-upload.sh`.
- Folders that Porkbun stored as aliases (`about`, `apex`, ...) are kept here as `<name>/index.html` copies of the
  same page.
