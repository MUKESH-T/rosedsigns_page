import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { AGENCY_INFO, STATS_DATA } from '../../data/agencyData';
import logoImage from '../../assets/logo.png';

interface CounterProps {
  end: number;
  suffix: string;
  label: string;
  sub: string;
}

const AnimatedCounter: React.FC<CounterProps> = ({ end, suffix, label, sub }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 1800; // 1.8s

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, end]);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="font-editorial text-4xl sm:text-5xl font-light text-[#171514] tabular-nums tracking-tight">
        {count}
        <span className="text-[#A76570] ml-0.5">{suffix}</span>
      </div>
      <div className="text-xs uppercase tracking-[0.2em] font-medium text-[#171514] mt-1.5 font-sans">
        {label}
      </div>
      <div className="text-[11px] text-[#3C3C3C]/60 font-sans tracking-wide mt-0.5">
        {sub}
      </div>
    </div>
  );
};

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 sm:py-32 relative bg-[#F7F3EC] overflow-hidden bg-grain">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-12 sm:mb-16">
          <span className="text-[#B08A57] text-sm">✦</span>
          <span className="text-xs uppercase tracking-[0.25em] text-[#B08A57] font-sans font-medium">
            Our Provenance & Philosophy
          </span>
          <div className="h-[1px] flex-1 max-w-[120px] bg-[#B08A57]/30" />
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Gold Offset Frame and Parallax hover effect */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative group"
          >
            {/* Gold Offset Architectural Outer Frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-[#B08A57] rounded-sm pointer-events-none transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-2" />
            
            {/* Subtle Dusty Blush Backdrop Plate */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#D9B1AE]/20 rounded-sm pointer-events-none" />

            {/* Studio Image Container */}
            <div className="relative z-10 overflow-hidden rounded-sm aspect-[3/4] bg-[#E8E2D8] shadow-lg">
              <img
                src={logoImage}
                alt="RoseDsigns logo"
                className="w-full h-full object-contain p-8 sm:p-12 transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171514]/40 via-transparent to-transparent opacity-60" />
              
              
            </div>
          </motion.div>

          {/* Right Column: Brand Story Text, Counters, and Signature Line */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center relative z-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-light text-[#171514] leading-[1.15] mb-6 text-balance">
              Rose<span className="italic font-normal text-[#A76570]">Dsigns</span>
            </h2>

            <p className="text-base sm:text-lg text-[#3C3C3C]/80 font-sans leading-relaxed mb-6 font-light">
              RoseDsigns is a creative design and digital marketing agency. We create meaningful brands, compelling content and impactful campaigns that help businesses stand out and grow.Every brand has a story worth telling. We bring clarity, care and creativity to the way yours is seen, heard and remembered, from the first logo to the last campaign.
            </p>

            <p className="text-sm sm:text-base text-[#3C3C3C]/70 font-sans leading-relaxed mb-10">
             We create meaningful brands, compelling content and impactful campaigns that help businesses stand out and grow. Every brand has a story worth telling, and we make sure yours is seen, heard and remembered.
            </p>

            

            
          </motion.div>
        </div>
      </div>
    </section>
  );
};
