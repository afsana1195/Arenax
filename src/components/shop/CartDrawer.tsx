import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    couponCode,
    applyCoupon,
    removeCoupon,
    totals,
    isDrawerOpen,
    setIsDrawerOpen,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponFeedback(res);
    if (res.success) {
      setInputCoupon('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsDrawerOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c101a] border-l border-slate-800 text-slate-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h2 id="cart-drawer-title" className="font-display text-2xl font-black uppercase tracking-wider text-white">
                Arena Gear Cart
              </h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close cart drawer"
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-300">Your cart is currently empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Equip yourself with official championship jerseys, caps, hoodies, and gaming accessories.
                </p>
                <Link
                  to="/shop"
                  onClick={() => setIsDrawerOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-cyan-400 transition-colors"
                >
                  Explore Store
                </Link>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={`${item.product.id}-${item.selectedSize ?? 'none'}-${idx}`}
                  className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/90 flex gap-3.5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 object-cover rounded-lg bg-slate-950 shrink-0 border border-slate-800"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {item.selectedSize && (
                        <p className="text-[11px] text-cyan-400 font-semibold mt-0.5">
                          Size: {item.selectedSize}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-700 rounded-lg bg-slate-950">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-display text-lg font-bold text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with promo and checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-800 bg-[#090d15] space-y-4">
              {/* Promo Coupon Code */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      Coupon "{couponCode}" Active
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-slate-400 hover:text-red-400 underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Promo code (try ARENA10)"
                      className="bg-slate-900 text-xs text-white placeholder-slate-500 px-3 py-2 rounded-lg border border-slate-700 focus:border-cyan-500 focus:outline-none flex-1 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg transition-colors uppercase"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && !couponCode && (
                  <p
                    className={`text-[11px] mt-1.5 flex items-center gap-1 ${
                      couponFeedback.success ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {couponFeedback.success ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <AlertCircle className="w-3 h-3" />
                    )}
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Order Calculations */}
              <div className="space-y-1.5 text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-200 font-mono">${totals.subtotal.toFixed(2)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-cyan-400 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-${totals.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-slate-200 font-mono">
                    {totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="text-slate-200 font-mono">${totals.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                  <span>Estimated Total</span>
                  <span className="font-display text-xl text-cyan-400 font-black">
                    ${totals.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
