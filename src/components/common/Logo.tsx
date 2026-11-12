import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  wordmarkColor?: string;
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  wordmarkColor = 'text-[#171514]',
  animated = false
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-base', gap: 'gap-2' },
    md: { icon: 38, text: 'text-lg', gap: 'gap-2.5' },
    lg: { icon: 54, text: 'text-2xl', gap: 'gap-3.5' },
    xl: { icon: 80, text: 'text-4xl', gap: 'gap-4' }
  };

  const { icon, text, gap } = sizeMap[size];

  return (
    <div className={`inline-flex items-center ${gap} select-none ${className}`}>
      {/* Gold D with Blooming Rose SVG Emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: icon, height: icon }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DFBF7A" />
              <stop offset="45%" stopColor="#B08A57" />
              <stop offset="100%" stopColor="#7E5828" />
            </linearGradient>
            <linearGradient id="logoRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E5C2C0" />
              <stop offset="50%" stopColor="#A76570" />
              <stop offset="100%" stopColor="#672D39" />
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#B08A57" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Letter 'D' Outer Spine and Arch */}
          <path
            d="M 24 16 L 46 16 C 68 16 80 30 80 50 C 80 70 68 84 46 84 L 24 84 Z"
            fill="none"
            stroke="url(#logoGoldGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#goldGlow)"
          />

          {/* Letter 'D' Inner Delicate Hairline */}
          <path
            d="M 33 24 L 45 24 C 61 24 71 34 71 50 C 71 66 61 76 45 76 L 33 76 Z"
            fill="none"
            stroke="url(#logoGoldGrad)"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.65"
          />

          {/* Blooming Rose Intertwined with D Center */}
          <g
            transform="translate(48, 50)"
            className={animated ? 'origin-center transition-transform duration-700 hover:rotate-12' : ''}
          >
            {/* Center Rose Petal Core */}
            <path
              d="M0 -15 C-6 -8 -7 0 0 7 C7 0 6 -8 0 -15 Z"
              fill="url(#logoRoseGrad)"
            />
            {/* Left Bloom Swirl */}
            <path
              d="M-3 -10 C-15 -5 -16 6 -8 13 C-2 10 -2 2 -3 -10 Z"
              fill="url(#logoRoseGrad)"
              opacity="0.9"
            />
            {/* Right Bloom Swirl */}
            <path
              d="M3 -10 C15 -5 16 6 8 13 C2 10 2 2 3 -10 Z"
              fill="url(#logoRoseGrad)"
              opacity="0.9"
            />
            {/* Outer Petals */}
            <path
              d="M-12 2 C-21 11 -15 22 -3 22 C-7 15 -8 9 -12 2 Z"
              fill="url(#logoRoseGrad)"
              opacity="0.85"
            />
            <path
              d="M12 2 C21 11 15 22 3 22 C7 15 8 9 12 2 Z"
              fill="url(#logoRoseGrad)"
              opacity="0.85"
            />
            {/* Golden Delicate Tendril / Leaf Accent */}
            <path
              d="M0 16 Q -13 24 -18 31 Q -7 27 0 20"
              fill="none"
              stroke="url(#logoGoldGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M0 18 Q 13 24 18 31 Q 7 27 0 20"
              fill="none"
              stroke="url(#logoGoldGrad)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>

      {/* Brand Wordmark with luxury spacing */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-editorial font-semibold tracking-[0.22em] uppercase ${text} ${wordmarkColor}`}
          >
            Rose<span className="text-[#A76570] font-normal italic">D</span>signs
          </span>
          
        </div>
      )}
    </div>
  );
};
