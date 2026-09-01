import React from 'react';
import { 
  Home, 
  Users, 
  Newspaper, 
  Gamepad2, 
  BookOpen, 
  Info, 
  MessageSquare,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  iconName: 'Home' | 'Users' | 'Newspaper' | 'Gamepad2' | 'BookOpen' | 'Info' | 'MessageSquare';
  path: string;
  isPrimary?: boolean;
  badge?: string;
  onClick: (path: string) => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  iconName,
  path,
  isPrimary = false,
  badge,
  onClick
}) => {
  const getIcon = () => {
    switch (iconName) {
      case 'Home': return Home;
      case 'Users': return Users;
      case 'Newspaper': return Newspaper;
      case 'Gamepad2': return Gamepad2;
      case 'BookOpen': return BookOpen;
      case 'Info': return Info;
      case 'MessageSquare': return MessageSquare;
      default: return Sparkles;
    }
  };

  const IconComponent = getIcon();

  if (isPrimary) {
    return (
      <div
        id={`feature-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
        onClick={() => onClick(path)}
        className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-700 p-6 text-white shadow-xl shadow-indigo-900/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/20 ring-2 ring-cyan-400/40 col-span-1 md:col-span-2 lg:col-span-1"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <MessageSquare className="w-32 h-32" />
        </div>

        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner group-hover:scale-110 transition-transform">
                <IconComponent className="w-6 h-6 animate-pulse" />
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-cyan-400 text-slate-950 rounded-full uppercase tracking-wider shadow-sm">
                {badge || 'Primary Feature'}
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
              <span>{title}</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </h3>
            <p className="text-sm text-indigo-100/90 leading-relaxed">{description}</p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-cyan-200">
            <span>Enter 5 Live Rooms</span>
            <span className="underline underline-offset-4">Open Chat →</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`feature-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
      onClick={() => onClick(path)}
      className="group cursor-pointer rounded-2xl bg-slate-900/70 border border-slate-800 p-5 text-slate-200 shadow-md hover:border-slate-700 hover:bg-slate-850 transition-all duration-200 hover:-translate-y-0.5"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-colors">
          <IconComponent className="w-5 h-5" />
        </div>
        {badge && (
          <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-800 text-slate-400 rounded-md border border-slate-700">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-base font-bold text-white mb-1.5 flex items-center justify-between">
        <span>{title}</span>
        <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{description}</p>
    </div>
  );
};
