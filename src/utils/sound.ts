class SoundFX {
  private ctx: AudioContext | null = null;
  public muted = false;

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private tone(
    freq: number,
    duration: number,
    type: OscillatorType = 'sine',
    gainVal = 0.08,
    delay = 0
  ) {
    const ctx = this.getContext();
    if (!ctx) return;

    const startTime = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainVal, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }

  playClick() {
    this.tone(540, 0.06, 'triangle', 0.05);
  }

  playSnap() {
    this.tone(320, 0.05, 'square', 0.05, 0);
    this.tone(680, 0.09, 'triangle', 0.08, 0.035);
  }

  playSuccess() {
    this.tone(523.25, 0.12, 'triangle', 0.08, 0);
    this.tone(659.25, 0.16, 'triangle', 0.09, 0.08);
  }

  playError() {
    this.tone(210, 0.14, 'sawtooth', 0.06, 0);
    this.tone(165, 0.2, 'sawtooth', 0.05, 0.1);
  }

  playBiosBeep() {
    this.tone(920, 0.14, 'square', 0.04, 0);
    this.tone(920, 0.14, 'square', 0.04, 0.22);
    this.tone(920, 0.14, 'square', 0.04, 0.44);
  }

  playLevelUp() {
    this.tone(523.25, 0.14, 'triangle', 0.09, 0);
    this.tone(659.25, 0.14, 'triangle', 0.09, 0.1);
    this.tone(783.99, 0.16, 'triangle', 0.1, 0.2);
    this.tone(1046.5, 0.28, 'triangle', 0.11, 0.32);
  }

  playVictory() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((n, idx) => {
      this.tone(n, 0.26, 'triangle', 0.1, idx * 0.11);
    });
  }
}

export const soundFX = new SoundFX();
