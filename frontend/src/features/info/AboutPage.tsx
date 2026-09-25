import React from 'react';
import { Heart, Sparkles, Award, ShieldCheck, CheckCircle2, PhoneCall, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-brand-cream/30 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">
            The Story of Sweet Site Bakery
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-brand-brown">
            Love at first bite. Made to melt Hearts.
          </h1>
          <p className="text-sm text-brand-muted italic">
            "Where every cake is a vibe. Aesthetic bakes, unforgettable tastes. Made fresh, made for YOU. 🎂✨"
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-brand-brown/10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-brown">
              Handcrafted in the Heart of Rangpur
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Founded with an uncompromising passion for authentic homemade baking, <strong>Sweet Site Bakery</strong> was born in Rangpur, Bangladesh to bring royalty back into everyday celebrations.
            </p>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              While commercial bakeries rely on premixed powders and artificial shortenings, we hold ourselves to a royal standard: <strong>100% homemade churned butter</strong>, <strong>imported Belgian cocoa</strong>, and our signature <strong>Ever-Whipped white chocolate frosting</strong>.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="p-3 bg-brand-cream rounded-2xl">
                <Sparkles className="w-5 h-5 text-brand-brown" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-brand-brown">28 Signature Flavours</h4>
                <p className="text-xs text-brand-muted">From Classic Vanillas to Over Loaded Belgian Truffles.</p>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-lg border-2 border-brand-brown/10">
            <img
              src="/assets/cakes/chocolate_overload_cake.jpg"
              alt="Sweet Site Bakery Kitchen"
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>
        </div>

        {/* Quality Promises Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-brand-brown/10 shadow-sm space-y-3">
            <Award className="w-8 h-8 text-brand-accent" />
            <h3 className="font-serif text-lg font-bold text-brand-brown">100% Pure Butter</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We never cut corners with cheap vegetable fat or margarine. Every sponge is rich, fragrant, and melted to perfection.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-brand-brown/10 shadow-sm space-y-3">
            <ShieldCheck className="w-8 h-8 text-brand-accent" />
            <h3 className="font-serif text-lg font-bold text-brand-brown">Ever-Whipped Frosting</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Our unique stabilized frosting with melted white chocolate delivers a silky, luxurious texture without heavy sugar crystals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-brand-brown/10 shadow-sm space-y-3">
            <Heart className="w-8 h-8 text-brand-accent" />
            <h3 className="font-serif text-lg font-bold text-brand-brown">Custom Baked for You</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Every celebration is unique. Our Custom Studio allows you to personalize every layer, color palette, and edible crown.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-brand-brown text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-xl">
          <h2 className="font-serif text-3xl font-bold">Ready to Experience Love at First Bite?</h2>
          <p className="text-xs sm:text-sm text-brand-lavender max-w-xl mx-auto">
            Order fresh celebration cakes or launch our custom cake studio today. Fast delivery throughout Rangpur.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-brand-accent text-brand-brown font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-brand-accent-hover transition-colors"
            >
              Explore Flavour Menu
            </Link>
            <Link
              to="/custom-studio"
              className="px-8 py-3.5 bg-white/10 text-white font-semibold text-xs tracking-wider rounded-2xl hover:bg-white/20 border border-white/20 transition-colors"
            >
              Custom Dream Cake Studio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
