import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { productsApi } from '../../services/api';
import { Product } from '../../types';
import { ProductCard } from '../../components/cake/ProductCard';
import { QuickViewModal } from '../../components/cake/QuickViewModal';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filters State
  const initialCategory = searchParams.get('category') || 'all';
  const [category, setCategory] = useState<string>(initialCategory);
  const [search, setSearch] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [priceRange, setPriceRange] = useState<number>(3000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      setCategory(urlCategory);
    }
  }, [searchParams]);

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    if (newCategory === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: newCategory });
    }
  };

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'pound_cake', label: '28 Pound Cakes' },
    { id: 'lunch_box_cake', label: 'Bento Box Cakes' },
    { id: 'cupcakes', label: 'Cupcakes' },
    { id: 'jar_cake', label: 'Jar Cakes' },
    { id: 'cheesecake', label: 'Cheesecakes' },
    { id: 'pastry_slices', label: 'Pastry Slices' },
    { id: 'lava_cake', label: 'Lava Cakes' },
    { id: 'muffins', label: 'Muffins' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = category === 'all' || p.category === category;
        const matchesSearch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase());
        const matchesPrice = p.price <= priceRange;
        return matchesCategory && matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default: popularity / bestsellers first
        return (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0);
      });
  }, [products, category, search, sortBy, priceRange]);

  return (
    <div className="bg-brand-cream/30 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">
            Sweet Site Bakery Menu
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-brown mt-1">
            Royal Bakery Collection
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            28 signature pound cake flavours & 17 artisanal treats. Baked fresh daily in Rangpur.
          </p>
        </div>

        {/* Filter / Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-brand-brown/10 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-brand-brown/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search cake name, flavour, ingredients..."
                className="w-full text-xs pl-10 pr-4 py-2.5 rounded-2xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2 text-xs text-brand-brown font-medium">
                <ArrowUpDown className="w-3.5 h-3.5 text-brand-muted" />
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-brand-cream/40 border border-brand-brown/10 rounded-xl px-3 py-1.5 text-xs font-semibold text-brand-brown focus:outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-2 text-xs text-brand-brown font-medium">
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-muted" />
                <span>Max: ৳{priceRange}</span>
                <input
                  type="range"
                  min="100"
                  max="3000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-24 accent-brand-brown cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-brand-brown/5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`text-xs px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all ${
                  category === cat.id
                    ? 'bg-brand-brown text-white shadow-sm'
                    : 'bg-brand-cream/60 hover:bg-brand-cream text-brand-brown border border-brand-brown/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid / Loading / Empty State */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-brand-cream/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div>
            <p className="text-xs font-semibold text-brand-muted mb-4 uppercase tracking-wider">
              Showing {filteredProducts.length} cake item{filteredProducts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-brand-brown/10 space-y-4">
            <Sparkles className="w-10 h-10 text-brand-accent mx-auto" />
            <h3 className="font-serif text-xl font-bold text-brand-brown">No cakes match your criteria</h3>
            <p className="text-xs text-brand-muted">
              Try adjusting your category filter or search keywords.
            </p>
            <button
              onClick={() => {
                setCategory('all');
                setSearch('');
                setPriceRange(3000);
              }}
              className="px-6 py-2.5 bg-brand-brown text-white text-xs font-semibold rounded-xl hover:bg-brand-brown-light transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
