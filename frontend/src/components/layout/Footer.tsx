import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Heart, Clock, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blush/80 border-t border-lav-2/40 pt-16 pb-24 md:pb-12 text-cocoa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/assets/logo.jpg" 
                alt="Sweet Site Bakery Logo" 
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
              <div>
                <span className="font-serif text-2xl font-bold text-cocoa block leading-none">Sweet Site</span>
                <span className="text-[11px] uppercase tracking-wider text-muted font-sans font-semibold">Bakery · Rangpur</span>
              </div>
            </Link>
            <p className="font-serif italic text-lg text-cocoa/90 leading-snug">
              “Love at first bite. Made to melt Hearts.”
            </p>
            <p className="text-xs text-muted leading-relaxed">
              Premium homemade cakes crafted with 100% royal quality, homemade butter, Ever Whipped, and white chocolate frosting in Rangpur.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="font-serif text-xl font-bold text-cocoa mb-4">Explore Menu</h4>
            <ul className="space-y-2 text-sm text-cocoa/80">
              <li><Link to="/shop?category=pound-cakes" className="hover:text-plum transition-colors">Pound Cakes (28 Flavours)</Link></li>
              <li><Link to="/shop?category=cup-cakes" className="hover:text-plum transition-colors">Gourmet Cupcakes</Link></li>
              <li><Link to="/shop?category=lunch-box-cakes" className="hover:text-plum transition-colors">Korean Lunch Box Cakes</Link></li>
              <li><Link to="/shop?category=jar-cakes" className="hover:text-plum transition-colors">Layered Jar Cakes</Link></li>
              <li><Link to="/shop?category=cheesecakes" className="hover:text-plum transition-colors">Basque Burnt Cheesecakes</Link></li>
              <li><Link to="/customize-cake" className="hover:text-plum transition-colors font-semibold text-lav-deep flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-gold-deep" /> Create Your Dream Cake</Link></li>
            </ul>
          </div>

          {/* Bakery Info & Hours */}
          <div>
            <h4 className="font-serif text-xl font-bold text-cocoa mb-4">Bakery Hours</h4>
            <ul className="space-y-2.5 text-sm text-cocoa/80">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold-deep mt-0.5 flex-shrink-0" />
                <span>Orders Accepted: 24/7 Online</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-gold-deep mt-0.5 flex-shrink-0" />
                <span>Fresh Baking: 8:00 AM – 9:00 PM</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-deep mt-0.5 flex-shrink-0" />
                <span>Rangpur City & Neighboring Zones, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* Direct Ordering / Social */}
          <div>
            <h4 className="font-serif text-xl font-bold text-cocoa mb-4">Connect With Us</h4>
            <div className="space-y-3">
              <a 
                href="https://wa.me/8801852668468" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-white border border-lav-2/50 text-cocoa px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:border-wa hover:shadow-md transition-all"
              >
                <svg viewBox="0 0 32 32" className="w-5 h-5 flex-shrink-0"><path fill="#25D366" d="M16 .5C7.44.5.5 7.44.5 16c0 2.73.71 5.39 2.06 7.73L.65 31.35l7.85-1.89A15.42 15.42 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5z"/><path fill="#FFF" d="M23.57 19.34c-.38-.19-2.25-1.11-2.6-1.24-.35-.13-.6-.19-.85.19s-.98 1.24-1.2 1.5-.44.28-.82.09a10.37 10.37 0 0 1-3.05-1.88 11.45 11.45 0 0 1-2.11-2.63c-.22-.38-.02-.59.17-.78.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66s-.85-2.05-1.17-2.81c-.31-.74-.63-.64-.85-.65h-.73c-.25 0-.66.09-1 .47s-1.32 1.29-1.32 3.15c0 1.86 1.35 3.66 1.54 3.91.19.25 2.66 4.06 6.44 5.69 3.78 1.63 3.78 1.09 4.47 1.02.69-.06 2.25-.92 2.57-1.81.32-.88.32-1.64.22-1.81-.09-.16-.34-.26-.72-.45z"/></svg>
                <span>WhatsApp: 01852-668468</span>
              </a>
              <a 
                href="https://www.facebook.com/sweetsitebakery1229" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-white border border-lav-2/50 text-cocoa px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:border-[#1877F2] hover:shadow-md transition-all"
              >
                <svg viewBox="0 0 32 32" className="w-5 h-5 flex-shrink-0"><circle cx="16" cy="16" r="15.5" fill="#1877F2"/><path fill="#FFF" d="M21.2 16.6l.8-5.2h-5v-3.4c0-1.4.7-2.8 2.9-2.8h2.3V.8s-2.1-.4-4.1-.4c-4.2 0-7 2.6-7 7.2v3.8h-4.6v5.2h4.6V31.5c.9.1 1.9.2 2.9.2 1 0 1.9-.1 2.9-.2V16.6h4.3z"/></svg>
                <span>Facebook: sweetsitebakery1229</span>
              </a>
              <a 
                href="tel:+8801852668468" 
                className="flex items-center gap-2 text-xs text-cocoa/80 hover:text-cocoa transition-colors pt-1"
              >
                <Phone className="w-3.5 h-3.5 text-cocoa" />
                <span>Call Directly: +880 1852-668468</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-lav-2/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Sweet Site Bakery. All rights reserved. Rangpur, Bangladesh.</p>
          <div className="flex items-center gap-4">
            <Link to="/track-order" className="hover:underline">Track Your Order</Link>
            <span>•</span>
            <Link to="/faq" className="hover:underline">FAQ & Allergen Info</Link>
            <span>•</span>
            <Link to="/admin" className="hover:underline">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
