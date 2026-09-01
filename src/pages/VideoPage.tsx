import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  ExternalLink, 
  Search, 
  Compass, 
  Moon, 
  Music, 
  Globe, 
  Film,
  Tv,
  ChevronLeft
} from 'lucide-react';
import { CURATED_VIDEOS, VideoItem } from '../components/VideoModal';

const CATEGORIES = [
  'All',
  'Ruhi Çenet Docs',
  'Islamic & Spiritual',
  'Famous Music',
  'Nature & Science'
] as const;

interface VideoPageProps {
  onBack: () => void;
}

export const VideoPage: React.FC<VideoPageProps> = ({ onBack }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(CURATED_VIDEOS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredVideos = CURATED_VIDEOS.filter((video) => {
    const matchesCat = selectedCategory === 'All' || video.category === selectedCategory;
    const matchesSearch = 
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Ruhi Çenet Docs': return Globe;
      case 'Islamic & Spiritual': return Moon;
      case 'Famous Music': return Music;
      case 'Nature & Science': return Compass;
      default: return Film;
    }
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

        <span className="px-3 py-1 rounded-full bg-orange-50 text-[#FF6B00] border border-orange-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
          <Tv className="w-3.5 h-3.5" />
          <span>Embedded Video Theater</span>
        </span>
      </div>

      {/* Featured Video Player */}
      <div className="p-4 sm:p-6 rounded-3xl bg-stone-950 text-white border border-stone-800 shadow-2xl space-y-4">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black border border-stone-800">
          <iframe
            key={selectedVideo.youtubeId}
            src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
            title={selectedVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="w-full h-full border-0"
          />
        </div>

        {/* Video Info Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-orange-400 text-xs font-bold">
                {selectedVideo.category}
              </span>
              <span className="text-xs text-stone-400 font-semibold">{selectedVideo.channel}</span>
              <span className="text-xs text-stone-500 font-mono">({selectedVideo.duration})</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white">
              {selectedVideo.title}
            </h1>
            <p className="text-xs text-stone-400 leading-relaxed max-w-2xl">
              {selectedVideo.description}
            </p>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2 transition shrink-0 self-stretch sm:self-auto justify-center shadow-md"
          >
            <span>Play on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Filter and Video Grid */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-xs space-y-4">
        
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search Ruhi Çenet, Islamic reflections, Ed Sheeran, KK, Javed Ali..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm text-[#3E2723] focus:outline-hidden focus:border-[#FF6B00]"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All'
              ? CURATED_VIDEOS.length
              : CURATED_VIDEOS.filter(v => v.category === cat).length;

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

        {/* Video Cards Grid with Real YouTube Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {filteredVideos.map((video) => {
            const isSelected = selectedVideo.id === video.id;
            const Icon = getCategoryIcon(video.category);

            return (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`p-3 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer group ${
                  isSelected
                    ? 'border-[#FF6B00] bg-orange-50/70 shadow-sm ring-1 ring-[#FF6B00]/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Real YouTube Thumbnail */}
                  <div className="relative w-24 h-16 sm:w-28 sm:h-18 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-200 shadow-2xs">
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                      alt={video.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-white text-[9px] font-mono font-bold">
                      {video.duration}
                    </span>
                    <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}>
                      <Play className="w-5 h-5 text-white fill-current" />
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 shrink-0">
                        {video.category}
                      </span>
                      <span className="text-[11px] text-stone-500 font-medium truncate">
                        {video.channel}
                      </span>
                    </div>
                    <h3 className={`text-xs sm:text-sm font-bold mt-1 line-clamp-1 ${isSelected ? 'text-[#FF6B00]' : 'text-[#3E2723]'}`}>
                      {video.title}
                    </h3>
                    <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                      {video.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition hidden sm:flex"
                    title="Open on YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button className={`p-2 rounded-xl text-xs font-bold shrink-0 transition ${
                    isSelected ? 'bg-[#FF6B00] text-white' : 'bg-stone-100 text-stone-500 group-hover:bg-orange-50 group-hover:text-[#FF6B00]'
                  }`}>
                    <Play className="w-3.5 h-3.5 ml-0.5 fill-current" />
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
