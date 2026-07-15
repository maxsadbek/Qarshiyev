/**
 * Procedural sound engine for the cinematic intro.
 * All sounds are synthesized via Web Audio API — no external audio files.
 * Volume is kept intentionally low for a premium, non-intrusive experience.
 */

type SoundId =
  | 'ambient'
  | 'bassRise'
  | 'pulse'
  | 'whoosh'
  | 'shimmer'
  | 'logoComplete'
  | 'transition';

export class IntroSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private muted = false;
  private initialized = false;
  private activeNodes: AudioNode[] = [];

  /** Master volume — deliberately quiet */
  private readonly MASTER_VOLUME = 0.12;

  get isMuted(): boolean {
    return this.muted;
  }

  /** Initialize audio context — must be called after user gesture or on first play attempt */
  async init(): Promise<boolean> {
    if (this.initialized || this.muted) return false;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.MASTER_VOLUME;
      this.masterGain.connect(this.ctx.destination);

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      this.initialized = true;
      return true;
    } catch {
      this.muted = true;
      return false;
    }
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.masterGain) {
      this.masterGain.gain.value = muted ? 0 : this.MASTER_VOLUME;
    }
  }

  toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  /** Play a named sound effect */
  play(id: SoundId): void {
    if (this.muted || !this.ctx || !this.masterGain) return;

    switch (id) {
      case 'ambient':
        this.playAmbient();
        break;
      case 'bassRise':
        this.playBassRise();
        break;
      case 'pulse':
        this.playPulse();
        break;
      case 'whoosh':
        this.playWhoosh();
        break;
      case 'shimmer':
        this.playShimmer();
        break;
      case 'logoComplete':
        this.playLogoComplete();
        break;
      case 'transition':
        this.playTransition();
        break;
    }
  }

  /** Soft ambient atmosphere — filtered noise bed */
  private playAmbient(): void {
    if (!this.ctx || !this.masterGain) return;
    const { ctx, masterGain } = this;

    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    filter.Q.value = 0.5;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    source.start();

    this.activeNodes.push(source, filter, gain);
  }

  /** Deep cinematic bass that rises subtly */
  private playBassRise(): void {
    if (!this.ctx || !this.masterGain) return;
    const { ctx, masterGain } = this;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(45, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 2.5);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 1.2);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + 3.5);

    this.activeNodes.push(osc, gain);
  }

  /** Light digital pulse when nodes connect */
  private playPulse(): void {
    if (!this.ctx || !this.masterGain) return;
    const { ctx, masterGain } = this;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 880;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);

    this.activeNodes.push(osc, gain);
  }

  /** Gentle whoosh for transitions */
  private playWhoosh(): void {
    if (!this.ctx || !this.masterGain) return;
    const { ctx, masterGain } = this;

    const bufferSize = ctx.sampleRate * 0.6;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(200, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.5);
    filter.Q.value = 1;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);
    source.start();

    this.activeNodes.push(source, filter, gain);
  }

  /** Tiny shimmer sparkle */
  private playShimmer(): void {
    if (!this.ctx || !this.masterGain) return;
    const { ctx, masterGain } = this;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 2400;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);

    this.activeNodes.push(osc, gain);
  }

  /** Logo completion — soft harmonic chime */
  private playLogoComplete(): void {
    if (!this.ctx || !this.masterGain) return;
    const { ctx, masterGain } = this;

    const frequencies = [523.25, 659.25, 783.99];
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;

      const gain = ctx.createGain();
      const start = ctx.currentTime + i * 0.05;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.06, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.6);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(start);
      osc.stop(start + 0.6);

      this.activeNodes.push(osc, gain);
    });
  }

  /** Final transition whoosh */
  private playTransition(): void {
    this.playWhoosh();
  }

  /** Clean up all active audio nodes */
  destroy(): void {
    this.activeNodes = [];
    if (this.ctx) {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
    this.masterGain = null;
    this.initialized = false;
  }
}
