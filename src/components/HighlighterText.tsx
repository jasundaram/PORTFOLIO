import React, { useRef } from 'react';
import { motion } from 'motion/react';

// List of target technical disciplines and technologies
const KEYWORDS_TO_HIGHLIGHT = [
  'complex analysis',
  'hashing algorithms',
  'hashing',
  'miller-rabin',
  'greatest common divisor',
  'gcd',
  'dax',
  'python',
  'sql',
  'excel',
  'aerodynamics',
  'elementor',
  'cryptography',
  'numerical analysis',
  'randomized primality testing',
  'star-schema',
  'star schema',
  'multivariate',
  'covariance matrix',
  'markowitz',
  'sharpe ratios',
  'differential equations',
  'proportional-integral-derivative',
  'pid',
  'wordpress',
  'applied number theory',
  'number theory'
];

interface HighlighterTextProps {
  children: string;
  className?: string;
}

export default function HighlighterText({ children, className = '' }: HighlighterTextProps) {
  if (!children || typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  // Escape special regex characters
  const escapedKeywords = KEYWORDS_TO_HIGHLIGHT.map(kw => 
    kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
  );

  // Construct case-insensitive regex for all target keyphrases
  const regex = new RegExp(`\\b(${escapedKeywords.join('|')})\\b`, 'gi');

  const parts = children.split(regex);
  if (parts.length <= 1) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const isMatch = KEYWORDS_TO_HIGHLIGHT.some(
          (kw) => kw.toLowerCase() === part.toLowerCase()
        );

        if (isMatch) {
          return (
            <span key={index} className="relative inline-block px-1 font-semibold text-white tracking-wide">
              {/* Animated neon marker drawing stroke */}
              <motion.span
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ 
                  duration: 0.7, 
                  ease: [0.19, 1.0, 0.22, 1.0], // Snappy cinematic bezier curve
                  delay: 0.1 
                }}
                className="absolute inset-y-0.5 left-0 bg-gradient-to-r from-[#FF4D00]/30 via-[#FF4D00]/15 to-[#FF4D00]/5 -z-10 rounded-sm skew-x-3 origin-left border-l-[2px] border-[#FF4D00]/70"
              />
              {part}
            </span>
          );
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
}
