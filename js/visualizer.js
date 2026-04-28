export class Visualizer {
  constructor(canvas) {
    this.canvas = canvas;
    this.c = canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.w = this.canvas.width;
    this.h = this.canvas.height;
  }

  draw(freqData) {
    const { c, w, h } = this;
    c.fillStyle = 'rgba(10, 10, 15, 0.2)';
    c.fillRect(0, 0, w, h);

    const count = Math.min(freqData.length, 128);
    const barW = w / count;
    for (let i = 0; i < count; i++) {
      const val = freqData[i] / 255;
      const barH = val * h * 0.8;
      c.fillStyle = `hsl(${(i / count) * 120 + 160}, 100%, ${50 + val * 30}%)`;
      c.fillRect(i * barW, h - barH, barW - 1, barH);
    }
  }
}
