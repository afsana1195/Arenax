import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ArrowLeft, Home, Search, Radio, ShoppingBag } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-8 pb-32">
      <div className="relative inline-block">
        <span className="font-display text-8xl sm:text-9xl font-black text-cyan-400/20 select-none">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
            Offsides!
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase text-slate-200">
          The Page You Were Looking For Missed the Target
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          The referee blew the whistle on this URL. It might have moved, been substituted, or never existed in the stadium playbook.
        </p>
      </div>

      {/* Quick recovery links */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="px-5 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/live"
          className="px-5 py-3 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
        >
          <Radio className="w-4 h-4 text-red-400" />
          <span>Live Scores</span>
        </Link>
        <Link
          to="/search"
          className="px-5 py-3 bg-slate-900 border border-slate-700 hover:border-slate-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Search ARENA X</span>
        </Link>
      </div>
    </div>
  );
};
