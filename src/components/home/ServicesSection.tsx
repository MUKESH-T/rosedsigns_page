import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA } from '../../data/agencyData';

export const ServicesSection: React.FC = () => {
  const [activeServiceId, setActiveServiceId] = useState<string>('website-design-development');
  const [currentTime, setCurrentTime] = useState<string>('');
  const navigate = useNavigate();

  // Live real-time clock for the editorial bottom right bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="services"
      className="py-20 sm:py-28 lg:py-36 relative bg-[#F7F3EC] text-[#171514] overflow-hidden bg-grain select-none"
    >
      {/* Subtle Radial Blush Aura Glow in Background */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#D9B1AE]/20 via-[#A76570]/10 to-[#B08A57]/10 rounded-full filter blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Editorial Status Line */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-10 sm:mb-14">
        <div className="flex items-center justify-between text-[11px] font-sans tracking-[0.25em] uppercase text-[#3C3C3C]/60 pb-4 border-b border-[#B08A57]/20">
          <div className="flex items-center gap-3">
            <span className="text-[#B08A57]">✦</span>
            <span className="font-medium text-[#171514]/90">RoseDsigns </span>
            <span className="hidden sm:inline text-[#B08A57]/40">·</span>
            <span className="hidden sm:inline">Our Services</span>
          </div>

          

          
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative">
        {/* Pure Typography Showcase (Sleek minimized title sizing) */}
        <div className="relative min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center space-y-0.5 sm:space-y-1 lg:space-y-1.5 z-10 w-full py-4">
            {SERVICES_DATA.map((service) => {
              const isActive = activeServiceId === service.id;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setActiveServiceId(service.id)}
                  onClick={() => navigate('/services')}
                  className="relative group cursor-pointer py-0.5 sm:py-1 px-3 transition-all duration-200"
                >
                  <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                    <span
                      className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-sans font-extrabold tracking-tight uppercase transition-all duration-300 ${
                        isActive
                          ? 'text-[#171514] scale-[1.02] opacity-100 drop-shadow-sm'
                          : 'text-[#171514]/20 hover:text-[#171514]/50 opacity-60'
                      }`}
                      style={{
                        WebkitTextStroke: isActive ? 'none' : '0.5px rgba(23, 21, 20, 0.08)',
                      }}
                    >
                      {service.displayTitle || service.title}
                    </span>

                    {/* Glowing blue accent dot on the active title */}
                    {isActive && (
                      <motion.span
                        layoutId="activeServiceDot"
                        className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#3B82F6] shadow-[0_0_10px_rgba(59,130,246,0.85)] shrink-0"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </div>

                  {/* Right side subtle metadata tag on active row */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="hidden xl:flex absolute left-full ml-6 top-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap text-[10px] font-sans tracking-[0.25em] uppercase text-[#B08A57]"
                    >
                      <span>—</span>
                      <span>{service.shortTag}</span>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Centered "SEE ALL →" Link Below Typography Stack */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans tracking-[0.3em] uppercase text-[#171514] hover:text-[#A76570] font-medium transition-colors hover-underline-animation group py-1"
          >
            <span>See All</span>
            <span className="text-[#A76570] group-hover:translate-x-1.5 transition-transform duration-300">
              ⟶
            </span>
          </Link>
        </div>

        {/* Bottom Editorial Strip */}
        <div className="mt-14 sm:mt-18 pt-6 border-t border-[#B08A57]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-sans tracking-[0.22em] uppercase text-[#3C3C3C]/70">
          <div className="text-center sm:text-left font-medium text-[#171514]/90">
            We craft bold design & clean Webflow.
          </div>

            
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
