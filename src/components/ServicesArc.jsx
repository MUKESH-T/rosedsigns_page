/**
 * @file ServicesArc.jsx
 * Interactive Curved Arc Carousel for RoseDsigns /services page
 * 
 * Styled in RoseDsigns Existing Signature Theme:
 * - Warm Ivory (#F7F3EC) with subtle film grain
 * - Rose Black (#171514) typography & Antique Gold (#B08A57) detailing
 * - Selected active tile in Burgundy / Antique Rose (#A76570 -> #672D39) with gold glow
 * - Unselected tiles in crisp ivory cream (#FDFBF7) cards with gold borders
 * - Smile-shaped arc of 8 service tiles at the bottom
 * - Active service details presented prominently in the center above the arc
 * - Smooth shortest-path circular loop (08 -> 01 without backwards snapping)
 * - 4-second auto-play loop with thin gold progress indicator
 * - Pause on hover or touch, auto-resume after 3s of inactivity
 * - Prev / Next buttons, keyboard arrow navigation, and mobile swipe
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Palette,
  Share2,
  Search,
  MessageCircle,
  MapPin,
  Clapperboard,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from 'lucide-react';
import { SERVICES_LIST } from '../data/services.js';

// ============================================================================
// CONFIGURATION CONSTANTS (Easily customizable)
// ============================================================================
export const ARC_CONFIG = {
  // Desktop settings (width >= 1024px)
  desktop: {
    RADIUS: 660,          // Radius of curvature in pixels
    STEP_DEG: 13.5,       // Angular step in degrees between adjacent tiles
    MAX_VISIBLE: 3,       // Max distance from center: -3 to +3 (7 visible tiles)
  },
  // Tablet settings (768px <= width < 1024px)
  tablet: {
    RADIUS: 520,
    STEP_DEG: 16,
    MAX_VISIBLE: 2,       // -2 to +2 (5 visible tiles)
  },
  // Mobile settings (width < 768px)
  mobile: {
    RADIUS: 340,
    STEP_DEG: 20,
    MAX_VISIBLE: 1,       // -1 to +1 (3 visible tiles, fits 375px without scroll)
  },
  // Timing settings
  AUTOPLAY_MS: 4000,      // Time per service before auto-advancing (4 seconds)
  RESUME_DELAY_MS: 3000,  // Inactivity delay before auto-play resumes after pause
};

// Map of string icon names to Lucide components
const ICON_COMPONENTS = {
  Globe,
  Palette,
  Share2,
  Search,
  MessageCircle,
  MapPin,
  Clapperboard,
  BarChart3,
};

/**
 * Computes the shortest circular offset between index and activeIndex.
 * Keeps diff strictly in [-total/2, total/2] so 08 -> 01 rotates forward smoothly.
 */
function getCircularOffset(index, activeIndex, total = 8) {
  let diff = (index - activeIndex) % total;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export const ServicesArc = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0 to 100% for the thin gold line
  const [isPaused, setIsPaused] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [reducedMotion, setReducedMotion] = useState(false);

  // References for timing, touch swipes, and focus
  const resumeTimerRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);
  const containerRef = useRef(null);
  const progressStartTimeRef = useRef(Date.now());
  const elapsedBeforePauseRef = useRef(0);

  const totalServices = SERVICES_LIST.length;
  const currentService = SERVICES_LIST[activeIndex];

  // --------------------------------------------------------------------------
  // SCREEN SIZE & REDUCED MOTION DETECTION
  // --------------------------------------------------------------------------
  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    const updateScreenSize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setScreenSize('mobile');
      } else if (w < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  // --------------------------------------------------------------------------
  // NAVIGATION HANDLERS (With Shortest Path & Timer Reset)
  // --------------------------------------------------------------------------
  const selectService = useCallback(
    (newIndex) => {
      const normalized = (newIndex + totalServices) % totalServices;
      setActiveIndex(normalized);
      // Reset auto-play progress
      setProgress(0);
      elapsedBeforePauseRef.current = 0;
      progressStartTimeRef.current = Date.now();
    },
    [totalServices]
  );

  const handleNext = useCallback(() => {
    selectService(activeIndex + 1);
  }, [activeIndex, selectService]);

  const handlePrev = useCallback(() => {
    selectService(activeIndex - 1);
  }, [activeIndex, selectService]);

  // --------------------------------------------------------------------------
  // AUTO-PLAY ENGINE (4-second loop, smooth progress ticker, 3s resume on pause)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (reducedMotion) return;

    if (isPaused) {
      return;
    }

    progressStartTimeRef.current = Date.now() - elapsedBeforePauseRef.current;

    const interval = setInterval(() => {
      const elapsed = Date.now() - progressStartTimeRef.current;
      const pct = Math.min(100, (elapsed / ARC_CONFIG.AUTOPLAY_MS) * 100);
      setProgress(pct);

      if (elapsed >= ARC_CONFIG.AUTOPLAY_MS) {
        elapsedBeforePauseRef.current = 0;
        progressStartTimeRef.current = Date.now();
        setActiveIndex((prev) => (prev + 1) % totalServices);
        setProgress(0);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPaused, reducedMotion, totalServices]);

  // Handle interaction pauses & 3-second auto-resume
  const triggerPause = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    if (!isPaused) {
      elapsedBeforePauseRef.current = Date.now() - progressStartTimeRef.current;
      setIsPaused(true);
    }
  }, [isPaused]);

  const triggerResumeWithDelay = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, ARC_CONFIG.RESUME_DELAY_MS);
  }, []);

  // --------------------------------------------------------------------------
  // KEYBOARD NAVIGATION (Left / Right Arrow Keys)
  // --------------------------------------------------------------------------
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        triggerPause();
        handlePrev();
        triggerResumeWithDelay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        triggerPause();
        handleNext();
        triggerResumeWithDelay();
      }
    },
    [handlePrev, handleNext, triggerPause, triggerResumeWithDelay]
  );

  // --------------------------------------------------------------------------
  // MOBILE TOUCH SWIPE SUPPORT
  // --------------------------------------------------------------------------
  const handleTouchStart = (e) => {
    triggerPause();
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    triggerResumeWithDelay();
  };

  // --------------------------------------------------------------------------
  // ARC GEOMETRY & LAYOUT CALCULATIONS
  // --------------------------------------------------------------------------
  const currentConfig = ARC_CONFIG[screenSize] || ARC_CONFIG.desktop;
  const { RADIUS, STEP_DEG, MAX_VISIBLE } = currentConfig;
  const stepRad = (STEP_DEG * Math.PI) / 180;

  return (
    <section
      ref={containerRef}
      onKeyDown={handleKeyDown}
      onMouseEnter={triggerPause}
      onMouseLeave={triggerResumeWithDelay}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      aria-label="Interactive Atelier Services Arc Carousel"
      aria-roledescription="carousel"
      className="relative w-full py-12 sm:py-20 lg:py-24 bg-[#F7F3EC] text-[#171514] overflow-hidden select-none bg-grain focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B08A57]"
    >
      {/* Soft Radial Botanical Glow behind the center in Ivory Theme */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] lg:w-[780px] h-[300px] sm:h-[460px] lg:h-[600px] bg-gradient-to-tr from-[#D9B1AE]/35 via-[#A76570]/18 to-[#B08A57]/15 rounded-full filter blur-[80px] sm:blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Architectural Tag */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[#B08A57] font-sans font-medium">
          <span>✦</span>
          <span>Disciplines & Capabilities</span>
          <span>✦</span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* CENTER DETAILS BLOCK (Selected Service Showcase with Cross-fade)    */}
      {/* ==================================================================== */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center min-h-[290px] sm:min-h-[320px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.id}
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center w-full"
          >
            {/* Service Number (01, 02, etc.) */}
            <span className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#A76570] font-light tracking-wide mb-2 sm:mb-3">
              {currentService.number}
            </span>

            {/* Service Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-editorial font-light text-[#171514] tracking-tight leading-[1.12] mb-3 sm:mb-4 max-w-2xl text-balance">
              {currentService.title}
            </h2>

            {/* One-Line Description */}
            <p className="text-sm sm:text-base text-[#3C3C3C]/80 font-sans leading-relaxed max-w-xl mb-6 font-light">
              {currentService.description}
            </p>

            {/* 3 Bullets with Gold Diamond ✦ Markers */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mb-7 sm:mb-8 text-xs sm:text-sm text-[#171514]/90 font-sans">
              {currentService.bullets.map((bullet, idx) => (
                <div key={idx} className="inline-flex items-center gap-2">
                  <span className="text-[#A76570] text-xs">✦</span>
                  <span className="font-light">{bullet}</span>
                </div>
              ))}
            </div>

            {/* "Discuss this service ↗" Button */}
            <Link
              to={`/contact?service=${currentService.slug}`}
              className="inline-flex items-center gap-2 px-7 sm:px-9 py-3 sm:py-3.5 bg-[#A76570] hover:bg-[#8C525C] text-[#F7F3EC] text-xs uppercase tracking-[0.22em] font-medium rounded-sm border border-[#D9B1AE]/40 transition-all gold-shimmer shadow-lg hover:-translate-y-0.5 cursor-pointer group"
            >
              <span>Discuss this service</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#F7F3EC] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Thin Gold Progress Line Under Details (Shows time to next auto-change) */}
        {!reducedMotion && (
          <div
            className="w-48 sm:w-64 h-[2px] bg-[#B08A57]/20 rounded-full mt-7 sm:mt-9 overflow-hidden relative"
            aria-hidden="true"
          >
            <div
              className="h-full bg-gradient-to-r from-[#DFBF7A] via-[#B08A57] to-[#A76570] transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>

      {/* Navigation Arrow Controls & Auto-play Pause Indicator */}
      <div className="relative z-10 max-w-md sm:max-w-xl mx-auto px-6 mt-6 sm:mt-8 mb-4 flex items-center justify-between text-xs font-sans text-[#3C3C3C]/70">
        <button
          onClick={() => {
            triggerPause();
            handlePrev();
            triggerResumeWithDelay();
          }}
          aria-label="Previous service"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#B08A57]/40 hover:border-[#B08A57] bg-[#FDFBF7] text-[#171514] flex items-center justify-center transition-all hover:scale-105 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B08A57]"
        >
          <ChevronLeft className="w-4 h-4 text-[#A76570]" />
        </button>

        {/* Status text matching reference layout */}
        <div className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#B08A57] text-center font-medium">
          {isPaused ? 'Paused · Hover or click to browse' : 'Autoplay · 4s loop'}
        </div>

        <button
          onClick={() => {
            triggerPause();
            handleNext();
            triggerResumeWithDelay();
          }}
          aria-label="Next service"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#B08A57]/40 hover:border-[#B08A57] bg-[#FDFBF7] text-[#171514] flex items-center justify-center transition-all hover:scale-105 cursor-pointer shadow-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B08A57]"
        >
          <ChevronRight className="w-4 h-4 text-[#A76570]" />
        </button>
      </div>

      {/* ==================================================================== */}
      {/* ARC CAROUSEL (Smile-shaped Arc at Bottom)                            */}
      {/* ==================================================================== */}
      <div className="relative w-full overflow-hidden h-[150px] sm:h-[180px] lg:h-[210px] flex items-end justify-center pointer-events-auto">
        <div className="relative w-full h-full flex items-end justify-center">
          {SERVICES_LIST.map((service, index) => {
            // Shortest circular offset (-4 to +4)
            const diff = getCircularOffset(index, activeIndex, totalServices);
            const absDiff = Math.abs(diff);

            // Hide tiles outside visible range for the current breakpoint
            const isVisible = absDiff <= MAX_VISIBLE;
            const isSelected = diff === 0;

            // Mathematical positioning along smile arc:
            // angle = diff * STEP
            // x = R * sin(angle)
            // y = -R * (1 - cos(angle))  (Smile arc: center at lowest point, sides curve upward!)
            // rotate = angle (tangent to arc)
            const angleRad = diff * stepRad;
            const angleDeg = diff * STEP_DEG;
            const posX = RADIUS * Math.sin(angleRad);
            const posY = -RADIUS * (1 - Math.cos(angleRad));

            // Dynamic scaling and opacity based on distance from center
            const scale = isSelected ? 1.15 : Math.max(0.7, 0.98 - absDiff * 0.1);
            const opacity = isVisible
              ? isSelected
                ? 1.0
                : Math.max(0.4, 0.90 - absDiff * 0.22)
              : 0;

            const zIndex = isSelected ? 30 : 25 - absDiff * 5;

            const Icon = ICON_COMPONENTS[service.iconName] || Globe;

            return (
              <motion.button
                key={service.id}
                type="button"
                onClick={() => {
                  triggerPause();
                  selectService(index);
                  triggerResumeWithDelay();
                }}
                animate={
                  reducedMotion
                    ? {
                        x: posX,
                        y: posY,
                        scale,
                        opacity,
                        rotate: 0,
                      }
                    : {
                        x: posX,
                        y: posY,
                        scale,
                        opacity,
                        rotate: angleDeg * 0.85,
                      }
                }
                transition={
                  reducedMotion
                    ? { duration: 0.01 }
                    : {
                        type: 'spring',
                        stiffness: 170,
                        damping: 24,
                        mass: 0.85,
                      }
                }
                style={{
                  zIndex,
                  pointerEvents: isVisible ? 'auto' : 'none',
                }}
                aria-label={`${service.number}. ${service.title}`}
                aria-current={isSelected ? 'true' : 'false'}
                className={`absolute bottom-2 sm:bottom-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B08A57] rounded-sm p-3 sm:p-4 flex flex-col items-center justify-between transition-colors ${
                  isSelected
                    ? 'w-24 sm:w-28 h-28 sm:h-32 bg-gradient-to-b from-[#A76570] to-[#672D39] border-2 border-[#DFBF7A] shadow-[0_12px_32px_rgba(103,45,57,0.28)] ring-2 ring-[#B08A57]/30 text-[#F7F3EC]'
                    : 'w-20 sm:w-24 h-24 sm:h-28 bg-[#FDFBF7] border border-[#B08A57]/35 hover:border-[#B08A57] text-[#171514] shadow-sm hover:shadow-md hover:bg-[#F4ECE4]'
                }`}
              >
                {/* Top Number */}
                <div className="w-full flex justify-between items-center text-[10px] sm:text-xs">
                  <span
                    className={`font-editorial ${
                      isSelected ? 'text-[#F7F3EC] font-medium' : 'text-[#B08A57]'
                    }`}
                  >
                    {service.number}
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DFBF7A] shadow-[0_0_6px_#DFBF7A]" />
                  )}
                </div>

                {/* Line Icon */}
                <div className="my-auto">
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform ${
                      isSelected ? 'text-[#F7F3EC] scale-110' : 'text-[#A76570]'
                    }`}
                  />
                </div>

                {/* Short Label */}
                <div
                  className={`text-[9px] sm:text-[10px] tracking-wider uppercase font-sans text-center truncate w-full ${
                    isSelected ? 'text-[#F7F3EC] font-semibold' : 'text-[#171514]/80'
                  }`}
                >
                  {service.shortName}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesArc;
