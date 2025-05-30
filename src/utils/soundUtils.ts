
class SoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private async resumeContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.1) {
    if (!this.enabled || !this.audioContext) return;

    this.resumeContext().then(() => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext!.destination);

      oscillator.frequency.setValueAtTime(frequency, this.audioContext!.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0, this.audioContext!.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, this.audioContext!.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext!.currentTime + duration);

      oscillator.start(this.audioContext!.currentTime);
      oscillator.stop(this.audioContext!.currentTime + duration);
    });
  }

  playKeypress() {
    this.playTone(800, 0.1, 'square', 0.05);
  }

  playCommand() {
    this.playTone(600, 0.15, 'sine', 0.08);
    setTimeout(() => this.playTone(900, 0.1, 'sine', 0.06), 100);
  }

  playError() {
    this.playTone(300, 0.3, 'sawtooth', 0.1);
  }

  playSuccess() {
    this.playTone(600, 0.1, 'sine', 0.08);
    setTimeout(() => this.playTone(800, 0.1, 'sine', 0.08), 80);
    setTimeout(() => this.playTone(1000, 0.15, 'sine', 0.08), 160);
  }

  playProcessing() {
    for (let i = 0; i < 3; i++) {
      setTimeout(() => this.playTone(400 + i * 200, 0.1, 'triangle', 0.06), i * 150);
    }
  }
}

export const soundManager = new SoundManager();
