import React from 'react';
import { Hero } from '../components/Hero';
import { FeatureCard } from '../components/FeatureCard';
import { RoomGrid } from '../components/RoomGrid';
import { useChat } from '../context/ChatContext';
import { ShieldCheck, MessageCircle, Zap, HeartHandshake } from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectRoom: (roomId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectRoom }) => {
  const { roomCounts } = useChat();

  const totalOnline = Object.values(roomCounts).reduce((a: number, b: number) => a + b, 0);

  return (
    <div className="w-full space-y-12 sm:space-y-16 pb-16">
      
      {/* 1. Hero Section */}
      <Hero onEnterChat={() => onNavigate('/chat')} />

      {/* 2. 5 Live Chat Rooms Section with Real-Time Counters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <MessageCircle className="w-4 h-4" />
              <span>Realtime Public Channels</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              5 Live Topic Chat Rooms
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Jump into any conversation. Member numbers update live with real active connections.
            </p>
          </div>

          <button
            id="view-all-rooms-btn"
            onClick={() => onNavigate('/chat')}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View Dedicated Room Hub →</span>
          </button>
        </div>

        <RoomGrid onSelectRoom={onSelectRoom} />
      </div>

      {/* 3. 7 Main Feature & Navigation Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Explore Features & Community Hubs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Navigate through our dedicated portals and real-time social tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* PRIMARY HIGHLIGHTED CHAT ROOMS CARD */}
          <FeatureCard
            title="Chat Rooms"
            description="Our primary real-time messaging hub. Join 5 public rooms with instant live presence and zero wait time."
            iconName="MessageSquare"
            path="/chat"
            isPrimary={true}
            badge={`${totalOnline} Active Online`}
            onClick={onNavigate}
          />

          {/* 1. Home */}
          <FeatureCard
            title="Home"
            description="The central landing hub with live presence highlights and real-time community rooms."
            iconName="Home"
            path="/"
            badge="Portal"
            onClick={onNavigate}
          />

          {/* 2. Community */}
          <FeatureCard
            title="Community"
            description="Discover community guidelines, member spotlights, and active chat discussion highlights."
            iconName="Users"
            path="/community"
            badge="Social"
            onClick={onNavigate}
          />

          {/* 3. News */}
          <FeatureCard
            title="News"
            description="Stay updated with platform announcements, community bulletins, and event schedules."
            iconName="Newspaper"
            path="/news"
            badge="Updates"
            onClick={onNavigate}
          />

          {/* 4. Games */}
          <FeatureCard
            title="Games"
            description="Connect with gamers, discuss latest titles, and find multiplayer co-op teammates."
            iconName="Gamepad2"
            path="/games"
            badge="Gaming"
            onClick={onNavigate}
          />

          {/* 5. Readers */}
          <FeatureCard
            title="Readers"
            description="Book club discussions, literary recommendations, quote sharing, and reader stories."
            iconName="BookOpen"
            path="/readers"
            badge="Books"
            onClick={onNavigate}
          />

          {/* 6. About */}
          <FeatureCard
            title="About"
            description="Learn how PulseChat works under the hood with low-latency WebSockets and zero-tracking privacy."
            iconName="Info"
            path="/about"
            badge="System"
            onClick={onNavigate}
          />

        </div>
      </div>

      {/* 4. Community Safety & Privacy Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Safe & Friendly Atmosphere</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Built for open, genuine conversations</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              We enforce automated profanity filtering, rate limiting, and 24/7 moderation reporting to ensure all 5 rooms remain safe for everyone.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/community')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition"
            >
              Read Guidelines
            </button>
            <button
              onClick={() => onNavigate('/chat')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-900/40 transition"
            >
              Start Chatting
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
