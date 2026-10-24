import React, { useState } from 'react';
import { MOCK_MATCHES } from '../data/mockData';
import { MatchCard } from '../components/matches/MatchCard';
import { MatchModal } from '../components/matches/MatchModal';
import { DemoDataBadge } from '../components/common/DemoDataBadge';
import { filterMatches } from '../utils/pureLogic';
import { Match, SportType, MatchStatus } from '../types';
import { Radio, Search, Filter, RefreshCw, Trophy, AlertTriangle, WifiOff } from 'lucide-react';

export const LivePage: React.FC = () => {
  const [activeSport, setActiveSport] = useState<SportType | 'all'>('all');
  const [activeStatus, setActiveStatus] = useState<MatchStatus | 'all'>('live');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [simulatedState, setSimulatedState] = useState<'normal' | 'empty' | 'error' | 'offline'>('normal');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredMatches =
    simulatedState === 'empty'
      ? []
      : filterMatches(MOCK_MATCHES, {
          sport: activeSport,
          status: activeStatus,
          search: searchQuery,
        });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-20">
      {/* Header & Live Pulse */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-red-400 font-bold uppercase tracking-wider text-xs">
              Live Arena Match Center
            </span>
            <DemoDataBadge />
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Live Scores &amp; Fixtures
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Live updates across Cricket, Football, Basketball, and Esports. Click any card to inspect tactical scorecards, commentary, and lineups.
          </p>
        </div>

        {/* Live Controls: Refresh + Dev State Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRefresh}
            aria-label="Refresh match scores"
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Feeds</span>
          </button>

          {/* Development state preview toggle to inspect empty/offline/error states */}
          <div className="flex items-center bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-[11px]">
            <span className="px-2 text-slate-500 font-medium">State View:</span>
            <button
              onClick={() => setSimulatedState('normal')}
              className={`px-2 py-1 rounded font-bold uppercase ${
                simulatedState === 'normal' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Live
            </button>
            <button
              onClick={() => setSimulatedState('empty')}
              className={`px-2 py-1 rounded font-bold uppercase ${
                simulatedState === 'empty' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Empty
            </button>
            <button
              onClick={() => setSimulatedState('offline')}
              className={`px-2 py-1 rounded font-bold uppercase ${
                simulatedState === 'offline' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Offline
            </button>
            <button
              onClick={() => setSimulatedState('error')}
              className={`px-2 py-1 rounded font-bold uppercase ${
                simulatedState === 'error' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'
              }`}
            >
              Error
            </button>
          </div>
        </div>
      </div>

      {/* Main Filter Bar */}
      <div className="bg-[#0e131f] border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs (Live, Upcoming, Completed, All) */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 w-full md:w-auto overflow-x-auto">
          {(['live', 'upcoming', 'completed', 'all'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setActiveStatus(st)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeStatus === st
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st === 'live' ? '🔴 Live Now' : st}
            </button>
          ))}
        </div>

        {/* Sport Category Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {(['all', 'cricket', 'football', 'basketball', 'esports'] as const).map((sp) => (
            <button
              key={sp}
              onClick={() => setActiveSport(sp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeSport === sp
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {sp === 'all' && 'All Sports'}
              {sp === 'cricket' && '🏏 Cricket'}
              {sp === 'football' && '⚽ Football'}
              {sp === 'basketball' && '🏀 Basketball'}
              {sp === 'esports' && '🎮 Esports'}
            </button>
          ))}
        </div>

        {/* Text Search Box */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter teams or league..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* States Handling */}
      {simulatedState === 'offline' ? (
        <div className="p-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
          <WifiOff className="w-10 h-10 text-amber-500 mx-auto animate-pulse" />
          <h2 className="text-base font-bold text-slate-200">Network Disconnected</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Unable to connect to live match websockets. Cached fixture data is currently shown.
          </p>
          <button
            onClick={() => setSimulatedState('normal')}
            className="px-4 py-2 bg-slate-800 text-xs font-bold text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      ) : simulatedState === 'error' ? (
        <div className="p-16 text-center bg-red-950/20 rounded-2xl border border-red-500/30 space-y-3">
          <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
          <h2 className="text-base font-bold text-red-200">Sports API Gateway Unavailable</h2>
          <p className="text-xs text-red-300/80 max-w-md mx-auto">
            The external sports data provider returned a 503 Service Unavailable code.
          </p>
          <button
            onClick={() => setSimulatedState('normal')}
            className="px-4 py-2 bg-red-900/40 border border-red-500/40 text-xs font-bold text-red-200 rounded-lg"
          >
            Switch to Demo Feed
          </button>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div className="p-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
          <Trophy className="w-10 h-10 text-slate-600 mx-auto" />
          <h2 className="text-base font-bold text-slate-200">No matches match your current filter</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try switching sport categories, changing the status filter to "All", or clearing your search term.
          </p>
          <button
            onClick={() => {
              setActiveSport('all');
              setActiveStatus('all');
              setSearchQuery('');
              setSimulatedState('normal');
            }}
            className="px-4 py-2 bg-cyan-500 text-slate-950 text-xs font-black uppercase rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <MatchCard key={match.id} match={match} onSelect={setSelectedMatch} />
          ))}
        </div>
      )}

      {/* Match Detail Modal */}
      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
};
