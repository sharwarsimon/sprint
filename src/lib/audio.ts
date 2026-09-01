// Ambient Web Audio synth generator for Music player (zero external dependencies)
class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private currentTrackIndex: number = 0;

  private tracks = [
    { title: 'Chocolate & Mocha Beats', bpm: 72, chords: [220, 261.63, 329.63, 392.0] }, // Am7
    { title: 'Warm Sunset Orange Lo-Fi', bpm: 68, chords: [174.61, 220, 261.63, 329.63] }, // Fmaj7
    { title: 'Cozy Bookshop & Rain', bpm: 60, chords: [196, 246.94, 293.66, 349.23] }, // G7
    { title: 'Midnight Chill Vibes', bpm: 65, chords: [164.81, 196, 246.94, 293.66] }  // Em7
  ];

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playTrack(index: number = 0) {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.currentTrackIndex = index % this.tracks.length;
    this.isPlaying = true;
    this.scheduleNotes();
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggle(index: number = 0): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.playTrack(index);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  private scheduleNotes() {
    if (this.intervalId) clearInterval(this.intervalId);

    const track = this.tracks[this.currentTrackIndex];
    const beatMs = (60 / track.bpm) * 1000;

    let step = 0;
    this.playChord(track.chords);

    this.intervalId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      step = (step + 1) % 8;

      // Soft ambient pulse every 2 beats
      if (step % 2 === 0) {
        const freq = track.chords[step % track.chords.length];
        this.playSoftBell(freq * 1.5);
      }

      // Re-trigger warm ambient chord every 8 steps
      if (step === 0) {
        this.playChord(track.chords);
      }
    }, beatMs / 2);
  }

  private playChord(freqs: number[]) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    freqs.forEach((freq) => {
      try {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.8);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 3.6);
      } catch (_) {}
    });
  }

  private playSoftBell(freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.02, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch (_) {}
  }
}

export const musicEngine = new AmbientMusicEngine();
