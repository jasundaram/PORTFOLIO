import { Sparkles } from 'lucide-react';

interface InfiniteMarqueeProps {
  speedMultiplier?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export default function InfiniteMarquee({ className = '' }: InfiniteMarqueeProps) {
  const marqueeItems = [
    'DATA MODELING',
    'ALGORITHMIC SOLUTIONS',
    'QUANTITATIVE ANALYSIS',
    'MATHEMATICAL INTEGRITY',
    'PREDICTIVE SIMULATION',
    'FUTURES COMPUTATION',
    'SYSTEM METRICS'
  ];

  // Repeat for seamless visual continuity
  const textContent = marqueeItems.join(' • ') + ' • ';

  return (
    <div className={`relative w-full overflow-hidden bg-black/15 py-5 border-y border-white/5 my-12 pointer-events-none select-none ${className}`}>
      {/* Decorative ambient subtle lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4D00]/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/25 to-transparent" />

      {/* Infinite Horizontal loop track */}
      <div className="flex w-max relative">
        <div className="animate-marquee whitespace-nowrap flex items-center pr-4">
          {Array.from({ length: 4 }).map((_, repeatIdx) => (
            <span key={repeatIdx} className="inline-flex items-center gap-6 font-display font-black text-3xl md:text-[50px] tracking-wider uppercase text-neutral-800">
              {marqueeItems.map((item, itemIdx) => {
                const isHighlight = itemIdx % 3 === 0;
                return (
                  <span key={itemIdx} className="inline-flex items-center gap-6">
                    <span 
                      className={
                        isHighlight 
                          ? 'text-[#FF4D00] opacity-80' 
                          : 'text-transparent webkit-text-stroke text-stroke-white text-neutral-600/25 transition-colors duration-300'
                      }
                      style={{
                        WebkitTextStroke: isHighlight ? 'none' : '1px rgba(255, 255, 255, 0.12)'
                      }}
                    >
                      {item}
                    </span>
                    <span className="text-neutral-700 font-sans text-xs md:text-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF4D00]/50 animate-pulse inline" />
                    </span>
                  </span>
                )
              })}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
