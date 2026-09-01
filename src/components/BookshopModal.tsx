import React from 'react';
import { X, BookOpen, Star, MessageSquare, ArrowRight, Bookmark } from 'lucide-react';

interface BookshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom: (roomId: string) => void;
}

export const BookshopModal: React.FC<BookshopModalProps> = ({ isOpen, onClose, onSelectRoom }) => {
  if (!isOpen) return null;

  const books = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Self-Improvement',
      rating: '4.9',
      summary: 'Tiny Changes, Remarkable Results. An easy & proven way to build good habits and break bad ones.',
      quote: '"You do not rise to the level of your goals. You fall to the level of your systems."'
    },
    {
      id: 2,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      category: 'Philosophy & Fiction',
      rating: '4.8',
      summary: 'A magical story about following your dreams and listening to the whispers of your heart.',
      quote: '"When you want something, all the universe conspires in helping you to achieve it."'
    },
    {
      id: 3,
      title: 'Deep Work',
      author: 'Cal Newport',
      category: 'Productivity',
      rating: '4.7',
      summary: 'Rules for focused success in a distracted world. Master difficult tasks with undistracted focus.',
      quote: '"Clarity about what matters provides clarity about what does not."'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FF6B00] shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#3E2723]">Bookshop & Readers Corner</h2>
              <p className="text-xs text-stone-500">Curated books, literary quotes & discussions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-[#3E2723] hover:bg-stone-200 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CTA to Readers Chatroom */}
        <div className="p-4 bg-orange-50 border-b border-orange-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-xs font-semibold text-[#3E2723]">
              Join the live discussion in <strong>#readers</strong>!
            </span>
          </div>
          <button
            onClick={() => {
              onClose();
              onSelectRoom('readers');
            }}
            className="px-3 py-1 rounded-lg bg-[#FF6B00] hover:bg-[#EA580C] text-white text-xs font-bold transition flex items-center gap-1"
          >
            <span>Enter Room</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Books List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {books.map((book) => (
            <div
              key={book.id}
              className="p-4 rounded-xl border border-stone-200 hover:border-[#FF6B00]/40 bg-white hover:bg-stone-50 transition space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-[#3E2723]">{book.title}</h4>
                  <p className="text-xs text-stone-500 font-medium">By {book.author}</p>
                </div>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 text-xs font-bold">
                  <Star className="w-3 h-3 text-[#FF6B00] fill-[#FF6B00]" />
                  <span>{book.rating}</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">{book.summary}</p>

              <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-100 text-[11px] italic text-[#3E2723]/90">
                {book.quote}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">Free reader summaries & club notes.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#3E2723] hover:bg-[#2D1C19] text-white text-xs font-bold transition"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
