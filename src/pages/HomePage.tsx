import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_MATCHES, MOCK_ARTICLES, MOCK_ENTERTAINMENT_RELEASES, MOCK_EVENTS, MOCK_POLLS, MOCK_QUIZZES, MOCK_PRODUCTS } from '../data/mockData';
import { MatchCard } from '../components/matches/MatchCard';
import { MatchModal } from '../components/matches/MatchModal';
import { PollCard } from '../components/fanzone/PollCard';
import { QuizModal } from '../components/fanzone/QuizModal';
import { EventBookingModal } from '../components/events/EventBookingModal';
import { useCart } from '../context/CartContext';
import { Match, Quiz, EventItem, SportType } from '../types';
import {
  Trophy,
  Flame,
  Film,
  Calendar,
  ShoppingBag,
  ArrowRight,
  Radio,
  Play,
  Check,
  Star,
  Sparkles,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [activeSportTab, setActiveSportTab] = useState<SportType>('cricket');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [bookingEvent, setBookingEvent] = useState<EventItem | null>(null);
  const { addToCart } = useCart();
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const heroArticle = MOCK_ARTICLES[0];
  const trendingArticles = MOCK_ARTICLES.slice(1, 4);

  const sportMatches = MOCK_MATCHES.filter((m) => m.sport === activeSportTab);

  const handleQuickAdd = (product: typeof MOCK_PRODUCTS[0]) => {
    addToCart(product, product.sizes ? product.sizes[0] : undefined, 1);
    setAddedProductId(product.id);
    setTimeout(() => setAddedProductId(null), 1800);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. CINEMATIC HERO SECTION */}
      <section aria-label="Featured headline story" className="relative overflow-hidden bg-slate-950 pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-[#0d121c]">
            {/* Background Image with Dark Vignette Gradient */}
            <div className="absolute inset-0 z-0">
              <img
                src={heroArticle.coverImage}
                alt={heroArticle.title}
                className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090c13] via-[#090c13]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#090c13] via-[#090c13]/50 to-transparent" />
            </div>

            {/* Hero Editorial Content */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-3xl space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/30">
                  Featured Story
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  {heroArticle.categoryLabel}
                </span>
                <span className="text-slate-400 text-xs">• {heroArticle.readTime}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight leading-[0.95]">
                {heroArticle.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                {heroArticle.excerpt}
              </p>

              {/* Author and Action CTA */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <img
                    src={heroArticle.author.avatar}
                    alt={heroArticle.author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/50"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {heroArticle.author.name}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {heroArticle.author.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={`/news/${heroArticle.slug}`}
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/30 active:scale-95"
                  >
                    <span>Read Full Dispatch</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/live"
                    className="px-5 py-3 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                  >
                    <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                    <span>Match Center</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING EDITORIAL DISPATCHES */}
      <section aria-label="Trending news and analysis" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Arena Editorial Wire
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-wide mt-1">
              Trending Dispatches
            </h2>
          </div>
          <Link
            to="/news"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider flex items-center gap-1"
          >
            <span>All News</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingArticles.map((art) => (
            <Link
              key={art.id}
              to={`/news/${art.slug}`}
              className="group bg-[#0e131f] border border-slate-800 hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                      {art.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-slate-500 font-medium">
                    {art.publishedAt} • {art.readTime}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-4 text-xs">
                <span className="text-slate-400 font-semibold">{art.author.name}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-bold">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. SPORTS SPOTLIGHT & LIVE MATCHES */}
      <section aria-label="Sports spotlight" className="bg-[#090c13] py-14 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                Match Stadium
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-wide mt-1">
                Sports Spotlight &amp; Scores
              </h2>
            </div>

            {/* Sport Category Tabs */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
              {(['cricket', 'football', 'basketball', 'esports'] as SportType[]).map((sp) => (
                <button
                  key={sp}
                  onClick={() => setActiveSportTab(sp)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    activeSportTab === sp
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {sp === 'cricket' && '🏏 Cricket'}
                  {sp === 'football' && '⚽ Football'}
                  {sp === 'basketball' && '🏀 Basketball'}
                  {sp === 'esports' && '🎮 Esports'}
                </button>
              ))}
            </div>
          </div>

          {/* Matches Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sportMatches.map((m) => (
              <MatchCard key={m.id} match={m} onSelect={setSelectedMatch} />
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
            <span className="text-slate-500">
              Live scoreboards update synchronously. Click any match for full play-by-play scorecard.
            </span>
            <Link
              to={`/sports/${activeSportTab}`}
              className="font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider flex items-center gap-1"
            >
              <span>Explore {activeSportTab} coverage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ENTERTAINMENT & CINEMA SHOWCASE */}
      <section aria-label="Entertainment hub and releases" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-purple-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-purple-400" />
              Pop Culture &amp; Cinema
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-wide mt-1">
              Blockbusters &amp; Streaming
            </h2>
          </div>
          <Link
            to="/entertainment"
            className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors uppercase tracking-wider flex items-center gap-1"
          >
            <span>All Entertainment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_ENTERTAINMENT_RELEASES.slice(0, 4).map((rel) => (
            <div
              key={rel.id}
              className="group bg-[#0e131f] border border-slate-800 hover:border-purple-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
                  <img
                    src={rel.posterImage}
                    alt={rel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-purple-950/80 text-purple-300 border border-purple-500/40 backdrop-blur-md">
                      {rel.platform}
                    </span>
                  </div>
                  {rel.rating && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 px-2 py-0.5 rounded text-xs font-bold text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{rel.rating}</span>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                    {rel.title}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {rel.genre.map((g, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {g}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs line-clamp-2 mt-1">
                    {rel.synopsis}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-slate-800/80 mt-2 flex items-center justify-between text-xs text-slate-400">
                <span className="font-medium text-purple-400">{rel.releaseDate}</span>
                <Link
                  to={
                    rel.type === 'movie'
                      ? '/entertainment/movies'
                      : rel.type === 'ott'
                      ? '/entertainment/ott'
                      : '/entertainment/celebrities'
                  }
                  className="hover:text-white font-semibold flex items-center gap-0.5"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. UPCOMING EVENTS & TICKETING */}
      <section aria-label="Upcoming events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Global Calendar
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-wide mt-1">
              Upcoming Tournaments &amp; Arenas
            </h2>
          </div>
          <Link
            to="/events"
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider flex items-center gap-1"
          >
            <span>All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_EVENTS.slice(0, 2).map((evt) => (
            <div
              key={evt.id}
              className="bg-[#0e131f] border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col sm:flex-row"
            >
              <div className="sm:w-2/5 relative bg-slate-900">
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-full h-full object-cover min-h-[180px]"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/80 text-emerald-400 border border-emerald-500/30">
                    {evt.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:w-3/5 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-bold text-emerald-400 block mb-1">
                    {evt.date} • {evt.time}
                  </span>
                  <h3 className="font-display text-2xl font-black text-white uppercase tracking-wide leading-tight">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">From</span>
                    <span className="font-display text-xl font-bold text-white">
                      ${evt.ticketPriceStartingFrom}
                    </span>
                  </div>

                  <button
                    onClick={() => setBookingEvent(evt)}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs transition-colors shadow-lg shadow-emerald-500/20"
                  >
                    Reserve Pass
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAN ZONE SPOTLIGHT: POLL & TRIVIA TEASER */}
      <section aria-label="Fan zone community" className="bg-gradient-to-br from-[#0a0f1c] via-[#090c13] to-[#120f1e] py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-amber-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                Fan Territory
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-wide mt-1">
                Interactive Polls &amp; Mastermind Quizzes
              </h2>
            </div>
            <Link
              to="/fan-zone"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider flex items-center gap-1"
            >
              <span>Enter Fan Zone</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Featured Active Poll */}
            <div className="lg:col-span-7">
              <PollCard poll={MOCK_POLLS[0]} />
            </div>

            {/* Quiz Challenge Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#121829] to-[#0c101a] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Trophy className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Arena Trivia Challenge
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white uppercase tracking-wide">
                  {MOCK_QUIZZES[0].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {MOCK_QUIZZES[0].description} 5 multiple-choice questions with instant tactical explanations.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span>Difficulty: Medium • 5 Qs</span>
                <span className="text-amber-400 font-bold">100% Free to Play</span>
              </div>

              <button
                onClick={() => setSelectedQuiz(MOCK_QUIZZES[0])}
                className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/25 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Champions Challenge</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MERCHANDISE SPOTLIGHT */}
      <section aria-label="Official merchandise store" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              Official Merch
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-wide mt-1">
              Arena Pro Collection
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider flex items-center gap-1"
          >
            <span>Visit Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PRODUCTS.slice(0, 3).map((prod) => (
            <div
              key={prod.id}
              className="group bg-[#0e131f] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-950 mb-4 border border-slate-800">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-slate-950 shadow-md">
                      {prod.badge}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{prod.rating}</span>
                    <span className="text-slate-500">({prod.reviewCount})</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <div>
                  <span className="font-display text-2xl font-black text-white">
                    ${prod.price.toFixed(2)}
                  </span>
                  {prod.originalPrice && (
                    <span className="text-xs text-slate-500 line-through ml-2">
                      ${prod.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleQuickAdd(prod)}
                  className="px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md active:scale-95"
                >
                  {addedProductId === prod.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODALS */}
      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      <QuizModal quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
      <EventBookingModal event={bookingEvent} onClose={() => setBookingEvent(null)} />
    </div>
  );
};
