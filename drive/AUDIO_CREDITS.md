# Drive v16 audio credits

## Engines (synthesized, original)
Both engine sounds are generated live in the browser with the Web Audio API (game-v16.js). No recordings are used.
- **Four-door super sedan:** twin-turbo V8 voice. Cross-plane firing-order harmonics (PeriodicWave), waveshaper drive, exhaust resonances, off-throttle burble and crackle, turbo whistle and blow-off.
- **Winged track coupe:** naturally aspirated flat-six voice tuned to rev to 9,000 rpm. Built from 3rd-order firing harmonics, an intake resonance that opens up above 6,000 rpm, and a high-rpm wail.

## CC0 samples (from v15, still credited)
v16 uses tire-squeal, impact-hard, impact-soft and city-ambience. The engine-*.wav loops below are kept in the folder but v16 doesn't play them.

Every sample below is CC0 1.0 / public-domain-equivalent: free for commercial web use, no attribution required (credited anyway).
No YouTube or other copyrighted audio is used. Wind is synthesised in code (filtered noise), not a recording.
Files were trimmed, downmixed to mono and re-encoded on 2026-10-31 (ffmpeg); total ~336 KB.

| File in drive/audio/ | Used for | Original | Author | Source | License |
|---|---|---|---|---|---|
| engine-idle.wav | engine idle loop | loop_0.wav | domasx2 | https://opengameart.org/content/racing-car-engine-sound-loops | CC0 |
| engine-low.wav | engine low/mid-RPM loop | loop_2.wav | domasx2 | https://opengameart.org/content/racing-car-engine-sound-loops | CC0 |
| engine-high.wav | engine high-RPM loop | loop_5.wav | domasx2 | https://opengameart.org/content/racing-car-engine-sound-loops | CC0 |
| tire-squeal.wav | tyre squeal on drift / slip | Screeching Tires #1 (sound 2368) | Dorian Clair (BigSoundBank / LaSonotheque) | https://bigsoundbank.com/screeching-tires-1-s2368.html | CC0 |
| impact-hard.mp3 | hard collisions | qubodup-crash.ogg | qubodup | https://opengameart.org/content/crash-collision | CC0 |
| impact-soft.mp3 | light bumps | thud2.wav | BMacZero (Brian MacIntosh) | https://opengameart.org/content/metal-impact-sounds | CC0 |
| city-ambience.mp3 | night-city ambient bed (24 s excerpt, looped) | gatve Varniu.ogg | IgnasD | https://opengameart.org/content/high-traffic-road-sounds | CC0 |
| (code) | wind at speed | procedural noise in audio.js | TK Hub | — | original |
