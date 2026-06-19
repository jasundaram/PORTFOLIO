import React, { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export default function TiltCard({ children, className = '', onClick, id }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Maximum tilt degrees
  const tiltMax = 7;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Normalize coordinates (-1 to 1)
    const normX = x / (width / 2);
    const normY = y / (height / 2);

    // Compute rotation degrees
    const rotateX = -normY * tiltMax;
    const rotateY = normX * tiltMax;

    setCoords({ x: rotateY, y: rotateX });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Get mouse coordinates relative to the card for the dynamic spotlight glare
  const getGlareStyle = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return {};
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return {
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, rgba(255, 77, 0, 0.05) 30%, transparent 70%)`
    };
  };

  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e);
    setGlareStyle(getGlareStyle(e));
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: coords.x,
        rotateX: coords.y,
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
        mass: 0.8
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={`relative cursor-zoom-in ${className}`}
    >
      {/* Glare/Shine mask layer */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-xl z-20 mix-blend-overlay transition-opacity duration-300"
        style={{
          ...glareStyle,
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {/* Absolute scale reflection backdrops */}
      <div className="absolute -inset-[1px] bg-gradient-to-br from-white/10 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10" />

      {/* Actual inner card children elements */}
      <div 
        style={{ transform: 'translateZ(10px)' }}
        className="h-full w-full"
      >
        {children}
      </div>
    </motion.div>
  );
}
