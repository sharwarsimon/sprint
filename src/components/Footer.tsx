import React from 'react';
import { MessageSquare, Home, Users, Newspaper, Info, Shield, UserCheck } from 'lucide-react';
import { useChat } from '../context/ChatContext';

interface FooterProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPath = '/', onNavigate }) => {
  const { roomCounts } = useChat();
  const totalOnline = Object.values(roomCounts).reduce((a: number, b: number) => a + b, 0) || 23;

  const tabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Chat', path: '/chat', icon: MessageSquare, badge: `${totalOnline}` },
    { label: 'Live', path: '/members', icon: UserCheck },
    { label: 'Community', path: '/community', icon: Users },
    { label: 'News', path: '/news', icon: Newspaper },
  ];

  return (
    <>
      {/* Mobile App Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 py-1.5 px-3 sm:hidden shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentPath === tab.path || (tab.path === '/chat' && currentPath.startsWith('/chat'));
            return (
              <button
                key={tab.path}
                onClick={() => onNavigate(tab.path)}
                className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                  isActive
                    ? 'text-[#FF6B00]'
                    : 'text-stone-500 hover:text-[#3E2723]'
                }`}
              >
                {tab.badge && (
                  <span className="absolute -top-0.5 right-1 px-1.5 py-0.2 rounded-full text-[8px] font-black bg-[#FF6B00] text-white shadow-xs">
                    {tab.badge}
                  </span>
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                <span className="text-[10px] font-bold mt-0.5">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop / Global App Footer */}
      <footer className="w-full bg-white border-t border-stone-200 text-stone-600 py-6 mb-12 sm:mb-0 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            
            {/* Brand Status */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#3E2723] flex items-center justify-center text-[#FF6B00]">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-bold text-[#3E2723]">PulseChat</span>
                <span className="text-xs text-stone-400 block sm:inline sm:ml-2">Clean Realtime Social</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-semibold text-stone-600">
              <button onClick={() => onNavigate('/')} className="hover:text-[#FF6B00] transition">Home</button>
              <button onClick={() => onNavigate('/chat')} className="hover:text-[#FF6B00] transition text-[#FF6B00]">5 Chat Rooms</button>
              <button onClick={() => onNavigate('/members')} className="hover:text-[#FF6B00] transition">Live Members ({totalOnline})</button>
              <button onClick={() => onNavigate('/music')} className="hover:text-[#FF6B00] transition">Music</button>
              <button onClick={() => onNavigate('/video')} className="hover:text-[#FF6B00] transition">Video</button>
              <button onClick={() => onNavigate('/community')} className="hover:text-[#FF6B00] transition">Community</button>
              <button onClick={() => onNavigate('/news')} className="hover:text-[#FF6B00] transition">News</button>
              <button onClick={() => onNavigate('/about')} className="hover:text-[#FF6B00] transition">About</button>
              <button onClick={() => onNavigate('/admin')} className="text-stone-400 hover:text-[#3E2723] transition flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Admin</span>
              </button>
            </div>

          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
            <span>© {new Date().getFullYear()} PulseChat. Mobile-First Realtime Chat.</span>
            <div className="flex items-center gap-1.5 text-stone-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Zero-Database Portable Storage</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
