import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Heart,
  Truck,
  Award,
  Star,
  CheckCircle2,
  Wand2,
  PhoneCall,
  Clock,
  Cake,
} from 'lucide-react';
import { productsApi } from '../../services/api';
import { Product } from '../../types';
import { ProductCard } from '../../components/cake/ProductCard';
import { QuickViewModal } from '../../components/cake/QuickViewModal';
import { getWhatsAppLink } from '../../utils/formatters';

export const HomePage: React.FC = () => {
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [featuredItems, setFeaturedItems] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'pound_cake' | 'cupcakes' | 'jar_cake'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productsApi.getAll();
        setBestsellers(data.filter((p) => p.is_bestseller).slice(0, 8));
        setFeaturedItems(data.slice(0, 12));
      } catch (err) {
        console.error('Failed to load products for homepage:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);

  const categories = [
    {
      title: 'Royal Pound Cakes',
      subtitle: '28 Handcrafted Flavours',
      image: '/assets/cakes/chocolate_overload_cake.jpg',
      link: '/shop?category=pound_cake',
      badge: 'From ৳599',
    },
    {
      title: 'Bento Box Cakes',
      subtitle: 'Aesthetic Korean Bento Style',
      image: '/assets/cakes/lunch_box_cake.jpg',
      link: '/shop?category=lunch_box_cake',
      badge: 'From ৳380',
    },
    {
      title: 'Basque Cheesecake',
      subtitle: 'Caramelized & Creamy Rich',
      image: '/assets/cakes/basque_cheesecake.jpg',
      link: '/shop?category=cheesecake',
      badge: 'From ৳1,050',
    },
    {
      title: 'Gourmet Cupcakes',
      subtitle: 'Ever-Whipped Frosting Magic',
      image: '/assets/cakes/gourmet_cupcakes.jpg',
      link: '/shop?category=cupcakes',
      badge: 'From ৳120',
    },
    {
      title: 'Artisan Jar Cakes',
      subtitle: 'Layered Spoonable Indulgence',
      image: '/assets/cakes/chocolate_jar_cake.jpg',
      link: '/shop?category=jar_cake',
      badge: 'From ৳180',
    },
    {
      title: 'Molten Lava & Pastries',
      subtitle: 'Warm Oozy Chocolate & Slices',
      image: '/assets/cakes/molten_lava_cake.jpg',
      link: '/shop?category=pastry_slices',
      badge: 'From ৳140',
    },
  ];

  const filteredFeatured =
    activeTab === 'all'
      ? featuredItems
      : featuredItems.filter((p) => p.category === activeTab);

  return (
    <div className="bg-brand-cream/20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-blush/30 via-brand-cream/40 to-transparent pt-8 pb-16 md:py-24">
        {/* Subtle Decorative Elements */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-lavender/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge / Tagline Pill */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-brand-brown/10 shadow-sm">
                <Sparkles className="w-4 h-4 text-brand-accent animate-spin-slow" />
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-brown">
                  Rangpur's Premier Homemade Bakery
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brand-brown leading-tight tracking-tight">
                Where every cake is a vibe.{' '}
                <span className="italic font-normal text-brand-accent underline decoration-brand-lavender decoration-wavy decoration-2">
                  Aesthetic bakes
                </span>
                , unforgettable tastes.
              </h1>

              {/* Official Brand Statement */}
              <p className="text-base sm:text-lg text-brand-muted max-w-2xl font-sans leading-relaxed">
                "Where every cake is a vibe. Aesthetic bakes, unforgettable tastes. Made fresh, made for YOU. 🎂✨"
              </p>

              <div className="p-4 rounded-2xl bg-white/70 border border-brand-brown/10 shadow-xs max-w-xl">
                <p className="text-xs sm:text-sm font-medium text-brand-brown flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                  <span>
                    <strong>Quality Promise:</strong> 100% royal & premium quality + homemade butter, Ever Whipped and white chocolate frosting.
                  </span>
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-brown hover:bg-brand-brown-light text-white font-semibold text-sm tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order Fresh Cakes</span>
                </Link>

                <Link
                  to="/custom-studio"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-brand-cream text-brand-brown border-2 border-brand-brown/15 font-semibold text-sm tracking-wider flex items-center justify-center gap-2.5 shadow-sm transition-all duration-300"
                >
                  <Wand2 className="w-4 h-4 text-brand-accent" />
                  <span>Custom Cake Studio</span>
                </Link>
              </div>

              {/* Stats Highlights */}
              <div className="pt-6 border-t border-brand-brown/10 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-brand-brown">28+</p>
                  <p className="text-[11px] text-brand-muted uppercase tracking-wider font-semibold">
                    Royal Pound Flavours
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-brand-brown">100%</p>
                  <p className="text-[11px] text-brand-muted uppercase tracking-wider font-semibold">
                    Homemade Pure Butter
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-brand-brown">4.9 ★</p>
                  <p className="text-[11px] text-brand-muted uppercase tracking-wider font-semibold">
                    Rangpur Foodies Loved
                  </p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative Frame */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-lavender/40 to-brand-accent/30 rounded-3xl transform rotate-3 scale-102" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img
                    src="/assets/cakes/chocolate_overload_cake.jpg"
                    alt="Sweet Site Bakery Royal Signature Cake"
                    className="w-full h-[420px] sm:h-[480px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="bg-brand-accent text-brand-brown text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full w-fit mb-2">
                      Signature Bestseller
                    </span>
                    <h3 className="font-serif text-2xl font-bold">Chocolate Over Loaded Cake</h3>
                    <p className="text-xs text-white/90 mt-1 line-clamp-2">
                      Belgium ganache, white chocolate drip & Ferrero-inspired crown. Starting at ৳1,999/Lb.
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-serif text-2xl font-bold text-brand-accent">৳1,999</span>
                      <Link
                        to="/product/1"
                        className="text-xs font-semibold bg-white/20 hover:bg-white text-white hover:text-brand-brown px-4 py-2 rounded-xl backdrop-blur-md transition-all flex items-center gap-1.5"
                      >
                        Order Now <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Tag */}
                <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-brand-brown/10 hidden sm:flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-brown">
                    <Heart className="w-5 h-5 fill-brand-accent text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-brown">"Love at first bite"</p>
                    <p className="text-[10px] text-brand-muted">Made to melt Hearts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUALITY PILLARS / TRUST MARQUEE */}
      <section className="bg-brand-brown text-white py-8 border-y border-brand-brown/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Award className="w-7 h-7 text-brand-accent" />
              <h4 className="font-serif text-base font-bold">100% Royal Quality</h4>
              <p className="text-xs text-brand-lavender max-w-[200px]">
                No premixes, 100% fresh homemade pure butter.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="w-7 h-7 text-brand-accent" />
              <h4 className="font-serif text-base font-bold">Ever Whipped Frosting</h4>
              <p className="text-xs text-brand-lavender max-w-[200px]">
                Silky white chocolate & premium stabilized cream.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Truck className="w-7 h-7 text-brand-accent" />
              <h4 className="font-serif text-base font-bold">Rangpur Fast Delivery</h4>
              <p className="text-xs text-brand-lavender max-w-[200px]">
                Doorstep handling across all major Rangpur zones.
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-brand-accent" />
              <h4 className="font-serif text-base font-bold">Custom Studio</h4>
              <p className="text-xs text-brand-lavender max-w-[200px]">
                Bespoke anniversary, birthday & event designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORY EXPLORER */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">
            Artisan Delights
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-brown mt-1">
            Explore by Bakery Category
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted mt-2">
            From regal multi-pound celebration cakes to Korean aesthetic lunch box bakes and decadent jar treats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link
              key={i}
              to={cat.link}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-md border border-brand-brown/10 transform transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/90 via-brand-brown/30 to-transparent" />
              <div className="absolute top-4 right-4 bg-brand-accent text-brand-brown text-xs font-bold px-3 py-1 rounded-full shadow-md">
                {cat.badge}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="font-serif text-2xl font-bold">{cat.title}</h3>
                <p className="text-xs text-brand-lavender mt-1">{cat.subtitle}</p>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-accent group-hover:translate-x-1 transition-transform">
                  <span>Browse Flavours</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. BESTSELLERS SHOWCASE */}
      <section className="py-16 bg-white border-y border-brand-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 text-brand-accent font-semibold text-xs uppercase tracking-wider">
                <Star className="w-4 h-4 fill-brand-accent" />
                <span>Rangpur's Most Loved</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-brown mt-1">
                Royal Bestsellers
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted mt-1">
                Handcrafted daily with premium butter & white chocolate frosting.
              </p>
            </div>

            <Link
              to="/shop"
              className="mt-4 sm:mt-0 text-xs font-bold text-brand-brown hover:text-brand-accent flex items-center gap-1.5 transition-colors"
            >
              <span>View Full 45+ Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-80 bg-brand-cream/40 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {bestsellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. CUSTOM STUDIO BANNER */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-brand-brown via-brand-brown-light to-brand-brown p-8 sm:p-12 lg:p-16 text-white shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold tracking-wider text-brand-accent">
              <Wand2 className="w-4 h-4" />
              <span>Interactive 6-Step Cake Builder</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Design Your Dream Cake from Scratch
            </h2>

            <p className="text-sm text-brand-lavender leading-relaxed font-sans">
              Choose your custom sponge, luscious fillings, tiered heights, colour aesthetics, and upload reference photos. We bake your exact vision into reality with royal perfection.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/custom-studio"
                className="px-8 py-4 rounded-2xl bg-brand-accent hover:bg-brand-accent-hover text-brand-brown font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2"
              >
                <span>Launch Custom Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={getWhatsAppLink("Hi Sweet Site Bakery! I have a custom cake photo I'd like to share for a quote.")}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wider transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Discuss with Baker</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RANGPUR CUSTOMER LOVE */}
      <section className="py-16 bg-brand-cream/40 border-t border-brand-brown/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">
              Rangpur Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-brown mt-1">
              Loved by Cake Enthusiasts
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-2">
              Real reviews from birthdays, anniversaries, and sweet cravings across Rangpur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Tasnim Ahmed',
                location: 'Dhap, Rangpur',
                cake: 'Chocolate Over Loaded Cake',
                rating: 5,
                comment:
                  'The best chocolate cake I have ever tasted in Rangpur! The Belgian chocolate ganache was so rich, and the fresh homemade butter made all the difference.',
              },
              {
                name: 'Sultana Razia',
                location: 'Jahaj Company Mor',
                cake: 'Roshmalai Cake & Bento Box',
                rating: 5,
                comment:
                  'Ordered a custom Bento Box cake for my best friend’s birthday. The finish was aesthetic Pinterest-level, and the taste was pure heaven!',
              },
              {
                name: 'Farhan Kabir',
                location: 'RK Road, Rangpur',
                cake: 'Basque Burnt Cheesecake',
                rating: 5,
                comment:
                  'Finding authentic Basque cheesecake in Rangpur felt impossible until Sweet Site Bakery. Creamy, perfectly caramelized top, 10/10.',
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-brand-brown/5 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-brand-brown/90 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-brown/5 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-brand-brown">{review.name}</h4>
                    <p className="text-[11px] text-brand-muted">{review.location}</p>
                  </div>
                  <span className="text-[10px] font-semibold bg-brand-cream px-2 py-1 rounded-md text-brand-brown">
                    {review.cake}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
};
