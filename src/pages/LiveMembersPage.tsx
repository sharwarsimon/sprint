import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  ArrowLeft, 
  Smile, 
  Gamepad2, 
  Heart, 
  BookOpen, 
  MessageSquare, 
  UserCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { LocalDB } from '../lib/storage';
import { UserProfile } from '../types';

interface LiveMembersPageProps {
  onBack: () => void;
  onSelectRoom: (roomId: string) => void;
}

export const LiveMembersPage: React.FC<LiveMembersPageProps> = ({ onBack, onSelectRoom }) => {
  const { roomCounts } = useChat();
  const [selectedRoomFilter, setSelectedRoomFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [liveMembers, setLiveMembers] = useState<Array<UserProfile & { room: string; roomName: string }>>([]);

  useEffect(() => {
    // Fetch live members list directly from file / local data
    const list = LocalDB.getAllLiveMembersList();
    setLiveMembers(list);
  }, []);

  const totalOnline = Object.values(roomCounts).reduce((a: number, b: number) => a + b, 0) || liveMembers.length;

  const roomOptions = [
    { id: 'all', name: 'All Rooms', count: totalOnline },
    { id: 'fun', name: 'Fun', count: roomCounts['fun'] || 3 },
    { id: 'game', name: 'Game', count: roomCounts['game'] || 5 },
    { id: 'loves', name: 'Loves', count: roomCounts['loves'] || 4 },
    { id: 'friends', name: 'Friends', count: roomCounts['friends'] || 8 },
    { id: 'readers', name: 'Readers', count: roomCounts['readers'] || 3 },
  ];

  const getRoomIcon = (roomId: string) => {
    switch (roomId) {
      case 'fun': return Smile;
      case 'game': return Gamepad2;
      case 'loves': return Heart;
      case 'friends': return Users;
      case 'readers': return BookOpen;
      default: return MessageSquare;
    }
  };

  // Filtered members list
  const filteredMembers = liveMembers.filter((member) => {
    const matchesRoom = selectedRoomFilter === 'all' || member.room === selectedRoomFilter;
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRoom && matchesSearch;
  });

  return (
    <div className="w-full bg-white text-[#3E2723] flex-1 flex flex-col items-center animate-in fade-in duration-150">
      <div className="w-full max-w-2xl mx-auto px-4 py-4 sm:py-6 space-y-4">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-bold text-stone-500 hover:text-[#3E2723] transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <h1 className="text-base sm:text-lg font-black text-[#3E2723]">
              Live Members ({totalOnline})
            </h1>
          </div>

          <div className="w-12 text-right">
            {/* Spacer for symmetry */}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search live members by name..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm text-[#3E2723] placeholder-stone-400 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]"
          />
        </div>

        {/* Room Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {roomOptions.map((room) => {
            const isSelected = selectedRoomFilter === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setSelectedRoomFilter(room.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#3E2723] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>{room.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected ? 'bg-[#FF6B00] text-white' : 'bg-stone-200 text-stone-700'
                }`}>
                  {room.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Members List */}
        <div className="space-y-2 pt-1">
          {filteredMembers.length === 0 ? (
            <div className="text-center py-12 rounded-2xl bg-stone-50 border border-stone-200">
              <Users className="w-8 h-8 text-stone-400 mx-auto mb-2 opacity-60" />
              <p className="text-sm font-bold text-stone-600">No members found</p>
              <p className="text-xs text-stone-400 mt-0.5">Try searching with a different name or room.</p>
            </div>
          ) : (
            filteredMembers.map((member) => {
              const RoomIcon = getRoomIcon(member.room);
              return (
                <div
                  key={`${member.room}-${member.userId}`}
                  className="p-3 sm:p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between hover:border-stone-300 hover:bg-orange-50/30 transition shadow-xs"
                >
                  {/* Left: Avatar & Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black text-white shadow-xs"
                        style={{ backgroundColor: member.avatarColor || '#3E2723' }}
                      >
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>

                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#3E2723] truncate">
                          {member.name}
                        </span>
                        <span className="text-[10px] font-semibold text-stone-400 px-1.5 py-0.2 rounded bg-stone-200">
                          {member.gender}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-stone-500 font-medium mt-0.5">
                        <RoomIcon className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span>In {member.roomName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Join Room Action */}
                  <button
                    onClick={() => onSelectRoom(member.room)}
                    className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#3E2723] text-[#3E2723] hover:text-white border border-stone-200 text-xs font-bold transition flex items-center gap-1 shrink-0 shadow-xs group"
                  >
                    <span>Join Room</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#FF6B00] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
