import React from 'react';
import { BookOpen, Bookmark, Feather, Sparkles, MessageSquare, ArrowRight, Quote } from 'lucide-react';
import { useChat } from '../context/ChatContext';

interface ReadersPageProps {
  onSelectRoom: (roomId: string) => void;
}

export const ReadersPage: React.FC<ReadersPageProps> = ({ onSelectRoom }) => {
  const { roomCounts } = useChat();
  const readersOnline = roomCounts['readers'] || 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-sky-950 via-slate-900 to-indigo-950/60 border border-sky-900/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-500/30">
            <BookOpen className="w-4 h-4" />
            <span>Readers Circle • {readersOnline} Online</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Books, Stories & Literature
          </h1>

          <p className="text-sm text-sky-200/80 leading-relaxed">
            A sanctuary for avid bookworms, passionate storytellers, and casual readers. Share favorite chapter excerpts, literary critique, and author recommendations.
          </p>

          <button
            onClick={() => onSelectRoom('readers')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-sky-950/50 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enter #Readers Room ({readersOnline} Online)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Featured Quote of the Day */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3 relative">
        <Quote className="w-8 h-8 text-sky-400/40 absolute top-6 right-6" />
        <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Literary Spotlight</span>
        <blockquote className="text-base sm:text-lg font-serif italic text-slate-200 max-w-2xl leading-relaxed">
          "A reader lives a thousand lives before he dies . . . The man who never reads lives only one."
        </blockquote>
        <p className="text-xs text-slate-400">— George R.R. Martin, <span className="italic">A Dance with Dragons</span></p>
      </div>

      {/* Reading Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <Bookmark className="w-5 h-5 text-sky-400" />
          <h4 className="text-sm font-bold text-white">Book Recommendations</h4>
          <p className="text-xs text-slate-400">Discover hidden gem novels in Sci-Fi, Fantasy, Mystery, Non-Fiction, and Romance.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <Feather className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-bold text-white">Writers' Workshop</h4>
          <p className="text-xs text-slate-400">Share short flash fiction, poetry snippets, and get constructive feedback.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-bold text-white">Monthly Book Clubs</h4>
          <p className="text-xs text-slate-400">Coordinate group reads and synchronized chapter discussions in real time.</p>
        </div>
      </div>

    </div>
  );
};
