import React from 'react';
import { Users, Shield, Heart, Sparkles, MessageSquare, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { INITIAL_ROOMS } from '../data/rooms';

interface CommunityPageProps {
  onNavigate: (path: string) => void;
  onSelectRoom: (roomId: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate, onSelectRoom }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold border border-indigo-500/20">
          <Users className="w-3.5 h-3.5" />
          <span>Our Culture & Core Values</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          PulseChat Community Hub
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          We bring people together across 5 dedicated rooms to share humor, gaming strategies, personal advice, friendships, and literature.
        </p>
      </div>

      {/* 4 Pillars of Community */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">1</div>
          <h3 className="text-base font-bold text-white">Mutual Respect</h3>
          <p className="text-xs text-slate-400">Treat everyone with empathy regardless of background, gender, or experience level.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">2</div>
          <h3 className="text-base font-bold text-white">Zero Toxicity</h3>
          <p className="text-xs text-slate-400">Harassment, hate speech, spam, and personal attacks are strictly prohibited.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">3</div>
          <h3 className="text-base font-bold text-white">Privacy First</h3>
          <p className="text-xs text-slate-400">Never share your physical address, phone number, or financial details in public chat.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">4</div>
          <h3 className="text-base font-bold text-white">Active Moderation</h3>
          <p className="text-xs text-slate-400">Our safety systems filter profanity, rate limit messages, and empower instant user reporting.</p>
        </div>
      </div>

      {/* Active Channels Quick List */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">Public Topic Channels</h2>
          <p className="text-xs text-slate-400 mt-1">Jump directly into any of our 5 topic channels:</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {INITIAL_ROOMS.map(room => (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room.id)}
              className="p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-left transition flex items-center justify-between group"
            >
              <div>
                <div className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  #{room.name}
                </div>
                <div className="text-xs text-slate-400 truncate max-w-[180px]">
                  {room.description}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* Safety Pledge CTA */}
      <div className="text-center bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 border border-indigo-900/50 p-8 rounded-3xl space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready to join the discussion?</h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Enter any room in seconds with our anonymous nickname session system.
        </p>
        <button
          onClick={() => onNavigate('/chat')}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold text-xs shadow-lg transition hover:scale-105"
        >
          Enter Live Chat Rooms
        </button>
      </div>

    </div>
  );
};
