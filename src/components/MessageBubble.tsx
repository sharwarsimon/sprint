import React, { useState } from 'react';
import { MoreVertical, Flag, ShieldOff, Check, CheckCheck } from 'lucide-react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
  isCurrentUser: boolean;
  onReport: (messageId: string) => void;
  onBlockUser: (userId: string, userName: string) => void;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  onReport,
  onBlockUser
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Format time (e.g., 8:32 PM)
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    } catch {
      return '';
    }
  };

  // System message render
  if (message.isSystem) {
    return (
      <div className="flex justify-center my-3">
        <div className="px-3.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/50 text-[11px] font-medium text-slate-400 max-w-md text-center shadow-sm">
          {message.message}
        </div>
      </div>
    );
  }

  const timeString = formatTime(message.createdAt);

  const getGenderBadge = (gender?: string) => {
    if (!gender) return null;
    if (gender === 'Male') return <span className="text-[10px] text-cyan-400 font-mono">👦</span>;
    if (gender === 'Female') return <span className="text-[10px] text-pink-400 font-mono">👧</span>;
    return <span className="text-[10px] text-indigo-300 font-mono">✨</span>;
  };

  return (
    <div
      id={`message-${message.id}`}
      className={`group flex items-end gap-2 my-2.5 max-w-full ${
        isCurrentUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Left Avatar for other users */}
      {!isCurrentUser && (
        <div
          className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold text-white shadow-md select-none mb-1"
          style={{ backgroundColor: message.userColor || '#6366f1' }}
          title={message.userName}
        >
          {message.userName.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Message content container */}
      <div className={`relative max-w-[85%] sm:max-w-[70%] flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        
        {/* User metadata header (for other users) */}
        {!isCurrentUser && (
          <div className="flex items-center gap-1.5 px-1 mb-1 text-xs">
            <span className="font-bold text-slate-200">{message.userName}</span>
            {getGenderBadge(message.userGender)}
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`relative px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-md transition-all ${
            isCurrentUser
              ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-br-none shadow-indigo-900/30'
              : 'bg-slate-800/90 text-slate-100 border border-slate-700/80 rounded-bl-none shadow-slate-950/40'
          }`}
        >
          {/* Message Text with Safe Wrapping */}
          <p className="whitespace-pre-wrap font-normal select-text">{message.message}</p>

          {/* Timestamp footer */}
          <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] select-none ${
            isCurrentUser ? 'text-indigo-200' : 'text-slate-400'
          }`}>
            <span>{timeString}</span>
            {isCurrentUser && (
              <CheckCheck className="w-3 h-3 text-cyan-200 inline" />
            )}
          </div>
        </div>

        {/* Action menu trigger for other users */}
        {!isCurrentUser && (
          <div className="absolute top-0 right-0 -mr-7 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Message options"
              >
                <MoreVertical className="w-3.5 h-3.5" />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute top-full right-0 mt-1 w-44 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1 z-50 animate-in fade-in duration-100 text-xs">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onReport(message.id);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-rose-300 hover:bg-rose-950/50 transition font-medium"
                    >
                      <Flag className="w-3.5 h-3.5 text-rose-400" />
                      <span>Report Message</span>
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onBlockUser(message.userId, message.userName);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 transition font-medium"
                    >
                      <ShieldOff className="w-3.5 h-3.5 text-slate-400" />
                      <span>Block {message.userName}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
