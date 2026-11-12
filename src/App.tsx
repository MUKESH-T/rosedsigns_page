/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';

// Common Components
import { CustomCursor } from './components/common/CustomCursor';
import { ScrollProgress } from './components/common/ScrollProgress';
import { SmoothScroll } from './components/common/SmoothScroll';
import { PageTransition } from './components/common/PageTransition';

// Layout Components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LoaderSplash } from './components/home/LoaderSplash';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransition>
              <ServicesPage />
            </PageTransition>
          }
        />
        <Route
          path="/projects/:id"
          element={
            <PageTransition>
              <ProjectDetailPage />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFoundPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [forceLoader, setForceLoader] = useState(false);

  const handleReplayLoader = () => {
    sessionStorage.removeItem('rosedsigns_loaded');
    setForceLoader(true);
    setShowLoader(true);
  };

  return (
    <BrowserRouter>
      <SmoothScroll>
        {/* Full-screen Loader / Splash (only once per session or on replay) */}
        {showLoader && (
          <LoaderSplash
            forceShow={forceLoader}
            onComplete={() => {
              setShowLoader(false);
              setForceLoader(false);
            }}
          />
        )}

        {/* Global Luxury Interactive Layer */}
        <CustomCursor />
        <ScrollProgress />
        <Navbar />

        {/* Main Content Router */}
        <main className="min-h-screen relative overflow-hidden">
          <AnimatedRoutes />
        </main>

        {/* Unified Luxury Footer */}
        <Footer onReplayLoader={handleReplayLoader} />
      </SmoothScroll>
    </BrowserRouter>
  );
}
