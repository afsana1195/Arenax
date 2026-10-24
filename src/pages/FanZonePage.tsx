import React, { useState } from 'react';
import { MOCK_POLLS, MOCK_QUIZZES } from '../data/mockData';
import { useFanZone } from '../context/FanZoneContext';
import { PollCard } from '../components/fanzone/PollCard';
import { QuizModal } from '../components/fanzone/QuizModal';
import { DiscussionBoard } from '../components/fanzone/DiscussionBoard';
import { DemoDataBadge } from '../components/common/DemoDataBadge';
import { Quiz } from '../types';
import { Flame, Trophy, Sparkles, MessageSquare, Award, Star, Users } from 'lucide-react';

export const FanZonePage: React.FC = () => {
  const { polls } = useFanZone();
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  // Mock Fan Leaderboard
  const leaderboard = [
    { rank: 1, name: 'Marcus_Vance', points: '14,820 pts', badge: 'Grandmaster' },
    { rank: 2, name: 'Elena_Bernabéu', points: '12,940 pts', badge: 'Tactician' },
    { rank: 3, name: 'Aarav_CricketGuru', points: '11,450 pts', badge: 'Trivia MVP' },
    { rank: 4, name: 'Chloe_Hawkins', points: '9,810 pts', badge: 'Cinema Buff' },
    { rank: 5, name: 'TenZ_Fanatic', points: '8,420 pts', badge: 'Aim God' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Hero Header */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 p-8 sm:p-12 border border-amber-500/20 shadow-2xl">
        <div className="max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 inline-flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Fan Zone &amp; Community
            </span>
            <DemoDataBadge tooltip="Poll votes and trivia sessions are saved in browser storage. Modular architecture ready for Supabase backend." />
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            Arena Fan Zone
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Cast your vote in real-time sports and entertainment MVP polls, challenge your trivia mastery with interactive quizzes, and join the global stadium debate.
          </p>
        </div>
      </div>

      {/* 1. ACTIVE POLLS SECTION */}
      <section aria-label="Interactive fan polls" className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              Real-Time Community Voice
            </span>
            <h2 className="font-display text-3xl font-black text-white uppercase tracking-wide mt-1">
              Active Fan Polls
            </h2>
          </div>
          <span className="text-xs text-slate-400">Votes stored locally • Duplicate protection active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))}
        </div>
      </section>

      {/* 2. TRIVIA & QUIZZES SECTION + LEADERBOARD */}
      <section aria-label="Trivia and quizzes" className="space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-400" />
            Arena Mastermind
          </span>
          <h2 className="font-display text-3xl font-black text-white uppercase tracking-wide mt-1">
            Sports &amp; Pop Culture Quizzes
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quiz Cards (8 Cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MOCK_QUIZZES.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-[#0e131f] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold uppercase text-[10px]">
                      {quiz.category}
                    </span>
                    <span className="text-amber-400 font-semibold text-[11px]">
                      {quiz.difficulty} Level
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-black text-white group-hover:text-cyan-300 transition-colors uppercase tracking-wide leading-tight">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {quiz.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 mt-6 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">5 Questions</span>
                  <button
                    onClick={() => setSelectedQuiz(quiz)}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Start Quiz</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Fan Leaderboard (4 Cols) */}
          <div className="lg:col-span-4 bg-[#0e131f] border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  Fan Leaderboard
                </h3>
              </div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">October 2026</span>
            </div>

            <div className="space-y-2.5">
              {leaderboard.map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`font-mono font-black text-xs w-5 h-5 rounded-full flex items-center justify-center ${
                        user.rank === 1
                          ? 'bg-amber-500 text-black'
                          : user.rank === 2
                          ? 'bg-slate-300 text-black'
                          : user.rank === 3
                          ? 'bg-amber-700 text-white'
                          : 'text-slate-500'
                      }`}
                    >
                      {user.rank}
                    </span>
                    <div>
                      <span className="font-bold text-slate-200 block truncate max-w-[110px]">
                        {user.name}
                      </span>
                      <span className="text-[10px] text-cyan-400 font-medium">{user.badge}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-300">{user.points}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-500 text-center pt-2">
              Earn rank points by playing daily quizzes and participating in live poll predictions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. DISCUSSION BOARD WITH MODERATION */}
      <section aria-label="Community discussion board">
        <DiscussionBoard />
      </section>

      {/* Quiz Modal */}
      <QuizModal quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
    </div>
  );
};
