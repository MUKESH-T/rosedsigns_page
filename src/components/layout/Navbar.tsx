import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '../common/Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '/', sectionId: 'hero' },
    { label: 'About', href: '/#about', sectionId: 'about' },
    { label: 'Services', href: '/services', sectionId: 'services' },
    { label: 'Projects', href: '/#projects', sectionId: 'projects' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    // If on home page and link has sectionId, smooth scroll
    if (location.pathname === '/') {
      if (link.href === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (link.href.startsWith('/#')) {
        e.preventDefault();
        const element = document.getElementById(link.sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    }
  };

  const isActive = (link: typeof navLinks[0]) => {
    if (link.href === '/' && location.pathname === '/') return true;
    if (link.href === '/services' && location.pathname === '/services') return true;
    if (link.href === '/contact' && location.pathname === '/contact') return true;
    return false;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#171514]/95 backdrop-blur-md border-b border-[#B08A57]/20 shadow-[0_4px_20px_rgba(23,21,20,0.2)] py-3.5'
            : 'bg-[#171514] py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark / Logo */}
          <Link
            to="/"
            className="flex items-center group transition-transform duration-200 active:scale-95"
            aria-label="RoseDsigns Homepage"
          >
            <Logo size="md" showWordmark={true} wordmarkColor="text-[#F7F3EC]" animated={true} />
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-xs uppercase tracking-[0.22em] font-medium transition-colors hover:text-[#A76570] hover-underline-animation whitespace-nowrap shrink-0 ${
                  isActive(link) ? 'text-[#D9B1AE] active' : 'text-[#F7F3EC]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <Link
              to="/contact"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] text-[#171514] bg-[#F7F3EC] hover:bg-[#D9B1AE] border border-[#B08A57]/30 transition-all duration-300 rounded-sm gold-shimmer whitespace-nowrap shadow-sm hover:shadow-md"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D9B1AE]" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F7F3EC] hover:text-[#D9B1AE] transition-colors focus:outline-none focus:ring-1 focus:ring-[#B08A57]"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Menu with Staggered Links */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#171514] flex flex-col justify-between p-8 pt-28 md:hidden bg-grain-dark overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#B08A57] font-sans">
                Navigation ✦ Atelier
              </span>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx, duration: 0.4 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        handleNavClick(e, link);
                        setMobileMenuOpen(false);
                      }}
                      className="font-editorial text-3xl font-light text-[#F7F3EC] hover:text-[#D9B1AE] transition-colors block py-1"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-[#B08A57]/20 flex flex-col gap-4">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 px-6 bg-[#F7F3EC] text-[#171514] text-xs uppercase tracking-[0.22em] font-medium rounded-sm border border-[#B08A57]/30 gold-shimmer"
              >
                Let's Talk
              </Link>
              <div className="text-center text-[10px] uppercase tracking-[0.25em] text-[#3C3C3C]/60">
                Ideas that make your brand bloom
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
