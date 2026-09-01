import React, { useState } from 'react';
import { 
  MessageSquare, 
  Home, 
  Users, 
  Newspaper, 
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
    { label: 'Community', path: '/community', icon: Users },
    { label: 'News', path: '/news', icon: Newspaper },
    { label: 'Games', path: '/games', icon: Gamepad2 },
    { label: 'Readers', path: '/readers', icon: BookOpen },
    { label: 'About', path: '/about', icon: Info },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            id="brand-logo"
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-rose-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-indigo-400 group-hover:text-cyan-300 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-lg tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-rose-400 bg-clip-text text-transparent">
                  PulseChat
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Public Realtime Community</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  id={`nav-link-${item.label.toLowerCase()}`}
                  onClick={() => handleNav(item.path)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* PRIMARY HIGHLIGHTED CHAT ROOMS LINK */}
            <button
              id="nav-link-chat-rooms"
              onClick={() => handleNav('/chat')}
              className={`ml-2 flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg ${
                currentPath.startsWith('/chat')
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white ring-2 ring-indigo-400/50 shadow-indigo-500/25'
                  : 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-indigo-600/30 hover:shadow-cyan-500/25 hover:scale-[1.02]'
              }`}
            >
              <MessageSquare className="w-4 h-4 animate-pulse" />
              <span>Chat Rooms</span>
              <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-white/20 rounded-full border border-white/20">
                {totalOnline}
              </span>
            </button>
          </nav>

          {/* Right Action Profile & Status */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Live indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs font-medium text-slate-300">
              <span className={`w-2 h-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'
              }`} />
              <span>{totalOnline} Online</span>
            </div>

            {/* User Profile button */}
            {user ? (
              <button
                id="user-profile-button"
                onClick={onOpenProfileModal}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition text-sm text-slate-200"
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shadow"
                  style={{ backgroundColor: user.avatarColor || '#6366f1' }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[100px] truncate font-medium">{user.name}</span>
                <span className="text-xs text-slate-400">({user.gender})</span>
              </button>
            ) : (
              <button
                id="enter-profile-button"
                onClick={onOpenProfileModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-cyan-300 transition"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Set Nickname</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-chat-cta"
              onClick={() => handleNav('/chat')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat ({totalOnline})</span>
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-900/95 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-3 duration-200">
          {/* User profile strip */}
          <div className="p-3 mb-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
            {user ? (
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow"
                  style={{ backgroundColor: user.avatarColor || '#6366f1' }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{user.name}</div>
                  <div className="text-xs text-slate-400">{user.age} yrs • {user.gender}</div>
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400">Guest Visitor</div>
            )}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfileModal();
              }}
              className="text-xs font-medium text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-1 rounded-lg"
            >
              {user ? 'Edit Profile' : 'Set Profile'}
            </button>
          </div>

          <button
            onClick={() => handleNav('/chat')}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold shadow-md"
          >
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5" />
              <span>Enter Chat Rooms</span>
            </div>
            <span className="bg-white/20 px-2.5 py-0.5 rounded-full text-xs font-bold">
              {totalOnline} online
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-800 text-cyan-400 font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 px-1">
            <button
              onClick={() => handleNav('/admin')}
              className="flex items-center gap-1.5 text-slate-400 hover:text-indigo-400"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>
            <span>Live Presence Enabled</span>
          </div>
        </div>
      )}
    </header>
  );
};
