import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { isValidEmail } from '../../utils/pureLogic';
import { Mail, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!consent) {
      setStatus('error');
      setErrorMessage('Please consent to receiving sports & entertainment updates.');
      return;
    }

    // Save subscriber in localStorage
    try {
      const subs = JSON.parse(localStorage.getItem('arenax_subscribers') || '[]');
      if (!subs.includes(email)) {
        subs.push(email);
        localStorage.setItem('arenax_subscribers', JSON.stringify(subs));
      }
    } catch {
      // ignore
    }

    setStatus('success');
    setEmail('');
  };

  return (
    <footer className="bg-[#05070a] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Callout Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/20 rounded-2xl p-8 mb-16 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                The Arena Dispatch
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-wide">
                Never Miss a Buzzer Beater, Premiere, or Drop
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Get morning match recaps, breaking Hollywood news, exclusive merchandise access, and fan community poll results straight to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {status === 'success' ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center gap-3 text-emerald-300">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">You are officially in the Arena!</p>
                    <p className="text-xs text-emerald-400/80">Check your inbox for a welcome dispatch &amp; 10% merchandise code.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your email address"
                      className="bg-slate-950/90 text-white placeholder-slate-500 px-4 py-3 rounded-xl border border-slate-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 flex-1 text-sm"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
                    >
                      <span>Join Free</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="footer-consent"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500 w-4 h-4"
                    />
                    <label htmlFor="footer-consent" className="text-xs text-slate-400">
                      I agree to receive dispatches from ARENA X and accept the{' '}
                      <Link to="/privacy-policy" className="text-cyan-400 hover:underline">
                        Privacy Policy
                      </Link>
                      . Unsubscribe anytime.
                    </label>
                  </div>

                  {status === 'error' && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center font-display text-xl font-black text-black">
                X
              </div>
              <span className="font-display text-2xl font-black tracking-widest text-white">
                ARENA<span className="text-cyan-400">X</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global media destination uniting elite athletics, theatrical cinema, streaming culture, and passionate fandom into one electrifying stadium.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Independent Editorial Standards</span>
            </div>
          </div>

          {/* Sports Hub */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Sports Hub</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/sports" className="hover:text-cyan-400 transition-colors">All Sports Hub</Link>
              </li>
              <li>
                <Link to="/sports/cricket" className="hover:text-cyan-400 transition-colors">Cricket (IPL &amp; ICC)</Link>
              </li>
              <li>
                <Link to="/sports/football" className="hover:text-cyan-400 transition-colors">Football (Champions League)</Link>
              </li>
              <li>
                <Link to="/sports/basketball" className="hover:text-cyan-400 transition-colors">Basketball (NBA)</Link>
              </li>
              <li>
                <Link to="/sports/esports" className="hover:text-cyan-400 transition-colors">Esports (Valorant &amp; LoL)</Link>
              </li>
              <li>
                <Link to="/live" className="text-red-400 font-bold hover:text-red-300 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  Live Match Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Entertainment */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Entertainment</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/entertainment" className="hover:text-cyan-400 transition-colors">Entertainment Hub</Link>
              </li>
              <li>
                <Link to="/entertainment/movies" className="hover:text-cyan-400 transition-colors">Movies &amp; Blockbusters</Link>
              </li>
              <li>
                <Link to="/entertainment/ott" className="hover:text-cyan-400 transition-colors">Streaming &amp; Web Series</Link>
              </li>
              <li>
                <Link to="/entertainment/celebrities" className="hover:text-cyan-400 transition-colors">Celebrity Spotlight</Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-cyan-400 transition-colors">Concerts &amp; Arenas</Link>
              </li>
            </ul>
          </div>

          {/* Community & Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Fan Experience</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/fan-zone" className="hover:text-cyan-400 transition-colors">Fan Zone &amp; Community</Link>
              </li>
              <li>
                <Link to="/fan-zone" className="hover:text-cyan-400 transition-colors">Interactive MVP Polls</Link>
              </li>
              <li>
                <Link to="/fan-zone" className="hover:text-cyan-400 transition-colors">Sports &amp; Film Quizzes</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-cyan-400 transition-colors">Official Merchandise Store</Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-cyan-400 transition-colors">Global Content Search</Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Brand &amp; Legal</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">About ARENA X</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact Editorial &amp; Support</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* API Disclaimer & Copyright */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold uppercase text-[10px]">
              Demo Data Notice
            </span>
            <p className="max-w-xl">
              Live scores, match timelines, and ticket checkout flows are simulated for development demonstration. Built with a modular data architecture ready for third-party Sports Data &amp; Supabase API configuration.
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <p>© {new Date().getFullYear()} ARENA X Digital Media Group. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
