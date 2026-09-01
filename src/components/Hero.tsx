import React from 'react';
import { MessageSquare, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useChat } from '../context/ChatContext';

interface HeroProps {
  onEnterChat: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnterChat }) => {
  const { roomCounts } = useChat();
  const totalOnline = Object.values(roomCounts).reduce((a: number, b: number) => a + b, 0);

  return (
    <section className="relative overflow-hidden pt-10 pb-12 sm:pt-16 sm:pb-20 text-center">
      {/* Background glow orb accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[600px] h-96 sm:h-[400px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-rose-500/15 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Live presence pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-800/90 border border-indigo-500/30 text-xs font-semibold text-indigo-300 mb-6 shadow-lg shadow-indigo-950/40">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>{totalOnline} active members connected right now</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Connect.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-rose-400 bg-clip-text text-transparent">
            Talk.
          </span>{' '}
          Have Fun.
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Join our vibrant community and meet real people in real-time. Hop into public topic rooms instantly without requiring permanent email registrations.
        </p>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="hero-enter-chat-cta"
            onClick={onEnterChat}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-base sm:text-lg shadow-xl shadow-indigo-600/30 hover:shadow-cyan-500/25 transition-all duration-200 flex items-center justify-center gap-3 group active:scale-98"
          >
            <MessageSquare className="w-5 h-5 text-indigo-100 group-hover:rotate-6 transition-transform" />
            <span>Enter Chat Rooms</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-12 pt-8 border-t border-slate-800/80 max-w-2xl mx-auto text-left">
          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
              <Zap className="w-4 h-4" />
              <span>Instant Access</span>
            </div>
            <p className="text-xs text-slate-400">Quick name & gender profile to jump right in</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold mb-1">
              <MessageSquare className="w-4 h-4" />
              <span>5 Topic Rooms</span>
            </div>
            <p className="text-xs text-slate-400">Fun, Game, Loves, Friends, Readers</p>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Safe & Moderated</span>
            </div>
            <p className="text-xs text-slate-400">Profanity filter, anti-spam & user reporting</p>
          </div>
        </div>

      </div>
    </section>
  );
};
