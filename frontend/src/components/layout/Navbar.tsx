import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Sparkles, User as UserIcon, Menu, X, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

interface NavbarProps {
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openDrawer);
  const { isAuthenticated, isAdmin, user } = useAuthStore();

  const navLinks = [
    { label: 'Shop Menu', path: '/shop' },
    { label: 'Create Your Dream Cake', path: '/customize-cake', highlight: true },
    { label: 'About', path: '/about' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-lav-2/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/assets/logo.jpg" 
              alt="Sweet Site Bakery Logo" 
              className="w-12 h-12 rounded-full object-cover shadow-sm group-hover:rotate-6 transition-transform duration-300"
            />
            <div>
              <span className="font-serif text-2xl font-bold text-cocoa block leading-none">Sweet Site</span>
              <span className="text-[11px] uppercase tracking-wider text-muted font-sans font-semibold">Bakery · Rangpur</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all ${
                    link.highlight
                      ? 'bg-blush text-lav-deep hover:bg-blush-2 font-semibold flex items-center gap-1.5'
                      : isActive
                      ? 'bg-blush/60 text-cocoa font-semibold'
                      : 'text-cocoa/85 hover:bg-blush/40 hover:text-cocoa'
                  }`}
                >
                  {link.highlight && <Sparkles className="w-3.5 h-3.5 text-gold-deep" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full hover:bg-blush/50 text-cocoa transition-colors"
              aria-label="Search cakes"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account / Admin Link */}
            {isAdmin ? (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-plum text-white hover:bg-plum-2 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </Link>
            ) : isAuthenticated ? (
              <Link
                to="/account"
                className="p-2.5 rounded-full hover:bg-blush/50 text-cocoa transition-colors"
                aria-label="My Account"
              >
                <UserIcon className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/account"
                className="hidden sm:block text-xs font-medium px-3 py-1.5 rounded-full border border-lav-2 text-cocoa hover:bg-blush transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-blush text-cocoa hover:bg-blush-2 transition-colors flex items-center justify-center"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5 text-cocoa" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-cocoa text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-scale">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-cocoa hover:bg-blush/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-butter border-b border-lav-2/30 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-base font-medium text-cocoa hover:bg-blush/60 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold text-plum hover:bg-blush/60 transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-plum" />
            <span>Admin Dashboard</span>
          </Link>
        </div>
      )}
    </header>
  );
};
