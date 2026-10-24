import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Flame,
  Radio,
  Trophy,
  Film,
  Calendar,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { totalItemsCount, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsDropdown, setSportsDropdown] = useState(false);
  const [entertainmentDropdown, setEntertainmentDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm font-semibold tracking-wide transition-all relative flex items-center gap-1.5 rounded-md ${
      isActive
        ? 'text-cyan-400 bg-cyan-950/40 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-[#080b11]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1"
          aria-label="ARENA X Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all border border-cyan-400/30">
            <span className="font-display text-2xl font-black tracking-tighter text-black">X</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-3xl font-black tracking-widest text-white leading-none group-hover:text-cyan-400 transition-colors">
              ARENA<span className="text-cyan-400">X</span>
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-slate-400 leading-tight">
              SPORTS &amp; CULTURE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {/* Sports Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSportsDropdown(true)}
            onMouseLeave={() => setSportsDropdown(false)}
          >
            <NavLink to="/sports" className={navLinkClass}>
              <Trophy className="w-4 h-4 text-cyan-400" />
              Sports
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </NavLink>

            {sportsDropdown && (
              <div className="absolute top-full left-0 w-52 py-2 bg-[#0e131f] border border-slate-800 rounded-xl shadow-2xl shadow-black/80 z-50">
                <Link
                  to="/sports"
                  onClick={() => setSportsDropdown(false)}
                  className="block px-4 py-2 text-xs font-bold text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80"
                >
                  ⚡ All Sports Overview
                </Link>
                <div className="h-px bg-slate-800 my-1" />
                <Link
                  to="/sports/cricket"
                  onClick={() => setSportsDropdown(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80"
                >
                  🏏 Cricket Coverage
                </Link>
                <Link
                  to="/sports/football"
                  onClick={() => setSportsDropdown(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80"
                >
                  ⚽ Football Coverage
                </Link>
                <Link
                  to="/sports/basketball"
                  onClick={() => setSportsDropdown(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80"
                >
                  🏀 Basketball Coverage
                </Link>
                <Link
                  to="/sports/esports"
                  onClick={() => setSportsDropdown(false)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80"
                >
                  🎮 Esports Hub
                </Link>
              </div>
            )}
          </div>

          {/* Live Match Center */}
          <NavLink to="/live" className={navLinkClass}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-red-400 font-bold">Live Scores</span>
          </NavLink>

          <NavLink to="/matches" className={navLinkClass}>
            Matches
          </NavLink>

          <NavLink to="/news" className={navLinkClass}>
            News
          </NavLink>

          {/* Entertainment Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setEntertainmentDropdown(true)}
            onMouseLeave={() => setEntertainmentDropdown(false)}
          >
            <NavLink to="/entertainment" className={navLinkClass}>
              <Film className="w-4 h-4 text-purple-400" />
              Entertainment
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </NavLink>

            {entertainmentDropdown && (
              <div className="absolute top-full left-0 w-52 py-2 bg-[#0e131f] border border-slate-800 rounded-xl shadow-2xl shadow-black/80 z-50">
                <Link
                  to="/entertainment"
                  onClick={() => setEntertainmentDropdown(false)}
                  className="block px-4 py-2 text-xs font-bold text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80"
                >
                  ✨ Entertainment Hub
                </Link>
                <div className="h-px bg-slate-800 my-1" />
                <Link
                  to="/entertainment/movies"
                  onClick={() => setEntertainmentDropdown(false)}
                  className="block px-4 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80"
                >
                  🎬 Movies &amp; Box Office
                </Link>
                <Link
                  to="/entertainment/ott"
                  onClick={() => setEntertainmentDropdown(false)}
                  className="block px-4 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80"
                >
                  📺 Streaming &amp; OTT
                </Link>
                <Link
                  to="/entertainment/celebrities"
                  onClick={() => setEntertainmentDropdown(false)}
                  className="block px-4 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80"
                >
                  🌟 Celebrity Spotlight
                </Link>
              </div>
            )}
          </div>

          <NavLink to="/events" className={navLinkClass}>
            <Calendar className="w-4 h-4 text-emerald-400" />
            Events
          </NavLink>

          <NavLink to="/fan-zone" className={navLinkClass}>
            <Flame className="w-4 h-4 text-amber-400" />
            Fan Zone
          </NavLink>

          <NavLink to="/shop" className={navLinkClass}>
            Shop
          </NavLink>
        </nav>

        {/* Right Action Icons: Search + Cart + Mobile Hamburger */}
        <div className="flex items-center gap-2">
          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden sm:flex items-center relative"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sports, news, events..."
              className="bg-slate-900/90 text-sm text-slate-200 placeholder-slate-500 pl-9 pr-4 py-1.5 rounded-full border border-slate-700/80 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 w-44 md:w-60 transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          </form>

          {/* Quick Search link for smaller screens */}
          <Link
            to="/search"
            aria-label="Open search page"
            className="sm:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* Shopping Cart button */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            aria-label={`View shopping cart, ${totalItemsCount} items`}
            className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/80 rounded-lg transition-colors relative flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-black font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0d14] border-b border-slate-800 px-4 py-6 space-y-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ARENA X..."
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 focus:border-cyan-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          </form>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:text-cyan-400 text-sm font-semibold flex items-center gap-2"
            >
              Home
            </Link>
            <Link
              to="/live"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-red-950/30 border border-red-500/30 text-red-400 text-sm font-bold flex items-center gap-2"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              Live Scores
            </Link>
            <Link
              to="/sports"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:text-cyan-400 text-sm font-semibold flex items-center gap-2"
            >
              Sports Hub
            </Link>
            <Link
              to="/matches"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:text-cyan-400 text-sm font-semibold flex items-center gap-2"
            >
              Matches
            </Link>
            <Link
              to="/sports/cricket"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/40 text-slate-300 hover:text-cyan-400 text-xs font-medium"
            >
              🏏 Cricket
            </Link>
            <Link
              to="/sports/football"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/40 text-slate-300 hover:text-cyan-400 text-xs font-medium"
            >
              ⚽ Football
            </Link>
            <Link
              to="/sports/basketball"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/40 text-slate-300 hover:text-cyan-400 text-xs font-medium"
            >
              🏀 Basketball
            </Link>
            <Link
              to="/sports/esports"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/40 text-slate-300 hover:text-cyan-400 text-xs font-medium"
            >
              🎮 Esports
            </Link>
            <Link
              to="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:text-cyan-400 text-sm font-semibold flex items-center gap-2"
            >
              Latest News
            </Link>
            <Link
              to="/entertainment"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:text-cyan-400 text-sm font-semibold flex items-center gap-2"
            >
              Entertainment
            </Link>
            <Link
              to="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:text-cyan-400 text-sm font-semibold flex items-center gap-2"
            >
              Upcoming Events
            </Link>
            <Link
              to="/fan-zone"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 text-amber-400 hover:text-amber-300 text-sm font-bold flex items-center gap-2"
            >
              <Flame className="w-4 h-4" />
              Fan Zone
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-slate-900/60 text-slate-200 hover:text-cyan-400 text-sm font-semibold flex items-center gap-2 col-span-2"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              Merchandise Store ({totalItemsCount} items)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
