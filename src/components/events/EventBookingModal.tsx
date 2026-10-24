import React, { useState } from 'react';
import { EventItem } from '../../types';
import { DemoDataBadge } from '../common/DemoDataBadge';
import confetti from 'canvas-confetti';
import { X, Calendar, MapPin, Ticket, ShieldCheck, CheckCircle2, QrCode } from 'lucide-react';

interface EventBookingModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventBookingModal: React.FC<EventBookingModalProps> = ({ event, onClose }) => {
  const [selectedTierId, setSelectedTierId] = useState<string>(() => event?.ticketTiers[0]?.id || '');
  const [quantity, setQuantity] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmedVoucher, setConfirmedVoucher] = useState<{
    passId: string;
    tierName: string;
    total: number;
  } | null>(null);

  if (!event) return null;

  const currentTier = event.ticketTiers.find((t) => t.id === selectedTierId) || event.ticketTiers[0];
  const totalPrice = (currentTier?.price || 0) * quantity;

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setConfirmedVoucher({
      passId: `TKT-ARX-${Math.floor(100000 + Math.random() * 900000)}`,
      tierName: currentTier.name,
      total: totalPrice,
    });

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00d2ff', '#3b82f6', '#10b981'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-booking-title"
    >
      <div className="relative w-full max-w-xl bg-[#0c101a] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-cyan-400" />
            <h2 id="event-booking-title" className="font-display text-xl font-bold uppercase tracking-wider text-white">
              {confirmedVoucher ? 'Access Pass Confirmed' : 'Reserve Event Pass'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close ticket booking"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {confirmedVoucher ? (
            /* Ticket Pass Voucher */
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl font-black text-white uppercase tracking-wide">
                  Demo Pass Issued
                </h3>
                <p className="text-xs text-slate-300">
                  Demo reservation voucher for {name} ({email})
                </p>
              </div>

              {/* Boarding-style ticket badge */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-5 space-y-4 shadow-xl">
                <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block">
                      ARENA X OFFICIAL EVENT PASS
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">{event.title}</h4>
                  </div>
                  <DemoDataBadge compact />
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Date &amp; Time</span>
                    <span className="font-semibold text-slate-200">{event.date} • {event.time}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Venue</span>
                    <span className="font-semibold text-slate-200">{event.venue}, {event.city}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tier &amp; Quantity</span>
                    <span className="font-semibold text-cyan-300">{quantity}x {confirmedVoucher.tierName}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Pass Reference</span>
                    <span className="font-mono font-bold text-slate-200">{confirmedVoucher.passId}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Total Allocated</span>
                    <span className="font-display text-xl font-black text-white">${confirmedVoucher.total}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg text-black">
                    <QrCode className="w-8 h-8" />
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs transition-colors"
              >
                Close Pass
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleConfirmReservation} className="space-y-5">
              {/* Event Mini card */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <img
                  src={event.coverImage}
                  alt={event.title}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-white line-clamp-1">{event.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{event.date}</span>
                    <span>•</span>
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{event.city}</span>
                  </div>
                </div>
              </div>

              {/* Notice */}
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  Simulated ticketing demo. Real ticketing integrates directly with official stadium box offices.
                </span>
              </div>

              {/* Tier Selection */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Seating Tier
                </label>
                <div className="space-y-2">
                  {event.ticketTiers.map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => tier.available && setSelectedTierId(tier.id)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                        selectedTierId === tier.id
                          ? 'border-cyan-500 bg-cyan-950/40 text-white'
                          : tier.available
                          ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700'
                          : 'border-slate-800/40 bg-slate-950/40 text-slate-600 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm">{tier.name}</span>
                          {!tier.available && (
                            <span className="text-[10px] uppercase font-bold text-red-400 bg-red-950/60 px-1.5 py-0.5 rounded">
                              Sold Out
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{tier.description}</p>
                      </div>
                      <span className="font-display text-lg font-bold text-cyan-400">
                        ${tier.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Number of Passes
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold hover:bg-slate-700"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-sm text-white w-4 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(8, q + 1))}
                    className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold hover:bg-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="evt-name" className="block text-xs font-semibold text-slate-400 mb-1">
                    Attendee Name *
                  </label>
                  <input
                    id="evt-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="evt-email" className="block text-xs font-semibold text-slate-400 mb-1">
                    Delivery Email *
                  </label>
                  <input
                    id="evt-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Est:</span>
                  <span className="font-display text-2xl font-black text-cyan-400">
                    ${totalPrice}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs transition-colors shadow-lg shadow-cyan-500/20 active:scale-95"
                >
                  Generate Demo Pass
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
