# 🎵 Music Visualizer

Real-time music visualizer using Web Audio API and HTML5 Canvas.

![Screenshot placeholder](screenshot.png)

## Features

- **4 visualization modes**: Bars, Circular/Radial, Waveform Oscilloscope, Particle System
- **4 color themes**: Neon, Sunset, Ocean, Monochrome
- **Audio sources**: File upload, drag-and-drop, microphone input
- **Visual effects**: Smooth interpolation, volume-reactive backgrounds
- **Fullscreen mode**

## How to Use

1. Open `index.html` in a modern browser (or serve with any static server)
2. Click **Load** to select an audio file, or drag-and-drop one onto the page
3. Click **Play** to start visualization
4. Use **Mic** to visualize microphone input in real-time
5. Switch between visualization modes and color themes using the toolbar
6. Click **⛶** for fullscreen

## Tech Stack

- Vanilla JavaScript (ES modules)
- Web Audio API (AudioContext, AnalyserNode)
- HTML5 Canvas
- CSS with backdrop-filter

## Project Structure

```
index.html          - Main page with canvas and toolbar
css/style.css       - Dark theme with neon accents
js/audio.js         - AudioContext, AnalyserNode, mic/file handling
js/visualizer.js    - 4 visualization modes with theme support
js/themes.js        - Color theme and background definitions
js/main.js          - Entry point, UI wiring
```
