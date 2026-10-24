import React, { useState } from 'react';
import { isValidEmail } from '../utils/pureLogic';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('Editorial & Tips');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('Please provide a message with at least 10 characters.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Where does ARENA X source its live scores and sports data?',
      a: 'During current development preview, scores are orchestrated using high-fidelity demo data modules. Our backend is pre-wired to ingest live feeds from tier-1 sports data providers (Sportradar, Opta, and Riot Games API).',
    },
    {
      q: 'How does merchandise shipping work?',
      a: 'We ship globally from fulfilment hubs in London, New York, and Singapore. Standard tracked delivery takes 3-5 business days. Free shipping applies on all orders exceeding $75.',
    },
    {
      q: 'How do I pitch an editorial story or investigative feature?',
      a: 'Select "Editorial & Tips" in the contact form with a 150-word synopsis, proposed angle, and previous published clips.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-cyan-400 font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5">
          <Mail className="w-4 h-4" />
          Get In Touch
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Contact ARENA X Desk
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          Reach out to our global editorial newsroom, merchandise support, or commercial partnerships desk.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#0e131f] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-display text-3xl font-black text-white uppercase tracking-wide">
                Dispatch Received!
              </h2>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you, <span className="font-bold text-white">{name}</span>. Your inquiry regarding{' '}
                <span className="text-cyan-400 font-semibold">{category}</span> has been routed to our team. We aim to respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setName('');
                  setEmail('');
                  setMessage('');
                  setSubmitted(false);
                }}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold uppercase tracking-wider text-white rounded-xl transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide">
                Send a Message
              </h2>

              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jordan Smith"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-category" className="block text-xs font-semibold text-slate-400 mb-1">
                  Department
                </label>
                <select
                  id="contact-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="Editorial & Tips">Editorial &amp; Breaking News Tips</option>
                  <option value="Commercial & Sponsorship">Commercial &amp; Brand Sponsorship</option>
                  <option value="Merchandise Orders">Merchandise &amp; Gear Orders</option>
                  <option value="Event Ticketing">Event Passes &amp; Ticketing</option>
                  <option value="Engineering & API Integration">Engineering &amp; API Integration</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-400 mb-1">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="How can our bureau assist you today?"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Bureau Locations & FAQs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0e131f] border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
              Global Bureaus
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">London Hub (HQ)</p>
                  <p className="text-slate-400">120 Olympic Way, Wembley Stadium Quarter, London</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Los Angeles Bureau</p>
                  <p className="text-slate-400">Sunset Media Tower, Hollywood, CA</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Press Desk</p>
                  <p className="text-slate-400">press@arenax.digital</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="bg-[#0e131f] border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <h3 className="font-display text-xl font-bold uppercase tracking-wider text-white">
                Frequently Asked
              </h3>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="space-y-1 pb-3 border-b border-slate-800/80 last:border-0 last:pb-0">
                  <h4 className="text-xs font-bold text-white">{faq.q}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
