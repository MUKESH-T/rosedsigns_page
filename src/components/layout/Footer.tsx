import React from 'react';
import { ArrowUp, Instagram, Linkedin, MessageCircle, Mail } from 'lucide-react';
import { Logo } from '../common/Logo';
import { AGENCY_INFO } from '../../data/agencyData';

interface FooterProps {
  onReplayLoader?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayLoader }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#171514] text-[#F7F3EC] border-t border-[#B08A57]/20 relative z-20 bg-grain-dark">
      {/* Upper Subtle Footer Branding Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-[#3C3C3C]/60">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
          <Logo size="md" showWordmark={true} wordmarkColor="text-[#F7F3EC]" />
          <span className="hidden sm:inline text-[#B08A57]/60">✦</span>
          <span className="text-xs tracking-[0.2em] uppercase text-[#D9B1AE]/80 font-sans">
            Ideas that make your brand bloom
          </span>
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-6">
          <a
            href={AGENCY_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-[#B08A57]/30 flex items-center justify-center text-[#F7F3EC]/80 hover:text-[#D9B1AE] hover:border-[#B08A57] transition-all hover:scale-105"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={AGENCY_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-[#B08A57]/30 flex items-center justify-center text-[#F7F3EC]/80 hover:text-[#D9B1AE] hover:border-[#B08A57] transition-all hover:scale-105"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={AGENCY_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-[#B08A57]/30 flex items-center justify-center text-[#F7F3EC]/80 hover:text-[#D9B1AE] hover:border-[#B08A57] transition-all hover:scale-105"
            aria-label="WhatsApp Concierge"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${AGENCY_INFO.email}`}
            className="w-9 h-9 rounded-full border border-[#B08A57]/30 flex items-center justify-center text-[#F7F3EC]/80 hover:text-[#D9B1AE] hover:border-[#B08A57] transition-all hover:scale-105"
            aria-label="Email Studio"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase text-[#B08A57] border border-[#B08A57]/30 hover:border-[#B08A57] rounded-full transition-colors ml-2"
            aria-label="Back to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Single-Line Luxury Statement & Assessment Watermark */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#E8E2D8]/60">
        <p className="tracking-wider text-center sm:text-left">
          © 2026 RoseDsigns · Creative · Branding · Advertising
        </p>

        <div className="flex items-center gap-4 text-[11px] tracking-widest text-[#B08A57]">
          {onReplayLoader && (
            <button
              onClick={onReplayLoader}
              className="text-[#D9B1AE]/70 hover:text-[#D9B1AE] underline underline-offset-4 transition-colors"
            >
              Replay Intro
            </button>
          )}
          <span className="opacity-40">|</span>
          <span className="font-medium text-[#D9B1AE]">
            Assessment submission by Mukesh
          </span>
        </div>
      </div>
    </footer>
  );
};
