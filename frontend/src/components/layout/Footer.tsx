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
                className="flex items-center gap-2.5 bg-wa text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:brightness-110 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2m4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3"/></svg>
                <span>WhatsApp: 01852-668468</span>
              </a>
              <a 
                href="https://www.facebook.com/sweetsitebakery1229" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 bg-[#1877F2] text-white px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:brightness-110 transition-all shadow-sm"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
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
