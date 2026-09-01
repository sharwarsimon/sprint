import React, { useState, useEffect } from 'react';
import { 
  X, 
  Music, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  Headphones, 
  Search, 
  Heart, 
  Sparkles,
  ExternalLink,
  Radio,
  Sliders,
  Flame
} from 'lucide-react';
import { musicEngine, CURATED_TRACKS, TrackData } from '../lib/audio';

interface MusicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  'All',
  'Ed Sheeran & Pop',
  'Minar Rahman',
  'KK Hits',
  'Rahat Fateh Ali',
  'Javed Ali'
] as const;

export const MusicModal: React.FC<MusicModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => musicEngine.getIsPlaying());
  const [activeTrackIndex, setActiveTrackIndex] = useState<number>(() => musicEngine.getCurrentTrackIndex());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [likedSongIds, setLikedSongIds] = useState<Set<string>>(new Set(['ed_perfect', 'minar_jhoom', 'kk_zara_sa']));

  useEffect(() => {
    setIsPlaying(musicEngine.getIsPlaying());
    setActiveTrackIndex(musicEngine.getCurrentTrackIndex());

    const unsubscribe = musicEngine.subscribe((playing, idx) => {
      setIsPlaying(playing);
      setActiveTrackIndex(idx);
    });

    return () => unsubscribe();
  }, [isOpen]);

  if (!isOpen) return null;

  const currentTrack: TrackData = CURATED_TRACKS[activeTrackIndex] || CURATED_TRACKS[0];

  const filteredTracks = CURATED_TRACKS.filter((track) => {
    const matchesCat = selectedCategory === 'All' || track.category === selectedCategory;
    const matchesSearch = 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.famousLine.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleTogglePlay = (index: number) => {
    if (activeTrackIndex === index && isPlaying) {
      musicEngine.stop();
    } else {
      musicEngine.playTrack(index);
    }
  };

  const handleNextTrack = () => {
    const next = (activeTrackIndex + 1) % CURATED_TRACKS.length;
    musicEngine.playTrack(next);
  };

  const handlePrevTrack = () => {
    const prev = (activeTrackIndex - 1 + CURATED_TRACKS.length) % CURATED_TRACKS.length;
    musicEngine.playTrack(prev);
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedSongIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-[#3E2723]">PulseChat Music Lounge</h2>
                {isPlaying && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Live Synthesizer
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 font-medium">Ed Sheeran, Minar Rahman, KK, Rahat & Javed Ali</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-[#3E2723] hover:bg-stone-200 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Compact Active Player Banner (Sticky at Top) */}
        <div className="p-3 sm:p-4 bg-stone-900 text-white border-b border-stone-800 shrink-0">
          <div className="flex items-center justify-between gap-3">
            
            {/* Cover & Title */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${currentTrack.coverGradient} shadow-md flex items-center justify-center text-white shrink-0 border border-white/20 relative`}>
                <Music className={`w-6 h-6 ${isPlaying ? 'animate-bounce text-amber-200' : ''}`} />
                {isPlaying && (
                  <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded bg-white/10 text-orange-300 text-[9px] font-bold uppercase tracking-wider">
                    {currentTrack.category}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono hidden sm:inline">
                    {currentTrack.bpm} BPM
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-white truncate leading-tight mt-0.5">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-orange-400 font-semibold truncate leading-tight">
                  {currentTrack.artist}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrevTrack}
                className="p-1.5 sm:p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleTogglePlay(activeTrackIndex)}
                className="w-10 h-10 rounded-xl bg-[#FF6B00] hover:bg-[#EA580C] text-white flex items-center justify-center shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer font-bold"
                title={isPlaying ? 'Pause Synthesizer' : 'Play Synthesizer'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <button
                onClick={handleNextTrack}
                className="p-1.5 sm:p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(currentTrack.title + ' ' + currentTrack.artist)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white text-xs font-semibold transition"
                title="Listen on YouTube Music"
              >
                <span>Full Song</span>
                <ExternalLink className="w-3 h-3 text-orange-300" />
              </a>
            </div>

          </div>

          {/* Famous Line Quote Bar */}
          <div className="mt-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-stone-300 italic truncate flex items-center justify-between">
            <span className="truncate">{currentTrack.famousLine}</span>
            <span className="text-[10px] text-stone-400 shrink-0 ml-2 font-sans font-semibold">Track {activeTrackIndex + 1}/{CURATED_TRACKS.length}</span>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-3 sm:p-4 border-b border-stone-200 bg-stone-50 space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search song title, lyrics, or artist (Ed Sheeran, KK, Minar, Rahat, Javed Ali)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs text-[#3E2723] focus:outline-hidden focus:border-[#FF6B00] shadow-2xs"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' 
                ? CURATED_TRACKS.length 
                : CURATED_TRACKS.filter(t => t.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition text-xs flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? 'bg-[#3E2723] text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Full Visible Track List */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2.5 flex-1 min-h-[220px]">
          {filteredTracks.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs space-y-1">
              <p className="font-semibold text-stone-500">No songs found matching "{searchQuery}"</p>
              <p className="text-[11px]">Try searching for Ed Sheeran, Minar, KK, Rahat, or Javed Ali</p>
            </div>
          ) : (
            filteredTracks.map((track) => {
              const originalIndex = CURATED_TRACKS.findIndex(t => t.id === track.id);
              const isCurrent = activeTrackIndex === originalIndex;
              const isLiked = likedSongIds.has(track.id);

              return (
                <div
                  key={track.id}
                  onClick={() => handleTogglePlay(originalIndex)}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer group ${
                    isCurrent
                      ? 'border-[#FF6B00] bg-orange-50/70 shadow-sm ring-1 ring-[#FF6B00]/20'
                      : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/80 shadow-2xs'
                  }`}
                >
                  {/* Left: Number, Album Art, Title, Artist, Famous Line */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="text-xs font-mono font-bold text-stone-400 w-4 text-center shrink-0">
                      {originalIndex + 1}
                    </span>

                    <div 
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 font-black text-xs shadow-xs bg-gradient-to-br ${track.coverGradient} relative`}
                    >
                      {isCurrent && isPlaying ? (
                        <Radio className="w-5 h-5 animate-pulse text-amber-200" />
                      ) : (
                        <Music className="w-5 h-5 opacity-90 group-hover:scale-110 transition-transform" />
                      )}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? 'text-[#FF6B00]' : 'text-[#3E2723]'}`}>
                          {track.title}
                        </h4>
                        <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 shrink-0">
                          {track.category}
                        </span>
                      </div>
                      
                      <p className="text-[11px] text-stone-500 font-medium truncate mt-0.5">
                        {track.artist}
                      </p>

                      <p className="text-[10px] text-stone-400 italic truncate mt-0.5 hidden sm:block">
                        {track.famousLine}
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => toggleLike(track.id, e)}
                      className={`p-2 rounded-xl transition ${
                        isLiked ? 'text-rose-500 bg-rose-50' : 'text-stone-300 hover:text-rose-400 hover:bg-stone-100'
                      }`}
                      title={isLiked ? 'Liked' : 'Like song'}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>

                    <a
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(track.title + ' ' + track.artist)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl text-stone-400 hover:text-[#FF6B00] hover:bg-orange-50 transition hidden sm:flex"
                      title="Open full track video on YouTube"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button 
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition shadow-xs ${
                        isCurrent && isPlaying 
                          ? 'bg-[#FF6B00] text-white scale-105' 
                          : 'bg-[#3E2723] text-white group-hover:bg-[#FF6B00]'
                      }`}
                      title={isCurrent && isPlaying ? 'Stop' : 'Play melody'}
                    >
                      {isCurrent && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
            <Sparkles className="w-4 h-4 text-[#FF6B00]" />
            <span>{CURATED_TRACKS.length} curated tracks ready for instant background play</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white text-xs font-bold transition shadow-sm cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
