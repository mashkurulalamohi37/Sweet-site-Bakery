import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Minus,
} from 'lucide-react';
import { productsApi } from '../../services/api';
import { Product } from '../../types';
import { formatBDT, getWhatsAppLink } from '../../utils/formatters';
import { useCartStore } from '../../store/cartStore';
import { ProductCard } from '../../components/cake/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(1);
  const [customMsg, setCustomMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [added, setAdded] = useState<boolean>(false);

  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await productsApi.getById(Number(id));
        setProduct(data);
        if (data) {
          setSelectedWeight(data.base_weight_lbs || 1);
          // fetch related
          const all = await productsApi.getAll({
            category: typeof data.category === 'object' ? data.category.slug : String(data.category),
          });
          setRelated(all.filter((p) => String(p.id) !== String(data.id)).slice(0, 4));
        }
      } catch (err) {
        console.error('Failed to load product details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-block w-8 h-8 border-4 border-brand-brown/20 border-t-brand-brown rounded-full animate-spin mb-4"></div>
        <p className="font-serif text-lg text-brand-brown">Preparing fresh cake details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-brand-brown">Cake Not Found</h2>
        <p className="text-xs text-brand-muted">The requested cake flavour does not exist in our catalog.</p>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-3 bg-brand-brown text-white text-xs font-semibold rounded-xl hover:bg-brand-brown-light"
        >
          Return to Flavour Menu
        </button>
      </div>
    );
  }

  const categoryStr = typeof product.category === 'object' ? product.category.slug : String(product.category);
  const basePriceVal = product.price || product.base_price || 599;
  const unitPrice =
    categoryStr.includes('pound') ? basePriceVal * selectedWeight : basePriceVal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addItem(
      product,
      quantity,
      selectedWeight,
      customMsg.trim() ? { inscription_text: customMsg.trim() } : undefined
    );
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openCart();
    }, 400);
  };

  const handleWhatsAppOrder = () => {
    const msg = `Assalamu Alaikum Sweet Site Bakery! 🎂\n\nI would like to place an order for:\n*${product.name}*\n- Weight: ${selectedWeight} Lb\n- Quantity: ${quantity}\n- Message on Cake: ${customMsg || 'None'}\n- Total Price: ${formatBDT(totalPrice)}\n\nPlease let me know delivery availability in Rangpur!`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="bg-brand-cream/20 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-brown hover:text-brand-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </button>

        {/* Main Product Details Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-brand-brown/10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Image Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-brand-brown/10 bg-brand-cream/30 shadow-md">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.is_bestseller && (
                <span className="absolute top-4 left-4 bg-brand-accent text-brand-brown text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Bestseller
                </span>
              )}
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs text-brand-muted mb-2">
                <span className="uppercase tracking-widest font-semibold text-brand-brown/80">
                  {typeof product.category === 'object' ? product.category.name : String(product.category || '').replace(/_/g, ' ')}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{(product.rating || product.rating_avg || 4.9).toFixed(1)}</span>
                  <span className="text-brand-muted">({product.reviews_count || product.rating_count || 24} Rangpur reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-brand-brown">
                {product.name}
              </h1>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-brand-brown">
                  {formatBDT(totalPrice)}
                </span>
                {product.category === 'pound_cake' && (
                  <span className="text-xs text-brand-muted">
                    ({formatBDT(product.price)} per Pound)
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-brand-muted mt-4 leading-relaxed">
                {product.description}
              </p>

              {/* Weight Selector for Pound Cakes */}
              {product.category === 'pound_cake' && (
                <div className="mt-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-2.5">
                    Select Cake Size (Pound Weight)
                  </label>
                  <div className="grid grid-cols-4 gap-2.5">
                    {[1, 1.5, 2, 3].map((wt) => (
                      <button
                        key={wt}
                        onClick={() => setSelectedWeight(wt)}
                        className={`py-3 text-xs font-bold rounded-2xl border transition-all ${
                          selectedWeight === wt
                            ? 'bg-brand-brown text-white border-brand-brown shadow-md scale-102'
                            : 'bg-brand-cream/40 text-brand-brown border-brand-brown/15 hover:border-brand-brown/40'
                        }`}
                      >
                        {wt} Lb{wt > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Inscription Note on Cake */}
              <div className="mt-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-brown mb-2">
                  Custom Inscription / Piping Text
                </label>
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="e.g. Happy 1st Anniversary, Nabil & Sarah! 💖"
                  maxLength={50}
                  className="w-full text-xs px-4 py-3 rounded-2xl bg-brand-cream/30 border border-brand-brown/15 focus:outline-none focus:ring-1 focus:ring-brand-brown placeholder:text-brand-muted/60"
                />
              </div>

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-brown">
                  Quantity
                </span>
                <div className="flex items-center gap-4 bg-brand-cream/50 px-4 py-2 rounded-2xl border border-brand-brown/15">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-brand-brown hover:text-brand-accent p-1"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold text-brand-brown w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-brand-brown hover:text-brand-accent p-1"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-brand-brown/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`py-4 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    added
                      ? 'bg-green-600 text-white'
                      : 'bg-brand-brown hover:bg-brand-brown-light text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{added ? 'Added to Basket!' : `Add to Basket • ${formatBDT(totalPrice)}`}</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="py-4 rounded-2xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>

              {/* Quality & Delivery Badges */}
              <div className="pt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-brand-muted">
                <div className="p-2 rounded-xl bg-brand-cream/40 flex flex-col items-center gap-1">
                  <Award className="w-4 h-4 text-brand-brown" />
                  <span>100% Pure Butter</span>
                </div>
                <div className="p-2 rounded-xl bg-brand-cream/40 flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-brand-brown" />
                  <span>Ever Whipped Frosting</span>
                </div>
                <div className="p-2 rounded-xl bg-brand-cream/40 flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-brand-brown" />
                  <span>Rangpur Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Flavour Recommendations */}
        {related.length > 0 && (
          <div className="space-y-6 pt-10">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-muted">
                  Pairing Suggestions
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-brown">
                  You Might Also Love
                </h3>
              </div>
              <Link
                to="/shop"
                className="text-xs font-bold text-brand-brown hover:text-brand-accent"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
