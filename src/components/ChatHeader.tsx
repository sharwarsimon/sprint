import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Smile, 
  Gamepad2, 
  Heart, 
  Users, 
  BookOpen, 
  ChevronDown, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { ChatRoomInfo } from '../types';
import { INITIAL_ROOMS } from '../data/rooms';

interface ChatHeaderProps {
  currentRoom: ChatRoomInfo;
  onlineCount: number;
  onBack: () => void;
  onSwitchRoom: (roomId: string) => void;
  onToggleUsersDrawer: () => void;
  isUsersDrawerOpen: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  currentRoom,
  onlineCount,
  onBack,
  onSwitchRoom,
  onToggleUsersDrawer
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getRoomIcon = (id: string) => {
    switch (id) {
      case 'fun': return Smile;
      case 'game': return Gamepad2;
      case 'loves': return Heart;
      case 'friends': return Users;
      case 'readers': return BookOpen;
      default: return Sparkles;
    }
  };

  const IconComponent = getRoomIcon(currentRoom.id);

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 px-3 sm:px-4 py-2.5 shadow-xs">
      <div className="flex items-center justify-between gap-2 max-w-2xl mx-auto">
        
        {/* Left: Back Arrow + Room Info (WhatsApp/Messenger Style) */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            id="chat-back-button"
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full text-[#3E2723] hover:bg-stone-100 transition shrink-0"
            aria-label="Back to rooms"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Room Avatar */}
          <div className="w-9 h-9 rounded-full bg-[#3E2723] text-[#FF6B00] flex items-center justify-center shrink-0 shadow-xs">
            <IconComponent className="w-4 h-4" />
          </div>

          {/* Room Name & Clickable Members Link */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="text-sm sm:text-base font-black text-[#3E2723] truncate">
                {currentRoom.name}
              </h2>
            </div>
            
            {/* Direct Member Link inside the room */}
            <button
              id="header-view-members-link"
              onClick={onToggleUsersDrawer}
              className="text-[11px] font-bold text-[#FF6B00] hover:text-[#EA580C] hover:underline flex items-center gap-1 transition text-left"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span>{onlineCount || 1} online • View members</span>
            </button>
          </div>
        </div>

        {/* Right: Room Switcher & Members Button */}
        <div className="flex items-center gap-1.5 shrink-0">
          
          {/* Members Button */}
          <button
            id="chat-members-button"
            onClick={onToggleUsersDrawer}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#3E2723] text-xs font-bold transition shadow-xs"
            title="View room members"
          >
            <Users className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Members ({onlineCount || 1})</span>
          </button>

          {/* Room Switcher Dropdown */}
          <div className="relative">
            <button
              id="room-switcher-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#3E2723] text-xs font-bold transition flex items-center gap-1"
              title="Switch room"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setDropdownOpen(false)} 
                />
                <div className="absolute top-full right-0 mt-2 w-48 rounded-2xl bg-white border border-stone-200 shadow-xl p-1.5 z-50 animate-in fade-in duration-100">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Switch Room
                  </div>
                  {INITIAL_ROOMS.map((r) => {
                    const RIcon = getRoomIcon(r.id);
                    const isCurrent = r.id === currentRoom.id;
                    return (
                      <button
                        key={r.id}
                        id={`switch-to-room-${r.id}`}
                        onClick={() => {
                          onSwitchRoom(r.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-bold transition ${
                          isCurrent
                            ? 'bg-orange-50 text-[#FF6B00]'
                            : 'text-[#3E2723] hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <RIcon className="w-3.5 h-3.5 text-[#3E2723]" />
                          <span>{r.name}</span>
                        </div>
                        {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
