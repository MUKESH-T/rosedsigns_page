import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '../components/common/Logo';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-36 pb-20 flex flex-col items-center justify-center text-center px-6 bg-[#F7F3EC] bg-grain text-[#171514]">
      <div className="mb-8">
        <Logo size="lg" showWordmark={false} animated={true} />
      </div>

      <span className="text-xs uppercase tracking-[0.3em] text-[#B08A57] font-sans mb-3">
        ✦ Error 404 · Uncharted Archive ✦
      </span>

      <h1 className="text-5xl sm:text-7xl font-editorial font-light text-[#171514] mb-6">
        Page Not Located
      </h1>

      <p className="text-sm sm:text-base text-[#3C3C3C]/80 font-sans max-w-md mx-auto mb-10 leading-relaxed font-light">
        The archive you requested does not exist or has been retired to our private salon collection.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#171514] hover:bg-[#A76570] text-[#F7F3EC] text-xs uppercase tracking-[0.22em] font-medium rounded-sm border border-[#B08A57]/30 transition-colors gold-shimmer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Atelier</span>
      </Link>
    </div>
  );
};
