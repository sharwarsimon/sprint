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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
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
      // Refocus input
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleAddEmoji = (emoji: string) => {
    if (text.length + emoji.length <= 500) {
      setText(prev => prev + emoji);
    }
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const charCount = text.length;

  return (
    <div className="w-full bg-slate-900 border-t border-slate-800 p-2.5 sm:p-4 z-20 transition-colors">
      <div className="max-w-4xl mx-auto">
        
        {/* Error message pill */}
        {errorMsg && (
          <div className="mb-2 p-2 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between animate-in fade-in duration-150">
            <div className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-rose-400 font-bold ml-2">×</button>
          </div>
        )}

        {/* Emoji Quick Bar Dropdown */}
        {showEmojiPicker && (
          <div className="mb-2 p-2 rounded-2xl bg-slate-800 border border-slate-700 shadow-xl flex items-center gap-1.5 overflow-x-auto animate-in slide-in-from-bottom-2 duration-150">
            {QUICK_EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleAddEmoji(emoji)}
                className="p-1.5 rounded-lg text-lg hover:bg-slate-700 transition transform hover:scale-110 active:scale-95"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {/* Main Input Control Bar */}
        <div className="flex items-end gap-2 bg-slate-800/90 border border-slate-700 rounded-2xl px-3 py-1.5 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all shadow-inner">
          
          {/* Emoji toggle button */}
          <button
            type="button"
            id="emoji-picker-toggle"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className={`p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-slate-700/80 transition flex-shrink-0 mb-0.5 ${
              showEmojiPicker ? 'text-cyan-300 bg-slate-700' : ''
            }`}
            title="Emoji reactions"
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
            placeholder={disabled ? "Chat is disabled" : "Type a message... (Enter to send, Shift+Enter for new line)"}
            className="flex-1 max-h-28 bg-transparent text-slate-100 placeholder-slate-400 text-sm py-2 px-1 resize-none focus:outline-none leading-relaxed"
          />

          {/* Character counter & Send Button */}
          <div className="flex items-center gap-2 flex-shrink-0 mb-1">
            {charCount > 0 && (
              <span className={`text-[11px] font-mono hidden sm:inline ${
                charCount > 450 ? 'text-amber-400 font-bold' : 'text-slate-400'
              }`}>
                {charCount}/500
              </span>
            )}

            <button
              id="chat-send-message-button"
              type="button"
              onClick={handleSend}
              disabled={!text.trim() || isSending || disabled}
              className={`p-2.5 rounded-xl font-bold transition-all duration-150 flex items-center justify-center ${
                text.trim() && !disabled && !isSending
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white shadow-lg shadow-indigo-600/30 scale-100 active:scale-95'
                  : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
              }`}
              title="Send message"
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
