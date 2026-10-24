import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Trophy, Sparkles, Flame, Users, Globe, Cpu } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      {/* Brand Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 inline-block">
          The Arena X Manifesto
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Where Athletics &amp; Entertainment Converge
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          ARENA X is built for the modern digital era—where sports fans, cinema lovers, gamers, and cultural connoisseurs refuse to be siloed into fragmented applications.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#0e131f] border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl font-bold uppercase text-white">Live Data Fidelity</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Uncompromising accuracy across Cricket, Football, Basketball, and Esports. We treat scoreboards, telemetry, and line-ups as the sacred pulse of competition.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0e131f] border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl font-bold uppercase text-white">Cinematic Editorial</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            We avoid AI clickbait and regurgitated feeds. Our writers deliver deep investigative features, tactile photography, and director retrospectives.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0e131f] border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl font-bold uppercase text-white">Fan-First Community</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Passionate debates, daily interactive trivia challenges, live prediction polls, and verified merchandise drops connect supporters across 140+ countries.
          </p>
        </div>
      </div>

      {/* Architecture & Engineering Standards */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Platform Architecture</span>
        </div>
        <h2 className="font-display text-3xl font-black text-white uppercase tracking-wide">
          Engineered for Velocity and Modular Scale
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          ARENA X operates on a decoupled TypeScript and React foundation. Data streams are orchestrated through modular providers, enabling rapid switching between demo preview telemetry and enterprise live sports feeds (Opta, Sportradar, API-Football) or ticketing gateways.
        </p>
        <div className="pt-2 flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300">Vite SPA</span>
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300">Tailwind CSS</span>
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300">React Router DOM</span>
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300">Modular REST / WebSocket Ready</span>
          <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300">WCAG AA Accessible</span>
        </div>
      </div>
    </div>
  );
};
