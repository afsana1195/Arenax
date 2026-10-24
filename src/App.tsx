/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FanZoneProvider } from './context/FanZoneContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { LiveScoresTicker } from './components/common/LiveScoresTicker';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/shop/CartDrawer';
import { CheckoutModal } from './components/shop/CheckoutModal';

// Pages
import { HomePage } from './pages/HomePage';
import { SportsHubPage } from './pages/SportsHubPage';
import { LivePage } from './pages/LivePage';
import { MatchesPage } from './pages/MatchesPage';
import { NewsPage } from './pages/NewsPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { EntertainmentPage } from './pages/EntertainmentPage';
import { EventsPage } from './pages/EventsPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { FanZonePage } from './pages/FanZonePage';
import { ShopPage } from './pages/ShopPage';
import { SearchPage } from './pages/SearchPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FanZoneProvider>
          <ScrollToTop />
          <div className="min-h-screen bg-[#080a0f] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
            {/* 1. Top Announcement Bar for Breaking Sports/Cinema Alerts */}
            <AnnouncementBar />

            {/* 2. Global Responsive Navigation */}
            <Navbar />

            {/* 3. Live Scores Ticker */}
            <LiveScoresTicker />

            {/* 4. Main Page View Body */}
            <main className="flex-1">
              <Routes>
                {/* Homepage */}
                <Route path="/" element={<HomePage />} />

                {/* Sports Hub & Sport Categories */}
                <Route path="/sports" element={<SportsHubPage />} />
                <Route path="/sports/:sport" element={<SportsHubPage />} />

                {/* Live Scores & Match Center */}
                <Route path="/live" element={<LivePage />} />

                {/* Matches & Fixtures Schedule */}
                <Route path="/matches" element={<MatchesPage />} />

                {/* News & Editorial Wire */}
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:slug" element={<ArticleDetailPage />} />

                {/* Entertainment Hub & Categories */}
                <Route path="/entertainment" element={<EntertainmentPage />} />
                <Route path="/entertainment/:subcategory" element={<EntertainmentPage />} />

                {/* Events & Ticketing */}
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:slug" element={<EventDetailPage />} />

                {/* Fan Zone Community */}
                <Route path="/fan-zone" element={<FanZonePage />} />

                {/* Merchandise Store */}
                <Route path="/shop" element={<ShopPage />} />

                {/* Search */}
                <Route path="/search" element={<SearchPage />} />

                {/* Brand & Legal Pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* 5. Global Cart Drawer & Checkout Modal */}
            <CartDrawer />
            <CheckoutModal />

            {/* 6. Premium Footer */}
            <Footer />
          </div>
        </FanZoneProvider>
      </CartProvider>
    </BrowserRouter>
  );
}
