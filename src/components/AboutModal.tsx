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
          {/* Developer Card (SharwaR Simon) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-white border border-stone-800 shadow-md space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="relative shrink-0">
                  <img
                    src="https://i.postimg.cc/59zYT6rb/IMG-20260712-WA0020.jpg"
                    alt="SharwaR Simon - Lead App Developer"
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#FF6B00] shadow-md bg-stone-800"
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-stone-900 rounded-full" title="Online & Available" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-white">SharwaR Simon</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      App Developer
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 font-medium">Full-Stack & Real-Time App Specialist</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Crafting fast, clean, and interactive mobile-first web applications with modern architectures, real-time protocols, and seamless user experiences.
            </p>

            <div className="pt-2.5 border-t border-stone-800 flex items-center justify-between gap-3">
              <span className="text-[11px] text-stone-400">Available for hire & custom builds:</span>
              <a
                href="https://www.fiverr.com/symon123"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white text-xs font-black transition flex items-center gap-1.5 shadow-sm"
              >
                <span>Hire on Fiverr</span>
                <span className="text-[10px] font-mono">↗</span>
              </a>
            </div>
          </div>

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
