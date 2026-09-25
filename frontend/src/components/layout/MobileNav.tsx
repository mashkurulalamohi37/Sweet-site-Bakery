import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Sparkles, Wand2, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const MobileNav: React.FC = () => {
  const { totalItems, openCart } = useCartStore();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Flavours', path: '/shop', icon: Sparkles },
    { label: 'Custom Lab', path: '/custom-studio', icon: Wand2 },
    { label: 'Account', path: '/account', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-brown/10 px-4 py-2 shadow-2xl safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-brand-brown font-bold' : 'text-brand-muted hover:text-brand-brown'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}

        <button
          onClick={openCart}
          className="relative flex flex-col items-center gap-1 text-[11px] font-medium text-brand-muted hover:text-brand-brown transition-colors"
          aria-label="Open Cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-accent text-brand-brown text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale">
                {totalItems}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>
    </nav>
  );
};
