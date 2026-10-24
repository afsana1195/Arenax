import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ENTERTAINMENT_RELEASES, MOCK_ARTICLES } from '../data/mockData';
import { filterArticles } from '../utils/pureLogic';
import { Film, Tv, Sparkles, Star, Calendar, ArrowRight, Play, Search } from 'lucide-react';

export const EntertainmentPage: React.FC = () => {
  const { subcategory } = useParams<{ subcategory?: string }>();
  const [searchQuery, setSearchQuery] = useState('');

  const currentType =
    subcategory === 'movies'
      ? 'movie'
      : subcategory === 'ott'
      ? 'ott'
      : subcategory === 'celebrities'
      ? 'celebrity'
      : 'all';

  const filteredReleases = MOCK_ENTERTAINMENT_RELEASES.filter((r) => {
    if (currentType !== 'all' && r.type !== currentType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        r.title.toLowerCase().includes(q) ||
        r.synopsis.toLowerCase().includes(q) ||
        r.cast.join(' ').toLowerCase().includes(q)
      );
    }
    return true;
  });

  const entertainmentArticles = filterArticles(MOCK_ARTICLES, {
    category:
      subcategory === 'movies'
        ? 'movies'
        : subcategory === 'ott'
        ? 'ott'
        : subcategory === 'celebrities'
        ? 'celebrities'
        : 'entertainment',
    search: searchQuery,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-8 sm:p-12 border border-purple-500/20 shadow-2xl">
        <div className="max-w-2xl space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Cinema, Streaming &amp; Culture Hub
          </span>
          <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
            {subcategory === 'movies'
              ? 'Movies & Box Office'
              : subcategory === 'ott'
              ? 'Streaming & Web Series'
              : subcategory === 'celebrities'
              ? 'Celebrity Spotlight'
              : 'Entertainment Center'}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            From Hollywood IMAX premieres to binge-worthy streaming drops, explore curated editorial releases, trailers, cast interviews, and ratings.
          </p>
        </div>
      </div>

      {/* Subcategory Pills + Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0e131f] p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <Link
            to="/entertainment"
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
              !subcategory
                ? 'bg-purple-500 text-slate-950 font-black shadow-lg shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            All Entertainment
          </Link>
          <Link
            to="/entertainment/movies"
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
              subcategory === 'movies'
                ? 'bg-purple-500 text-slate-950 font-black shadow-lg shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            Movies
          </Link>
          <Link
            to="/entertainment/ott"
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
              subcategory === 'ott'
                ? 'bg-purple-500 text-slate-950 font-black shadow-lg shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            Streaming (OTT)
          </Link>
          <Link
            to="/entertainment/celebrities"
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
              subcategory === 'celebrities'
                ? 'bg-purple-500 text-slate-950 font-black shadow-lg shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Celebrities
          </Link>
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search titles, actors, platform..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-purple-500 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Featured Releases Grid */}
      <section aria-label="Releases and premieres">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-wide mb-6">
          Upcoming Releases &amp; Highlights ({filteredReleases.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReleases.map((item) => (
            <div
              key={item.id}
              className="bg-[#0e131f] border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.backdropImage || item.posterImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-950/90 text-purple-300 border border-purple-500/40 backdrop-blur-md">
                      {item.platform}
                    </span>
                  </div>
                  {item.rating && (
                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-amber-400 text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {item.genre.map((g, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {g}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {item.synopsis}
                  </p>
                  <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="font-bold text-slate-300">Cast: </span>
                    <span>{item.cast.join(', ')}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs">
                <span className="text-purple-400 font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.releaseDate}
                </span>

                <a
                  href={item.trailerUrl || 'https://www.youtube.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white text-slate-300 text-xs font-bold uppercase transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Teaser</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Entertainment Articles */}
      <section aria-label="Entertainment dispatches">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-wide mb-6">
          Entertainment Editorial Dispatches
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {entertainmentArticles.map((art) => (
            <Link
              key={art.id}
              to={`/news/${art.slug}`}
              className="group bg-[#0e131f] border border-slate-800 hover:border-purple-500/50 rounded-2xl overflow-hidden p-5 flex flex-col justify-between transition-all"
            >
              <div>
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full aspect-[16/10] object-cover rounded-xl mb-3"
                />
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                  {art.categoryLabel}
                </span>
                <h3 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors line-clamp-2 mt-1">
                  {art.title}
                </h3>
              </div>
              <span className="text-xs text-purple-400 font-semibold mt-4 flex items-center gap-1">
                Read full feature <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
