import React from 'react';
import { RoomGrid } from '../components/RoomGrid';
import { useChat } from '../context/ChatContext';
import { MessageSquare, ArrowLeft } from 'lucide-react';

interface RoomsPageProps {
  onSelectRoom: (roomId: string) => void;
  onBackHome: () => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onSelectRoom, onBackHome }) => {
  const { roomCounts } = useChat();
  const totalOnline = Object.values(roomCounts).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="w-full bg-white text-[#3E2723] flex-1 flex flex-col items-center animate-in fade-in duration-150">
      <div className="w-full max-w-lg mx-auto px-4 py-4 sm:py-6 space-y-4">
        
        {/* Top Simple Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <button
            onClick={onBackHome}
            className="flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-[#3E2723] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>

          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#FF6B00]" />
            <h1 className="text-base sm:text-lg font-black text-[#3E2723]">
              Chat Rooms
            </h1>
          </div>

          <div className="text-xs font-bold text-[#FF6B00] font-mono">
            {totalOnline || 23} online
          </div>
        </div>

        {/* Super Simple Room List with Room Name & Member Count */}
        <RoomGrid onSelectRoom={onSelectRoom} />

      </div>
    </div>
  );
};
