import React, { useState, useEffect } from 'react';
import { X, Music, Play, Pause, SkipForward, Volume2, Sparkles, Headphones } from 'lucide-react';
import { musicEngine } from '../lib/audio';

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MusicModal: React.FC<MusicModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => musicEngine.getIsPlaying());
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(0);

  const playlist = [
    { title: 'Chocolate & Mocha Beats', artist: 'PulseChat Lounge', bpm: '72 BPM', genre: 'Lo-Fi Chill' },
    { title: 'Warm Sunset Orange Lo-Fi', artist: 'Amber Sunset', bpm: '68 BPM', genre: 'Ambient Synth' },
    { title: 'Cozy Bookshop & Rain', artist: 'Readers Corner', bpm: '60 BPM', genre: 'Study Beats' },
    { title: 'Midnight Chill Vibes', artist: 'Night Pulse', bpm: '65 BPM', genre: 'Deep Relax' }
  ];

  useEffect(() => {
    setIsPlaying(musicEngine.getIsPlaying());
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTogglePlay = (index: number) => {
    if (activeTrackIndex === index && isPlaying) {
      musicEngine.stop();
      setIsPlaying(false);
    } else {
      setActiveTrackIndex(index);
      musicEngine.playTrack(index);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    const next = (activeTrackIndex + 1) % playlist.length;
    setActiveTrackIndex(next);
    musicEngine.playTrack(next);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3E2723]">Lo-Fi Music Lounge</h2>
              <p className="text-xs text-stone-500">Relaxing background audio for chatting</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-[#3E2723] hover:bg-stone-200 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active Player Card */}
        <div className="p-6 bg-gradient-to-br from-stone-50 via-orange-50/30 to-stone-50 border-b border-stone-200 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-[#3E2723] border-2 border-[#FF6B00] shadow-lg flex items-center justify-center text-[#FF6B00] mb-4">
            <Music className={`w-10 h-10 ${isPlaying ? 'animate-bounce' : ''}`} />
          </div>
          <h3 className="text-base font-bold text-[#3E2723]">{playlist[activeTrackIndex].title}</h3>
          <p className="text-xs text-[#EA580C] font-medium mt-0.5">{playlist[activeTrackIndex].artist}</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
              {playlist[activeTrackIndex].genre}
            </span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-[#FF6B00]">
              {playlist[activeTrackIndex].bpm}
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => handleTogglePlay(activeTrackIndex)}
              className="w-12 h-12 rounded-full bg-[#FF6B00] hover:bg-[#EA580C] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
            </button>
            <button
              onClick={handleNextTrack}
              className="w-10 h-10 rounded-full bg-[#3E2723] hover:bg-[#2D1C19] text-white flex items-center justify-center transition"
              title="Next Track"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Playlist */}
        <div className="p-4 overflow-y-auto max-h-60 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-1 block mb-2">
            Curated Tracks ({playlist.length})
          </span>
          {playlist.map((track, idx) => {
            const isCurrent = activeTrackIndex === idx;
            return (
              <div
                key={track.title}
                onClick={() => handleTogglePlay(idx)}
                className={`p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                  isCurrent
                    ? 'border-[#FF6B00] bg-orange-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold ${isCurrent ? 'text-[#FF6B00]' : 'text-stone-400'}`}>
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#3E2723]">{track.title}</h4>
                    <p className="text-[11px] text-stone-500">{track.genre}</p>
                  </div>
                </div>

                <button className={`p-1.5 rounded-lg text-xs font-bold ${isCurrent && isPlaying ? 'text-[#FF6B00]' : 'text-stone-400'}`}>
                  {isCurrent && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Volume2 className="w-4 h-4 text-[#FF6B00]" />
            <span>Pure Web Audio ambient synth</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white text-xs font-bold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
