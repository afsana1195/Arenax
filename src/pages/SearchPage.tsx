import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MOCK_MATCHES, MOCK_ARTICLES, MOCK_EVENTS, MOCK_PRODUCTS } from '../data/mockData';
import { MatchCard } from '../components/matches/MatchCard';
import { MatchModal } from '../components/matches/MatchModal';
import { useCart } from '../context/CartContext';
import { Match } from '../types';
import { Search, Sparkles, Trophy, FileText, Calendar, ShoppingBag, ArrowRight, X } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'matches' | 'articles' | 'events' | 'products'>('all');
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setQuery(q);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams(query.trim() ? { q: query.trim() } : {});
  };

  const handleSuggestionClick = (suggested: string) => {
    setQuery(suggested);
    setSearchParams({ q: suggested });
  };

  const q = query.toLowerCase().trim();

  // Search through all entities
  const matchedMatches = MOCK_MATCHES.filter((m) =>
    !q ? true : `${m.homeTeam.name} ${m.awayTeam.name} ${m.league} ${m.sport}`.toLowerCase().includes(q)
  );

  const matchedArticles = MOCK_ARTICLES.filter((a) =>
    !q ? true : `${a.title} ${a.excerpt} ${a.tags.join(' ')} ${a.author.name}`.toLowerCase().includes(q)
  );

  const matchedEvents = MOCK_EVENTS.filter((e) =>
    !q ? true : `${e.title} ${e.venue} ${e.city} ${e.category}`.toLowerCase().includes(q)
  );

  const matchedProducts = MOCK_PRODUCTS.filter((p) =>
    !q ? true : `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(q)
  );

  const totalResults =
    matchedMatches.length + matchedArticles.length + matchedEvents.length + matchedProducts.length;

  const suggestions = [
    'Real Madrid',
    'Shubman Gill',
    'Champions League',
    'Dune Messiah',
    'Sentinels',
    'Pro Jersey',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">
      {/* Search Bar Input */}
      <div className="bg-[#0e131f] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Universal Search Engine
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Search ARENA X
          </h1>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sports scores, articles, events, films, or official merch..."
            className="w-full bg-slate-950 border-2 border-slate-700/80 focus:border-cyan-500 rounded-2xl pl-12 pr-12 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none transition-all"
            autoFocus
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4 pointer-events-none" />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSearchParams({});
              }}
              aria-label="Clear search query"
              className="absolute right-4 top-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </form>

        {/* Suggested Queries */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-500 font-semibold mr-1">Trending Searches:</span>
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => handleSuggestionClick(item)}
              className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Filter with Count Badges */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <span>All Results</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 font-mono">
            {totalResults}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('matches')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'matches'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Matches</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 font-mono">
            {matchedMatches.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('articles')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'articles'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>News &amp; Articles</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 font-mono">
            {matchedArticles.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'events'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Events</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 font-mono">
            {matchedEvents.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-md shadow-cyan-500/20'
              : 'text-slate-400 hover:text-white bg-slate-900/60'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Merch</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 font-mono">
            {matchedProducts.length}
          </span>
        </button>
      </div>

      {/* Results View */}
      {totalResults === 0 ? (
        <div className="p-16 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
          <Search className="w-10 h-10 text-slate-600 mx-auto" />
          <h2 className="text-base font-bold text-slate-200">No results found for "{query}"</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try searching for broad terms like "Cricket", "Dune", "Champions League", or "Jersey".
          </p>
          <button
            onClick={() => handleSuggestionClick('')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg"
          >
            Reset Query
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Matches Category */}
          {(activeTab === 'all' || activeTab === 'matches') && matchedMatches.length > 0 && (
            <section aria-label="Matches search results" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-cyan-400" />
                  Matches ({matchedMatches.length})
                </h2>
                <Link to="/live" className="text-xs text-cyan-400 font-bold uppercase">
                  All Scores →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedMatches.map((m) => (
                  <MatchCard key={m.id} match={m} onSelect={setSelectedMatch} />
                ))}
              </div>
            </section>
          )}

          {/* Articles Category */}
          {(activeTab === 'all' || activeTab === 'articles') && matchedArticles.length > 0 && (
            <section aria-label="Articles search results" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-400" />
                  News &amp; Editorial ({matchedArticles.length})
                </h2>
                <Link to="/news" className="text-xs text-cyan-400 font-bold uppercase">
                  News Hub →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {matchedArticles.map((art) => (
                  <Link
                    key={art.id}
                    to={`/news/${art.slug}`}
                    className="p-5 rounded-2xl bg-[#0e131f] border border-slate-800 hover:border-cyan-500/50 flex flex-col justify-between group transition-all"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
                        {art.categoryLabel}
                      </span>
                      <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2">{art.excerpt}</p>
                    </div>
                    <span className="text-xs text-cyan-400 font-semibold mt-4 flex items-center gap-1">
                      Read full story <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Events Category */}
          {(activeTab === 'all' || activeTab === 'events') && matchedEvents.length > 0 && (
            <section aria-label="Events search results" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-400" />
                  Events ({matchedEvents.length})
                </h2>
                <Link to="/events" className="text-xs text-emerald-400 font-bold uppercase">
                  All Events →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchedEvents.map((evt) => (
                  <Link
                    key={evt.id}
                    to={`/events/${evt.slug}`}
                    className="p-5 rounded-2xl bg-[#0e131f] border border-slate-800 hover:border-emerald-500/50 flex items-center gap-4 group transition-all"
                  >
                    <img
                      src={evt.coverImage}
                      alt={evt.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                        {evt.category} • {evt.date}
                      </span>
                      <h3 className="font-bold text-sm text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mt-0.5">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">{evt.venue}, {evt.city}</p>
                      <span className="text-xs font-bold text-white mt-1 block">From ${evt.ticketPriceStartingFrom}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Products Category */}
          {(activeTab === 'all' || activeTab === 'products') && matchedProducts.length > 0 && (
            <section aria-label="Products search results" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-cyan-400" />
                  Official Merchandise ({matchedProducts.length})
                </h2>
                <Link to="/shop" className="text-xs text-cyan-400 font-bold uppercase">
                  Shop All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-[#0e131f] border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-slate-950"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-xs text-white line-clamp-1">{p.name}</h3>
                      <span className="font-display text-lg font-bold text-cyan-400 block mt-0.5">
                        ${p.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(p, p.sizes ? p.sizes[0] : undefined, 1)}
                      className="px-3 py-1.5 bg-cyan-500 text-slate-950 text-xs font-bold uppercase rounded-lg hover:bg-cyan-400 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </div>
  );
};
