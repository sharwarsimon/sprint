import React, { useState } from 'react';
import { 
  X, 
  Video, 
  Play, 
  Sparkles, 
  Film, 
  Radio, 
  ExternalLink, 
  Search, 
  Compass, 
  Moon, 
  Music, 
  Globe, 
  Share2,
  Tv,
  CheckCircle2,
  Maximize2
} from 'lucide-react';

export interface VideoItem {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  category: 'Ruhi Çenet Docs' | 'Islamic & Spiritual' | 'Famous Music' | 'Nature & Science';
  duration: string;
  description: string;
}

export const CURATED_VIDEOS: VideoItem[] = [
  // Ruhi Çenet Documentaries
  {
    id: 'ruhi_coldest',
    youtubeId: '4_lZ0h9tZoc',
    title: 'The Coldest Village on Earth: Oymyakon, Siberia (-71°C)',
    channel: 'Ruhi Çenet',
    category: 'Ruhi Çenet Docs',
    duration: '22:45',
    description: 'Ruhi Çenet travels to Oymyakon in Yakutia, Siberia to experience what daily life is like at -71°C.'
  },
  {
    id: 'ruhi_isolated',
    youtubeId: 'j5_YgVzM3r0',
    title: 'Life in the Most Isolated Places & Forgotten Civilizations',
    channel: 'Ruhi Çenet',
    category: 'Ruhi Çenet Docs',
    duration: '18:12',
    description: 'An eye-opening expedition exploring humanity surviving in extreme geographical isolation.'
  },
  {
    id: 'ruhi_hottest',
    youtubeId: '8kY5wX-P57M',
    title: 'Dallol: Surviving in the Hottest Place on Earth',
    channel: 'Ruhi Çenet',
    category: 'Ruhi Çenet Docs',
    duration: '20:10',
    description: 'Documentary exploring the acid sulfur lakes and extreme hydrothermal temperatures of Dallol, Ethiopia.'
  },

  // Islamic & Spiritual Reflections
  {
    id: 'islamic_surah_rahman',
    youtubeId: 'dfFvP_4Vv-Q',
    title: 'Surah Ar-Rahman - Beautiful Soul-Soothing Recitation',
    channel: 'Qari Mishary Rashid Alafasy',
    category: 'Islamic & Spiritual',
    duration: '14:30',
    description: 'Heartfelt Quran recitation of Surah Ar-Rahman (The Most Merciful) with english subtitles.'
  },
  {
    id: 'islamic_surah_mulk',
    youtubeId: 'H9p0o_59LQE',
    title: 'Surah Al-Mulk - Calming Recitation for Peace & Night Reflection',
    channel: 'Qur\'an Healing Reflections',
    category: 'Islamic & Spiritual',
    duration: '11:20',
    description: 'Recitation of Surah Al-Mulk to find peace of mind, heart comfort, and deep gratitude.'
  },
  {
    id: 'islamic_mufti_menk',
    youtubeId: 'LgY4fG5E_eU',
    title: 'Finding Inner Peace When Life Gets Hard & Overwhelming',
    channel: 'Mufti Menk',
    category: 'Islamic & Spiritual',
    duration: '16:45',
    description: 'Inspiring and practical life advice on dealing with stress, patience (Sabr), and trusting the Almighty.'
  },
  {
    id: 'islamic_gratitude',
    youtubeId: 'Mv_GkWmE4Ew',
    title: 'The Hidden Power of Gratitude & Daily Blessings',
    channel: 'Dr. Omar Suleiman (Yaqeen)',
    category: 'Islamic & Spiritual',
    duration: '12:50',
    description: 'A deep psychological and spiritual reflection on transforming inner mindset with Alhamdulillah.'
  },

  // Famous Music Videos
  {
    id: 'music_ed_perfect',
    youtubeId: '2Vv-BfVoq4g',
    title: 'Ed Sheeran - Perfect (Official Music Video)',
    channel: 'Ed Sheeran',
    category: 'Famous Music',
    duration: '4:40',
    description: '“I found a love for me...” The world-renowned romantic ballad recorded in the Austrian Alps.'
  },
  {
    id: 'music_thousand_years',
    youtubeId: 'rtOvBOTyX00',
    title: 'Christina Perri - A Thousand Years (Official Video)',
    channel: 'Christina Perri',
    category: 'Famous Music',
    duration: '4:48',
    description: '“Heart beats fast, colors and promises...” The immortal romantic masterpiece.'
  },
  {
    id: 'music_minar_jhoom',
    youtubeId: '92xZ6xWwXkM',
    title: 'Minar Rahman - Jhoom (Official Music Video)',
    channel: 'Gaanchill Music',
    category: 'Famous Music',
    duration: '4:35',
    description: 'Minar Rahman\'s most celebrated soulful song with breathtaking rain visuals.'
  },
  {
    id: 'music_rahat_afreen',
    youtubeId: 'kw4tT7SCmaY',
    title: 'Rahat Fateh Ali Khan & Momina - Afreen Afreen',
    channel: 'Coke Studio Pakistan',
    category: 'Famous Music',
    duration: '6:45',
    description: 'Nusrat Fateh Ali Khan\'s timeless qawwali reimagined by Rahat Fateh Ali Khan & Momina Mustehsan.'
  },
  {
    id: 'music_kun_faya',
    youtubeId: 'T94PHkuydcw',
    title: 'A.R. Rahman, Javed Ali, Mohit Chauhan - Kun Faya Kun',
    channel: 'T-Series (Rockstar)',
    category: 'Famous Music',
    duration: '7:52',
    description: 'Sufi spiritual anthem performed at the Hazrat Nizamuddin Dargah.'
  },
  {
    id: 'music_kk_zara_sa',
    youtubeId: 'V1bFr2KGbqI',
    title: 'KK - Zara Sa (Official Video - Jannat)',
    channel: 'Sony Music India',
    category: 'Famous Music',
    duration: '5:05',
    description: 'Legendary playback singer KK\'s iconic love anthem from Jannat starring Emraan Hashmi.'
  },

  // Nature & Curiosity Documentaries
  {
    id: 'nature_deep_ocean',
    youtubeId: '9z85cS3s2LE',
    title: 'Mysteries of the Deep Ocean & Bioluminescence',
    channel: 'BBC Earth Documentaries',
    category: 'Nature & Science',
    duration: '15:20',
    description: 'Witnessing alien creatures that live in total darkness at the bottom of the Mariana Trench.'
  },
  {
    id: 'science_cosmos',
    youtubeId: 'iyZ22yFk4k8',
    title: 'Journey Through the Observable Universe in 4K',
    channel: 'Cosmos & Discovery',
    category: 'Nature & Science',
    duration: '19:40',
    description: 'A breathtaking scale journey from planet Earth to galaxies billions of light years away.'
  }
];

const CATEGORIES = [
  'All',
  'Ruhi Çenet Docs',
  'Islamic & Spiritual',
  'Famous Music',
  'Nature & Science'
] as const;

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom?: (roomId: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(CURATED_VIDEOS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  if (!isOpen) return null;

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

  const handleSelectVideo = (video: VideoItem) => {
    setSelectedVideo(video);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-stone-900/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-[#3E2723]">PulseChat Video Theater</h2>
                <span className="px-2 py-0.5 rounded-full bg-orange-100 text-[#FF6B00] text-[10px] font-bold">
                  Curated HD
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">Ruhi Çenet documentaries, Islamic reflections & famous tracks</p>
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

        {/* Video Player Section (Sticky) */}
        <div className="bg-stone-950 text-white p-3 sm:p-4 space-y-2.5 shrink-0 border-b border-stone-800">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-stone-800">
            <iframe
              id="pulsechat-yt-player-iframe"
              key={selectedVideo.youtubeId}
              src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full border-0"
            />
          </div>

          {/* Current Video Info & 1-Click Open Controls */}
          <div className="flex items-center justify-between gap-2 pt-0.5">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-white/10 text-orange-400 text-[10px] font-bold">
                  {selectedVideo.category}
                </span>
                <span className="text-xs text-stone-400 font-medium truncate">{selectedVideo.channel}</span>
                <span className="text-[10px] text-stone-500 font-mono hidden sm:inline">({selectedVideo.duration})</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mt-1 truncate">
                {selectedVideo.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                title="Play full video on YouTube in new tab"
              >
                <span>Play on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="p-3 sm:p-4 border-b border-stone-200 bg-stone-50 space-y-2.5 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Ruhi Çenet, Islamic videos, Ed Sheeran, KK, Javed Ali..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-stone-300 rounded-xl text-xs text-[#3E2723] focus:outline-hidden focus:border-[#FF6B00] shadow-2xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All'
                ? CURATED_VIDEOS.length
                : CURATED_VIDEOS.filter(v => v.category === cat).length;

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

        {/* Visible Video List with Real YouTube Thumbnails */}
        <div className="p-3 sm:p-4 overflow-y-auto space-y-2.5 flex-1 min-h-[220px]">
          {filteredVideos.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs space-y-1">
              <p className="font-semibold text-stone-500">No videos found matching "{searchQuery}"</p>
              <p className="text-[11px]">Try searching for Ruhi Çenet, Surah, or music artists</p>
            </div>
          ) : (
            filteredVideos.map((video) => {
              const isSelected = selectedVideo.id === video.id;

              return (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`p-2.5 sm:p-3 rounded-2xl border transition flex items-center justify-between gap-3 cursor-pointer group ${
                    isSelected
                      ? 'border-[#FF6B00] bg-orange-50/70 shadow-sm ring-1 ring-[#FF6B00]/20'
                      : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* YouTube Video Thumbnail */}
                    <div className="relative w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-200 shadow-2xs">
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

                    {/* Text info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 shrink-0">
                          {video.category}
                        </span>
                        <span className="text-[11px] text-stone-500 font-medium truncate">
                          {video.channel}
                        </span>
                      </div>
                      
                      <h4 className={`text-xs sm:text-sm font-bold mt-0.5 line-clamp-1 ${isSelected ? 'text-[#FF6B00]' : 'text-[#3E2723]'}`}>
                        {video.title}
                      </h4>
                      
                      <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                        {video.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition hidden sm:flex"
                      title="Open in new tab on YouTube"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button 
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition shadow-xs ${
                        isSelected 
                          ? 'bg-[#FF6B00] text-white scale-105' 
                          : 'bg-[#3E2723] text-white group-hover:bg-[#FF6B00]'
                      }`}
                      title={isSelected ? 'Now Playing' : 'Play Video'}
                    >
                      <Play className="w-4 h-4 ml-0.5 fill-current" />
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
            <Tv className="w-4 h-4 text-[#FF6B00]" />
            <span>{CURATED_VIDEOS.length} curated documentaries & videos</span>
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
