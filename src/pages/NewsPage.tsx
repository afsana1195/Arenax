import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ARTICLES } from '../data/mockData';
import { filterArticles } from '../utils/pureLogic';
import { Search, Flame, ArrowRight, Clock, User } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = filterArticles(MOCK_ARTICLES, {
    category: selectedCategory,
    search: searchQuery,
  });

  const featured = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const listArticles = filteredArticles.filter((a) => a.id !== featured?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-20">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-400" />
          ARENA X Editorial Bureau
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          News, Tactics &amp; Culture
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
          Deep investigative reporting, post-match tactical analysis, blockbuster movie releases, and cultural dispatches.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0e131f] p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
          {[
            { id: 'all', label: 'All News' },
            { id: 'sports', label: 'Sports' },
            { id: 'cricket', label: 'Cricket' },
            { id: 'football', label: 'Football' },
            { id: 'basketball', label: 'Hoops' },
            { id: 'esports', label: 'Esports' },
            { id: 'entertainment', label: 'Entertainment' },
            { id: 'movies', label: 'Movies' },
            { id: 'ott', label: 'OTT' },
            { id: 'celebrities', label: 'Celebrities' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-black'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news & headlines..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Featured Headline Story (if any) */}
      {featured && (
        <section aria-label="Featured headline dispatch" className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0d121c] group">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] bg-slate-900 overflow-hidden">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-lg">
                  Lead Story
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-cyan-400 uppercase tracking-wider">
                    {featured.categoryLabel}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{featured.readTime}</span>
                </div>

                <h2 className="font-display text-2xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight group-hover:text-cyan-300 transition-colors">
                  {featured.title}
                </h2>

                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-4">
                  {featured.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featured.author.avatar}
                    alt={featured.author.name}
                    className="w-8 h-8 rounded-full object-cover border border-cyan-500/40"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {featured.author.name}
                    </span>
                    <span className="text-[10px] text-slate-400">{featured.publishedAt}</span>
                  </div>
                </div>

                <Link
                  to={`/news/${featured.slug}`}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-1 transition-all"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid of news articles */}
      <section aria-label="Latest articles list">
        <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide mb-6">
          Latest Dispatches ({filteredArticles.length})
        </h2>

        {listArticles.length === 0 && !featured ? (
          <div className="p-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
            No articles found matching "{searchQuery}". Try a different keyword or category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listArticles.map((art) => (
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
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-bold text-cyan-400 uppercase tracking-wider">
                        {art.categoryLabel}
                      </span>
                      <span>{art.readTime}</span>
                    </div>

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
        )}
      </section>
    </div>
  );
};
