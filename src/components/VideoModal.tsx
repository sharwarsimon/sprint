import React, { useState } from 'react';
import { X, Video, Play, Sparkles, Film, Radio, ExternalLink } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom?: (roomId: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onSelectRoom }) => {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  if (!isOpen) return null;

  const clips = [
    {
      id: 1,
      title: 'How PulseChat Realtime Rooms Work',
      duration: '1:45',
      category: 'Guide',
      description: 'Quick walkthrough on choosing a nickname, joining 5 public topic rooms, and switching seamlessly.',
      views: '1.2k'
    },
    {
      id: 2,
      title: 'Community Etiquette & Safety Tips',
      duration: '2:10',
      category: 'Safety',
      description: 'Understanding automated profanity masking, blocking unruly users, and reporting spam.',
      views: '890'
    },
    {
      id: 3,
      title: 'The Game & Readers Club Highlights',
      duration: '3:05',
      category: 'Community',
      description: 'Best discussions from our dedicated Game and Readers book club channels.',
      views: '2.4k'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3E2723]">Community Video Hub</h2>
              <p className="text-xs text-stone-500">Live streams, feature tutorials & clips</p>
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

        {/* Video stream preview */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Featured Video Player Mock */}
          <div className="rounded-xl overflow-hidden border border-stone-200 bg-stone-900 text-white p-6 relative aspect-video flex flex-col justify-between shadow-inner">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FF6B00] text-white flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse" /> Community Spotlight
              </span>
              <span className="text-xs text-stone-300 font-mono">1080p HD</span>
            </div>

            <div className="text-center py-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/20 hover:bg-[#FF6B00] text-white flex items-center justify-center transition cursor-pointer mb-2">
                <Play className="w-6 h-6 ml-0.5" />
              </div>
              <h3 className="text-base font-bold text-white">
                {activeVideo !== null ? clips[activeVideo].title : 'Welcome to PulseChat Community'}
              </h3>
              <p className="text-xs text-stone-300 mt-1 max-w-sm mx-auto">
                {activeVideo !== null ? clips[activeVideo].description : 'Watch how thousands of users talk and share experiences in real-time.'}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-400 border-t border-white/10 pt-2">
              <span>Interactive Tutorial</span>
              <span>Fast Stream</span>
            </div>
          </div>

          {/* Video List */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 px-1">
              Available Video Clips ({clips.length})
            </span>

            {clips.map((clip, idx) => (
              <div
                key={clip.id}
                onClick={() => setActiveVideo(idx)}
                className={`p-3.5 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                  activeVideo === idx
                    ? 'border-[#FF6B00] bg-orange-50/50'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-[#3E2723]">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#3E2723]">{clip.title}</h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-stone-100 text-stone-600">
                        {clip.duration}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 line-clamp-1">{clip.description}</p>
                  </div>
                </div>

                <span className="text-xs font-bold text-[#FF6B00]">Watch</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">Live community streams & guides.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white text-xs font-bold transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
