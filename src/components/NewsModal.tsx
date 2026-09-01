import React from 'react';
import { X, Newspaper, Bell, Sparkles, Calendar, ArrowRight } from 'lucide-react';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const articles = [
    {
      id: 1,
      title: 'PulseChat 2.0: Clean Chocolate & Orange Mobile App UI',
      date: 'Today',
      badge: 'Release',
      summary: 'Brand new white background, clean mobile app aesthetics, 3x3 navigation grid, and universal GitHub/Vercel persistence.'
    },
    {
      id: 2,
      title: '5 Real-Time Chat Rooms Live Now',
      date: 'Yesterday',
      badge: 'Community',
      summary: 'Fun, Game, Loves, Friends, and Readers channels are running with sub-50ms live presence and instant zero-wait onboarding.'
    },
    {
      id: 3,
      title: 'Community Guidelines & Safety Hardening',
      date: 'Aug 28',
      badge: 'Safety',
      summary: 'New profanity filtering and fast 1-click message reporting ensure a welcoming environment for all members.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3E2723]">Community News</h2>
              <p className="text-xs text-stone-500">Announcements, updates & feature releases</p>
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

        {/* Articles Feed */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {articles.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl border border-stone-200 hover:border-[#FF6B00]/40 bg-white hover:bg-stone-50 transition space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-100 text-[#FF6B00]">
                  {item.badge}
                </span>
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#3E2723]">{item.title}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">{item.summary}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">PulseChat Bulletin v2.0</span>
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
