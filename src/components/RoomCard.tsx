import React from 'react';
import { 
  Smile, 
  Gamepad2, 
  Heart, 
  Users, 
  BookOpen, 
  ArrowRight, 
  Lock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { ChatRoomInfo } from '../types';

interface RoomCardProps {
  room: ChatRoomInfo;
  onlineCount: number;
  isDisabled?: boolean;
  onSelect: (roomId: string) => void;
  featured?: boolean;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onlineCount,
  isDisabled = false,
  onSelect,
  featured = false
}) => {
  const getIcon = () => {
    switch (room.id) {
      case 'fun': return Smile;
      case 'game': return Gamepad2;
      case 'loves': return Heart;
      case 'friends': return Users;
      case 'readers': return BookOpen;
      default: return Sparkles;
    }
  };

  const IconComponent = getIcon();

  const getBadgeStyle = () => {
    switch (room.id) {
      case 'fun':
        return 'from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-500/30';
      case 'game':
        return 'from-indigo-500/20 to-purple-500/10 text-indigo-300 border-indigo-500/30';
      case 'loves':
        return 'from-rose-500/20 to-pink-500/10 text-rose-300 border-rose-500/30';
      case 'friends':
        return 'from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-500/30';
      case 'readers':
        return 'from-sky-500/20 to-blue-500/10 text-sky-300 border-sky-500/30';
      default:
        return 'from-slate-700 to-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getAccentGradient = () => {
    switch (room.id) {
      case 'fun': return 'hover:border-amber-500/50 hover:shadow-amber-500/10';
      case 'game': return 'hover:border-indigo-500/50 hover:shadow-indigo-500/10';
      case 'loves': return 'hover:border-rose-500/50 hover:shadow-rose-500/10';
      case 'friends': return 'hover:border-emerald-500/50 hover:shadow-emerald-500/10';
      case 'readers': return 'hover:border-sky-500/50 hover:shadow-sky-500/10';
      default: return 'hover:border-slate-700';
    }
  };

  return (
    <div
      id={`room-card-${room.id}`}
      onClick={() => !isDisabled && onSelect(room.id)}
      className={`group relative overflow-hidden rounded-2xl bg-slate-900/80 border border-slate-800 p-6 transition-all duration-300 ${
        isDisabled 
          ? 'opacity-60 cursor-not-allowed' 
          : `cursor-pointer hover:-translate-y-1 shadow-lg hover:shadow-xl ${getAccentGradient()}`
      }`}
    >
      {/* Top row: Icon & Live Count */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getBadgeStyle()} border flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
          <IconComponent className="w-6 h-6" />
        </div>

        {/* Member count formatting explicitly requested: Fun (3), Game (0), etc. */}
        <div className="flex items-center gap-2">
          {isDisabled ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800/60 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Closed
            </span>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 shadow-sm">
              <span className={`w-2 h-2 rounded-full ${onlineCount > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>{onlineCount} Online</span>
            </div>
          )}
        </div>
      </div>

      {/* Room Title with Parenthesized Count (e.g. Fun (3)) */}
      <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between group-hover:text-cyan-300 transition-colors">
        <span>
          {room.name} <span className="text-indigo-400 font-mono">({onlineCount})</span>
        </span>
        {!isDisabled && (
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all" />
        )}
      </h3>

      {/* Description & Topic */}
      <p className="text-sm text-slate-300 font-medium mb-2">{room.description}</p>
      <p className="text-xs text-slate-500 line-clamp-2">{room.topic}</p>

      {/* Footer Tag */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>Public Room</span>
        </span>
        <span className="text-indigo-400 font-semibold group-hover:underline">
          {isDisabled ? 'Currently Disabled' : 'Join Chat →'}
        </span>
      </div>
    </div>
  );
};
