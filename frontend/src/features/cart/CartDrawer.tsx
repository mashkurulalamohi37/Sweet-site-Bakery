import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, MessageCircle, AlertCircle, Plus, Minus, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { formatBDT, getWhatsAppLink } from '../../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    totalPrice,
    totalItems,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
  } = useCartStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const minOrderAmount = 499;
  const isMinOrderMet = totalPrice >= minOrderAmount;
  const missingAmount = Math.max(0, minOrderAmount - totalPrice);
  const minOrderProgress = Math.min(100, (totalPrice / minOrderAmount) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!inputCoupon.trim()) return;

    if (inputCoupon.trim().toUpperCase() === 'SWEET10') {
      applyCoupon('SWEET10', 0.1);
      setInputCoupon('');
    } else if (inputCoupon.trim().toUpperCase() === 'WELCOME50') {
      applyCoupon('WELCOME50', 50);
      setInputCoupon('');
    } else {
      setCouponError('Invalid coupon code. Try SWEET10 for 10% off!');
    }
  };

  const handleProceedCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleWhatsAppCheckout = () => {
    const itemsList = items
      .map(
        (i, idx) =>
          `${idx + 1}. *${i.product.name}* (${i.selected_weight_lbs} Lb × ${i.quantity})\n   • Price: ${formatBDT(
            i.unit_price * i.quantity
          )} (${formatBDT(i.unit_price)} each)${i.customization_notes?.inscription_text ? `\n   • Message on Cake: "${i.customization_notes.inscription_text}"` : ''}`
      )
      .join('\n\n');

    const msg = `Hello Sweet Site Bakery! 🎂✨

I would like to place an order for the following items:

📦 ORDER ITEMS:
${itemsList}

💰 BASKET TOTAL:
• Subtotal: ${formatBDT(totalPrice)}
• Delivery: (To be confirmed in Rangpur)

Please confirm order availability, delivery schedule, and payment details. Thank you!`;

    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={closeCart} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <aside aria-label="Shopping Cart Drawer" className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-brand-brown/10 animate-slide-left">
          {/* Header */}
          <div className="p-5 border-b border-brand-brown/10 flex items-center justify-between bg-brand-cream/30">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-brand-brown" />
              <h2 className="font-serif text-xl font-bold text-brand-brown">Your Royal Basket</h2>
              <span className="bg-brand-accent/30 text-brand-brown text-xs font-bold px-2.5 py-0.5 rounded-full">
                {totalItems} item{totalItems !== 1 ? 's' : ''}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-full text-brand-brown/70 hover:text-brand-brown hover:bg-brand-cream transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Minimum Order Progress Bar */}
          <div className="bg-brand-cream/60 px-5 py-3 border-b border-brand-brown/10 text-xs">
            <div className="flex items-center justify-between font-medium mb-1.5">
              <span className="text-brand-brown">
                {isMinOrderMet ? '✨ Minimum order requirement met!' : `Add ${formatBDT(missingAmount)} more for min. order`}
              </span>
              <span className="font-bold text-brand-brown">{Math.round(minOrderProgress)}%</span>
            </div>
            <div className="w-full h-2 bg-brand-brown/10 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  isMinOrderMet ? 'bg-green-600' : 'bg-brand-accent'
                }`}
                style={{ width: `${minOrderProgress}%` }}
              />
            </div>
            {!isMinOrderMet && (
              <p className="text-[11px] text-brand-muted mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-brand-accent" /> Minimum order is ৳499 for fresh Rangpur delivery.
              </p>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-brand-brown/10">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-brand-cream flex items-center justify-center text-3xl">
                  🎂
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-brown">Your Basket is Empty</h3>
                  <p className="text-xs text-brand-muted mt-1 max-w-xs">
                    Satisfy your sweet cravings with our 28 royal pound cakes or artisan bakes!
                  </p>
                </div>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="px-6 py-3 rounded-full bg-brand-brown hover:bg-brand-brown-light text-white text-xs font-semibold tracking-wider transition-colors shadow-md"
                >
                  Explore Flavour Menu
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-brand-brown/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-brand-brown text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-brand-muted/60 hover:text-red-500 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.selected_weight_lbs && (
                        <span className="inline-block text-[11px] font-semibold text-brand-brown/80 bg-brand-cream px-2 py-0.5 rounded-md mt-0.5">
                          {item.selected_weight_lbs} Lb{item.selected_weight_lbs > 1 ? 's' : ''}
                        </span>
                      )}

                      {item.customization_notes?.inscription_text && (
                        <p className="text-[11px] text-brand-muted italic mt-0.5 truncate">
                          "{item.customization_notes.inscription_text}"
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2 bg-brand-cream/70 px-2.5 py-1 rounded-lg border border-brand-brown/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-brand-brown hover:text-brand-accent p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-brand-brown w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-brand-brown hover:text-brand-accent p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-brand-brown text-sm">
                        {formatBDT(item.unit_price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout & WhatsApp */}
          {items.length > 0 && (
            <div className="p-5 border-t border-brand-brown/10 bg-brand-cream/20 space-y-4">
              {/* Coupon Code section */}
              {couponCode ? (
                <div className="flex items-center justify-between text-xs bg-green-50 text-green-800 p-2.5 rounded-xl border border-green-200">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Tag className="w-3.5 h-3.5 text-green-600" />
                    <span>Coupon '{couponCode}' Applied ({formatBDT(discountAmount)} OFF)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-red-600 font-bold hover:underline text-[11px]"
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
                    placeholder="Enter Coupon (SWEET10)"
                    className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-brown hover:bg-brand-brown-light text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-500 font-medium">{couponError}</p>}

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs text-brand-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-brown">{formatBDT(totalPrice)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span>-{formatBDT(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-brand-brown pt-1.5 border-t border-brand-brown/10">
                  <span>Total Payable</span>
                  <span className="font-serif text-lg text-brand-brown">
                    {formatBDT(Math.max(0, totalPrice - discountAmount))}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  disabled={!isMinOrderMet}
                  onClick={handleProceedCheckout}
                  className={`w-full py-3.5 rounded-2xl font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    isMinOrderMet
                      ? 'bg-brand-brown hover:bg-brand-brown-light text-white cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 rounded-2xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant Order via WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
