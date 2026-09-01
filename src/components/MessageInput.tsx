import React, { useState, useRef, useEffect } from 'react';
import { Send, Smile, AlertCircle, Loader2 } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (text: string) => Promise<{ success: boolean; error?: string }>;
  onTyping: (isTyping: boolean) => void;
  disabled?: boolean;
}

const QUICK_EMOJIS = ['👋', '😊', '🔥', '❤️', '😂', '🎉', '👍', '✨', '🎮', '📚'];

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onTyping,
  disabled = false
}) => {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`;
    }
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (val.length <= 500) {
      setText(val);
      if (errorMsg) setErrorMsg(null);

      // Trigger typing status
      onTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        onTyping(false);
      }, 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    const cleanText = text.trim();
    if (!cleanText || isSending || disabled) return;

    setIsSending(true);
    setErrorMsg(null);
    onTyping(false);

    try {
      const res = await onSendMessage(cleanText);
      if (res.success) {
        setText('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      } else {
        setErrorMsg(res.error || 'Could not send message');
      }
    } catch {
      setErrorMsg('Failed to send message');
    } finally {
      setIsSending(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleAddEmoji = (emoji: string) => {
    if (text.length + emoji.length <= 500) {
      setText((prev) => prev + emoji);
    }
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="w-full bg-white border-t border-stone-200 p-2 sm:p-3 z-20">
      <div className="max-w-2xl mx-auto">
        
        {/* Error message */}
        {errorMsg && (
          <div className="mb-2 p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center justify-between animate-in fade-in duration-100">
            <div className="flex items-center gap-1.5 font-medium">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-rose-500 font-bold ml-2">×</button>
          </div>
        )}

        {/* Emoji Bar */}
        {showEmojiPicker && (
          <div className="mb-2 p-1.5 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex items-center gap-1 overflow-x-auto">
            {QUICK_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleAddEmoji(emoji)}
                className="p-1.5 rounded-lg text-lg hover:bg-stone-200 transition transform hover:scale-110 active:scale-95"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Main Messenger / WhatsApp Input Row */}
        <div className="flex items-end gap-1.5 bg-stone-100 rounded-2xl px-2 py-1.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#FF6B00]/20 focus-within:border-[#FF6B00] border border-transparent transition-all">
          
          {/* Emoji Toggle */}
          <button
            type="button"
            id="emoji-picker-toggle"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-2 rounded-xl text-stone-500 hover:text-[#FF6B00] transition shrink-0"
            title="Add Emoji"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Text Area */}
          <textarea
            ref={textareaRef}
            id="chat-message-textarea"
            rows={1}
            value={text}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            disabled={disabled || isSending}
            placeholder={disabled ? "Chat is disabled" : "Message..."}
            className="flex-1 max-h-24 bg-transparent text-[#3E2723] placeholder-stone-400 text-sm py-1.5 px-1 resize-none focus:outline-none leading-relaxed"
          />

          {/* Send Button */}
          <button
            type="button"
            id="send-message-button"
            onClick={handleSend}
            disabled={!text.trim() || isSending || disabled}
            className={`p-2 rounded-xl transition shrink-0 ${
              text.trim() && !disabled
                ? 'bg-[#3E2723] text-[#FF6B00] hover:bg-[#2D1C19] active:scale-95 shadow-xs'
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
            title="Send Message"
          >
            {isSending ? (
              <Loader2 className="w-4 h-4 animate-spin text-[#FF6B00]" />
            ) : (
              <Send className="w-4 h-4 fill-current" />
            )}
          </button>

        </div>

      </div>
    </div>
  );
};
