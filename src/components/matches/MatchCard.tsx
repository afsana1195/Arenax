import React from 'react';
import { Match } from '../../types';
import { formatMatchStatusBadge } from '../../utils/pureLogic';
import { DemoDataBadge } from '../common/DemoDataBadge';
import { ChevronRight, Clock, MapPin } from 'lucide-react';

interface MatchCardProps {
  match: Match;
  onSelect?: (match: Match) => void;
  compact?: boolean;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onSelect, compact = false }) => {
  const badge = formatMatchStatusBadge(match);

  return (
    <div
      onClick={() => onSelect?.(match)}
      className={`group relative bg-[#0e131f]/90 hover:bg-[#121929] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between ${
        compact ? 'min-w-[280px] max-w-[320px]' : 'w-full'
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(match);
        }
      }}
      aria-label={`Match details: ${match.homeTeam.name} vs ${match.awayTeam.name}`}
    >
      {/* Top Header: League + Status */}
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="font-bold text-slate-300 uppercase tracking-wider truncate">
            {match.league}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border flex items-center gap-1.5 ${badge.colorClass}`}
          >
            {badge.isPulsing && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping shrink-0" />
            )}
            {badge.text}
          </span>
          <DemoDataBadge compact />
        </div>
      </div>

      {/* Teams & Scores */}
      <div className="space-y-3 py-1">
        {/* Home Team */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 truncate">
            <span className="text-xl shrink-0" aria-hidden="true">
              {match.homeTeam.logo}
            </span>
            <span className="font-bold text-sm sm:text-base text-white truncate group-hover:text-cyan-300 transition-colors">
              {match.homeTeam.name}
            </span>
            <span className="text-xs text-slate-400 font-semibold uppercase">
              ({match.homeTeam.shortName})
            </span>
          </div>
          <div className="text-right shrink-0">
            <span className="font-display text-2xl font-black text-white tracking-wider">
              {match.homeTeam.score ?? '-'}
            </span>
            {match.homeTeam.overs && (
              <p className="text-[10px] text-cyan-400 font-semibold">{match.homeTeam.overs}</p>
            )}
          </div>
        </div>

        {/* Away Team */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 truncate">
            <span className="text-xl shrink-0" aria-hidden="true">
              {match.awayTeam.logo}
            </span>
            <span className="font-bold text-sm sm:text-base text-white truncate group-hover:text-cyan-300 transition-colors">
              {match.awayTeam.name}
            </span>
            <span className="text-xs text-slate-400 font-semibold uppercase">
              ({match.awayTeam.shortName})
            </span>
          </div>
          <div className="text-right shrink-0">
            <span className="font-display text-2xl font-black text-white tracking-wider">
              {match.awayTeam.score ?? '-'}
            </span>
            {match.awayTeam.overs && (
              <p className="text-[10px] text-slate-400 font-semibold">{match.awayTeam.overs}</p>
            )}
          </div>
        </div>
      </div>

      {/* Match Status / Subscore detail */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <span className="font-medium text-cyan-400 flex items-center gap-1 truncate">
          <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
          <span className="truncate">{match.statusDetail}</span>
        </span>

        <span className="text-slate-400 group-hover:text-cyan-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-0.5 shrink-0 transition-colors">
          <span>Center</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  );
};
