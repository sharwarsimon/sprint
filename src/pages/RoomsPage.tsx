import React from 'react';
import { RoomGrid } from '../components/RoomGrid';
import { useChat } from '../context/ChatContext';
import { MessageSquare, Users, Sparkles, Shield, ArrowLeft } from 'lucide-react';

interface RoomsPageProps {
  onSelectRoom: (roomId: string) => void;
  onBackHome: () => void;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ onSelectRoom, onBackHome }) => {
  const { roomCounts, connectionStatus } = useChat();
  const totalOnline = Object.values(roomCounts).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <button
            onClick={onBackHome}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Chat Rooms
              </h1>
              <p className="text-sm text-slate-400">
                Choose a room below to start chatting instantly in real time.
              </p>
            </div>
          </div>
        </div>

        {/* Realtime stats card */}
        <div className="flex items-center gap-3 self-start md:self-auto bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2.5 shadow-lg">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">Live Network</div>
              <div className="text-xs text-slate-400">{totalOnline} Members Active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Room Cards Grid */}
      <RoomGrid 
        onSelectRoom={onSelectRoom}
        title="Active Public Channels"
        subtitle="Select any channel to enter. Switch between channels anytime without losing your nickname."
      />

      {/* Helper FAQ / Etiquette */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
          <span className="font-bold text-cyan-400 block mb-1">⚡ Zero Wait Time</span>
          <p className="text-slate-400">No passwords or verification emails required. Simply enter a display name and join the chat.</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
          <span className="font-bold text-indigo-400 block mb-1">🔄 Instant Room Switching</span>
          <p className="text-slate-400">Jump between Fun, Game, Loves, Friends, and Readers seamlessly from the top navigation bar.</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
          <span className="font-bold text-rose-400 block mb-1">🛡️ Protected Environment</span>
          <p className="text-slate-400">Built-in profanity masking, local user blocking, and instant report actions keep conversations friendly.</p>
        </div>
      </div>

    </div>
  );
};
