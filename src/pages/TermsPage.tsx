import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24 text-slate-300 text-sm">
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
          <FileText className="w-4 h-4" />
          Legal Agreement
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="text-xs text-slate-400">
          Last revised: October 24, 2026 • Governing access to ARENA X digital media services.
        </p>
      </div>

      <div className="space-y-6 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">1. Acceptance of Terms</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            By accessing or browsing ARENA X, you agree to be bound by these Terms of Service, all applicable laws, and our community standards. If you disagree with any portion of these terms, you should discontinue use of the platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">2. Live Scores, Sports Feeds &amp; Demo Data</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Sports match scores, event dates, and live statistics are provided for informational and entertainment purposes. During development and evaluation builds, simulated demo datasets are clearly labeled. ARENA X makes no guarantees against momentary latency or data transmission discrepancies in third-party telemetry.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">3. Merchandise Store &amp; Orders</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            All physical merchandise orders are subject to stock availability and address verification. In development simulator mode, mock checkout receipts demonstrate frontend workflows and do not constitute actual credit billing.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">4. Fan Community Conduct</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Users must maintain respectful sportsmanship in discussion forums and poll commentary. Defamation, hate speech, spam promotion, or impersonation of athletes or staff will result in immediate termination of commenting privileges.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white uppercase tracking-wide">5. Intellectual Property</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            ARENA X, the ARENA X shield logo, and custom editorial prose are trademarks of ARENA X Digital Media Group. Team logos and trademarks referenced belong to their respective leagues, clubs, and sports federations.
          </p>
        </section>
      </div>
    </div>
  );
};
