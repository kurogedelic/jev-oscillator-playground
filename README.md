# Jev Oscillator Playground

Local 32 x 4-bit wavetable experiment driven by Jev.

## Run

Requires Node.js 18+.

```sh
export TYPESAFE_API_KEY="your-key"
npm start
```

Then open `http://localhost:3000`.

The browser talks only to the local Node server. The server sends the Jev request to TypeSafe, so there is no browser CORS problem and the API key never enters the page.

No npm dependencies are required.

## What it does

Jev receives 32 Choice questions in one System One request. Each question selects an amplitude from 0 through 15. The 32 answers become a 32 x 4-bit wavetable. The browser can draw/edit the table and play it locally with Web Audio.
