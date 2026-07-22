# 🎡 Spin the Wheel

A random name picker built with **React + Vite** — inspired by [wheelofnames.com](https://wheelofnames.com/).

Enter names, spin the wheel, and a random winner is picked with a smooth deceleration animation, ticking sounds, confetti, and a winner popup.

## Features

- 🎨 Canvas-drawn wheel that updates live as you type (one name per line)
- 🎲 Realistic 5–6.5s spin with ease-out deceleration and randomized rotations
- 🔊 Ticking + fanfare sounds generated with WebAudio (no audio files)
- 🎉 Confetti celebration and winner popup
- 🏆 Results history, with one-click "Remove winner" to spin again among the rest
- 🔀 Shuffle / ↕ Sort / 🗑 Clear entry tools
- 💾 Entries saved in localStorage — survive page reloads
- ⌨️ Press Space or Enter to spin, fullscreen mode, mobile-friendly layout

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

The static site is emitted to `dist/` — deployable to GitHub Pages, Netlify, Vercel, or any static host.

## Project structure

```
src/
├── main.jsx                 # entry point
├── App.jsx                  # state + layout
├── index.css                # all styles
├── components/
│   ├── Wheel.jsx            # canvas wheel + spin animation
│   ├── EntriesPanel.jsx     # name list editor (shuffle/sort/clear)
│   ├── ResultsPanel.jsx     # spin history
│   ├── WinnerModal.jsx      # winner popup
│   └── Confetti.jsx         # confetti overlay
└── utils/
    └── audio.js             # WebAudio tick + fanfare
```
