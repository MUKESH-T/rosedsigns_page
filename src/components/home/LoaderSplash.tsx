import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../common/Logo';

interface LoaderSplashProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export const LoaderSplash: React.FC<LoaderSplashProps> = ({ onComplete, forceShow = false }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const brandLetters = 'ROSEDSIGNS'.split('');

  useEffect(() => {
    // Check sessionStorage unless forced
    const hasLoaded = sessionStorage.getItem('rosedsigns_loaded');
    if (hasLoaded && !forceShow) {
      onComplete();
      return;
    }

    // 0-100 counter over ~2.1 seconds
    const intervalTime = 20; // 20ms * 100 = 2000ms
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem('rosedsigns_loaded', 'true');
            setTimeout(onComplete, 700); // Wait for curtain slide up
          }, 250);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [forceShow, onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('rosedsigns_loaded', 'true');
    setIsDone(true);
    setTimeout(onComplete, 300);
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="loader-curtain"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.77, 0, 0.175, 1] }
          }}
          className="fixed inset-0 z-[99999] bg-[#F7F3EC] flex flex-col items-center justify-center p-6 select-none bg-grain"
        >
          {/* Subtle botanical corner motifs */}
          <div className="absolute top-8 left-8 text-xs font-sans tracking-[0.25em] text-[#B08A57] uppercase">
            ✦ Atelier Paris
          </div>
          <div className="absolute top-8 right-8">
            <button
              onClick={handleSkip}
              className="text-xs font-sans tracking-[0.2em] text-[#171514]/60 hover:text-[#171514] uppercase transition-colors px-3 py-1 border border-[#B08A57]/30 rounded-full"
            >
              Skip
            </button>
          </div>

          <div className="flex flex-col items-center max-w-sm w-full">
            {/* Logo scaling & Rose blooming */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 relative"
            >
              <Logo size="xl" showWordmark={false} />

              {/* Blooming aura glow behind emblem */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [0.8, 1.3, 1.1], opacity: [0, 0.45, 0.2] }}
                transition={{ duration: 1.8, repeat: Infinity, repeatType: 'reverse' }}
                className="absolute inset-0 -m-4 bg-gradient-to-r from-[#D9B1AE]/30 via-[#B08A57]/20 to-transparent rounded-full filter blur-xl pointer-events-none"
              />
            </motion.div>

            {/* Staggered ROSEDSIGNS Letters */}
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-3 overflow-hidden">
              {brandLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`font-editorial font-semibold text-2xl sm:text-3xl tracking-[0.25em] ${
                    letter === 'D' ? 'text-[#A76570] italic font-normal' : 'text-[#171514]'
                  }`}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="text-xs font-sans uppercase tracking-[0.35em] text-[#B08A57] mb-10 text-center"
            >
              Ideas that make your brand bloom
            </motion.p>

            {/* Thin gold progress line & 0-100 counter */}
            <div className="w-full max-w-[260px] flex flex-col items-center gap-2">
              <div className="w-full h-[1.5px] bg-[#E8E2D8] relative overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#B08A57] via-[#A76570] to-[#B08A57]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="w-full flex justify-between items-center text-[11px] font-mono tabular-nums text-[#3C3C3C]/80 mt-1">
                <span className="tracking-widest uppercase text-[#B08A57]">Creating</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 text-center">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#3C3C3C]/50 font-sans">
              Creative · Branding · Advertising
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
