import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/agencyData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const current = TESTIMONIALS_DATA[currentIndex];

  return (
    <section className="py-24 sm:py-32 relative bg-[#F7F3EC] overflow-hidden border-t border-[#B08A57]/20 bg-grain">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="text-[#B08A57] text-sm">✦</span>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B08A57] font-sans font-medium">
            Client Words & Endorsements
          </span>
          <span className="text-[#B08A57] text-sm">✦</span>
        </div>

        {/* Testimonial Box */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative min-h-[300px] flex flex-col justify-center items-center py-6"
        >
          {/* Subtle Quote Icon Background */}
          <div className="absolute top-0 opacity-15 pointer-events-none text-[#B08A57]">
            <Quote className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center relative z-10 max-w-3xl"
            >
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-editorial font-light text-[#171514] leading-relaxed mb-8 italic">
                "{current.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="flex flex-col items-center">
                <cite className="not-italic font-editorial text-lg sm:text-xl font-medium text-[#171514]">
                  {current.author}
                </cite>
                <div className="text-xs uppercase tracking-[0.2em] text-[#A76570] font-sans mt-1">
                  {current.title} · {current.company}
                </div>
                <div className="text-[11px] font-sans tracking-wide text-[#3C3C3C]/60 mt-0.5">
                  {current.location}
                </div>

                {/* Concrete result badge */}
                <div className="mt-4 px-3.5 py-1 bg-[#E8E2D8]/70 border border-[#B08A57]/30 rounded-full text-[11px] font-sans font-medium text-[#B08A57] tracking-wider uppercase">
                  Impact: {current.result}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-[#B08A57]/30 hover:border-[#B08A57] bg-[#F7F3EC] text-[#171514] flex items-center justify-center transition-all hover:scale-105 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B08A57]"
              aria-label="Previous endorsement"
            >
              <ChevronLeft className="w-4 h-4 text-[#171514]" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS_DATA.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    currentIndex === idx ? 'w-6 bg-[#A76570]' : 'w-2 bg-[#B08A57]/30'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-[#B08A57]/30 hover:border-[#B08A57] bg-[#F7F3EC] text-[#171514] flex items-center justify-center transition-all hover:scale-105 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#B08A57]"
              aria-label="Next endorsement"
            >
              <ChevronRight className="w-4 h-4 text-[#171514]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
