import React from 'react';
import { Poll } from '../../types';
import { useFanZone } from '../../context/FanZoneContext';
import { calculatePollPercentages } from '../../utils/pureLogic';
import { CheckCircle2, Clock, Users, Flame } from 'lucide-react';

interface PollCardProps {
  poll: Poll;
}

export const PollCard: React.FC<PollCardProps> = ({ poll }) => {
  const { votedPolls, votePoll } = useFanZone();
  const userVotedOptionId = votedPolls[poll.id];
  const hasVoted = Boolean(userVotedOptionId);

  const optionPercentages = calculatePollPercentages(poll.options);

  return (
    <div className="bg-[#0e131f] border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-xl transition-all flex flex-col justify-between">
      <div>
        {/* Category & Expiry */}
        <div className="flex items-center justify-between gap-2 mb-3 text-xs">
          <span className="font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            {poll.category === 'sports' ? 'Sports Fan Poll' : 'Entertainment Poll'}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {poll.endsAt}
          </span>
        </div>

        {/* Question */}
        <h3 className="font-display text-xl sm:text-2xl font-black text-white uppercase tracking-wide mb-4">
          {poll.question}
        </h3>

        {/* Options */}
        <div className="space-y-2.5">
          {poll.options.map((opt) => {
            const isUserSelection = userVotedOptionId === opt.id;
            const pct = optionPercentages.find((p) => p.id === opt.id)?.percentage ?? 0;

            return (
              <div key={opt.id} className="relative overflow-hidden rounded-xl">
                {hasVoted ? (
                  // Voted State with animated percentage bar
                  <div
                    className={`p-3 rounded-xl border relative flex items-center justify-between transition-all ${
                      isUserSelection
                        ? 'border-cyan-500 bg-cyan-950/30 text-white'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    {/* Background Progress Fill */}
                    <div
                      className={`absolute inset-y-0 left-0 transition-all duration-700 ${
                        isUserSelection ? 'bg-cyan-500/25' : 'bg-slate-800/50'
                      }`}
                      style={{ width: `${pct}%` }}
                    />

                    <div className="relative z-10 flex items-center gap-2 font-medium text-xs sm:text-sm">
                      {isUserSelection && (
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      )}
                      <span>{opt.text}</span>
                    </div>

                    <div className="relative z-10 font-mono font-bold text-xs sm:text-sm text-cyan-400 shrink-0 ml-2">
                      {pct}%
                    </div>
                  </div>
                ) : (
                  // Unvoted State - Clickable Option
                  <button
                    onClick={() => votePoll(poll.id, opt.id)}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-800 bg-slate-900/70 hover:bg-slate-800/90 hover:border-cyan-500/60 text-xs sm:text-sm text-slate-200 hover:text-white font-medium transition-all group active:scale-99"
                  >
                    <span className="group-hover:translate-x-1 inline-block transition-transform">
                      {opt.text}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Meta */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          {poll.totalVotes.toLocaleString()} votes cast
        </span>

        {hasVoted ? (
          <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
            Vote Recorded ✓
          </span>
        ) : (
          <span className="text-amber-400 font-semibold text-[11px]">
            Click an option to cast your vote
          </span>
        )}
      </div>
    </div>
  );
};
