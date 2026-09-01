import React from 'react';
import { Info, Zap, Lock, Shield, Cpu, Layers, Server, MessageSquare, ExternalLink, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-[#FF6B00] text-xs font-bold border border-orange-200">
          <Info className="w-3.5 h-3.5" />
          <span>Platform & Developer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#3E2723] tracking-tight">
          About PulseChat
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          PulseChat is engineered for instantaneous communication without bloated registration friction, leveraging lightweight real-time architectures, zero-friction rooms, and privacy-first design.
        </p>
      </div>

      {/* Developer Profile Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#FF6B00]/20 to-transparent rounded-full blur-3xl -z-0 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src="https://i.postimg.cc/59zYT6rb/IMG-20260712-WA0020.jpg"
                alt="SharwaR Simon - Lead App Developer"
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#FF6B00] shadow-xl bg-stone-800"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-stone-900 rounded-full" title="Online & Available for Projects" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">SharwaR Simon</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/40 text-xs font-bold">
                  Lead App Developer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 font-medium mt-0.5">
                Full-Stack & Mobile-First Web Application Specialist
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Hire Worldwide
                </span>
              </div>
            </div>
          </div>

          <a
            href="https://www.fiverr.com/symon123"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#1dbf73] hover:bg-[#19a463] text-white text-xs sm:text-sm font-black transition flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 self-stretch sm:self-auto justify-center"
          >
            <span>Hire Me on Fiverr</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-stone-300">
          <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Code2 className="w-4 h-4 text-[#FF6B00]" />
              <span>Full-Stack & Real-Time Engineering</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Specialized in developing responsive, mobile-first web applications, WebSocket chat systems, custom dashboard architectures, and high-performance interactive experiences.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/60 border border-stone-700/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Client Satisfaction & Custom Builds</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Committed to delivering clean code, pixel-perfect user interfaces, rapid delivery, and complete post-launch support for client projects worldwide.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-2 pt-2 text-[11px] text-stone-400">
          <span className="font-semibold text-stone-300">Expertise:</span>
          {['React / TypeScript', 'Realtime WebSockets', 'Tailwind CSS', 'Mobile-First UI/UX', 'Node.js Full-Stack', 'API Integrations'].map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 border border-stone-700">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Tech Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF6B00] border border-orange-200 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#3E2723]">Low Latency Chat</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Persistent bidirectional protocols handle message broadcasting and presence indicators instantaneously.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#3E2723]">Zero-Database Portability</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Runs without heavy database infrastructure. Cross-tab synchronization and portable JSON backup support.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-xl bg-stone-100 text-[#3E2723] border border-stone-200 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#3E2723]">Automated Safety</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Real-time profanity masking, rapid 1-click reports, and client-side blocking keep conversations friendly.
          </p>
        </div>

      </div>

      {/* 5 Topic Channels */}
      <div className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4">
        <h3 className="text-base font-bold text-[#3E2723]">5 Dedicated Topic Rooms</h3>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <span className="font-bold text-[#3E2723] block">😂 Fun</span>
            <span className="text-[11px] text-stone-500">Memes & jokes</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <span className="font-bold text-[#3E2723] block">🎮 Game</span>
            <span className="text-[11px] text-stone-500">Gaming & co-op</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <span className="font-bold text-[#3E2723] block">❤️ Loves</span>
            <span className="text-[11px] text-stone-500">Dating & romance</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <span className="font-bold text-[#3E2723] block">☕ Friends</span>
            <span className="text-[11px] text-stone-500">Daily hangout</span>
          </div>
          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-center">
            <span className="font-bold text-[#3E2723] block">📚 Readers</span>
            <span className="text-[11px] text-stone-500">Books & literature</span>
          </div>
        </div>
      </div>

      {/* Admin and Entry Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-stone-100 border border-stone-200 text-xs text-stone-600">
        <div>
          <span>Want to explore all live chatrooms or moderate?</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/admin')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-stone-200 text-[#3E2723] font-bold border border-stone-300 transition"
          >
            Admin Panel
          </button>
          <button
            onClick={() => onNavigate('/chat')}
            className="px-4 py-2 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white font-bold transition shadow-xs"
          >
            Enter Chat Rooms
          </button>
        </div>
      </div>

    </div>
  );
};

