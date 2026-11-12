import React from 'react';

interface FloatingPetalsProps {
  count?: number;
  className?: string;
}

export const FloatingPetals: React.FC<FloatingPetalsProps> = ({
  count = 9,
  className = ''
}) => {
  // Deterministic petal configs for reproducible luxury floating effect
  const petals = [
    { top: '12%', left: '8%', size: 28, delay: 0, duration: 14, rotate: 25 },
    { top: '22%', left: '88%', size: 36, delay: 2, duration: 18, rotate: -40 },
    { top: '48%', left: '4%', size: 24, delay: 4, duration: 16, rotate: 60 },
    { top: '65%', left: '92%', size: 32, delay: 1, duration: 20, rotate: -15 },
    { top: '78%', left: '14%', size: 22, delay: 3, duration: 15, rotate: 45 },
    { top: '35%', left: '76%', size: 20, delay: 5, duration: 22, rotate: -70 },
    { top: '85%', left: '80%', size: 30, delay: 2.5, duration: 19, rotate: 30 },
    { top: '18%', left: '45%', size: 18, delay: 4.5, duration: 24, rotate: -20 },
    { top: '55%', left: '50%', size: 26, delay: 1.5, duration: 17, rotate: 10 }
  ].slice(0, count);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal, index) => (
        <div
          key={index}
          className="absolute opacity-40 hover:opacity-75 transition-opacity"
          style={{
            top: petal.top,
            left: petal.left,
            width: petal.size,
            height: petal.size * 1.3,
            animation: `petalDrift ${petal.duration}s ease-in-out infinite alternate`,
            animationDelay: `${petal.delay}s`,
            transform: `rotate(${petal.rotate}deg)`,
          }}
        >
          <svg
            viewBox="0 0 40 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-sm filter blur-[0.3px]"
          >
            <path
              d="M20 2 C7 12 2 28 8 42 C14 52 28 52 34 40 C40 28 33 12 20 2 Z"
              fill="url(#petalGradient)"
            />
            {/* Delicate gold-rose vein */}
            <path
              d="M20 10 Q 18 28 20 46"
              stroke="rgba(176, 138, 87, 0.25)"
              strokeWidth="0.8"
              fill="none"
            />
            <defs>
              <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F2D7D5" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#D9B1AE" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#A76570" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes petalDrift {
          0% {
            transform: translate(0px, 0px) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(14px, 20px) rotate(15deg) scale(1.05);
          }
          100% {
            transform: translate(-12px, 35px) rotate(-10deg) scale(0.95);
          }
        }
      `}</style>
    </div>
  );
};
