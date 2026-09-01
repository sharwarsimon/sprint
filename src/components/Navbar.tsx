import React, { useState } from 'react';
import { 
  MessageSquare, 
  Home, 
  Users, 
  Newspaper, 
  ShoppingBag,
  Gamepad2, 
  BookOpen, 
  Info, 
  ShieldAlert, 
  Menu, 
  X, 
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useUser } from '../context/UserContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenProfileModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenProfileModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { roomCounts, connectionStatus } = useChat();
  const { user } = useUser();

  const totalOnline = Object.values(roomCounts).reduce((a: number, b: number) => a + b, 0);

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Chat Rooms', path: '/chat', icon: MessageSquare },
    { label: 'Community', path: '/community', icon: Users },
    { label: 'News', path: '/news', icon: Newspaper },
    { label: 'About', path: '/about', icon: Info },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 text-[#3E2723] shadow-xs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          
          {/* Brand Logo - Mobile App Header Brand */}
          <div 
            id="brand-logo"
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm transition-transform group-hover:scale-105">
              <MessageSquare className="w-5 h-5 fill-[#FF6B00]/20" />
            </div>
            <div>
              <div className="flex items-center gap-1 font-black text-base sm:text-lg tracking-tight text-[#3E2723]">
                <span>PulseChat</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
              </div>
              <p className="text-[10px] text-stone-500 font-medium hidden sm:block">Realtime Mobile Chat</p>
            </div>
          </div>

          {/* Center / Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNav(item.path)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition ${
                    isActive
                      ? 'bg-orange-50 text-[#FF6B00] border border-orange-200'
                      : 'text-stone-600 hover:text-[#3E2723] hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Presence & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Count Pill */}
            <div 
              onClick={() => handleNav('/chat')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs font-bold text-[#FF6B00] cursor-pointer hover:bg-orange-100 transition"
              title="Active members online"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span>{totalOnline || 23} Live</span>
            </div>

            {/* Profile Avatar / Setup */}
            {user ? (
              <button
                id="user-profile-button"
                onClick={onOpenProfileModal}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-xs font-bold text-[#3E2723] transition"
              >
                <div 
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-xs"
                  style={{ backgroundColor: user.avatarColor || '#FF6B00' }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[70px] sm:max-w-[90px] truncate">{user.name}</span>
              </button>
            ) : (
              <button
                id="enter-profile-button"
                onClick={onOpenProfileModal}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white text-xs font-bold transition shadow-xs"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span className="hidden sm:inline">Set Profile</span>
                <span className="sm:hidden">Join</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-[#3E2723] hover:bg-stone-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNav('/chat')}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#3E2723] text-white text-sm font-bold shadow-xs"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-4 h-4 text-[#FF6B00]" />
              <span>Enter 5 Chat Rooms</span>
            </div>
            <span className="bg-[#FF6B00] px-2 py-0.5 rounded-full text-xs font-bold text-white">
              {totalOnline || 23} online
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? 'bg-orange-50 text-[#FF6B00] border border-orange-200'
                      : 'text-stone-700 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#3E2723]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <button
              onClick={() => handleNav('/admin')}
              className="flex items-center gap-1 text-stone-600 hover:text-[#FF6B00] font-medium"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Center</span>
            </button>
            <span className="text-[11px] font-mono text-stone-400">Mobile Edition</span>
          </div>
        </div>
      )}
    </header>
  );
};

