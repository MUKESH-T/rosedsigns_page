import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { FloatingPetals } from '../common/FloatingPetals';

interface HeroProps {
  onExploreWork: () => void;
  onTalk: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onTalk }) => {
  const headlineWords = [
    { text: 'Ideas', italic: false, highlight: false },
    { text: 'that', italic: false, highlight: false },
    { text: 'make', italic: false, highlight: false },
    { text: 'your', italic: false, highlight: false },
    { text: 'brand', italic: false, highlight: false },
    { text: 'bloom.', italic: true, highlight: true }
  ];

  const marqueeItems = [
    'Website Design & Development',
    'Branding & Visual Identity',
    'Social Media Presence',
    'SEO & Digital Marketing',
    'Graphics & Video Ads',
    'Analytics & Reporting', 
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-32 sm:pt-36 pb-8 overflow-hidden bg-gradient-to-b from-[#F7F3EC] via-[#F4ECE4] to-[#EFE6DC] bg-grain"
    >
      {/* Floating Rose Petals Backdrop */}
      <FloatingPetals count={9} />

      {/* Subtle Radial Glow in Antique Rose / Dusty Blush */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[#D9B1AE]/25 via-[#A76570]/15 to-transparent rounded-full filter blur-[90px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 my-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headline, Narrative & Primary Actions */}
          <div className="lg:col-span-7 xl:col-span-8 text-center lg:text-left flex flex-col items-center lg:items-start">
            {/* Subtle top kicker with small diamond dividers */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-3 text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-[#B08A57] mb-6 sm:mb-8"
            >
              <span>✦</span>
              <span>Creative · Branding · Advertising</span>
              <span>✦</span>
            </motion.div>

            {/* Headline with Word-by-Word Reveal */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-light text-[#171514] tracking-tight leading-[1.08] sm:leading-[1.05] mb-8 text-balance">
              {headlineWords.map((word, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.25 + idx * 0.1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className={`inline-block mr-2.5 sm:mr-4 ${
                    word.highlight
                      ? 'text-[#A76570] font-normal italic font-editorial'
                      : 'text-[#171514]'
                  }`}
                >
                  {word.text}
                </motion.span>
              ))}
            </h1>

            {/* Narrative Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="text-base sm:text-lg md:text-xl text-[#3C3C3C]/80 font-sans max-w-2xl mb-10 sm:mb-12 leading-relaxed"
            >
              We engineer timeless visual identities and high-conversion digital ateliers for visionary luxury brands. Patience, prestige, and aesthetic rigor in every detail.
            </motion.p>

            {/* Two Primary Buttons: Filled Rose & Outline Gold */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 w-full sm:w-auto"
            >
              {/* Filled Rose Button with Gold Shimmer */}
              <button
                onClick={onExploreWork}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#A76570] hover:bg-[#8C525C] text-[#F7F3EC] text-xs uppercase tracking-[0.22em] font-medium rounded-sm border border-[#D9B1AE]/40 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 gold-shimmer flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>View Our Work</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#F7F3EC] group-hover:translate-y-0.5 transition-transform" />
              </button>

              {/* Outline Gold Button */}
              <button
                onClick={onTalk}
                className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-[#B08A57]/10 text-[#171514] text-xs uppercase tracking-[0.22em] font-medium rounded-sm border border-[#B08A57] transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B08A57] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Scroll-Down Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-12 sm:mt-16 flex items-center gap-2 text-[#B08A57]/80 hover:text-[#B08A57] transition-colors cursor-pointer"
              onClick={onExploreWork}
            >
              <span className="text-[10px] tracking-[0.3em] uppercase font-sans">Scroll to Discover</span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="w-4 h-4 text-[#B08A57]" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Dedicated Space reserved for the Fixed Scroll-Driven Blooming Rose */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 h-[440px] pointer-events-none" aria-hidden="true" />
        </div>
      </div>

      {/* Marquee Strip Below with Services Text & Diamond Dividers */}
      <div className="relative z-10 w-full mt-10 border-y border-[#B08A57]/20 bg-[#F7F3EC]/70 backdrop-blur-sm py-3.5 overflow-hidden select-none">
        <div className="flex w-max animate-marquee space-x-8">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <div key={index} className="flex items-center space-x-8 text-xs font-sans tracking-[0.25em] uppercase text-[#171514]/80 whitespace-nowrap">
              <span>{item}</span>
              <span className="text-[#B08A57]">✦</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
