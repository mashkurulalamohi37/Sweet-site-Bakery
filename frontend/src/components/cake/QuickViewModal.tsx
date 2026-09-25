import React, { useState } from 'react';
import { X, Star, ShoppingBag, MessageCircle, Heart, Check, Plus, Minus } from 'lucide-react';
import { Product } from '../../types';
import { formatBDT, getWhatsAppLink } from '../../utils/formatters';
import { useCartStore } from '../../store/cartStore';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const [selectedWeight, setSelectedWeight] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [customMsg, setCustomMsg] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const { addItem, openCart } = useCartStore();

  if (!product) return null;

  // Initialize base weight if not set
  const currentWeight = selectedWeight || product.base_weight_lbs || 1;
  const unitPrice = product.category === 'pound_cake' ? product.price * currentWeight : product.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(product, quantity, currentWeight, customMsg.trim() ? { inscription_text: customMsg.trim() } : undefined);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
      openCart();
    }, 400);
  };

  const handleWhatsApp = () => {
    const msg = `Hello Sweet Site Bakery! 🎂✨

I would like to order this item directly:

🍰 ITEM DETAILS:
• Product: ${product.name}
• Size / Weight: ${currentWeight} Lb
• Quantity: ${quantity}
• Total Amount: ${formatBDT(totalPrice)}
${customMsg ? `• Inscription / Message on Cake: "${customMsg}"\n` : ""}
Please confirm delivery availability and payment details in Rangpur. Thank you!`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-brown/10 flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-brand-brown shadow-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Section */}
        <div className="md:w-1/2 relative bg-brand-cream/30 flex items-center justify-center p-6">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full max-h-80 md:max-h-full object-cover rounded-2xl shadow-md"
          />
          {product.is_bestseller && (
            <span className="absolute top-8 left-8 bg-brand-accent text-brand-brown text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Product Details Section */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
              <span className="uppercase tracking-widest font-semibold text-brand-brown/70">
                {typeof product.category === 'object' ? product.category.name : String(product.category || '').replace(/_/g, ' ')}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{(product.rating || product.rating_avg || 4.9).toFixed(1)}</span>
                <span className="text-brand-muted">({product.reviews_count || product.rating_count || 12} reviews)</span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-brown">
              {product.name}
            </h2>

            <p className="font-serif text-2xl font-bold text-brand-brown mt-2">
              {formatBDT(totalPrice)}
            </p>

            <p className="text-xs text-brand-muted mt-3 leading-relaxed">
              {product.description}
            </p>

            {/* Size selector for pound cakes */}
            {product.category === 'pound_cake' && (
              <div className="mt-5">
                <label className="block text-xs font-semibold text-brand-brown uppercase tracking-wider mb-2">
                  Select Cake Weight (Lbs)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 1.5, 2, 3].map((wt) => (
                    <button
                      key={wt}
                      onClick={() => setSelectedWeight(wt)}
                      className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                        currentWeight === wt
                          ? 'bg-brand-brown text-white border-brand-brown shadow-sm'
                          : 'bg-brand-cream/50 text-brand-brown border-brand-brown/10 hover:border-brand-brown/30'
                      }`}
                    >
                      {wt} Lb{wt > 1 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message on Cake Input */}
            <div className="mt-4">
              <label className="block text-xs font-semibold text-brand-brown uppercase tracking-wider mb-1.5">
                Message on Cake (Optional)
              </label>
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="e.g., Happy Birthday Ayesha! 🎉"
                maxLength={40}
                className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
              />
            </div>

            {/* Quantity */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-brown uppercase tracking-wider">
                Quantity
              </span>
              <div className="flex items-center gap-3 bg-brand-cream/50 px-3 py-1.5 rounded-xl border border-brand-brown/10">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-brand-brown hover:text-brand-accent p-1"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs font-bold text-brand-brown w-6 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-brand-brown hover:text-brand-accent p-1"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-brand-brown/10">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 rounded-xl font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md ${
                addedAnimation
                  ? 'bg-green-600 text-white'
                  : 'bg-brand-brown hover:bg-brand-brown-light text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" /> Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" /> Add to Cart • {formatBDT(totalPrice)}
                </>
              )}
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full py-3 rounded-xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" /> Order Directly on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
