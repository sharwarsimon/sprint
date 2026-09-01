import React, { useState } from 'react';
import { 
  Info, 
  Newspaper, 
  ShoppingBag, 
  Users, 
  MessageSquare, 
  BookOpen, 
  Image as ImageIcon, 
  Music, 
  Video, 
  MessageCircle, 
  Sparkles, 
  ChevronRight,
  Smile,
  Gamepad2,
  Heart,
  BookMarked
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { INITIAL_ROOMS } from '../data/rooms';

// Modals for the 9 items
import { AboutModal } from '../components/AboutModal';
import { NewsModal } from '../components/NewsModal';
import { ShopModal } from '../components/ShopModal';
import { ClubModal } from '../components/ClubModal';
import { BookshopModal } from '../components/BookshopModal';
import { WallpaperModal } from '../components/WallpaperModal';
import { MusicModal } from '../components/MusicModal';
import { VideoModal } from '../components/VideoModal';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectRoom: (roomId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectRoom }) => {
  const { roomCounts, disabledRooms } = useChat();

  const [activeModal, setActiveModal] = useState<
    'about' | 'news' | 'shop' | 'club' | 'bookshop' | 'wallpaper' | 'music' | 'video' | null
  >(null);

  const totalOnline = Object.values(roomCounts).reduce((a: number, b: number) => a + b, 0);

  // The 9 items organized strictly into 3 rows of 3 items:
  // Row 1: About - News - Shop
  // Row 2: Club - Chatrooms - Bookshop
  // Row 3: Wallpaper - Music - Video
  const menuItems = [
    // Row 1
    {
      id: 'about',
      label: 'About',
      sublabel: 'Info & Rules',
      icon: Info,
      action: () => setActiveModal('about'),
      badge: null
    },
    {
      id: 'news',
      label: 'News',
      sublabel: 'Bulletins',
      icon: Newspaper,
      action: () => setActiveModal('news'),
      badge: 'New'
    },
    {
      id: 'shop',
      label: 'Shop',
      sublabel: 'Perks & Badges',
      icon: ShoppingBag,
      action: () => setActiveModal('shop'),
      badge: 'Free'
    },

    // Row 2
    {
      id: 'club',
      label: 'Club',
      sublabel: 'VIP Lounge',
      icon: Users,
      action: () => setActiveModal('club'),
      badge: null
    },
    {
      id: 'chatrooms',
      label: 'Chatrooms',
      sublabel: '5 Live Rooms',
      icon: MessageSquare,
      action: () => onNavigate('/chat'),
      isPrimary: true,
      badge: `${totalOnline || 23} Live`
    },
    {
      id: 'bookshop',
      label: 'Bookshop',
      sublabel: 'Reader Hub',
      icon: BookOpen,
      action: () => setActiveModal('bookshop'),
      badge: null
    },

    // Row 3
    {
      id: 'wallpaper',
      label: 'Wallpaper',
      sublabel: 'HD Themes',
      icon: ImageIcon,
      action: () => setActiveModal('wallpaper'),
      badge: null
    },
    {
      id: 'music',
      label: 'Music',
      sublabel: 'Lo-Fi Chill',
      icon: Music,
      action: () => setActiveModal('music'),
      badge: 'Audio'
    },
    {
      id: 'video',
      label: 'Video',
      sublabel: 'Live Clips',
      icon: Video,
      action: () => setActiveModal('video'),
      badge: null
    }
  ];

  const getRoomIcon = (id: string) => {
    switch (id) {
      case 'fun': return Smile;
      case 'game': return Gamepad2;
      case 'loves': return Heart;
      case 'friends': return Users;
      case 'readers': return BookMarked;
      default: return MessageCircle;
    }
  };

  return (
    <div className="w-full bg-white text-stone-800 flex-1 flex flex-col items-center">
      
      {/* Mobile App Shell Canvas Container */}
      <div className="w-full max-w-lg mx-auto px-4 py-4 sm:py-6 flex flex-col space-y-5">
        
        {/* Simple Clean App Greeting Banner */}
        <div className="rounded-2xl bg-stone-50 border border-stone-200 p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FF6B00]">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span>Realtime Community</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#3E2723] tracking-tight">
              PulseChat
            </h1>
            <p className="text-xs text-stone-500 max-w-xs">
              Fast, clean & friendly messaging. Pick an app item below to explore.
            </p>
          </div>

          <button
            id="enter-chatrooms-hero-cta"
            onClick={() => onNavigate('/chat')}
            className="px-3.5 py-2.5 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white text-xs font-bold transition shadow-xs flex flex-col items-center shrink-0"
          >
            <span className="text-[#FF6B00]">Open Chat</span>
            <span className="text-[10px] text-stone-300 font-mono font-normal">5 Rooms</span>
          </button>
        </div>

        {/* 9 Items Grid: Per Row 3 */}
        <div>
          <div className="flex items-center justify-between mb-2.5 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              App Menu (9 Items)
            </span>
            <span className="text-[11px] text-[#EA580C] font-semibold">
              3 Per Row
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`app-item-${item.id}`}
                  onClick={item.action}
                  className={`relative group rounded-2xl p-3 sm:p-4 text-center border transition-all duration-150 flex flex-col items-center justify-center min-h-[105px] sm:min-h-[120px] ${
                    item.isPrimary
                      ? 'bg-orange-50/50 border-[#FF6B00] ring-2 ring-[#FF6B00]/20 shadow-xs'
                      : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-300 shadow-xs'
                  }`}
                >
                  {/* Item Badge */}
                  {item.badge && (
                    <span
                      className={`absolute top-2 right-2 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase ${
                        item.isPrimary
                          ? 'bg-[#FF6B00] text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Icon Circle (Brand Chocolate + Orange) */}
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-105 ${
                      item.isPrimary
                        ? 'bg-[#3E2723] text-[#FF6B00] shadow-sm'
                        : 'bg-[#3E2723] text-[#FF6B00]'
                    }`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  {/* Item Title in Chocolate */}
                  <span className="text-xs sm:text-sm font-bold text-[#3E2723] group-hover:text-[#FF6B00] transition-colors leading-tight">
                    {item.label}
                  </span>

                  {/* Subtitle */}
                  <span className="text-[10px] text-stone-400 mt-0.5 hidden sm:block">
                    {item.sublabel}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Room Jump Strip: Live Numbers (Fun, Game, Loves, Friends, Readers) */}
        <div className="rounded-2xl border border-stone-200 bg-white p-3.5 sm:p-4 space-y-2.5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#FF6B00]" />
              <span className="text-xs font-bold text-[#3E2723] uppercase tracking-wider">
                Live Public Channels
              </span>
            </div>
            <button
              onClick={() => onNavigate('/chat')}
              className="text-[11px] font-bold text-[#FF6B00] hover:text-[#EA580C] transition flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {INITIAL_ROOMS.map((room) => {
              const count = roomCounts[room.id] || 0;
              const RoomIcon = getRoomIcon(room.id);
              const isDisabled = disabledRooms.includes(room.id);

              return (
                <button
                  key={room.id}
                  id={`quick-room-${room.id}`}
                  disabled={isDisabled}
                  onClick={() => onSelectRoom(room.id)}
                  className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center ${
                    isDisabled
                      ? 'opacity-50 cursor-not-allowed bg-stone-100 border-stone-200'
                      : 'bg-stone-50 hover:bg-orange-50 border-stone-200 hover:border-[#FF6B00]/50'
                  }`}
                >
                  <RoomIcon className="w-4 h-4 text-[#3E2723] mb-1" />
                  <span className="text-[11px] font-bold text-[#3E2723] capitalize truncate max-w-full">
                    {room.name}
                  </span>
                  <span className="text-[10px] font-bold text-[#FF6B00] font-mono">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 9 Items Modals */}
      <AboutModal isOpen={activeModal === 'about'} onClose={() => setActiveModal(null)} />
      <NewsModal isOpen={activeModal === 'news'} onClose={() => setActiveModal(null)} />
      <ShopModal isOpen={activeModal === 'shop'} onClose={() => setActiveModal(null)} onSelectRoom={onSelectRoom} />
      <ClubModal isOpen={activeModal === 'club'} onClose={() => setActiveModal(null)} onSelectRoom={onSelectRoom} />
      <BookshopModal isOpen={activeModal === 'bookshop'} onClose={() => setActiveModal(null)} onSelectRoom={onSelectRoom} />
      <WallpaperModal isOpen={activeModal === 'wallpaper'} onClose={() => setActiveModal(null)} />
      <MusicModal isOpen={activeModal === 'music'} onClose={() => setActiveModal(null)} />
      <VideoModal isOpen={activeModal === 'video'} onClose={() => setActiveModal(null)} onSelectRoom={onSelectRoom} />

    </div>
  );
};
