import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
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

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    listEndRef.current?.scrollIntoView({ behavior });
  };

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
    <div className="relative flex-1 w-full overflow-hidden flex flex-col bg-[#FAF9F6]">
      
      {/* Scrollable Messages Container (Messenger/WhatsApp Canvas) */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-1.5 scroll-smooth"
      >
        {/* Subtle Date / Chat Room Started Pill */}
        <div className="flex justify-center my-2">
          <span className="px-3 py-0.5 rounded-full bg-stone-200/70 text-[10px] font-bold text-stone-500 uppercase tracking-wider">
            {roomName} Room
          </span>
        </div>

        {/* Empty state */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center text-stone-400">
            <Sparkles className="w-6 h-6 text-[#FF6B00] mb-1.5 opacity-70" />
            <p className="text-xs font-bold text-stone-600">No messages yet</p>
            <p className="text-[11px] text-stone-400">Type below to start chatting</p>
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

        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 text-xs text-stone-500 italic">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-bounce [animation-delay:300ms]" />
            <span className="text-[11px]">
              {typingUsers.slice(0, 2).join(', ')} typing...
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
          className="absolute bottom-3 right-3 p-2 rounded-full bg-[#3E2723] text-white shadow-md hover:bg-[#2D1C19] transition-all flex items-center gap-1 text-xs font-bold z-20"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

    </div>
  );
};
