import React, { useState } from 'react';
import { X, ShoppingBag, Check, Sparkles, Star, Tag, Palette, Smile } from 'lucide-react';
import { LocalDB } from '../lib/storage';

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom?: (roomId: string) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({ isOpen, onClose, onSelectRoom }) => {
  const [purchased, setPurchased] = useState<string[]>(() => LocalDB.getPurchasedItems());
  const [activeTab, setActiveTab] = useState<'all' | 'stickers' | 'themes' | 'badges'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const items = [
    {
      id: 'sticker_choco_pack',
      name: 'Chocolate & Coffee Stickers',
      category: 'stickers',
      price: 'Free',
      description: '16 high-res emoji stickers featuring chocolate bars, coffee cups, and warm emotions.',
      icon: '🍫'
    },
    {
      id: 'sticker_retro_games',
      name: 'Pixel Game Emotes',
      category: 'stickers',
      price: 'Free',
      description: '8-bit retro gaming animated icons for the Game chatroom.',
      icon: '🎮'
    },
    {
      id: 'badge_vip_star',
      name: 'Chocolate Star Badge',
      category: 'badges',
      price: 'Free',
      description: 'Golden chocolate star next to your username in public chatrooms.',
      icon: '⭐'
    },
    {
      id: 'badge_bookworm',
      name: 'Master Reader Badge',
      category: 'badges',
      price: 'Free',
      description: 'Distinguished book icon badge for avid readers and club discussions.',
      icon: '📖'
    },
    {
      id: 'theme_orange_glow',
      name: 'Sunset Orange Message Glow',
      category: 'themes',
      price: 'Free',
      description: 'Highlight your sent messages with a warm orange border accent.',
      icon: '✨'
    },
    {
      id: 'theme_mocha_minimal',
      name: 'Mocha Minimalist Bubble',
      category: 'themes',
      price: 'Free',
      description: 'Subtle warm brown bubble background for comfortable night chatting.',
      icon: '☕'
    }
  ];

  const filteredItems = activeTab === 'all' ? items : items.filter((i) => i.category === activeTab);

  const handleUnlock = (itemId: string, itemName: string) => {
    LocalDB.addPurchasedItem(itemId);
    setPurchased((prev) => [...new Set([...prev, itemId])]);
    setToastMessage(`Activated "${itemName}"!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3E2723]">PulseChat Shop</h2>
              <p className="text-xs text-stone-500">Free chat cosmetics, badges & sticker packs</p>
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

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-[#FF6B00] text-white text-xs font-semibold px-4 py-2 text-center animate-in slide-in-from-top duration-150">
            {toastMessage}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="px-5 pt-3 pb-2 border-b border-stone-100 flex items-center gap-1.5 overflow-x-auto">
          {(['all', 'stickers', 'badges', 'themes'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === tab
                  ? 'bg-[#3E2723] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Items List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {filteredItems.map((item) => {
            const isUnlocked = purchased.includes(item.id);
            return (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-stone-200 hover:border-[#FF6B00]/40 bg-white hover:bg-stone-50 transition flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-[#3E2723]">{item.name}</h4>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-100 text-[#FF6B00]">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5 max-w-xs">{item.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleUnlock(item.id, item.name)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                    isUnlocked
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-[#FF6B00] hover:bg-[#EA580C] text-white shadow-xs'
                  }`}
                >
                  {isUnlocked ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Equipped</span>
                    </>
                  ) : (
                    <span>Activate</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">All cosmetics are completely unlocked.</span>
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
