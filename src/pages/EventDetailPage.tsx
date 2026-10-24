import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_EVENTS } from '../data/mockData';
import { EventItem } from '../types';
import { EventBookingModal } from '../components/events/EventBookingModal';
import { DemoDataBadge } from '../components/common/DemoDataBadge';
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [bookingEvent, setBookingEvent] = useState<EventItem | null>(null);

  const event = MOCK_EVENTS.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-display text-3xl font-black text-white uppercase">Event Not Found</h1>
        <p className="text-slate-400 text-sm">
          The requested event could not be found or has concluded.
        </p>
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Events Directory</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-emerald-400">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to="/events" className="hover:text-emerald-400">Events</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-emerald-400 truncate max-w-xs">{event.title}</span>
      </nav>

      {/* Hero Showcase Card */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#0c101a] shadow-2xl">
        <div className="relative aspect-[21/9] min-h-[260px] bg-slate-950">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-[#0c101a]/40 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-lg">
              {event.category}
            </span>
            <DemoDataBadge />
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {event.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                {event.time}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400" />
                {event.venue}, {event.city}, {event.country}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              {event.title}
            </h1>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {event.description}
          </p>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold block">Pass Pricing Starts At</span>
              <span className="font-display text-3xl font-black text-emerald-400">
                ${event.ticketPriceStartingFrom} USD
              </span>
            </div>

            <button
              onClick={() => setBookingEvent(event)}
              className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Pass / Reserve Demo Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* Ticket Tiers Breakdown */}
      <section aria-label="Available ticket tiers" className="space-y-4">
        <h2 className="font-display text-2xl font-black text-white uppercase tracking-wide">
          Available Ticket Tiers &amp; Access Perks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {event.ticketTiers.map((tier) => (
            <div
              key={tier.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                tier.available
                  ? 'bg-[#0e131f] border-slate-800 hover:border-emerald-500/50'
                  : 'bg-slate-950/40 border-slate-900 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-base text-white">{tier.name}</h3>
                  <span className="font-display text-2xl font-black text-emerald-400">
                    ${tier.price}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{tier.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 mt-4">
                {tier.available ? (
                  <button
                    onClick={() => setBookingEvent(event)}
                    className="w-full py-2.5 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Select Tier
                  </button>
                ) : (
                  <span className="block text-center text-xs font-bold uppercase text-red-400 py-2">
                    Tier Sold Out
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Venue Guidelines & Integration Note */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 text-xs text-slate-400">
        <div className="flex items-center gap-2 text-slate-200 font-bold uppercase">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Arena Ticketing Protocol &amp; Verification</span>
        </div>
        <p>
          Simulated ticketing pass engine for developmental demo. In production, ARENA X connects directly to stadium barcode turnstile systems and verified providers (e.g. Ticketmaster, SeatGeek, AXS).
        </p>
      </div>

      <EventBookingModal event={bookingEvent} onClose={() => setBookingEvent(null)} />
    </div>
  );
};
