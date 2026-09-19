# Jev Oscillator Playground

A tiny static experiment: describe a sound, ask Jev for 32 independent 4-bit amplitude decisions, assemble them into a wavetable, and play it with Web Audio.

## Run

Open `index.html`, or publish the repository with GitHub Pages. Enter your own TypeSafe API key in the page. The key is stored only in your browser's localStorage and is never committed to this repository.

The app sends one request to `POST https://api.typesafe.ai/v1/systemone` using `jev-latest`, with 32 Choice questions sharing the same state. Each Choice has the values 0–15.

## Notes

- 32 samples × 4-bit
- waveform can also be drawn/edited manually
- audio generation is entirely local
- the TypeSafe API is called only on **Generate with Jev**
- this is an experiment, not a production credential architecture; browser-side API keys are visible to the user who owns the browser
- if TypeSafe's direct endpoint does not permit browser CORS, a tiny proxy will be required

No build step and no dependencies.
