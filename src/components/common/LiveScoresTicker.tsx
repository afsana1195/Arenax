import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_MATCHES } from '../../data/mockData';
import { Match } from '../../types';
import { MatchCard } from '../matches/MatchCard';
import { MatchModal } from '../matches/MatchModal';
import { ChevronLeft, ChevronRight, Radio } from 'lucide-react';

export const LiveScoresTicker: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section aria-label="Live scores match ticker" className="bg-[#07090e] border-y border-slate-800/80 py-3 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="font-display text-lg font-bold uppercase tracking-wider text-white">
              Scores &amp; Fixtures Ticker
            </span>
            <span className="hidden sm:inline text-xs text-slate-500 font-medium">
              (Live &amp; Trending Matches)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/live"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
            >
              Match Center →
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => scroll('left')}
                aria-label="Scroll left matches"
                className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                aria-label="Scroll right matches"
                className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-4 overflow-x-auto pb-2 scrollbar-none snap-x"
        >
          {MOCK_MATCHES.map((match) => (
            <div key={match.id} className="snap-start shrink-0">
              <MatchCard match={match} onSelect={setSelectedMatch} compact />
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </section>
  );
};
