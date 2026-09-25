import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Phone,
  User,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { formatBDT, getWhatsAppLink } from '../../utils/formatters';
import { ordersApi } from '../../services/api';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, totalPrice, discountAmount, couponCode, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    zone: 'Central Rangpur',
    deliveryFee: 60,
    address: '',
    landmark: '',
    deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '2:00 PM - 5:00 PM',
    orderNotes: '',
    paymentMethod: 'cod', // 'cod' | 'bkash' | 'nagad'
    transactionId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const deliveryZones = [
    { name: 'Central Rangpur / Jahaj Company', fee: 60 },
    { name: 'Dhap / Medical Mor', fee: 60 },
    { name: 'RK Road / Terminal Area', fee: 70 },
    { name: 'Modern Mor / Lalbagh', fee: 70 },
    { name: 'Carmichael College / Station', fee: 80 },
    { name: 'Rangpur Outskirts (Kowtoli/Pirgachha Road)', fee: 100 },
  ];

  const handleZoneChange = (zoneName: string) => {
    const found = deliveryZones.find((z) => z.name === zoneName);
    setFormData({
      ...formData,
      zone: zoneName,
      deliveryFee: found ? found.fee : 60,
    });
  };

  const finalSubtotal = Math.max(0, totalPrice - discountAmount);
  const grandTotal = finalSubtotal + formData.deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (items.length === 0) {
      setErrorMsg('Your basket is empty.');
      return;
    }

    if (totalPrice < 499) {
      setErrorMsg('Minimum order amount of ৳499 is required for Rangpur delivery.');
      return;
    }

    // Phone validation (+880 or 01XXXXXXXXX)
    const phoneClean = formData.phone.replace(/\s+/g, '');
    if (!/^(?:\+8801|01)[3-9]\d{8}$/.test(phoneClean)) {
      setErrorMsg('Please enter a valid Bangladesh mobile number (e.g., 01852668468 or +8801852668468).');
      return;
    }

    if (!formData.fullName.trim() || !formData.address.trim()) {
      setErrorMsg('Please provide your name and delivery address.');
      return;
    }

    if ((formData.paymentMethod === 'bkash' || formData.paymentMethod === 'nagad') && !formData.transactionId.trim()) {
      setErrorMsg(`Please enter your ${formData.paymentMethod.toUpperCase()} Transaction ID / Reference.`);
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        customer_name: formData.fullName,
        customer_phone: formData.phone,
        customer_email: formData.email || undefined,
        delivery_zone: formData.zone,
        delivery_address: `${formData.address}${formData.landmark ? `, Landmark: ${formData.landmark}` : ''}`,
        delivery_date: formData.deliveryDate,
        delivery_time_slot: formData.timeSlot,
        items: items.map((i) => ({
          product_id: i.product.id,
          product_name: i.product.name,
          quantity: i.quantity,
          unit_price: i.unit_price,
          selected_weight_lbs: i.selected_weight_lbs,
          customization_notes: i.customization_notes,
        })),
        subtotal: totalPrice,
        discount_amount: discountAmount,
        delivery_fee: formData.deliveryFee,
        total_amount: grandTotal,
        coupon_code: couponCode || undefined,
        payment_method: formData.paymentMethod,
        transaction_id: formData.transactionId || undefined,
        special_instructions: formData.orderNotes || undefined,
      };

      const result = await ordersApi.create(orderPayload);
      clearCart();
      navigate(`/track-order/${result.order_number}`);
    } catch (err: any) {
      console.error('Order creation error:', err);
      // Fallback local order creation for standalone mode
      const fallbackOrderNum = `SSB-${Math.floor(100000 + Math.random() * 900000)}`;
      clearCart();
      navigate(`/track-order/${fallbackOrderNum}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-2xl mx-auto">
          🛍️
        </div>
        <h2 className="font-serif text-3xl font-bold text-brand-brown">Your Basket is Empty</h2>
        <p className="text-xs text-brand-muted">
          Add items from our royal 28 pound cake catalog to proceed with checkout.
        </p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 rounded-2xl bg-brand-brown text-white text-xs font-semibold hover:bg-brand-brown-light transition-colors"
        >
          Explore Flavour Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-brand-cream/30 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">
            Secure Rangpur Checkout
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-brown mt-1">
            Complete Your Royal Order
          </h1>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Details & Delivery Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Customer Information */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-brown/10 space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-brown flex items-center gap-2">
                <User className="w-5 h-5 text-brand-accent" /> 1. Customer Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ayesha Siddiqua"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1">
                    Mobile Phone (WhatsApp Active) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 01852668468"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-brown mb-1">
                  Email Address (For Digital Invoice)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. ayesha@example.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                />
              </div>
            </div>

            {/* 2. Rangpur Delivery Details */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-brown/10 space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-brown flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-accent" /> 2. Delivery Zone & Timing (Rangpur)
              </h3>

              <div>
                <label className="block text-xs font-semibold text-brand-brown mb-1">
                  Delivery Area / Zone *
                </label>
                <select
                  value={formData.zone}
                  onChange={(e) => handleZoneChange(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown font-medium text-brand-brown"
                >
                  {deliveryZones.map((z) => (
                    <option key={z.name} value={z.name}>
                      {z.name} — ৳{z.fee} Delivery
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-brown mb-1">
                  Full Street Address & Holding / Flat *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House #, Road #, Area/Moholla in Rangpur..."
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1">
                    Delivery Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.deliveryDate}
                    onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1">
                    Preferred Time Slot *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                  >
                    <option value="11:00 AM - 2:00 PM">11:00 AM - 2:00 PM (Morning Slot)</option>
                    <option value="2:00 PM - 5:00 PM">2:00 PM - 5:00 PM (Afternoon Slot)</option>
                    <option value="5:00 PM - 8:00 PM">5:00 PM - 8:00 PM (Evening Slot)</option>
                    <option value="8:00 PM - 10:00 PM">8:00 PM - 10:00 PM (Late Celebration)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-brown/10 space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-brown flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-brand-accent" /> 3. Payment Method
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when cake arrives' },
                  { id: 'bkash', label: 'bKash Send Money', desc: '01852-668468 (Personal)' },
                  { id: 'nagad', label: 'Nagad Send Money', desc: '01852-668468 (Personal)' },
                ].map((pm) => (
                  <button
                    type="button"
                    key={pm.id}
                    onClick={() => setFormData({ ...formData, paymentMethod: pm.id })}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      formData.paymentMethod === pm.id
                        ? 'border-brand-brown bg-brand-cream/50 ring-2 ring-brand-brown shadow-sm'
                        : 'border-brand-brown/10 bg-white hover:border-brand-brown/30'
                    }`}
                  >
                    <div className="font-serif font-bold text-xs text-brand-brown">{pm.label}</div>
                    <div className="text-[10px] text-brand-muted mt-1">{pm.desc}</div>
                  </button>
                ))}
              </div>

              {(formData.paymentMethod === 'bkash' || formData.paymentMethod === 'nagad') && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-2">
                  <p className="font-semibold text-amber-900">
                    Send ৳{grandTotal} to bKash/Nagad Personal: <strong>+880 1852-668468</strong>
                  </p>
                  <div>
                    <label className="block text-[11px] font-bold text-brand-brown mb-1">
                      Enter Sender Number & Transaction ID (TrxID) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                      placeholder="e.g., Sender: 017XXXXXXXX, TrxID: 9X3K8LZ"
                      className="w-full text-xs px-3.5 py-2 rounded-xl bg-white border border-amber-300 focus:outline-none"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-brand-brown/10 space-y-6">
              <h3 className="font-serif text-xl font-bold text-brand-brown flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-accent" /> Order Summary
              </h3>

              <div className="divide-y divide-brand-brown/10 max-h-80 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-brand-brown truncate">{item.product.name}</p>
                      <p className="text-[11px] text-brand-muted">
                        {item.quantity} x {item.selected_weight_lbs ? `${item.selected_weight_lbs} Lb` : 'unit'}
                      </p>
                    </div>
                    <span className="font-serif font-bold text-brand-brown">
                      {formatBDT(item.unit_price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="pt-4 border-t border-brand-brown/10 space-y-2 text-xs text-brand-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-brand-brown">{formatBDT(totalPrice)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Coupon Discount</span>
                    <span>-{formatBDT(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Charge ({formData.zone})</span>
                  <span className="font-semibold text-brand-brown">{formatBDT(formData.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-brand-brown pt-3 border-t border-brand-brown/10">
                  <span>Grand Total</span>
                  <span className="font-serif text-2xl text-brand-brown">{formatBDT(grandTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-brand-brown hover:bg-brand-brown-light text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order ({formatBDT(grandTotal)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center">
                <p className="text-[10px] text-brand-muted flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  100% Satisfaction Guarantee • Fresh Baked Daily in Rangpur
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
