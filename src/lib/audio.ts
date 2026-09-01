// Ambient Web Audio synth generator & real track player engine (Zero external dependencies)

export interface TrackData {
  id: string;
  title: string;
  artist: string;
  famousLine: string;
  category: 'Ed Sheeran & Pop' | 'Minar Rahman' | 'KK Hits' | 'Rahat Fateh Ali' | 'Javed Ali' | 'Lo-Fi Chill';
  bpm: number;
  chords: number[];
  melodicNotes: number[];
  durationSec: number;
  coverGradient: string;
}

export const CURATED_TRACKS: TrackData[] = [
  // Ed Sheeran & Romantic Pop
  {
    id: 'ed_perfect',
    title: 'Perfect',
    artist: 'Ed Sheeran',
    famousLine: '“I found a love for me... darling just dive right in and follow my lead”',
    category: 'Ed Sheeran & Pop',
    bpm: 63,
    chords: [261.63, 329.63, 392.0, 523.25], // C Major - G - Am - F
    melodicNotes: [523.25, 493.88, 440.0, 392.0, 329.63],
    durationSec: 263,
    coverGradient: 'from-amber-600 to-orange-500'
  },
  {
    id: 'perri_thousand_years',
    title: 'A Thousand Years',
    artist: 'Christina Perri',
    famousLine: '“Heart beats fast, colors and promises... I have loved you for a thousand years”',
    category: 'Ed Sheeran & Pop',
    bpm: 69,
    chords: [174.61, 220.0, 261.63, 349.23], // F - Bb - Dm - C
    melodicNotes: [349.23, 392.0, 440.0, 523.25, 587.33],
    durationSec: 285,
    coverGradient: 'from-rose-600 to-pink-500'
  },
  {
    id: 'ed_photograph',
    title: 'Photograph',
    artist: 'Ed Sheeran',
    famousLine: '“Loving can hurt, loving can hurt sometimes, but it\'s the only thing that I know”',
    category: 'Ed Sheeran & Pop',
    bpm: 78,
    chords: [293.66, 369.99, 440.0, 587.33], // D - Bm - A - G
    melodicNotes: [440.0, 369.99, 293.66, 329.63],
    durationSec: 258,
    coverGradient: 'from-orange-600 to-amber-500'
  },

  // Minar Rahman (Soulful Bengali Indie)
  {
    id: 'minar_jhoom',
    title: 'Jhoom (ঝুম)',
    artist: 'Minar Rahman',
    famousLine: '“মেঘ জমেছে মনে... একলা আকাশ ছুঁয়ে, ঝুম বৃষ্টি নামে তোমার শহরে”',
    category: 'Minar Rahman',
    bpm: 68,
    chords: [220.0, 261.63, 329.63, 392.0], // Am - F - C - G
    melodicNotes: [440.0, 523.25, 392.0, 349.23, 329.63],
    durationSec: 270,
    coverGradient: 'from-emerald-700 to-teal-600'
  },
  {
    id: 'minar_deyale',
    title: 'Deyale Deyale (দেয়ালে দেয়ালে)',
    artist: 'Minar Rahman',
    famousLine: '“দেয়ালে দেয়ালে এঁকেছি কত কথা, চোখের কোণে জমেছে নীরবতা”',
    category: 'Minar Rahman',
    bpm: 72,
    chords: [196.0, 246.94, 293.66, 392.0], // G - Em - C - D
    melodicNotes: [392.0, 440.0, 493.88, 392.0, 293.66],
    durationSec: 295,
    coverGradient: 'from-cyan-700 to-blue-600'
  },
  {
    id: 'minar_keu_kotha',
    title: 'Keu Kotha Rakheni (কেউ কথা রাখেনি)',
    artist: 'Minar Rahman',
    famousLine: '“কেউ কথা রাখেনি, কেউ মনে রাখেনি... একলা পথে ফেলে গেছে সবাই”',
    category: 'Minar Rahman',
    bpm: 65,
    chords: [164.81, 196.0, 246.94, 329.63], // Em - C - G - D
    melodicNotes: [329.63, 392.0, 493.88, 440.0, 329.63],
    durationSec: 310,
    coverGradient: 'from-slate-700 to-stone-600'
  },

  // KK (Legendary Hindi Classics)
  {
    id: 'kk_zara_sa',
    title: 'Zara Sa',
    artist: 'KK (Jannat)',
    famousLine: '“Zara sa jhoom loon main, arey na re na re na... Zara sa dil mein de jagah tu”',
    category: 'KK Hits',
    bpm: 82,
    chords: [293.66, 349.23, 440.0, 523.25], // Dm - Bb - F - C
    melodicNotes: [587.33, 523.25, 440.0, 349.23, 293.66],
    durationSec: 304,
    coverGradient: 'from-blue-700 to-indigo-600'
  },
  {
    id: 'kk_kya_mujhe_pyar_hai',
    title: 'Kya Mujhe Pyar Hai',
    artist: 'KK (Woh Lamhe)',
    famousLine: '“Kya mujhe pyar hai ya... kaisa khumaar hai ya... O jaana dil mera kho gaya”',
    category: 'KK Hits',
    bpm: 90,
    chords: [261.63, 329.63, 392.0, 440.0], // C - Am - F - G
    melodicNotes: [523.25, 587.33, 659.25, 523.25, 440.0],
    durationSec: 280,
    coverGradient: 'from-purple-700 to-indigo-600'
  },
  {
    id: 'kk_pal',
    title: 'Pal (Hum Rahe Ya Na Rahe Kal)',
    artist: 'KK',
    famousLine: '“Hum rahein ya na rahein kal, kal yaad aayenge ye pal... Pyaar ke ye haseen pal”',
    category: 'KK Hits',
    bpm: 70,
    chords: [220.0, 277.18, 329.63, 440.0], // A - F#m - D - E
    melodicNotes: [440.0, 493.88, 554.37, 440.0, 329.63],
    durationSec: 290,
    coverGradient: 'from-stone-700 to-amber-700'
  },
  {
    id: 'kk_labon_ko',
    title: 'Labon Ko',
    artist: 'KK (Bhool Bhulaiyaa)',
    famousLine: '“Labon ko labon pe sajao... Kya ho tum mujhe ab batao”',
    category: 'KK Hits',
    bpm: 74,
    chords: [220.0, 261.63, 329.63, 392.0], // Am - G - F - E
    melodicNotes: [440.0, 392.0, 349.23, 329.63],
    durationSec: 338,
    coverGradient: 'from-red-800 to-orange-700'
  },

  // Rahat Fateh Ali Khan (Soulful Sufi & Romance)
  {
    id: 'rahat_o_re_piya',
    title: 'O Re Piya',
    artist: 'Rahat Fateh Ali Khan (Aaja Nachle)',
    famousLine: '“O re piya haye... udd ke chhua, baandhe gungroo dil ne ghoomar ghoomar paaya”',
    category: 'Rahat Fateh Ali',
    bpm: 65,
    chords: [220.0, 261.63, 329.63, 392.0], // Dm - Am - Gm - A
    melodicNotes: [440.0, 523.25, 659.25, 587.33, 440.0],
    durationSec: 379,
    coverGradient: 'from-amber-800 to-stone-800'
  },
  {
    id: 'rahat_afreen',
    title: 'Afreen Afreen',
    artist: 'Rahat Fateh Ali Khan & Momina',
    famousLine: '“Husn-e-jaana ki tareef mumkin nahi... Afreen afreen, afreen afreen”',
    category: 'Rahat Fateh Ali',
    bpm: 76,
    chords: [261.63, 329.63, 392.0, 440.0], // C - G - Am - F
    melodicNotes: [523.25, 659.25, 587.33, 523.25, 392.0],
    durationSec: 405,
    coverGradient: 'from-rose-800 to-amber-700'
  },
  {
    id: 'rahat_main_jahaan',
    title: 'Main Jahaan Rahoon',
    artist: 'Rahat Fateh Ali Khan (Namastey London)',
    famousLine: '“Main jahaan rahoon, main kahin bhi hoon... Teri yaad saath hai”',
    category: 'Rahat Fateh Ali',
    bpm: 70,
    chords: [196.0, 246.94, 293.66, 349.23], // G - Em - C - D
    melodicNotes: [392.0, 493.88, 587.33, 493.88, 392.0],
    durationSec: 328,
    coverGradient: 'from-indigo-800 to-blue-700'
  },
  {
    id: 'rahat_bol_na_halke',
    title: 'Bol Na Halke Halke',
    artist: 'Rahat Fateh Ali Khan & Mahalakshmi',
    famousLine: '“Dhaage tod laao chandani se noor ke... Bol na halke halke, honth se halke halke”',
    category: 'Rahat Fateh Ali',
    bpm: 68,
    chords: [220.0, 277.18, 329.63, 440.0], // A - D - E - F#m
    melodicNotes: [440.0, 554.37, 659.25, 440.0],
    durationSec: 300,
    coverGradient: 'from-yellow-700 to-orange-700'
  },

  // Javed Ali (Romantic & Melodic Masterpieces)
  {
    id: 'javed_kun_faya',
    title: 'Kun Faya Kun',
    artist: 'A.R. Rahman, Javed Ali, Mohit Chauhan',
    famousLine: '“Jab kahin pe kuch nahi tha... wahi tha wahi tha... Kun Faya Kun, be and it is”',
    category: 'Javed Ali',
    bpm: 60,
    chords: [174.61, 220.0, 261.63, 349.23], // F - Am - Bb - C
    melodicNotes: [349.23, 440.0, 523.25, 440.0, 349.23],
    durationSec: 472,
    coverGradient: 'from-emerald-800 to-teal-700'
  },
  {
    id: 'javed_jashn',
    title: 'Jashn-E-Bahaaraa',
    artist: 'Javed Ali (Jodhaa Akbar)',
    famousLine: '“Kehne ko jashn-e-bahaaraa hai, ishq ye dekhke hairaan hai... Phool se khushboo juda hai”',
    category: 'Javed Ali',
    bpm: 67,
    chords: [220.0, 261.63, 329.63, 392.0], // Dm - Gm - C - F - A
    melodicNotes: [440.0, 523.25, 587.33, 523.25, 440.0],
    durationSec: 315,
    coverGradient: 'from-amber-700 to-yellow-600'
  },
  {
    id: 'javed_guzarish',
    title: 'Guzarish',
    artist: 'Javed Ali (Ghajini)',
    famousLine: '“Tu meri adhuri pyaas pyaas... Tu aagaye mann ko raas raas... Ab toh aaja mere paas”',
    category: 'Javed Ali',
    bpm: 72,
    chords: [246.94, 293.66, 369.99, 440.0], // Bm - G - D - A
    melodicNotes: [493.88, 587.33, 739.99, 587.33, 493.88],
    durationSec: 329,
    coverGradient: 'from-purple-800 to-pink-700'
  },
  {
    id: 'javed_tu_jo_mila',
    title: 'Tu Jo Mila',
    artist: 'Javed Ali (Bajrangi Bhaijaan)',
    famousLine: '“Aashiyana mera saath tere hai na... Tu jo mila toh ho gaya sab haasil”',
    category: 'Javed Ali',
    bpm: 74,
    chords: [261.63, 329.63, 392.0, 523.25], // C - G - Am - F
    melodicNotes: [523.25, 659.25, 587.33, 523.25],
    durationSec: 242,
    coverGradient: 'from-orange-700 to-stone-700'
  },

  // PulseChat Lo-Fi Chill
  {
    id: 'lofi_mocha',
    title: 'Chocolate Mocha Chill Beats',
    artist: 'PulseChat Lounge',
    famousLine: '“Relaxing lo-fi acoustic chords designed for seamless chat conversations”',
    category: 'Lo-Fi Chill',
    bpm: 72,
    chords: [220, 261.63, 329.63, 392.0], // Am7
    melodicNotes: [440.0, 523.25, 440.0, 392.0],
    durationSec: 210,
    coverGradient: 'from-[#3E2723] to-[#FF6B00]'
  }
];

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: any = null;
  private currentTrackIndex: number = 0;
  private onStateChangeListeners: Array<(isPlaying: boolean, trackIndex: number) => void> = [];

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public subscribe(listener: (isPlaying: boolean, trackIndex: number) => void) {
    this.onStateChangeListeners.push(listener);
    return () => {
      this.onStateChangeListeners = this.onStateChangeListeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.onStateChangeListeners.forEach(l => l(this.isPlaying, this.currentTrackIndex));
  }

  public playTrack(index: number = 0) {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.currentTrackIndex = Math.max(0, Math.min(index, CURATED_TRACKS.length - 1));
    this.isPlaying = true;
    this.scheduleNotes();
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.notify();
  }

  public toggle(index: number = 0): boolean {
    if (this.isPlaying && this.currentTrackIndex === index) {
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

  public getCurrentTrackIndex(): number {
    return this.currentTrackIndex;
  }

  public getCurrentTrack(): TrackData {
    return CURATED_TRACKS[this.currentTrackIndex] || CURATED_TRACKS[0];
  }

  private scheduleNotes() {
    if (this.intervalId) clearInterval(this.intervalId);

    const track = CURATED_TRACKS[this.currentTrackIndex] || CURATED_TRACKS[0];
    const beatMs = (60 / track.bpm) * 1000;

    let step = 0;
    this.playChord(track.chords);

    this.intervalId = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      step = (step + 1) % 16;

      // Soft melodic plucked note along with song key
      if (step % 2 === 0 && track.melodicNotes.length > 0) {
        const noteIdx = (step / 2) % track.melodicNotes.length;
        const noteFreq = track.melodicNotes[noteIdx];
        this.playMelodicPluck(noteFreq);
      }

      // Warm acoustic synth chord re-trigger
      if (step === 0 || step === 8) {
        this.playChord(track.chords);
      }
    }, beatMs / 2);
  }

  private playChord(freqs: number[]) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    freqs.forEach((freq, i) => {
      try {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const filter = this.ctx!.createBiquadFilter();

        osc.type = i % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(550, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.045, now + 0.6);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now);
        osc.stop(now + 3.3);
      } catch (_) {}
    });
  }

  private playMelodicPluck(freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.03, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);
    } catch (_) {}
  }
}

export const musicEngine = new AmbientMusicEngine();
