# AGENTS.md

## Project Overview

Real-time music visualizer built with vanilla JavaScript, Web Audio API, and HTML5 Canvas. No build tools or frameworks — open `index.html` directly in a browser.

## Architecture

- `js/audio.js` — `AudioManager` class wraps AudioContext and AnalyserNode. Handles file decoding, microphone input, and frequency/time-domain data extraction.
- `js/visualizer.js` — `Visualizer` class renders 4 modes (bars, circular, waveform, particles) to a full-screen canvas. Uses theme functions from `themes.js`.
- `js/themes.js` — Exports `themes` (color functions) and `bgColors` (background gradient functions) keyed by theme name.
- `js/main.js` — Entry point. Wires DOM events to AudioManager and Visualizer. Manages the render loop.

## Conventions

- ES modules (`import`/`export`), no bundler
- Classes for AudioManager and Visualizer, plain objects for themes
- Visualization modes are methods named `draw_<mode>` dispatched dynamically
- All canvas rendering uses immediate-mode 2D context (no retained scene graph)

## Key Decisions

- AnalyserNode disconnected from destination during mic input to prevent feedback
- Frequency data smoothed via linear interpolation between frames (`prevFreq`)
- Particle pool capped at 500 to prevent memory growth
- Background uses low-alpha fills for trail/fade effect rather than clearing each frame
