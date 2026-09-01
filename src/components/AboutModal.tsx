import React from 'react';
import { X, Info, ShieldCheck, Zap, Lock, Code2, Heart, MessageSquare } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3E2723]">About PulseChat</h2>
              <p className="text-xs text-stone-500">Fast, clean & friendly real-time chat</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-[#3E2723] hover:bg-stone-200 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-100 space-y-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#3E2723]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
              <span>Zero-Friction Anonymous Social Space</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              PulseChat is built for immediate real-time human connection. No email logins, no tracking passwords, and zero friction. Choose a nickname, pick a room, and converse freely.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3E2723]">
                <Zap className="w-4 h-4 text-[#FF6B00]" />
                <span>Low Latency</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Bidirectional WebSockets with reactive fallback for instant message delivery.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3E2723]">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Privacy First</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Your age stays private; only display names and custom colors are shared.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3E2723]">
                <ShieldCheck className="w-4 h-4 text-[#3E2723]" />
                <span>Auto-Moderated</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Built-in profanity masking, user blocking, and fast 1-click reporting.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3E2723]">
                <Code2 className="w-4 h-4 text-[#FF6B00]" />
                <span>Universal Storage</span>
              </div>
              <p className="text-[11px] text-stone-500">
                Works seamlessly on GitHub, Vercel, Node, and offline local cache.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-stone-200 text-xs text-stone-500 space-y-1">
            <span className="font-bold text-[#3E2723] block">5 Live Rooms:</span>
            <p>• <strong>Fun:</strong> Jokes, casual laughs & memes</p>
            <p>• <strong>Game:</strong> Video games, strategy & co-op teams</p>
            <p>• <strong>Loves:</strong> Romance, relationships & warm advice</p>
            <p>• <strong>Friends:</strong> Making new buddies & daily lifestyle</p>
            <p>• <strong>Readers:</strong> Book reviews, literature & reading lists</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">Version 2.0.0 (Clean Brand)</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white text-xs font-bold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
