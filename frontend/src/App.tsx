import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { CartDrawer } from './features/cart/CartDrawer';
import { SearchModal } from './components/cake/SearchModal';

// Pages
import { HomePage } from './features/home/HomePage';
import { ShopPage } from './features/shop/ShopPage';
import { ProductDetailPage } from './features/product-detail/ProductDetailPage';
import { CustomStudioPage } from './features/custom-studio/CustomStudioPage';
import { CheckoutPage } from './features/checkout/CheckoutPage';
import { TrackOrderPage } from './features/order-tracking/TrackOrderPage';
import { CustomerAccountPage } from './features/customer-portal/CustomerAccountPage';
import { AdminDashboard } from './features/admin/AdminDashboard';
import { AboutPage } from './features/info/AboutPage';
import { ContactPage } from './features/info/ContactPage';
import { FAQPage } from './features/info/FAQPage';

// Scroll to top on route change helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-brown selection:bg-brand-lavender/40 selection:text-brand-brown">
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-1 pb-16 md:pb-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/custom-studio" element={<CustomStudioPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/track-order" element={<TrackOrderPage />} />
          <Route path="/track-order/:orderNumber" element={<TrackOrderPage />} />
          <Route path="/account" element={<CustomerAccountPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <MobileNav />
      <FloatingWhatsApp />
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
