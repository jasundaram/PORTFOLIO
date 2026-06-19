import React, { useState, useRef, useEffect } from 'react';
import { Eye, Layers } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Concept Wireframe / Draft",
  afterLabel = "Finished Polished Asset",
  title = "Process Contrast",
  description = "A side-by-side look showing our core conceptual phase vs. finalized production delivery."
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#FF4D00] uppercase tracking-[0.3em] font-bold mb-1.5">
            <Layers className="w-3.5 h-3.5 text-[#FF4D00]" />
            02 INTERACTIVE WORKFLOW REVEAL
          </div>
          <h3 className="text-xl md:text-3xl font-display font-black text-white uppercase tracking-tight">
            {title}
          </h3>
          <p className="text-sm text-neutral-400 mt-1 max-w-xl">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3 self-start md:self-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill text-[10px] font-mono text-white/80 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
            {beforeLabel.split(' ')[0]}
          </span>
          <span className="text-neutral-600">/</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[10px] font-mono text-[#FF4D00] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-ping-once"></span>
            {afterLabel.split(' ')[0]}
          </span>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[280px] md:h-[420px] w-full rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/10 shadow-xl"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={(e) => {
          e.preventDefault();
          setIsDragging(true);
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const x = e.clientX - rect.left;
            setSliderPosition((x / rect.width) * 100);
          }
        }}
        onTouchStart={() => setIsDragging(true)}
      >
        {/* After Image (Right Side / Full Background) */}
        <img
          src={afterImage}
          alt="Original Design"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none filter brightness-90 contrast-[1.02]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute right-4 top-4 bg-black/85 backdrop-blur-md text-white border border-white/10 text-[9px] font-mono px-2.5 py-1 rounded uppercase tracking-widest select-none">
          {afterLabel}
        </div>

        {/* Before Image (Left Side / Clipped Cover) */}
        <div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Wireframe Concept"
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none filter brightness-85 contrast-[1.05]"
            style={{ 
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
              height: containerRef.current ? `${containerRef.current.offsetHeight}px` : '100%' 
            }}
            referrerPolicy="no-referrer"
          />
          <div className="absolute left-4 top-4 bg-neutral-900/90 backdrop-blur-md text-white border border-white/10 text-[9px] font-mono px-2.5 py-1 rounded uppercase tracking-widest">
            {beforeLabel}
          </div>
        </div>

        {/* Slider Handlebar Splitter */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-[#FF4D00] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded bg-[#FF4D00] border-2 border-[#121212] flex items-center justify-center shadow-2xl cursor-grab active:cursor-grabbing transition-transform hover:scale-110 pointer-events-auto">
            <span className="flex space-x-0.5">
              <span className="w-[2px] h-3 bg-white rounded-full"></span>
              <span className="w-[2px] h-3 bg-white rounded-full"></span>
            </span>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-[11px] font-mono text-neutral-400 flex items-center justify-center gap-1.5 tracking-wider uppercase">
          <Eye className="w-3.5 h-3.5 text-[#FF4D00]" /> Slide to inspect conceptual layout vs finalized print asset layers.
        </p>
      </div>
    </div>
  );
}
