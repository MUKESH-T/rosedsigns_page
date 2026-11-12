import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

// ============================================================================
// CURVY ROAD SCROLL TIMING CONFIGURATION (Hero Start → End of About Section)
// ============================================================================
// 1. HERO (0.00 → 0.25): Rose blooms majestically on the RIGHT shoulder of Hero.
// 2. HERO EXIT & CHICANE (0.25 → 0.45): Follows a curvy road, winding inward,
//    then swooping through a classic S-curve chicane back to center-right.
// 3. ABOUT SECTION SWEEP (0.45 → 0.80): Sweeps deeply across the screen from
//    RIGHT to LEFT as user explores atelier photography and provenance.
// 4. END OF ABOUT VANISHING (0.85 → 0.98): Rose concludes its curvy road sweep
//    at the far left edge and completely vanishes at the end of About on ALL devices.
// 5. SERVICES & BEYOND (1.00+): Rose is 100% invisible (opacity: 0, hidden).
// ============================================================================
export const SCROLL_TIMING = {
  HERO_START: 0.0,
  HERO_BLOOM: 0.12,
  CURVE_INWARD: 0.25,
  CHICANE_BEND: 0.38,
  ABOUT_ENTER: 0.52,
  ABOUT_SWEEP: 0.66,
  ABOUT_EXIT_START: 0.82,
  ABOUT_EXIT_END: 0.98,
  VANISHED: 1.0,
};

interface RoseScrollAnimationProps {
  /** Reference to the Hero & About container wrapper */
  journeyRef?: React.RefObject<HTMLElement | null>;
  /** Backwards-compatible containerRef */
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

/**
 * CurvyRoadTrack: Kept as a no-op null component for backwards compatibility.
 * The visible road line has been removed per user preference so only the rose itself follows the curvy trajectory.
 */
export const CurvyRoadTrack: React.FC<{
  journeyRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}> = () => null;

export const RoseScrollAnimation: React.FC<RoseScrollAnimationProps> = ({
  journeyRef,
  containerRef,
  className = '',
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [hasBloomed, setHasBloomed] = useState(false);
  const [isVanished, setIsVanished] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();

    window.addEventListener('resize', checkMobile);

    // Desktop subtle mouse parallax handler
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth >= 1024) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMouseOffset({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Active real-time scroll boundary verification:
    // Guarantees the rose vanishes at the end of the About section on ALL devices
    const checkVanishedAtEndOfAbout = () => {
      const aboutEl = document.getElementById('about');
      if (!aboutEl) return;
      const rect = aboutEl.getBoundingClientRect();

      // The end of About section occurs when the bottom of About scrolls up to
      // near or above the lower portion of the screen (rect.bottom <= window.innerHeight * 0.25).
      // At this point, the user is completing the About section and entering Services.
      // The rose MUST be 100% vanished on all devices.
      const atOrPastEndOfAbout = rect.bottom <= window.innerHeight * 0.25;
      setIsVanished(atOrPastEndOfAbout);
    };

    window.addEventListener('scroll', checkVanishedAtEndOfAbout, { passive: true });
    checkVanishedAtEndOfAbout();

    // Synchronize bloom with loader curtain
    const isFirstVisit = !sessionStorage.getItem('rosedsigns_loaded');
    const delay = isFirstVisit ? 2400 : 350;

    const bloomTimer = setTimeout(() => {
      setHasBloomed(true);
    }, delay);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', checkVanishedAtEndOfAbout);
      clearTimeout(bloomTimer);
    };
  }, []);

  // Track scroll progress along the Hero + About journey
  const targetElement = journeyRef || containerRef;
  const { scrollYProgress } = useScroll(
    targetElement
      ? {
          target: targetElement,
          offset: ['start start', 'end end'],
        }
      : {}
  );

  // High-precision smooth spring for fluid travel along the curvy road
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 24,
    restDelta: 0.001,
  });

  // --------------------------------------------------------------------------
  // CURVY ROAD WAYPOINTS (0.00 to 1.05 of the Hero → About journey)
  // --------------------------------------------------------------------------
  // Notice: Instead of a straight line, the trajectory forms an undulating S-curve:
  // Starts on the RIGHT → curves left → swoops back right in a chicane →
  // sweeps broadly across the center → deep curve to far LEFT → vanishes completely!
  const progressSteps = [
    0.0,   // Hero top
    0.12,  // Hero headline
    0.25,  // Hero buttons
    0.38,  // Chicane curve (S-turn!)
    0.52,  // About entry & provenance
    0.66,  // About story & atelier
    0.80,  // About counters & signature
    0.92,  // Nearing end of About
    0.98,  // Exact end of About section
    1.05,  // Services section and beyond
  ];

  // --------------------------------------------------------------------------
  // HORIZONTAL DISPLACEMENT (CURVY ROAD FROM RIGHT TO LEFT)
  // --------------------------------------------------------------------------
  const desktopX = useTransform(
    smoothProgress,
    progressSteps,
    [
      '82vw',  // Right side of Hero
      '75vw',  // Curves inward
      '62vw',  // Swoops left
      '70vw',  // S-CURVE BEND: swoops back right through chicane!
      '52vw',  // Sweeps across center
      '34vw',  // Sweeps left into About story
      '18vw',  // Lower About, far left
      '4vw',   // Near left margin
      '-6vw',  // Off-screen to the left (vanished)
      '-12vw', // Past edge
    ]
  );

  const mobileX = useTransform(
    smoothProgress,
    progressSteps,
    [
      '76vw',  // Right side of Hero (Mobile)
      '70vw',  // Curves inward
      '56vw',  // Swoops left
      '64vw',  // S-CURVE BEND: swoops back right
      '46vw',  // Sweeps across center
      '28vw',  // Sweeps left into About story
      '14vw',  // Lower About, far left
      '0vw',   // Left edge
      '-8vw',  // Off-screen to the left (vanished)
      '-14vw', // Past edge
    ]
  );

  // --------------------------------------------------------------------------
  // VERTICAL DISPLACEMENT (DESCENDING SMOOTHLY DOWN THE CURVY ROAD)
  // --------------------------------------------------------------------------
  const desktopY = useTransform(
    smoothProgress,
    progressSteps,
    [
      '24vh',
      '30vh',
      '38vh',
      '45vh',
      '52vh',
      '58vh',
      '63vh',
      '67vh',
      '70vh',
      '72vh',
    ]
  );

  const mobileY = useTransform(
    smoothProgress,
    progressSteps,
    [
      '22vh',
      '28vh',
      '35vh',
      '42vh',
      '48vh',
      '54vh',
      '58vh',
      '62vh',
      '65vh',
      '67vh',
    ]
  );

  // --------------------------------------------------------------------------
  // ROTATION: DYNAMIC BANKING INTO EACH CURVE OF THE ROAD
  // --------------------------------------------------------------------------
  // Banks left (-), counter-steers into the S-bend (+), banks through the long turn (-),
  // and spins away with the wind as it dissolves!
  const allDevicesRotate = useTransform(
    smoothProgress,
    progressSteps,
    [0, -7, -15, 9, -12, -18, -25, -34, -40, -42]
  );

  // --------------------------------------------------------------------------
  // SCALE: GLORIOUS IN HERO → SLIGHT SHRINK ALONG ROAD → DISSOLVES AT END
  // --------------------------------------------------------------------------
  const desktopScale = useTransform(
    smoothProgress,
    progressSteps,
    [1.05, 1.02, 0.98, 0.95, 0.90, 0.84, 0.76, 0.55, 0.30, 0.20]
  );

  const mobileScale = useTransform(
    smoothProgress,
    progressSteps,
    [0.78, 0.75, 0.72, 0.70, 0.65, 0.60, 0.52, 0.38, 0.22, 0.15]
  );

  // --------------------------------------------------------------------------
  // OPACITY: VIBRANT THROUGH HERO & ABOUT, DISSOLVES TO 0 AT THE END OF ABOUT
  // --------------------------------------------------------------------------
  const roseOpacity = useTransform(
    smoothProgress,
    progressSteps,
    [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.9, 0.15, 0.0, 0.0]
  );

  // Active transforms based on screen size
  const activeX = isMobile ? mobileX : desktopX;
  const activeY = isMobile ? mobileY : desktopY;
  const activeScale = isMobile ? mobileScale : desktopScale;
  const activeRotate = reducedMotion ? 0 : allDevicesRotate;

  return (
    <motion.div
      className={`fixed top-0 left-0 pointer-events-none z-20 select-none ${className}`}
      style={{
        x: activeX,
        y: activeY,
        scale: activeScale,
        rotate: activeRotate,
        opacity: isVanished ? 0 : roseOpacity,
        visibility: isVanished ? 'hidden' : 'visible',
        willChange: 'transform, opacity',
      }}
      aria-hidden="true"
    >
      {/* Centering wrapper so activeX/activeY pinpoint the rose's center on the curvy road */}
      <div className="-translate-x-1/2 -translate-y-1/2 relative flex items-center justify-center">
        {/* Micro-parallax spring layer for desktop mouse interaction */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  x: mouseOffset.x,
                  y: mouseOffset.y,
                }
          }
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="relative flex items-center justify-center w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] lg:w-[420px] lg:h-[420px]"
        >
          {/* Soft Radial Botanical Aura Glow */}
          <div
            className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-[#D9B1AE]/35 via-[#A76570]/20 to-[#B08A57]/15 filter blur-3xl pointer-events-none opacity-70"
          />

          {/* Floating petals drifting gently around the blooming rose */}
          {!reducedMotion && (
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <motion.div
                animate={{
                  y: [0, 140, 240],
                  x: [-10, 18, -14],
                  rotate: [0, 45, 95],
                  opacity: [0, 0.7, 0],
                }}
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  delay: 1.2,
                  ease: 'easeInOut',
                }}
                className="absolute top-10 left-6 w-4 h-5 opacity-60"
              >
                <svg viewBox="0 0 20 26" fill="none">
                  <path
                    d="M10 1 C3 6 1 14 4 21 C7 26 14 26 17 20 C20 14 16 6 10 1 Z"
                    fill="#D9B1AE"
                  />
                </svg>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 160, 280],
                  x: [15, -12, 10],
                  rotate: [-15, 60, 120],
                  opacity: [0, 0.65, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  delay: 3.5,
                  ease: 'easeInOut',
                }}
                className="absolute top-20 right-8 w-3.5 h-4.5 opacity-50"
              >
                <svg viewBox="0 0 20 26" fill="none">
                  <path
                    d="M10 1 C3 6 1 14 4 21 C7 26 14 26 17 20 C20 14 16 6 10 1 Z"
                    fill="#A76570"
                  />
                </svg>
              </motion.div>
            </div>
          )}

          {/* ================================================================== */}
          {/* BLOOMING ROSE SVG (Travels along the Curvy Road from Right to Left)  */}
          {/* ================================================================== */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              isMobile ? 'opacity-85 sm:opacity-95' : 'opacity-100'
            }`}
          >
            {/* Subtle slow idle breathing float */}
            <motion.div
              animate={
                reducedMotion
                  ? {}
                  : {
                      y: [-4, 5, -4],
                      rotate: [-0.8, 0.8, -0.8],
                    }
              }
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-full h-full flex items-center justify-center"
            >
              <svg
                viewBox="0 0 340 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_15px_30px_rgba(103,45,57,0.18)] overflow-visible"
              >
                <defs>
                  {/* Botanical Gold Gradient for Stem and Leaves */}
                  <linearGradient id="roseStemGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#DFBF7A" />
                    <stop offset="45%" stopColor="#B08A57" />
                    <stop offset="100%" stopColor="#7E5828" />
                  </linearGradient>

                  {/* Outer Petals: Burgundy to Antique Rose for rich shadow depth */}
                  <linearGradient id="outerPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A76570" />
                    <stop offset="50%" stopColor="#8C4D5A" />
                    <stop offset="100%" stopColor="#672D39" />
                  </linearGradient>

                  {/* Middle Petals: Antique Rose to Dusty Blush */}
                  <linearGradient id="midPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E5C2C0" />
                    <stop offset="45%" stopColor="#D9B1AE" />
                    <stop offset="100%" stopColor="#A76570" />
                  </linearGradient>

                  {/* Inner Petals: Delicate Highlight Blush to Ivory Rose */}
                  <linearGradient id="innerPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F9ECE9" />
                    <stop offset="50%" stopColor="#E5C2C0" />
                    <stop offset="100%" stopColor="#D9B1AE" />
                  </linearGradient>

                  {/* Core Velvet Heart */}
                  <linearGradient id="coreHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#A76570" />
                    <stop offset="60%" stopColor="#672D39" />
                    <stop offset="100%" stopColor="#3E151E" />
                  </linearGradient>
                </defs>

                {/* ------------------------------------------------------------ */}
                {/* STEM & BOTANICAL GOLD LEAVES                                 */}
                {/* ------------------------------------------------------------ */}
                <g className="origin-bottom">
                  {/* Organic S-curve golden stem */}
                  <motion.path
                    d="M170 190 Q 155 250 185 320 T 170 375"
                    fill="none"
                    stroke="url(#roseStemGold)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={reducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
                    animate={{ pathLength: hasBloomed ? 1 : 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* Left Botanical Leaf */}
                  <motion.g
                    initial={reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    animate={
                      hasBloomed
                        ? { scale: 1, opacity: 1, rotate: 0 }
                        : { scale: 0, opacity: 0, rotate: -25 }
                    }
                    transition={{ delay: 0.7, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: '168px 250px' }}
                  >
                    <path
                      d="M168 250 C120 235 90 270 95 305 C135 305 160 280 168 250 Z"
                      fill="url(#roseStemGold)"
                      opacity="0.9"
                    />
                    {/* Leaf vein */}
                    <path
                      d="M168 250 Q 130 275 100 300"
                      stroke="#F7F3EC"
                      strokeWidth="1.2"
                      fill="none"
                      opacity="0.4"
                    />
                  </motion.g>

                  {/* Right Botanical Leaf */}
                  <motion.g
                    initial={reducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    animate={
                      hasBloomed
                        ? { scale: 1, opacity: 1, rotate: 0 }
                        : { scale: 0, opacity: 0, rotate: 25 }
                    }
                    transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformOrigin: '175px 285px' }}
                  >
                    <path
                      d="M175 285 C220 275 245 305 240 338 C200 340 180 315 175 285 Z"
                      fill="url(#roseStemGold)"
                      opacity="0.9"
                    />
                    {/* Leaf vein */}
                    <path
                      d="M175 285 Q 210 310 235 332"
                      stroke="#F7F3EC"
                      strokeWidth="1.2"
                      fill="none"
                      opacity="0.4"
                    />
                  </motion.g>
                </g>

                {/* ------------------------------------------------------------ */}
                {/* BLOOMING ROSE PETALS (Layered from outer to inner)          */}
                {/* ------------------------------------------------------------ */}
                <g transform="translate(170, 160)">
                  {/* 1. OUTER GUARD PETALS (Burgundy / Antique Rose) */}
                  <motion.g
                    initial={reducedMotion ? { scale: 1 } : { scale: 0.2, rotate: -20, opacity: 0 }}
                    animate={
                      hasBloomed
                        ? { scale: 1, rotate: 0, opacity: 1 }
                        : { scale: 0.2, rotate: -20, opacity: 0 }
                    }
                    transition={{ delay: 0.3, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Bottom Outer Petal */}
                    <path
                      d="M0 25 C-65 35 -75 85 0 95 C75 85 65 35 0 25 Z"
                      fill="url(#outerPetalGrad)"
                    />
                    {/* Bottom Left Outer Petal */}
                    <path
                      d="M-20 10 C-95 10 -105 75 -45 85 C-15 80 -10 40 -20 10 Z"
                      fill="url(#outerPetalGrad)"
                      opacity="0.95"
                    />
                    {/* Bottom Right Outer Petal */}
                    <path
                      d="M20 10 C95 10 105 75 45 85 C15 80 10 40 20 10 Z"
                      fill="url(#outerPetalGrad)"
                      opacity="0.95"
                    />
                    {/* Upper Left Outer Petal */}
                    <path
                      d="M-30 -15 C-105 -35 -105 35 -40 45 C-15 35 -15 0 -30 -15 Z"
                      fill="url(#outerPetalGrad)"
                      opacity="0.9"
                    />
                    {/* Upper Right Outer Petal */}
                    <path
                      d="M30 -15 C105 -35 105 35 40 45 C15 35 15 0 30 -15 Z"
                      fill="url(#outerPetalGrad)"
                      opacity="0.9"
                    />
                  </motion.g>

                  {/* 2. MIDDLE BLOOMING PETALS (Antique Rose / Dusty Blush) */}
                  <motion.g
                    initial={reducedMotion ? { scale: 1 } : { scale: 0.2, rotate: 25, opacity: 0 }}
                    animate={
                      hasBloomed
                        ? { scale: 1, rotate: 0, opacity: 1 }
                        : { scale: 0.2, rotate: 25, opacity: 0 }
                    }
                    transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <path
                      d="M-15 -35 C-75 -50 -80 15 -25 35 C0 35 5 10 -15 -35 Z"
                      fill="url(#midPetalGrad)"
                    />
                    <path
                      d="M15 -35 C75 -50 80 15 25 35 C0 35 -5 10 15 -35 Z"
                      fill="url(#midPetalGrad)"
                    />
                    <path
                      d="M0 -45 C-55 -75 -65 -20 -15 0 C15 0 25 -25 0 -45 Z"
                      fill="url(#midPetalGrad)"
                      opacity="0.95"
                    />
                    <path
                      d="M0 0 C-45 15 -45 55 0 60 C45 55 45 15 0 0 Z"
                      fill="url(#midPetalGrad)"
                      opacity="0.9"
                    />
                  </motion.g>

                  {/* 3. INNER DELICATE PETALS (Dusty Blush / Ivory Rose) */}
                  <motion.g
                    initial={reducedMotion ? { scale: 1 } : { scale: 0.15, rotate: -35, opacity: 0 }}
                    animate={
                      hasBloomed
                        ? { scale: 1, rotate: 0, opacity: 1 }
                        : { scale: 0.15, rotate: -35, opacity: 0 }
                    }
                    transition={{ delay: 0.7, duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <path
                      d="M-10 -25 C-45 -35 -40 5 -5 15 C15 15 15 -5 -10 -25 Z"
                      fill="url(#innerPetalGrad)"
                    />
                    <path
                      d="M10 -25 C45 -35 40 5 5 15 C-15 15 -15 -5 10 -25 Z"
                      fill="url(#innerPetalGrad)"
                    />
                    <path
                      d="M0 -30 C-30 -40 -25 -5 0 5 C25 -5 30 -40 0 -30 Z"
                      fill="url(#innerPetalGrad)"
                      opacity="0.95"
                    />
                  </motion.g>

                  {/* 4. CENTRAL HEART BUD (Velvet Burgundy Core) */}
                  <motion.g
                    initial={reducedMotion ? { scale: 1 } : { scale: 0.1, opacity: 0 }}
                    animate={
                      hasBloomed
                        ? { scale: 1, opacity: 1 }
                        : { scale: 0.1, opacity: 0 }
                    }
                    transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <path
                      d="M0 -18 C-18 -18 -15 5 0 10 C15 5 18 -18 0 -18 Z"
                      fill="url(#coreHeartGrad)"
                    />
                    {/* Swirling center spiral */}
                    <path
                      d="M-3 -12 C-8 -10 -7 -3 0 0 C6 -3 5 -10 0 -12 Z"
                      fill="#F2D7D5"
                      opacity="0.75"
                    />
                  </motion.g>
                </g>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
