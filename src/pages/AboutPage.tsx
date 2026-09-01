import React from 'react';
import { Info, Zap, Lock, Shield, Cpu, Layers, Server, MessageSquare } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <Info className="w-3.5 h-3.5" />
          <span>Platform Overview</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About PulseChat Architecture
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          PulseChat is engineered for instantaneous communication without bloated registration friction, leveraging bidirectional real-time protocols and ephemeral privacy.
        </p>
      </div>

      {/* Tech Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Full-Duplex WebSockets</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Persistent bidirectional TCP connections handle message broadcasting, typing states, and presence heartbeats in sub-50 milliseconds.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Privacy by Design</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            No email or password databases to compromise. User ages and private data are kept strictly local to the client runtime.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Automated Moderation</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Profanity filtering, XSS attack sanitation, token-bucket rate limiting, and real-time report queues protect the community 24/7.
          </p>
        </div>

      </div>

      {/* System Flow Diagram / Explainer */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white">How Realtime Rooms Work</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <span className="font-bold text-cyan-400 block text-sm">Step 1: Session Init</span>
            <p className="text-slate-400">User inputs a name and gender. A unique client session token is created in local storage.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <span className="font-bold text-indigo-400 block text-sm">Step 2: Channel Sub</span>
            <p className="text-slate-400">When entering a room, the WebSocket joins that topic channel and broadcasts member count increments.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <span className="font-bold text-emerald-400 block text-sm">Step 3: Instant Chat</span>
            <p className="text-slate-400">Messages are validated, filtered, and broadcast to all room subscribers immediately.</p>
          </div>
        </div>
      </div>

      {/* Admin and Entry Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400">
        <div>
          <span>Want to explore moderation metrics or room stats?</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 transition"
          >
            Admin Panel
          </button>
          <button
            onClick={() => onNavigate('/chat')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition"
          >
            Open Chat
          </button>
        </div>
      </div>

    </div>
  );
};
