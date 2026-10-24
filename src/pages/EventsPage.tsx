import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_EVENTS } from '../data/mockData';
import { EventItem } from '../types';
import { EventBookingModal } from '../components/events/EventBookingModal';
import { DemoDataBadge } from '../components/common/DemoDataBadge';
import { Calendar, MapPin, Ticket, Search, ArrowRight, ShieldCheck } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingEvent, setBookingEvent] = useState<EventItem | null>(null);

  const categories = [
    'all',
    'Sports Championship',
    'Esports Grand Final',
    'Concert & Entertainment',
  ];

  const filteredEvents = MOCK_EVENTS.filter((evt) => {
    if (selectedCategory !== 'all' && evt.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        evt.title.toLowerCase().includes(q) ||
        evt.venue.toLowerCase().includes(q) ||
        evt.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-20">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            Arena Worldwide Directory
          </span>
          <DemoDataBadge />
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-black text-white uppercase tracking-tight">
          Upcoming Stadium Events &amp; Festivals
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
          Witness legendary sports finals, esports stadium tournaments, and world tour concerts live from the stands.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0e131f] p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-emerald-500 text-slate-950 font-black'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'All Events' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search venue or event..."
            className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((evt) => (
          <div
            key={evt.id}
            className="group bg-[#0e131f] border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  src={evt.coverImage}
                  alt={evt.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                    {evt.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{evt.date}</span>
                  <span>•</span>
                  <span>{evt.time}</span>
                </div>

                <Link to={`/events/${evt.slug}`}>
                  <h3 className="font-display text-2xl font-black text-white group-hover:text-emerald-300 transition-colors uppercase tracking-wide leading-tight">
                    {evt.title}
                  </h3>
                </Link>

                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{evt.venue}, {evt.city}, {evt.country}</span>
                </p>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                {/* Available Tiers pill */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {evt.ticketTiers.map((t) => (
                    <span
                      key={t.id}
                      className={`text-[10px] px-2 py-0.5 rounded border ${
                        t.available
                          ? 'border-slate-800 bg-slate-900/60 text-slate-300'
                          : 'border-red-950/40 bg-red-950/20 text-red-400 line-through'
                      }`}
                    >
                      {t.name} (${t.price})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">From</span>
                <span className="font-display text-2xl font-black text-white">
                  ${evt.ticketPriceStartingFrom}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/events/${evt.slug}`}
                  className="px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-200 hover:text-white text-xs font-bold uppercase transition-colors"
                >
                  Details
                </Link>
                <button
                  onClick={() => setBookingEvent(evt)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Reserve Pass</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <EventBookingModal event={bookingEvent} onClose={() => setBookingEvent(null)} />
    </div>
  );
};
