import React, { useState } from 'react';
import { ShieldCheck, Lock, Eye, Cookie, Check } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const [cookieConsent, setCookieConsent] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSavePreferences = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24 text-slate-300 text-sm">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" />
          Data Governance &amp; Trust
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">
          Last revised: October 24, 2026 • Effective globally across all ARENA X digital experiences.
        </p>
      </div>

      {/* Interactive Privacy Preferences Box */}
      <div className="p-6 rounded-2xl bg-[#0e131f] border border-cyan-500/30 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Cookie className="w-5 h-5 text-cyan-400" />
          <h2 className="font-display text-xl font-bold uppercase text-white">
            Your Privacy Preferences
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Control how ARENA X personalizes match alerts, trivia leaderboards, and shopping recommendations.
        </p>
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <div>
            <span className="font-bold text-white block">Analytics &amp; Fan Zone Metrics</span>
            <span className="text-slate-400">Helps us understand popular match centers and poll turnout.</span>
          </div>
          <input
            type="checkbox"
            checked={cookieConsent}
            onChange={(e) => setCookieConsent(e.target.checked)}
            className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-cyan-500 focus:ring-cyan-500"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-emerald-400 font-semibold">
            {savedNotice ? '✓ Preferences updated' : ''}
          </span>
          <button
            onClick={handleSavePreferences}
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black uppercase rounded-lg transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>

      <div className="space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">1. Information We Collect</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            We collect information you provide directly to us when creating a community handle, subscribing to The Arena Dispatch newsletter, voting in fan polls, and ordering gear from our merchandise store. This may include your name, email address, delivery shipping address, and voluntary poll opinions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">2. How We Use Information</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Data is strictly used to deliver match schedules, fulfill merchandise deliveries, prevent duplicate poll voting, display leaderboard standings, and dispatch breaking editorial alerts. We do not sell personal fan information to third-party data brokers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">3. Demo Environment Notice</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            In this demonstration build of ARENA X, cart items, order records, poll votes, and discussion comments are stored locally within your browser session using standard local storage mechanisms. No actual credit card transactions are initiated without explicit server-side gateway integration.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">4. Contacting the Data Protection Officer</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            For data inquiries, access requests, or deletion under GDPR / CCPA regulations, please contact our team at privacy@arenax.digital.
          </p>
        </section>
      </div>
    </div>
  );
};
