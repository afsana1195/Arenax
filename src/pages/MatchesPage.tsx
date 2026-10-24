import React, { useState } from 'react';
import { MOCK_MATCHES } from '../data/mockData';
import { MatchCard } from '../components/matches/MatchCard';
import { MatchModal } from '../components/matches/MatchModal';
import { DemoDataBadge } from '../components/common/DemoDataBadge';
import { Match, SportType } from '../types';
import { Calendar, Filter, Clock } from 'lucide-react';

export const MatchesPage: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<SportType | 'all'>('all');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const fixtures = MOCK_MATCHES.filter((m) => {
    if (selectedSport !== 'all' && m.sport !== selectedSport) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Tournament Schedule
            </span>
            <DemoDataBadge />
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Fixtures &amp; Match Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Upcoming championship clashes, rivalry weeks, and tournament knockouts.
          </p>
        </div>

        {/* Sport Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs self-start sm:self-auto overflow-x-auto">
          {(['all', 'cricket', 'football', 'basketball', 'esports'] as const).map((sp) => (
            <button
              key={sp}
              onClick={() => setSelectedSport(sp)}
              className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedSport === sp
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {sp === 'all' && 'All Fixtures'}
              {sp === 'cricket' && '🏏 Cricket'}
              {sp === 'football' && '⚽ Football'}
              {sp === 'basketball' && '🏀 Hoops'}
              {sp === 'esports' && '🎮 Esports'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fixtures.map((m) => (
          <MatchCard key={m.id} match={m} onSelect={setSelectedMatch} />
        ))}
      </div>

      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
};
