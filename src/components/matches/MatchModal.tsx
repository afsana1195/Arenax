import React, { useState, useEffect } from 'react';
import { Match } from '../../types';
import { formatMatchStatusBadge } from '../../utils/pureLogic';
import { DemoDataBadge } from '../common/DemoDataBadge';
import { X, Trophy, MapPin, Clock, BarChart3, Users, Activity, Share2, Check } from 'lucide-react';

interface MatchModalProps {
  match: Match | null;
  onClose: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({ match, onClose }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'stats' | 'lineups'>('timeline');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!match) return null;

  const badge = formatMatchStatusBadge(match);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="match-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#0c101a] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="bg-slate-900/90 px-6 py-4 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-cyan-400" />
            <h2 id="match-modal-title" className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
              {match.league}
            </h2>
            <DemoDataBadge />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              aria-label="Share match center link"
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Share'}</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close match details dialog"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scoreboard Jumbotron */}
        <div className="bg-gradient-to-b from-[#111726] to-[#0c101a] p-6 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            {/* Home Team */}
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-4">
              <span className="text-4xl" aria-hidden="true">{match.homeTeam.logo}</span>
              <div>
                <h3 className="font-bold text-lg text-white">{match.homeTeam.name}</h3>
                <span className="text-xs uppercase font-semibold text-slate-400">Home</span>
              </div>
            </div>

            {/* Scores & Period */}
            <div className="flex flex-col items-center px-4">
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl sm:text-5xl font-black text-cyan-400">
                  {match.homeTeam.score ?? '-'}
                </span>
                <span className="text-slate-600 font-display text-3xl font-light">:</span>
                <span className="font-display text-4xl sm:text-5xl font-black text-slate-200">
                  {match.awayTeam.score ?? '-'}
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border ${badge.colorClass}`}>
                  {match.statusDetail}
                </span>
              </div>
            </div>

            {/* Away Team */}
            <div className="flex-1 flex flex-col-reverse sm:flex-row items-center justify-end gap-4 text-center sm:text-right">
              <div>
                <h3 className="font-bold text-lg text-white">{match.awayTeam.name}</h3>
                <span className="text-xs uppercase font-semibold text-slate-400">Away</span>
              </div>
              <span className="text-4xl" aria-hidden="true">{match.awayTeam.logo}</span>
            </div>
          </div>

          {/* Venue & Summary */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              {match.venue}
            </span>
            {match.summary && (
              <p className="text-slate-300 italic text-center sm:text-right max-w-md">
                "{match.summary}"
              </p>
            )}
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 bg-slate-900/60 px-6">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'timeline'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            Key Events Timeline
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'stats'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Match Statistics
          </button>
          <button
            onClick={() => setActiveTab('lineups')}
            className={`py-3 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'lineups'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Squad Lineups
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'timeline' && (
            <div className="space-y-3">
              {match.timeline && match.timeline.length > 0 ? (
                match.timeline.map((evt, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex items-start gap-4"
                  >
                    <span className="font-display text-lg font-bold text-cyan-400 shrink-0 w-16">
                      {evt.minuteOrOver}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                          {evt.teamShort}
                        </span>
                        {evt.player && (
                          <span className="text-xs font-bold text-white">{evt.player}</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300">{evt.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">
                  <p>Match timeline will stream live as key events occur.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-4">
              {match.stats && match.stats.length > 0 ? (
                match.stats.map((st, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60">
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
                      <span className="text-cyan-400">{st.home}</span>
                      <span className="uppercase tracking-wider text-slate-400">{st.label}</span>
                      <span className="text-slate-200">{st.away}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="bg-cyan-500 h-full w-1/2"></div>
                      <div className="bg-slate-600 h-full w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-8 text-slate-500 text-xs">
                  Comprehensive statistical breakdowns load automatically during active play.
                </p>
              )}
            </div>
          )}

          {activeTab === 'lineups' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {match.lineups ? (
                <>
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-xs uppercase text-cyan-400 tracking-wider mb-3">
                      {match.homeTeam.name} Roster
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {match.lineups.home.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 py-0.5">
                          <span className="text-slate-500 font-mono text-[10px] w-4">{i + 1}.</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                    <h4 className="font-bold text-xs uppercase text-slate-300 tracking-wider mb-3">
                      {match.awayTeam.name} Roster
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {match.lineups.away.map((p, i) => (
                        <li key={i} className="flex items-center gap-2 py-0.5">
                          <span className="text-slate-500 font-mono text-[10px] w-4">{i + 1}.</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <p className="col-span-2 text-center py-8 text-slate-500 text-xs">
                  Official team sheets are published 60 minutes prior to scheduled start time.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer info note */}
        <div className="p-4 bg-[#080b11] border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Live updates powered by ARENA X Match Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs transition-colors"
          >
            Close Center
          </button>
        </div>
      </div>
    </div>
  );
};
