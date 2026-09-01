import React, { useState } from 'react';
import { Gamepad2, Trophy, Swords, Sparkles, MessageSquare, ArrowRight, Dices } from 'lucide-react';
import { useChat } from '../context/ChatContext';

interface GamesPageProps {
  onSelectRoom: (roomId: string) => void;
}

export const GamesPage: React.FC<GamesPageProps> = ({ onSelectRoom }) => {
  const { roomCounts } = useChat();
  const gameOnline = roomCounts['game'] || 0;

  const [triviaQuestion, setTriviaQuestion] = useState({
    q: 'In the original 1985 Super Mario Bros., what is Mario\'s brother\'s name?',
    options: ['Luigi', 'Wario', 'Toad', 'Yoshi'],
    correct: 0,
    selected: null as number | null
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-200">
      
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950/60 border border-indigo-900/60 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Gamepad2 className="w-4 h-4" />
            <span>Gaming Lounge • {gameOnline} Players Online</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Hub for Gamers
          </h1>

          <p className="text-sm text-indigo-200/80 leading-relaxed">
            Looking for a co-op squad, discussing boss strategies, or sharing retro classics? Jump into the dedicated #Game public room and chat with fellow gamers in real time.
          </p>

          <button
            onClick={() => onSelectRoom('game')}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-950/50 transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enter #Game Room ({gameOnline} Online)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mini Interactive Gamer Trivia Widget */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Daily Gamer Trivia</h3>
          </div>
          <span className="text-xs text-slate-400">Warm up before entering #Game</span>
        </div>

        <p className="text-sm text-slate-200 font-medium">{triviaQuestion.q}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {triviaQuestion.options.map((opt, idx) => {
            const isChosen = triviaQuestion.selected === idx;
            const isCorrect = idx === triviaQuestion.correct;
            let btnStyle = 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700';

            if (triviaQuestion.selected !== null) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-600/30 text-emerald-300 border-emerald-500';
              } else if (isChosen) {
                btnStyle = 'bg-rose-600/30 text-rose-300 border-rose-500';
              }
            }

            return (
              <button
                key={opt}
                onClick={() => setTriviaQuestion(prev => ({ ...prev, selected: idx }))}
                className={`p-3 rounded-xl border text-xs font-semibold transition ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {triviaQuestion.selected !== null && (
          <div className="text-xs text-slate-400 pt-2 flex items-center justify-between">
            <span>
              {triviaQuestion.selected === triviaQuestion.correct
                ? '🎉 Correct! Luigi made his first debut in Mario Bros (1983)!'
                : '❌ Nice try! It was Luigi!'}
            </span>
            <button
              onClick={() => onSelectRoom('game')}
              className="text-cyan-400 font-bold hover:underline"
            >
              Discuss more in #Game →
            </button>
          </div>
        )}
      </div>

      {/* Gaming Room Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <Swords className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-bold text-white">Matchmaking & LFG</h4>
          <p className="text-xs text-slate-400">Post your Discord/Steam tags, organize ranked squads, and recruit players.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <Dices className="w-5 h-5 text-purple-400" />
          <h4 className="text-sm font-bold text-white">Board Games & TTRPGs</h4>
          <p className="text-xs text-slate-400">Discuss D&D campaigns, tabletop strategies, and card battle meta.</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold text-white">Hardware & Esports</h4>
          <p className="text-xs text-slate-400">Talk PC builds, GPU benchmarks, tournament brackets, and live matches.</p>
        </div>
      </div>

    </div>
  );
};
