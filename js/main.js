import { AudioManager } from './audio.js';
import { Visualizer } from './visualizer.js';

const audio = new AudioManager();
const viz = new Visualizer(document.getElementById('canvas'));
const fileInput = document.getElementById('fileInput');
const loadBtn = document.getElementById('loadBtn');
const playBtn = document.getElementById('playBtn');
const fileName = document.getElementById('fileName');

let looping = false;

loadBtn.onclick = () => fileInput.click();

fileInput.onchange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  fileName.textContent = file.name;
  await audio.loadFile(file);
  playBtn.disabled = false;
};

playBtn.onclick = () => {
  audio.play();
  playBtn.disabled = true;
  playBtn.textContent = '⏸ Playing';
  startLoop();
};

// Mode switcher
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    viz.setMode(btn.dataset.mode);
  };
});

// Theme switcher
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    viz.setTheme(btn.dataset.theme);
  };
});

// Fullscreen
document.getElementById('fullscreenBtn').onclick = () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
};

function startLoop() {
  if (looping) return;
  looping = true;
  (function loop() {
    if (!audio.playing) { looping = false; playBtn.textContent = '▶ Play'; return; }
    viz.draw(audio.getFrequencyData(), audio.getTimeData());
    requestAnimationFrame(loop);
  })();
}
