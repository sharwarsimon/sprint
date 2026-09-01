import React from 'react';
import { 
  Smile, 
  Gamepad2, 
  Heart, 
  Users, 
  BookOpen, 
  ChevronRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { ChatRoomInfo } from '../types';

interface RoomCardProps {
  room: ChatRoomInfo;
  onlineCount: number;
  isDisabled?: boolean;
  onSelect: (roomId: string) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onlineCount,
  isDisabled = false,
  onSelect
}) => {
  const getIcon = () => {
    switch (room.id) {
      case 'fun': return Smile;
      case 'game': return Gamepad2;
      case 'loves': return Heart;
      case 'friends': return Users;
      case 'readers': return BookOpen;
      default: return Sparkles;
    }
  };

  const IconComponent = getIcon();

  return (
    <div
      id={`room-card-${room.id}`}
      onClick={() => !isDisabled && onSelect(room.id)}
      className={`group w-full p-3.5 sm:p-4 rounded-2xl border transition-all duration-150 flex items-center justify-between shadow-xs ${
        isDisabled
          ? 'opacity-50 cursor-not-allowed bg-stone-100 border-stone-200'
          : 'bg-white hover:bg-orange-50/50 border-stone-200 hover:border-[#FF6B00]/40 cursor-pointer active:scale-[0.99]'
      }`}
    >
      {/* Left: Icon & Room Name */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#3E2723] text-[#FF6B00] flex items-center justify-center shrink-0">
          <IconComponent className="w-5 h-5" />
        </div>
        
        <div>
          <h3 className="text-sm sm:text-base font-black text-[#3E2723] group-hover:text-[#FF6B00] transition-colors">
            {room.name}
          </h3>
        </div>
      </div>

      {/* Right: Member Count & Arrow */}
      <div className="flex items-center gap-2">
        {isDisabled ? (
          <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-stone-200 text-stone-600 flex items-center gap-1">
            <Lock className="w-3 h-3" /> Closed
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-stone-100 group-hover:bg-[#FF6B00] text-[#3E2723] group-hover:text-white text-xs font-black transition-colors font-mono">
              {onlineCount} {onlineCount === 1 ? 'member' : 'members'}
            </span>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#FF6B00] group-hover:translate-x-0.5 transition-all" />
          </div>
        )}
      </div>
    </div>
  );
};
