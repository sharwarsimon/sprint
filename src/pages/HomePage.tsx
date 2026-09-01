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
  Smile,
  Gamepad2,
  Heart,
  ChevronRight
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

  const totalOnline = Object.values(roomCounts).reduce((a: number, b: number) => a + b, 0) || 23;

  // The 9 items organized strictly into 3 rows of 3 items:
  // Row 1: About - News - Shop
  // Row 2: Club - Chatrooms - Bookshop
  // Row 3: Wallpaper - Music - Video
  const menuItems = [
    // Row 1
    {
      id: 'about',
      label: 'About',
      icon: Info,
      action: () => setActiveModal('about'),
      badge: null
    },
    {
      id: 'news',
      label: 'News',
      icon: Newspaper,
      action: () => setActiveModal('news'),
      badge: 'New'
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: ShoppingBag,
      action: () => setActiveModal('shop'),
      badge: null
    },

    // Row 2
    {
      id: 'club',
      label: 'Club',
      icon: Users,
      action: () => setActiveModal('club'),
      badge: null
    },
    {
      id: 'chatrooms',
      label: 'Chatrooms',
      icon: MessageSquare,
      action: () => onNavigate('/chat'),
      isPrimary: true,
      badge: `${totalOnline} Live`
    },
    {
      id: 'bookshop',
      label: 'Bookshop',
      icon: BookOpen,
      action: () => setActiveModal('bookshop'),
      badge: null
    },

    // Row 3
    {
      id: 'wallpaper',
      label: 'Wallpaper',
      icon: ImageIcon,
      action: () => setActiveModal('wallpaper'),
      badge: null
    },
    {
      id: 'music',
      label: 'Music',
      icon: Music,
      action: () => setActiveModal('music'),
      badge: null
    },
    {
      id: 'video',
      label: 'Video',
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
      case 'readers': return BookOpen;
      default: return MessageSquare;
    }
  };

  return (
    <div className="w-full bg-white text-[#3E2723] flex-1 flex flex-col items-center animate-in fade-in duration-150">
      
      {/* Mobile App Canvas */}
      <div className="w-full max-w-lg mx-auto px-4 py-3 sm:py-5 flex flex-col space-y-4">
        
        {/* Simple Header Banner with Clickable Live Members Link */}
        <div className="rounded-2xl bg-stone-50 border border-stone-200 p-3.5 sm:p-4 flex items-center justify-between shadow-xs">
          <div>
            <h1 className="text-lg sm:text-xl font-black text-[#3E2723] tracking-tight">
              PulseChat
            </h1>
            
            {/* Clickable Live Members Link in Header */}
            <button
              id="header-live-members-btn"
              onClick={() => onNavigate('/members')}
              className="mt-1 flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-[#EA580C] transition group"
              title="Click to view all live members"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="underline decoration-[#FF6B00]/40 group-hover:decoration-[#FF6B00]">
                {totalOnline} Members Live
              </span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <button
            id="enter-chatrooms-hero-cta"
            onClick={() => onNavigate('/chat')}
            className="px-3.5 py-2 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Chat Rooms</span>
          </button>
        </div>

        {/* 9 Items Grid: Exactly 3 Per Row */}
        <div>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`app-item-${item.id}`}
                  onClick={item.action}
                  className={`relative group rounded-2xl p-3 text-center border transition-all duration-150 flex flex-col items-center justify-center min-h-[96px] sm:min-h-[105px] ${
                    item.isPrimary
                      ? 'bg-orange-50/50 border-[#FF6B00] ring-1 ring-[#FF6B00]/30 shadow-xs'
                      : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-stone-300 shadow-xs'
                  }`}
                >
                  {/* Item Badge */}
                  {item.badge && (
                    <span
                      className={`absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase ${
                        item.isPrimary
                          ? 'bg-[#FF6B00] text-white'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Brand Chocolate + Orange Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-105 ${
                      item.isPrimary
                        ? 'bg-[#3E2723] text-[#FF6B00] shadow-xs'
                        : 'bg-[#3E2723] text-[#FF6B00]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Label */}
                  <span className="text-xs font-bold text-[#3E2723] group-hover:text-[#FF6B00] transition-colors leading-tight">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Simple Chatrooms List with Room Name & Member Count */}
        <div className="rounded-2xl border border-stone-200 bg-white p-3.5 space-y-2 shadow-xs">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-black text-[#3E2723] uppercase tracking-wider">
              Chat Rooms
            </span>
            <button
              onClick={() => onNavigate('/chat')}
              className="text-[11px] font-bold text-[#FF6B00] hover:underline"
            >
              Open All
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1.5">
            {INITIAL_ROOMS.map((room) => {
              const count = roomCounts[room.id] || (room.id === 'fun' ? 3 : room.id === 'game' ? 5 : room.id === 'loves' ? 4 : room.id === 'friends' ? 8 : 3);
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
                      : 'bg-stone-50 hover:bg-orange-50/60 border-stone-200 hover:border-[#FF6B00]/40'
                  }`}
                >
                  <RoomIcon className="w-4 h-4 text-[#3E2723] mb-1" />
                  <span className="text-[11px] font-bold text-[#3E2723] truncate max-w-full">
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
