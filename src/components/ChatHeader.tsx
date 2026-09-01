import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Smile, 
  Gamepad2, 
  Heart, 
  Users, 
  BookOpen, 
  ChevronDown, 
  Info, 
  UserCheck, 
  Sparkles,
  ShieldCheck
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
  onToggleUsersDrawer,
  isUsersDrawerOpen
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showRules, setShowRules] = useState(false);

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
    <div className="relative z-30 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 sm:px-6 py-3 transition-colors">
      <div className="flex items-center justify-between gap-2 max-w-7xl mx-auto">
        
        {/* Left: Back button & Room Title */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="chat-back-button"
            onClick={onBack}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition flex items-center gap-1 text-xs font-semibold"
            aria-label="Back to rooms"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Rooms</span>
          </button>

          {/* Room Title & Switcher Trigger */}
          <div className="relative">
            <button
              id="room-switcher-button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 transition text-left group"
            >
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                <IconComponent className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1 text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  <span>{currentRoom.name}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </div>
                <div className="text-[10px] text-slate-400 hidden sm:block max-w-[150px] truncate">
                  {currentRoom.topic}
                </div>
              </div>
            </button>

            {/* Room Switcher Dropdown */}
            {dropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setDropdownOpen(false)} 
                />
                <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Chat Room
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
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition ${
                          isCurrent
                            ? 'bg-indigo-600/30 text-cyan-300 border border-indigo-500/30'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <RIcon className="w-4 h-4" />
                          <span>{r.name}</span>
                        </div>
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right: Realtime Online Counter & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Realtime Active Member Badge */}
          <div 
            id="chat-online-counter"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-bold text-slate-200 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{onlineCount} Online</span>
          </div>

          {/* Room info / rules modal toggle */}
          <button
            id="room-info-button"
            onClick={() => setShowRules(!showRules)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
            title="Room guidelines"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Active users drawer button */}
          <button
            id="toggle-users-drawer-button"
            onClick={onToggleUsersDrawer}
            className={`p-2 rounded-xl transition flex items-center gap-1.5 text-xs font-medium ${
              isUsersDrawerOpen
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
            title="Active Members"
          >
            <UserCheck className="w-4 h-4" />
            <span className="hidden md:inline">Members</span>
          </button>

        </div>
      </div>

      {/* Guidelines Accordion Drawer */}
      {showRules && (
        <div className="mt-3 pt-3 border-t border-slate-800 max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Room Topic: {currentRoom.topic}</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>• No abusive words</span>
            <span>• Keep spam away</span>
            <span>• Respect everyone</span>
            <button
              onClick={() => setShowRules(false)}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
