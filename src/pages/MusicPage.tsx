import React, { useState, useEffect } from 'react';
import { 
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
  ChevronLeft
} from 'lucide-react';
import { musicEngine, CURATED_TRACKS, TrackData } from '../lib/audio';

interface MusicPageProps {
  onBack: () => void;
}

const CATEGORIES = [
  'All',
  'Ed Sheeran & Pop',
  'Minar Rahman',
  'KK Hits',
  'Rahat Fateh Ali',
  'Javed Ali'
] as const;

export const MusicPage: React.FC<MusicPageProps> = ({ onBack }) => {
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
  }, []);

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 animate-in fade-in duration-150">
      
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#3E2723] text-xs font-bold transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          {isPlaying && (
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Synthesizer Playing Live</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Music Player Hero Banner */}
      <div className="p-5 sm:p-7 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          
          {/* Cover Art */}
          <div className="relative group shrink-0">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br ${currentTrack.coverGradient} shadow-xl border border-white/20 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
              <Music className={`w-12 h-12 ${isPlaying ? 'animate-bounce text-amber-200' : ''}`} />
              <span className="text-[10px] font-bold opacity-80 mt-1 uppercase tracking-wider">{currentTrack.bpm} BPM</span>
            </div>
            <button 
              onClick={() => handleTogglePlay(activeTrackIndex)}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-2xl flex items-center justify-center text-white cursor-pointer"
            >
              {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
            </button>
          </div>

          {/* Info & Quote */}
          <div className="flex-1 text-center sm:text-left min-w-0 space-y-2.5">
            <div className="flex items-center justify-center sm:justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-orange-300 text-xs font-bold">
                {currentTrack.category}
              </span>
              <span className="text-xs text-stone-400 font-mono">
                Track {activeTrackIndex + 1} of {CURATED_TRACKS.length}
              </span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white">{currentTrack.title}</h1>
              <p className="text-xs sm:text-sm font-semibold text-orange-400 mt-0.5">{currentTrack.artist}</p>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-stone-300 italic">
              {currentTrack.famousLine}
            </div>

            {/* Playback controls */}
            <div className="pt-1 flex items-center justify-center sm:justify-start gap-3">
              <button
                onClick={handlePrevTrack}
                className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleTogglePlay(activeTrackIndex)}
                className="w-11 h-11 rounded-xl bg-[#FF6B00] hover:bg-[#EA580C] text-white flex items-center justify-center shadow-lg transition hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              <button
                onClick={handleNextTrack}
                className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <a
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(currentTrack.title + ' ' + currentTrack.artist)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-semibold transition"
              >
                <span>Full Song on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5 text-orange-300" />
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Filter and Track List Grid */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search Ed Sheeran, Minar Rahman, KK, Rahat Fateh Ali, Javed Ali..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm text-[#3E2723] focus:outline-hidden focus:border-[#FF6B00]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' 
              ? CURATED_TRACKS.length 
              : CURATED_TRACKS.filter(t => t.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition text-xs flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? 'bg-[#3E2723] text-white shadow-xs'
                    : 'bg-stone-50 text-stone-600 border border-stone-200 hover:border-stone-300'
                }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-stone-200/70 text-stone-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Track Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {filteredTracks.map((track) => {
            const originalIndex = CURATED_TRACKS.findIndex(t => t.id === track.id);
            const isCurrent = activeTrackIndex === originalIndex;
            const isLiked = likedSongIds.has(track.id);

            return (
              <div
                key={track.id}
                onClick={() => handleTogglePlay(originalIndex)}
                className={`p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer group ${
                  isCurrent
                    ? 'border-[#FF6B00] bg-orange-50/70 shadow-sm ring-1 ring-[#FF6B00]/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 font-black text-xs shadow-xs bg-gradient-to-br ${track.coverGradient}`}
                  >
                    {isCurrent && isPlaying ? (
                      <Radio className="w-4 h-4 animate-pulse text-amber-200" />
                    ) : (
                      track.artist.charAt(0)
                    )}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className={`text-xs sm:text-sm font-bold truncate ${isCurrent ? 'text-[#FF6B00]' : 'text-[#3E2723]'}`}>
                        {track.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate mt-0.5">{track.artist}</p>
                    <p className="text-[10px] text-stone-400 italic truncate mt-0.5">{track.famousLine}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => toggleLike(track.id, e)}
                    className={`p-1.5 rounded-lg transition ${
                      isLiked ? 'text-rose-500' : 'text-stone-300 hover:text-rose-400'
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
                    className="p-1.5 rounded-lg text-stone-400 hover:text-[#FF6B00] transition"
                    title="Watch on YouTube"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition ${
                    isCurrent && isPlaying 
                      ? 'bg-[#FF6B00] text-white' 
                      : 'bg-[#3E2723] text-white group-hover:bg-[#FF6B00]'
                  }`}>
                    {isCurrent && isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
