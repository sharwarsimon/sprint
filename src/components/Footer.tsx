import React from 'react';
import { MessageSquare, Shield, Heart, Sparkles, Lock, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                PulseChat Community
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              A high-performance, mobile-first real-time community chat platform. Join instant rooms without sign-up passwords, connect with real members, and have meaningful conversations.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-cyan-400" /> Ultra-low Latency</span>
              <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-emerald-400" /> Privacy First</span>
              <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-indigo-400" /> Moderated</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">5 Live Rooms</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('/chat/fun')} className="hover:text-cyan-400 transition">💬 Fun Room</button>
              </li>
              <li>
                <button onClick={() => onNavigate('/chat/game')} className="hover:text-indigo-400 transition">🎮 Game Room</button>
              </li>
              <li>
                <button onClick={() => onNavigate('/chat/loves')} className="hover:text-rose-400 transition">❤️ Loves Room</button>
              </li>
              <li>
                <button onClick={() => onNavigate('/chat/friends')} className="hover:text-emerald-400 transition">👥 Friends Room</button>
              </li>
              <li>
                <button onClick={() => onNavigate('/chat/readers')} className="hover:text-sky-400 transition">📚 Readers Room</button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">Navigation & Safety</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('/community')} className="hover:text-slate-200 transition">Community Guidelines</button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-slate-200 transition">About Architecture</button>
              </li>
              <li>
                <button onClick={() => onNavigate('/news')} className="hover:text-slate-200 transition">Community News</button>
              </li>
              <li>
                <button onClick={() => onNavigate('/admin')} className="text-slate-500 hover:text-indigo-400 transition flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PulseChat. Realtime Social Platform. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with modern WebSockets & Reactive State</span>
            <span>•</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Live Presence
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
