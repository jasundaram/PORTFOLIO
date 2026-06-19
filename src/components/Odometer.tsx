import React, { useState, useEffect, useRef } from 'react';

interface OdometerProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // duration of count animation in ms
  className?: string;
  numberClassName?: string;
}

export default function Odometer({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1800,
  className = '',
  numberClassName = ''
}: OdometerProps) {
  const [currentDisplay, setCurrentDisplay] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [value, decimals, duration]);

  const animateCount = () => {
    let startTimestamp: number | null = null;
    const startValue = 0;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function - cubic out: f(t) = 1 - (1-t)^3
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = startValue + easeProgress * (value - startValue);
      
      setCurrentDisplay(currentVal);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCurrentDisplay(value);
      }
    };

    window.requestAnimationFrame(step);
  };

  const formattedNumber = currentDisplay.toFixed(decimals);

  return (
    <span ref={elementRef} className={`inline-flex items-center font-mono ${className}`}>
      {prefix && <span className="mr-0.5">{prefix}</span>}
      <span className={numberClassName}>{formattedNumber}</span>
      {suffix && <span className="ml-0.5 text-[#FF4D00]">{suffix}</span>}
    </span>
  );
}
