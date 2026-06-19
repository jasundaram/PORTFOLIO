import { useState, useEffect, useRef } from 'react';

interface CipherTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function CipherText({ text, className = "", delay = 0 }: CipherTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const mathSymbols = 'ΣΔΨΩλθφπ∫∂√αβγxyz0123456789ABCDEF%&@#';
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startCipherAnimation = () => {
    let iterations = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            // If the letter is calculated past our iteration step, reveal the true letter
            if (index < iterations) {
              return text[index];
            }
            // Otherwise, show a random mathematical or hex cipher variable
            return mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      // Control reveal speed (around 3 frames per character)
      iterations += 1 / 3;
    }, 25);
  };

  useEffect(() => {
    const startupTimeout = setTimeout(() => {
      startCipherAnimation();
    }, delay);

    return () => {
      clearTimeout(startupTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  return (
    <span
      className={`${className} cursor-default select-none transition-colors duration-300 ${
        isHovered ? 'text-[#FF4D00]' : ''
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        startCipherAnimation();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </span>
  );
}
