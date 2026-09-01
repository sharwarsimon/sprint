import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, MessageSquare, Sparkles, WifiOff } from 'lucide-react';
import { ChatMessage } from '../types';
import { MessageBubble } from './MessageBubble';
import { useUser } from '../context/UserContext';

interface MessageListProps {
  messages: ChatMessage[];
  typingUsers: string[];
  connectionStatus: string;
  onReport: (messageId: string) => void;
  onBlockUser: (userId: string, userName: string) => void;
  roomName: string;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  typingUsers,
  connectionStatus,
  onReport,
  onBlockUser,
  roomName
}) => {
  const { user } = useUser();
  const listEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const [userHasScrolledUp, setUserHasScrolledUp] = useState(false);

  // Auto scroll to bottom
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    listEndRef.current?.scrollIntoView({ behavior });
  };

  // Scroll on initial load and when new messages arrive (unless user is scrolled up)
  useEffect(() => {
    if (!userHasScrolledUp) {
      scrollToBottom('auto');
    }
  }, [messages, typingUsers, userHasScrolledUp]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isUp = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollBottom(isUp);
    setUserHasScrolledUp(isUp);
  };

  return (
    <div className="relative flex-1 w-full overflow-hidden flex flex-col bg-slate-950/40">
      
      {/* Offline / Reconnecting Banner */}
      {connectionStatus !== 'connected' && (
        <div className="bg-amber-500/20 border-b border-amber-500/30 text-amber-200 px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 z-20">
          <WifiOff className="w-3.5 h-3.5 animate-pulse" />
          <span>You're offline. Reconnecting to realtime chat server...</span>
        </div>
      )}

      {/* Messages Scroll Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 space-y-1 scroll-smooth"
      >
        {/* Room Welcome Header */}
        <div className="text-center py-6 border-b border-slate-800/60 mb-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-2">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">Welcome to the {roomName} Room</h4>
          <p className="text-xs text-slate-400 mt-1">
            This is the start of the #{roomName.toLowerCase()} live conversation. All active members can chat here in real time.
          </p>
        </div>

        {/* Empty state if zero messages */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
            <Sparkles className="w-8 h-8 text-indigo-400 mb-2 opacity-60" />
            <p className="text-sm font-semibold text-slate-300">No messages yet in this room</p>
            <p className="text-xs text-slate-500 mt-1">Say hello and kickstart the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isCurrentUser={msg.userId === user?.userId}
              onReport={onReport}
              onBlockUser={onBlockUser}
            />
          ))
        )}

        {/* Typing indicator bubble */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-2 px-2 py-1 text-xs text-slate-400 italic animate-pulse">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span>
              {typingUsers.slice(0, 2).join(', ')} {typingUsers.length > 2 ? `and ${typingUsers.length - 2} others` : ''} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </span>
          </div>
        )}

        <div ref={listEndRef} />
      </div>

      {/* Floating Jump to Bottom Button */}
      {showScrollBottom && (
        <button
          id="scroll-to-bottom-button"
          onClick={() => {
            setUserHasScrolledUp(false);
            scrollToBottom('smooth');
          }}
          className="absolute bottom-4 right-4 p-2.5 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-900/50 hover:bg-indigo-500 transition-all flex items-center gap-1.5 text-xs font-semibold z-20 animate-in fade-in zoom-in-95 duration-150"
        >
          <ChevronDown className="w-4 h-4" />
          <span>Newest</span>
        </button>
      )}

    </div>
  );
};
