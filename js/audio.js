export class AudioManager {
  constructor() {
    this.ctx = null;
    this.analyser = null;
    this.source = null;
    this.freqData = null;
    this.timeData = null;
    this.playing = false;
    this.isMic = false;
    this.micStream = null;
  }

  init() {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.8;
    this.analyser.connect(this.ctx.destination);
    this.freqData = new Uint8Array(this.analyser.frequencyBinCount);
    this.timeData = new Uint8Array(this.analyser.fftSize);
  }

  async loadFile(file) {
    this.init();
    this.stopMic();
    if (this.source) { this.source.disconnect(); this.source = null; }
    const buf = await file.arrayBuffer();
    const audio = await this.ctx.decodeAudioData(buf);
    this.source = this.ctx.createBufferSource();
    this.source.buffer = audio;
    this.source.connect(this.analyser);
    this.source.onended = () => { this.playing = false; };
    this.isMic = false;
  }

  async startMic() {
    this.init();
    if (this.source) { this.source.disconnect(); this.source = null; }
    this.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.source = this.ctx.createMediaStreamSource(this.micStream);
    this.source.connect(this.analyser);
    // Disconnect analyser from destination to prevent feedback
    this.analyser.disconnect();
    this.playing = true;
    this.isMic = true;
  }

  stopMic() {
    if (this.micStream) { this.micStream.getTracks().forEach(t => t.stop()); this.micStream = null; }
    if (this.source && this.isMic) { this.source.disconnect(); this.source = null; }
    if (this.ctx && this.analyser) this.analyser.connect(this.ctx.destination);
    this.playing = false;
    this.isMic = false;
  }

  play() {
    if (!this.source || this.playing) return;
    this.source.start(0);
    this.playing = true;
  }

  getFrequencyData() {
    this.analyser.getByteFrequencyData(this.freqData);
    return this.freqData;
  }

  getTimeData() {
    this.analyser.getByteTimeDomainData(this.timeData);
    return this.timeData;
  }
}
