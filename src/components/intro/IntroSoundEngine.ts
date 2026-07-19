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

  /** Master volume */
  private readonly MASTER_VOLUME = 0.8;

  /** Queue of sound IDs to play once audio is allowed to start */
  private pendingSounds: SoundId[] = [];

  /** Bound handler for first user interaction (used for cleanup) */
  private boundResumeHandler: (() => void) | null = null;

  get isMuted(): boolean {
    return this.muted;
  }

  /**
   * Initialize audio context.
   * Creates the AudioContext (it starts in suspended state per browser autoplay policy).
   * If the context cannot resume immediately, it registers one-time document-level
   * event listeners to resume on the next user gesture (click, touch, keydown).
   */
  async init(): Promise<boolean> {
    if (this.initialized || this.muted) return false;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.MASTER_VOLUME;
      this.masterGain.connect(this.ctx.destination);

      if (this.ctx.state === 'suspended') {
        // Try to resume immediately — may work if called within a user gesture chain
        try {
          await this.ctx.resume();
        } catch {
          /* ignore */
        }

        // If still suspended, listen for the first user gesture to unlock audio
        if (this.ctx.state === 'suspended') {
          this.boundResumeHandler = this.handleFirstInteraction.bind(this);
          document.addEventListener('click', this.boundResumeHandler, { once: true });
          document.addEventListener('touchstart', this.boundResumeHandler, { once: true });
          document.addEventListener('keydown', this.boundResumeHandler, { once: true });
        }
      }

      this.initialized = true;
      return true;
    } catch {
      this.muted = true;
      return false;
    }
  }

  /** Resume AudioContext on first user gesture and flush any queued sounds */
  private async handleFirstInteraction(): Promise<void> {
    this.cleanupResumeListeners();

    if (!this.ctx || this.ctx.state === 'closed') return;

    try {
      await this.ctx.resume();
      // Play any sounds that were queued before the gesture
      for (const id of this.pendingSounds) {
        this.play(id);
      }
      this.pendingSounds = [];
    } catch {
      this.muted = true;
    }
  }

  /** Remove gesture listeners so they don't fire again */
  private cleanupResumeListeners(): void {
    if (this.boundResumeHandler) {
      document.removeEventListener('click', this.boundResumeHandler);
      document.removeEventListener('touchstart', this.boundResumeHandler);
      document.removeEventListener('keydown', this.boundResumeHandler);
      this.boundResumeHandler = null;
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

    // If AudioContext is still suspended (autoplay policy), queue the sound
    if (this.ctx.state === 'suspended') {
      if (!this.pendingSounds.includes(id)) {
        this.pendingSounds.push(id);
      }
      return;
    }

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
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 1.5);

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
    gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 1.2);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 3);

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
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
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
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
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
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
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
      gain.gain.linearRampToValueAtTime(0.15, start + 0.02);
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

  /** Stop every currently playing node and tear down the audio context */
  stopAll(): void {
    this.cleanupResumeListeners();
    this.pendingSounds = [];
    
    for (const node of this.activeNodes) {
      try {
        if (node instanceof AudioBufferSourceNode || node instanceof OscillatorNode) {
          node.stop();
        }
        node.disconnect();
      } catch {
        /* node may already be stopped */
      }
    }
    this.activeNodes = [];

    if (this.masterGain) {
      try {
        this.masterGain.disconnect();
      } catch {
        /* silent */
      }
      this.masterGain = null;
    }

    if (this.ctx && this.ctx.state !== 'closed') {
      this.ctx.close().catch(() => {});
      this.ctx = null;
    }
    this.initialized = false;
  }

  /** Clean up all active audio nodes */
  destroy(): void {
    this.stopAll();
  }
}

