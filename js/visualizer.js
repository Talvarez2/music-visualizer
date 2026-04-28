export class Visualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.c = canvas.getContext('2d');
    this.mode = 'bars';
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
  }

  setMode(mode) { this.mode = mode; }

  draw(freqData, timeData) {
    const { c, w, h } = this;
    c.fillStyle = 'rgba(10, 10, 15, 0.2)';
    c.fillRect(0, 0, w, h);
    this['draw_' + this.mode](freqData, timeData);
  }

  draw_bars(freqData) {
    const { c, w, h } = this;
    const count = Math.min(freqData.length, 128);
    const barW = w / count;
    for (let i = 0; i < count; i++) {
      const val = freqData[i] / 255;
      const barH = val * h * 0.8;
      c.fillStyle = `hsl(${(i / count) * 120 + 160}, 100%, ${50 + val * 30}%)`;
      c.fillRect(i * barW, h - barH, barW - 1, barH);
    }
  }

  draw_circular(freqData) {
    const { c, w, h } = this;
    const cx = w / 2, cy = h / 2;
    const count = Math.min(freqData.length, 180);
    const baseR = Math.min(w, h) * 0.2;
    for (let i = 0; i < count; i++) {
      const val = freqData[i] / 255;
      const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
      const r = baseR + val * baseR * 1.5;
      const x0 = cx + Math.cos(angle) * baseR;
      const y0 = cy + Math.sin(angle) * baseR;
      const x1 = cx + Math.cos(angle) * r;
      const y1 = cy + Math.sin(angle) * r;
      c.strokeStyle = `hsl(${(i / count) * 120 + 160}, 100%, ${50 + val * 30}%)`;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(x0, y0);
      c.lineTo(x1, y1);
      c.stroke();
    }
  }

  draw_waveform(_, timeData) {
    if (!timeData) return;
    const { c, w, h } = this;
    c.strokeStyle = `hsl(180, 100%, 65%)`;
    c.lineWidth = 2;
    c.beginPath();
    const step = w / timeData.length;
    for (let i = 0; i < timeData.length; i++) {
      const y = (timeData[i] / 255) * h;
      i === 0 ? c.moveTo(0, y) : c.lineTo(i * step, y);
    }
    c.stroke();
  }

  draw_particles(freqData) {
    const { c, w, h, particles } = this;
    // bass energy drives particle spawning
    let bass = 0;
    for (let i = 0; i < 10; i++) bass += freqData[i];
    bass /= 2550;

    const spawnCount = Math.floor(bass * 8);
    for (let i = 0; i < spawnCount; i++) {
      particles.push({
        x: w / 2, y: h / 2,
        vx: (Math.random() - 0.5) * bass * 20,
        vy: (Math.random() - 0.5) * bass * 20,
        life: 1, hue: Math.random() * 120 + 160
      });
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      p.life -= 0.015;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      c.globalAlpha = p.life;
      c.fillStyle = `hsl(${p.hue}, 100%, 65%)`;
      c.fillRect(p.x, p.y, 3, 3);
    }
    c.globalAlpha = 1;
    if (particles.length > 500) particles.splice(0, particles.length - 500);
  }
}
