import React, { useState, useEffect } from 'react';
import { Search, X, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productsApi } from '../../services/api';
import { Product } from '../../types';
import { formatBDT } from '../../utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const data = await productsApi.getAll({ search: searchTerm.trim() });
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-brown/10 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div className="p-4 sm:p-5 border-b border-brand-brown/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-brown/50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search pound cakes, cupcakes, jars, tab cakes..."
            className="flex-1 bg-transparent text-sm sm:text-base text-brand-brown font-medium placeholder:text-brand-muted/60 focus:outline-none"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-brand-muted hover:text-brand-brown p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs bg-brand-cream/60 hover:bg-brand-cream px-3 py-1.5 rounded-xl text-brand-brown font-semibold transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Search Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 divide-y divide-brand-brown/5">
          {isLoading && (
            <div className="py-8 text-center text-xs text-brand-muted">
              <div className="inline-block w-5 h-5 border-2 border-brand-brown/20 border-t-brand-brown rounded-full animate-spin mb-2"></div>
              <p>Searching royal cake vault...</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-brand-muted uppercase tracking-wider mb-2">
                Found {results.length} flavour{results.length > 1 ? 's' : ''}
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-brand-cream/50 transition-colors group"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-14 h-14 rounded-xl object-cover border border-brand-brown/5 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-brand-brown text-sm sm:text-base truncate group-hover:text-brand-accent transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-brand-muted capitalize">
                      {typeof product.category === 'object' ? product.category.name : String(product.category || '').replace(/_/g, ' ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif font-bold text-brand-brown text-sm sm:text-base">
                      {formatBDT(product.price)}
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-muted group-hover:text-brand-brown group-hover:translate-x-1 transition-all ml-auto mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && searchTerm && results.length === 0 && (
            <div className="py-12 text-center text-brand-muted">
              <Sparkles className="w-8 h-8 mx-auto text-brand-accent mb-2" />
              <p className="font-medium text-sm text-brand-brown">No bakes found for "{searchTerm}"</p>
              <p className="text-xs mt-1">
                Try searching for 'Chocolate', 'Cheesecake', 'Bento', or explore our Custom Studio!
              </p>
            </div>
          )}

          {!searchTerm && (
            <div className="space-y-4">
              <p className="text-[11px] font-bold text-brand-muted uppercase tracking-wider">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Chocolate Over Loaded',
                  'Red Velvet',
                  'Basque Cheesecake',
                  'Roshmalai Cake',
                  'Bento Box Cake',
                  'Jar Cake',
                  'Tiramisu',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="text-xs px-3 py-1.5 rounded-full bg-brand-cream/70 hover:bg-brand-brown hover:text-white text-brand-brown font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
