import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';

import HomePage from './pages/HomePage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import CollectionsPage from './pages/CollectionsPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import SciencePage from './pages/SciencePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import TradePage from './pages/TradePage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderConfirmedPage from './pages/OrderConfirmedPage.jsx';

/**
 * Scroll to top on route change — but skip if there's a hash anchor
 * (so /collections#ritual scrolls to the section instead of the top).
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/science" element={<SciencePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/trade" element={<TradePage />} />
        {/* Legacy alias: old /b2b links continue to work */}
        <Route path="/b2b" element={<Navigate to="/trade" replace />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
