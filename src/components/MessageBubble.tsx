import React, { useState } from 'react';
import { MoreVertical, Flag, ShieldOff, CheckCheck } from 'lucide-react';
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
      <div className="flex justify-center my-1.5">
        <div className="px-2.5 py-0.5 rounded-full bg-stone-200/80 text-[10px] font-medium text-stone-600 text-center">
          {message.message}
        </div>
      </div>
    );
  }

  const timeString = formatTime(message.createdAt);

  return (
    <div
      id={`message-${message.id}`}
      className={`group flex items-end gap-1.5 my-1 max-w-full ${
        isCurrentUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* Left Avatar for other users */}
      {!isCurrentUser && (
        <div
          className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-[11px] font-black text-white shadow-xs select-none mb-0.5"
          style={{ backgroundColor: message.userColor || '#3E2723' }}
        >
          {message.userName.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Message bubble container */}
      <div className={`relative max-w-[82%] sm:max-w-[70%] flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        
        {/* Message bubble (WhatsApp / Messenger Style) */}
        <div
          className={`relative px-3.5 py-2 rounded-2xl text-xs sm:text-sm leading-relaxed break-words shadow-xs transition-all ${
            isCurrentUser
              ? 'bg-[#3E2723] text-white rounded-br-xs'
              : 'bg-white text-[#3E2723] border border-stone-200 rounded-bl-xs'
          }`}
        >
          {/* Sender name for other users */}
          {!isCurrentUser && (
            <div className="font-bold text-[11px] text-[#FF6B00] mb-0.5">
              {message.userName}
            </div>
          )}

          {/* Message Text */}
          <p className="whitespace-pre-wrap font-normal select-text">{message.message}</p>

          {/* Timestamp & Status */}
          <div className={`flex items-center justify-end gap-1 mt-0.5 text-[9px] font-medium select-none ${
            isCurrentUser ? 'text-stone-300' : 'text-stone-400'
          }`}>
            <span>{timeString}</span>
            {isCurrentUser && (
              <CheckCheck className="w-3 h-3 text-[#FF6B00] inline" />
            )}
          </div>
        </div>

        {/* Action menu trigger for other users on hover */}
        {!isCurrentUser && (
          <div className="absolute top-1 right-0 -mr-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-1 rounded-full text-stone-400 hover:text-[#3E2723] hover:bg-stone-200 transition"
                title="Options"
              >
                <MoreVertical className="w-3 h-3" />
              </button>

              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute top-full right-0 mt-1 w-36 rounded-xl bg-white border border-stone-200 shadow-xl p-1 z-50 animate-in fade-in duration-100 text-xs">
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onReport(message.id);
                      }}
                      className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition font-bold"
                    >
                      <Flag className="w-3 h-3 text-rose-500" />
                      <span>Report</span>
                    </button>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        onBlockUser(message.userId, message.userName);
                      }}
                      className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-stone-700 hover:bg-stone-100 transition font-bold"
                    >
                      <ShieldOff className="w-3 h-3 text-stone-500" />
                      <span>Block</span>
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
