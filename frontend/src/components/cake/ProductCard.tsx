import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingBag, Star, Sparkles, MessageCircle } from 'lucide-react';
import { Product } from '../../types';
import { formatBDT, getWhatsAppLink } from '../../utils/formatters';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.base_weight_lbs || 1);
  };

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const msg = `Assalamu Alaikum! I would like to order *${product.name}* (Price: ${formatBDT(product.price)}) from Sweet Site Bakery.`;
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-brand-brown/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full transform hover:-translate-y-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-brand-cream/30">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.is_bestseller && (
            <span className="bg-brand-accent text-brand-brown text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Bestseller
            </span>
          )}
          {product.is_featured && (
            <span className="bg-brand-brown text-white text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Royal Blend
            </span>
          )}
        </div>

        {/* Quick Action Overlay */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-3 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="p-3 bg-white text-brand-brown rounded-full hover:bg-brand-accent transition-all duration-300 transform hover:scale-110 shadow-lg"
              title="Quick View"
              aria-label="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={handleQuickAdd}
            className="p-3 bg-brand-brown text-white rounded-full hover:bg-brand-brown-light transition-all duration-300 transform hover:scale-110 shadow-lg"
            title="Add to Cart"
            aria-label="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="p-3 bg-brand-whatsapp text-white rounded-full hover:bg-brand-whatsapp-hover transition-all duration-300 transform hover:scale-110 shadow-lg"
            title="Order via WhatsApp"
            aria-label="Order via WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-brand-muted mb-1.5">
            <span className="capitalize font-medium tracking-wide">
              {typeof product.category === 'object' ? product.category.name : String(product.category || '').replace(/_/g, ' ')}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{(product.rating || product.rating_avg || 4.9).toFixed(1)}</span>
              <span className="text-[10px] text-brand-muted">({product.reviews_count || product.rating_count || 12})</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`} className="block group-hover:text-brand-accent transition-colors">
            <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-brown line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-brand-muted line-clamp-2 mt-1.5 leading-relaxed font-sans">
            {product.description}
          </p>
        </div>

        <div className="pt-4 mt-3 border-t border-brand-brown/5 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-brand-muted block uppercase tracking-wider font-semibold">
              Price
            </span>
            <span className="font-serif text-lg sm:text-xl font-bold text-brand-brown">
              {formatBDT(product.price)}
            </span>
          </div>

          <button
            onClick={handleQuickAdd}
            className="px-3.5 py-2 rounded-xl bg-brand-cream hover:bg-brand-brown hover:text-white text-brand-brown text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 border border-brand-brown/10"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
