import React, { useState } from 'react';
import { X, Image as ImageIcon, Download, Check, Sparkles, Eye } from 'lucide-react';
import { setLocalData, getLocalData } from '../lib/storage';

interface WallpaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WallpaperModal: React.FC<WallpaperModalProps> = ({ isOpen, onClose }) => {
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>(() =>
    getLocalData<string>('pulsechat_active_wallpaper', 'default_white')
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const wallpapers = [
    {
      id: 'default_white',
      title: 'Crisp White Clean',
      tag: 'Minimal',
      bgColor: 'bg-white',
      border: 'border-stone-300',
      description: 'Pure clean white backdrop with crisp typography.'
    },
    {
      id: 'warm_chocolate',
      title: 'Warm Chocolate Essence',
      tag: 'Brand',
      bgColor: 'bg-[#3E2723]',
      textColor: 'text-white',
      border: 'border-[#4E342E]',
      description: 'Rich dark cocoa textured canvas for night sessions.'
    },
    {
      id: 'sunset_orange',
      title: 'Sunset Orange Glow',
      tag: 'Vibrant',
      bgColor: 'bg-[#FF6B00]',
      textColor: 'text-white',
      border: 'border-[#EA580C]',
      description: 'Radiant warm orange gradient aura.'
    },
    {
      id: 'cozy_mocha',
      title: 'Cozy Mocha Cream',
      tag: 'Soft',
      bgColor: 'bg-[#FDFBF7]',
      border: 'border-amber-200',
      description: 'Subtle warm vanilla cream tone with gentle eye-comfort.'
    },
    {
      id: 'bookshop_sepia',
      title: 'Bookshop Paper Sepia',
      tag: 'Classic',
      bgColor: 'bg-[#F5F0E6]',
      border: 'border-stone-300',
      description: 'Textured vintage novel paper background.'
    },
    {
      id: 'retro_grid',
      title: 'Clean Minimal Grid',
      tag: 'Modern',
      bgColor: 'bg-stone-50',
      border: 'border-stone-200',
      description: 'Subtle technical architectural dot pattern.'
    }
  ];

  const handleApply = (id: string, title: string) => {
    setSelectedWallpaper(id);
    setLocalData('pulsechat_active_wallpaper', id);
    setToastMessage(`Applied "${title}" wallpaper!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3E2723]">Wallpapers & Themes</h2>
              <p className="text-xs text-stone-500">HD chat backgrounds & brand themes</p>
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

        {/* Toast */}
        {toastMessage && (
          <div className="bg-[#FF6B00] text-white text-xs font-semibold px-4 py-2 text-center animate-in slide-in-from-top duration-150">
            {toastMessage}
          </div>
        )}

        {/* Wallpaper Grid */}
        <div className="p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5 flex-1">
          {wallpapers.map((wp) => {
            const isApplied = selectedWallpaper === wp.id;
            return (
              <div
                key={wp.id}
                className={`p-4 rounded-xl border transition flex flex-col justify-between ${
                  isApplied
                    ? 'border-[#FF6B00] ring-2 ring-[#FF6B00]/20 bg-orange-50/20'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div>
                  <div
                    className={`h-24 rounded-lg ${wp.bgColor} ${wp.border} border shadow-inner flex items-center justify-center mb-3 relative overflow-hidden`}
                  >
                    <span className={`text-xs font-bold ${wp.textColor || 'text-[#3E2723]'}`}>
                      {wp.title}
                    </span>
                    {isApplied && (
                      <span className="absolute top-2 right-2 bg-[#FF6B00] text-white p-1 rounded-full shadow-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-[#3E2723]">{wp.title}</h4>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                      {wp.tag}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">{wp.description}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center gap-2">
                  <button
                    onClick={() => handleApply(wp.id, wp.title)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      isApplied
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                        : 'bg-[#3E2723] hover:bg-[#2D1C19] text-white'
                    }`}
                  >
                    {isApplied ? 'Active' : 'Apply Theme'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">Applies instantly across all 5 rooms.</span>
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
