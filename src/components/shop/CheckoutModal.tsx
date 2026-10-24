import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { isValidEmail } from '../../utils/pureLogic';
import { OrderDetails } from '../../types';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Truck,
  PackageCheck,
  Lock,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, totals, items, placeOrder } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postal, setPostal] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay'>('card');
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMsg('Please enter a valid delivery email address.');
      return;
    }
    if (!street.trim() || !city.trim() || !postal.trim()) {
      setErrorMsg('Please complete your full shipping address.');
      return;
    }

    setErrorMsg('');
    setIsProcessing(true);

    // Simulate verified order authorization
    setTimeout(() => {
      const order = placeOrder({
        name: name.trim(),
        email: email.trim(),
        address: `${street.trim()}, ${city.trim()} ${postal.trim()}`,
        paymentMethod:
          paymentMethod === 'card'
            ? 'Credit Card (Simulated)'
            : paymentMethod === 'apple_pay'
            ? 'Apple Pay'
            : 'Google Pay',
      });

      setIsProcessing(false);
      setConfirmedOrder(order);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00d2ff', '#3b82f6', '#f59e0b', '#ffffff'],
        });
      } catch {
        // ignore
      }
    }, 1000);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#0c101a] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <h2 id="checkout-modal-title" className="font-display text-2xl font-bold uppercase tracking-wider text-white">
              {confirmedOrder ? 'Order Confirmation' : 'Secure Checkout'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close checkout"
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedOrder ? (
          /* Verified Order Receipt */
          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-3xl font-black text-white uppercase tracking-wider">
                Order Confirmed!
              </h3>
              <p className="text-slate-300 text-sm max-w-md mx-auto">
                Thank you, <span className="font-bold text-white">{confirmedOrder.customerName}</span>. A dispatch confirmation receipt has been sent to{' '}
                <span className="font-semibold text-cyan-400">{confirmedOrder.email}</span>.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
              <div className="flex justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400 font-bold uppercase">Order Reference:</span>
                <span className="font-mono font-bold text-white text-sm">{confirmedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination:</span>
                <span className="text-slate-200 text-right">{confirmedOrder.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Gateway:</span>
                <span className="text-cyan-400 font-semibold">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Delivery:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" /> 3-5 Business Days
                </span>
              </div>

              {/* Items recap */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <span className="font-bold text-slate-300 uppercase tracking-wider block">
                  Items Ordered ({confirmedOrder.items.length})
                </span>
                {confirmedOrder.items.map((it, i) => (
                  <div key={i} className="flex justify-between text-slate-300">
                    <span>
                      {it.quantity}x {it.product.name} {it.selectedSize ? `(${it.selectedSize})` : ''}
                    </span>
                    <span className="font-mono">${(it.product.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-between text-sm font-bold text-white">
                <span>Total Paid</span>
                <span className="font-display text-lg text-cyan-400 font-black">
                  ${confirmedOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Demo mode confirmation: order recorded in local storage. Production environments integrate Stripe or Supabase webhooks for automated order dispatch.
              </span>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs transition-colors"
            >
              Continue Exploring ARENA X
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
            {/* Demo Simulation Notice */}
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>
                Simulator Mode: No actual financial charge will occur. Order validation and inventory handling are fully interactive.
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Shipping Info */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                1. Shipping Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="chk-name" className="block text-xs font-semibold text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    id="chk-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jordan Smith"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="chk-email" className="block text-xs font-semibold text-slate-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    id="chk-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="chk-street" className="block text-xs font-semibold text-slate-400 mb-1">
                    Street Address *
                  </label>
                  <input
                    id="chk-street"
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="123 Championship Way, Suite 4B"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="chk-city" className="block text-xs font-semibold text-slate-400 mb-1">
                    City *
                  </label>
                  <input
                    id="chk-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="chk-postal" className="block text-xs font-semibold text-slate-400 mb-1">
                    Postal Code *
                  </label>
                  <input
                    id="chk-postal"
                    type="text"
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    placeholder="10001"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Gateway Options */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                2. Payment Method
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'card'
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
                  <span className="text-xs font-bold block">Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-black text-sm block mb-1"> Pay</span>
                  <span className="text-xs font-bold block">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_pay')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'google_pay'
                      ? 'border-cyan-500 bg-cyan-950/40 text-cyan-300'
                      : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-black text-sm block mb-1 text-emerald-400">G Pay</span>
                  <span className="text-xs font-bold block">Google Pay</span>
                </button>
              </div>
            </div>

            {/* Summary & Submit */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Total Due:</span>
                <span className="font-display text-2xl font-black text-cyan-400">
                  ${totals.total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
              >
                {isProcessing ? (
                  <span>Verifying Order...</span>
                ) : (
                  <>
                    <PackageCheck className="w-4 h-4" />
                    <span>Authorize &amp; Complete Order</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
