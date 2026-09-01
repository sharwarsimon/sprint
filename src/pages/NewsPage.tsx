import React from 'react';
import { Newspaper, Bell, Sparkles, Zap, MessageSquare, ArrowRight, Shield } from 'lucide-react';

interface NewsPageProps {
  onNavigate: (path: string) => void;
  onSelectRoom: (roomId: string) => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate, onSelectRoom }) => {
  const articles = [
    {
      id: 'news-1',
      title: 'PulseChat 2.0 Live Presence Engine Launched',
      date: 'Today',
      category: 'Platform Update',
      summary: 'Our brand new WebSockets presence architecture provides real-time active user tracking across all 5 public rooms with sub-50ms latency.',
      badge: 'Major Release',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
    },
    {
      id: 'news-2',
      title: 'Weekend Community Trivia Night in #Game',
      date: 'Yesterday',
      category: 'Community Event',
      summary: 'Join fellow gamers this Friday in the #Game room for real-time video game trivia and co-op matchmaking sessions.',
      badge: 'Community',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    },
    {
      id: 'news-3',
      title: 'Enhanced Anti-Spam & Moderation Systems Deployed',
      date: '3 days ago',
      category: 'Safety',
      summary: 'We have updated our server-side rate limiters, HTML escape guards, and profanity masking to keep all chat channels welcoming and safe.',
      badge: 'Security',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Newspaper className="w-4 h-4" />
            <span>Community Bulletins</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            News & Platform Updates
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official announcements, feature release notes, and community highlights.
          </p>
        </div>

        <button
          onClick={() => onNavigate('/chat')}
          className="self-start sm:self-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition flex items-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Go to Chat Rooms</span>
        </button>
      </div>

      {/* News Articles Feed */}
      <div className="space-y-4">
        {articles.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${item.badgeColor}`}>
                {item.badge}
              </span>
              <span className="text-xs text-slate-500">{item.date}</span>
            </div>

            <h3 className="text-lg font-bold text-white hover:text-cyan-300 transition-colors">
              {item.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {item.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Community Tip */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
        <span>Want to suggest a feature or report a bug? Hop into the #Friends room and chat with us!</span>
        <button
          onClick={() => onSelectRoom('friends')}
          className="text-cyan-400 font-bold hover:underline ml-4 whitespace-nowrap"
        >
          Join #Friends →
        </button>
      </div>

    </div>
  );
};
