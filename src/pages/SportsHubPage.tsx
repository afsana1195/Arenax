import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_MATCHES, MOCK_ARTICLES } from '../data/mockData';
import { MatchCard } from '../components/matches/MatchCard';
import { MatchModal } from '../components/matches/MatchModal';
import { DemoDataBadge } from '../components/common/DemoDataBadge';
import { filterMatches, filterArticles } from '../utils/pureLogic';
import { Match, SportType } from '../types';
import { Trophy, Radio, ArrowRight, Shield, Calendar, Users } from 'lucide-react';

const SPORT_CONFIGS: Record<
  string,
  {
    title: string;
    subtitle: string;
    icon: string;
    badge: string;
    bannerImg: string;
    description: string;
  }
> = {
  cricket: {
    title: 'Cricket Arena',
    subtitle: 'ICC Champions Trophy, IPL 2026, The Ashes, and Global T20 Leagues',
    icon: '🏏',
    badge: 'ICC & Franchise Hub',
    bannerImg: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    description: 'Comprehensive ball-by-ball coverage, batting strike rates, bowling economies, wicket replays, and expert pitch analysis.',
  },
  football: {
    title: 'World Football',
    subtitle: 'UEFA Champions League, Premier League, La Liga, and International Clashes',
    icon: '⚽',
    badge: 'Elite European Hub',
    bannerImg: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    description: 'Real-time goal alerts, tactical formations, expected goals (xG), VAR controversies, and transfer window scoops.',
  },
  basketball: {
    title: 'Hardwood Basketball',
    subtitle: 'NBA Playoffs, EuroLeague Championship, and FIBA World Cup Qualifiers',
    icon: '🏀',
    badge: 'NBA & Global Hoops',
    bannerImg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
    description: 'Quarter-by-quarter shot charts, triple-double trackings, clutch buzzer beaters, and playoff brackets.',
  },
  esports: {
    title: 'Competitive Esports',
    subtitle: 'Valorant Champions Tour, League of Legends Worlds, CS2 Majors, and Rocket League',
    icon: '🎮',
    badge: 'Tier-1 Esports',
    bannerImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    description: 'Map pick-bans, clutch kill-feeds, agent meta breakdowns, tournament brackets, and live stream overlays.',
  },
};

export const SportsHubPage: React.FC = () => {
  const { sport } = useParams<{ sport?: string }>();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [matchStatusFilter, setMatchStatusFilter] = useState<'all' | 'live' | 'upcoming' | 'completed'>('all');

  const currentSportKey = sport?.toLowerCase();
  const isSportSpecific = Boolean(currentSportKey && SPORT_CONFIGS[currentSportKey]);
  const sportConfig = isSportSpecific ? SPORT_CONFIGS[currentSportKey!] : null;

  // Filter matches
  const matches = filterMatches(MOCK_MATCHES, {
    sport: isSportSpecific ? (currentSportKey as SportType) : 'all',
    status: matchStatusFilter === 'all' ? undefined : matchStatusFilter,
  });

  // Filter articles
  const articles = filterArticles(MOCK_ARTICLES, {
    category: isSportSpecific ? currentSportKey : 'sports',
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Banner / Header */}
      <section aria-label="Sports hub banner" className="relative bg-[#0c101a] border-b border-slate-800 py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={sportConfig ? sportConfig.bannerImg : 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80'}
            alt="Sports header"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-[#0c101a]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
              <span>{sportConfig?.icon || '🏆'}</span>
              <span>{sportConfig?.badge || 'Universal Sports Stadium'}</span>
            </span>
            <DemoDataBadge tooltip="Sports scores and timelines simulated for dev preview. Ready for SportsRadar / Opta API." />
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            {sportConfig?.title || 'Global Sports Arena'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            {sportConfig?.description ||
              'Real-time score updates, comprehensive tournament fixtures, match statistics, and authoritative editorial breakdowns across the world of athletics.'}
          </p>

          {/* Category Navigation Pills */}
          <div className="pt-4 flex flex-wrap gap-2">
            <Link
              to="/sports"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                !sport
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              All Sports
            </Link>
            <Link
              to="/sports/cricket"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                sport === 'cricket'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🏏 Cricket
            </Link>
            <Link
              to="/sports/football"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                sport === 'football'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              ⚽ Football
            </Link>
            <Link
              to="/sports/basketball"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                sport === 'basketball'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🏀 Basketball
            </Link>
            <Link
              to="/sports/esports"
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                sport === 'esports'
                  ? 'bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              🎮 Esports
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area: Matches & Articles */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Matches Section */}
        <section aria-label="Sports match schedule">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
                Scores &amp; Match Schedule
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any match card for full squad lineups, venue, and live commentary.
              </p>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              {(['all', 'live', 'upcoming', 'completed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setMatchStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all ${
                    matchStatusFilter === st
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st === 'live' ? '🔴 Live Now' : st}
                </button>
              ))}
            </div>
          </div>

          {matches.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
              <Trophy className="w-8 h-8 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-slate-300">No matches found for this filter</h3>
              <p className="text-xs text-slate-500">
                Check back shortly or reset your filter to view all tournament fixtures.
              </p>
              <button
                onClick={() => setMatchStatusFilter('all')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg"
              >
                Reset Match Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((m) => (
                <MatchCard key={m.id} match={m} onSelect={setSelectedMatch} />
              ))}
            </div>
          )}
        </section>

        {/* Editorial Stories Section */}
        <section aria-label="Editorial articles">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
              {sportConfig?.title ? `${sportConfig.title} Analysis` : 'Featured Sports Dispatches'}
            </h2>
            <Link
              to="/news"
              className="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider flex items-center gap-1"
            >
              <span>View All News</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((art) => (
              <Link
                key={art.id}
                to={`/news/${art.slug}`}
                className="group bg-[#0e131f] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {art.publishedAt} • {art.readTime}
                    </span>
                    <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold">{art.author.name}</span>
                  <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
};
