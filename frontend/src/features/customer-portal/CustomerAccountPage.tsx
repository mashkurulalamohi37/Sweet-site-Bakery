import React, { useState } from 'react';
import { User, LogIn, Lock, Mail, Phone, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { formatBDT } from '../../utils/formatters';
import { Link } from 'react-router-dom';

export const CustomerAccountPage: React.FC = () => {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoginTab) {
      if (!email || !password) {
        setError('Please enter your email/phone and password.');
        return;
      }
      
      const cleanEmail = email.trim().toLowerCase();
      const isAdminUser = cleanEmail === 'sajia@gmail.com' || cleanEmail.includes('admin') || cleanEmail.includes('sajia');
      
      // Admin credential check or customer auth
      if (cleanEmail === 'sajia@gmail.com' && password !== 'sajia123') {
        setError('Invalid password for Sajia Admin account. Please use sajia123');
        return;
      }

      login(
        {
          id: isAdminUser ? 1 : 2,
          email: cleanEmail,
          name: cleanEmail === 'sajia@gmail.com' ? 'Sajia (Bakery Admin)' : cleanEmail.split('@')[0] || 'Sweet Site Customer',
          phone: '+880 1852-668468',
          role: isAdminUser ? 'admin' : 'customer',
        },
        'token_sweet_site_auth_2026'
      );
    } else {
      if (!name || !email || !password) {
        setError('Please fill all required registration fields.');
        return;
      }
      login(
        {
          id: 2,
          email: email.trim().toLowerCase(),
          name: name,
          phone: phone || '+880 1852-668468',
          role: 'customer',
        },
        'token_sweet_site_auth_2026'
      );
    }
  };

  // Demo user past orders
  const sampleOrders = [
    {
      order_number: 'SSB-883921',
      date: '2026-09-20',
      total: 1999,
      status: 'delivered',
      items: 'Chocolate Over Loaded Cake (1 Lb)',
    },
    {
      order_number: 'SSB-774019',
      date: '2026-09-12',
      total: 950,
      status: 'delivered',
      items: 'Roshmalai Cake (1 Lb)',
    },
  ];

  return (
    <div className="bg-brand-cream/20 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {isAuthenticated && user ? (
          <div className="space-y-8">
            {/* Account Header */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-brand-brown/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-brown text-white flex items-center justify-center font-serif text-2xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-bold text-brand-brown">{user.name}</h1>
                  <p className="text-xs text-brand-muted">{user.email} • {user.phone}</p>
                  <span className="inline-block bg-brand-cream text-brand-brown text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mt-1">
                    Royal Member
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="px-4 py-2 rounded-xl bg-brand-accent text-brand-brown text-xs font-bold hover:bg-brand-accent-hover transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-xl bg-brand-cream/60 hover:bg-brand-cream text-brand-brown text-xs font-semibold border border-brand-brown/10 transition-colors"
                >
                  Log Out
                </button>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-brand-brown/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-brand-brown">Past Orders</h2>
                  <p className="text-xs text-brand-muted">View details and re-order your favorite bakes.</p>
                </div>
                <Link
                  to="/shop"
                  className="text-xs font-bold text-brand-brown hover:text-brand-accent flex items-center gap-1"
                >
                  <span>Order More Cakes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-brand-brown/10">
                {sampleOrders.map((ord) => (
                  <div key={ord.order_number} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-brand-brown text-base">
                          #{ord.order_number}
                        </span>
                        <span className="text-[10px] bg-green-100 text-green-800 font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                          {ord.status}
                        </span>
                      </div>
                      <p className="text-xs text-brand-muted mt-1">{ord.items}</p>
                      <p className="text-[11px] text-brand-muted/70">{ord.date}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-serif font-bold text-lg text-brand-brown">
                        {formatBDT(ord.total)}
                      </span>
                      <Link
                        to={`/track-order/${ord.order_number}`}
                        className="px-3.5 py-1.5 rounded-xl bg-brand-cream hover:bg-brand-brown hover:text-white text-brand-brown text-xs font-semibold border border-brand-brown/10 transition-all"
                      >
                        Track / Invoice
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Login / Registration Card */
          <div className="max-w-md mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-brand-brown/10 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-brand-cream flex items-center justify-center mx-auto text-brand-brown">
                <Sparkles className="w-6 h-6 text-brand-accent" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-brand-brown">
                {isLoginTab ? 'Welcome Back' : 'Create Sweet Site Account'}
              </h1>
              <p className="text-xs text-brand-muted">
                Track your cake orders, save delivery addresses, and enjoy member rewards.
              </p>
            </div>

            {/* Tab switch */}
            <div className="flex bg-brand-cream/50 p-1 rounded-2xl border border-brand-brown/10">
              <button
                onClick={() => setIsLoginTab(true)}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  isLoginTab ? 'bg-white text-brand-brown shadow-sm font-bold' : 'text-brand-muted'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLoginTab(false)}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                  !isLoginTab ? 'bg-white text-brand-brown shadow-sm font-bold' : 'text-brand-muted'
                }`}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLoginTab && (
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanzila Akter"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-brand-brown mb-1">
                  Email or Phone
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sajia@gmail.com"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                />
              </div>

              {!isLoginTab && (
                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01852668468"
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-brand-brown mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-brand-brown hover:bg-brand-brown-light text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
              >
                {isLoginTab ? 'Sign In to Account' : 'Create Account'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
