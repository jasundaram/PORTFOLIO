import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../types';
import { ArrowUpRight, Compass, Cpu, Layers } from 'lucide-react';

interface HoverRevealListProps {
  projects: ProjectItem[];
  onOpenProject: (project: ProjectItem) => void;
}

export default function HoverRevealList({ projects, onOpenProject }: HoverRevealListProps) {
  const [hoveredPid, setHoveredPid] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor mouse positions inside the parent list to place the floating preview
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Relative position inside the container
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full border border-white/5 bg-[#121212]/30 rounded-2xl p-2 md:p-4 overflow-visible"
    >
      <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-[9px] font-mono tracking-widest text-neutral-500 uppercase font-black">
        <div className="col-span-1">ID</div>
        <div className="col-span-5">PROJECT TITLE</div>
        <div className="col-span-3">TAGS</div>
        <div className="col-span-2">SEGMENT / AREA</div>
        <div className="col-span-1 text-right">METRIC</div>
      </div>

      <div className="divide-y divide-white/5 relative z-10">
        {projects.length === 0 ? (
          <div className="py-12 text-center text-xs font-mono text-neutral-500 uppercase tracking-widest">
            No projects matched current active filters.
          </div>
        ) : (
          projects.map((project, index) => {
            const isHovered = hoveredPid === project.id;
            const seqNumber = String(index + 1).padStart(2, '0');

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredPid(project.id)}
                onMouseLeave={() => setHoveredPid(null)}
                onClick={() => onOpenProject(project)}
                className="group relative grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-center px-4 lg:px-6 py-6 lg:py-8 cursor-pointer transition-colors duration-300 hover:bg-white/[0.02]"
              >
                {/* 1. Sequence Code */}
                <div className="lg:col-span-1 text-[11px] font-mono text-[#FF4D00]/80 font-bold group-hover:text-white transition-colors">
                  [{seqNumber}]
                </div>

                {/* 2. Main Title Segment */}
                <div className="lg:col-span-5 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg md:text-xl font-display font-black tracking-tight text-white group-hover:text-[#FF4D00] transition-colors duration-200 uppercase">
                      {project.title}
                    </h3>
                    <span className="text-[10px] font-mono text-[#FF4D00] bg-[#FF4D00]/10 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                      REVEAL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                    {project.subCategory}
                  </span>
                </div>

                {/* 3. Small inline image specifically for responsive viewport layouts */}
                <div className="lg:hidden w-full aspect-16/9 rounded-lg overflow-hidden border border-white/10 my-1">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover filter brightness-90" 
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* 4. Filter Tags Category */}
                <div className="lg:col-span-3 flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[9px] font-mono bg-white/5 border border-white/5 text-neutral-400 group-hover:text-white px-2 py-0.5 rounded uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 5. Domain Category label */}
                <div className="lg:col-span-2 flex items-center gap-2">
                  {project.category === 'design' ? (
                    <Layers className="w-4 h-4 text-[#FF4D00]/60 group-hover:text-[#FF4D00]" />
                  ) : (
                    <Compass className="w-4 h-4 text-[#FF4D00]/60 group-hover:text-[#FF4D00]" />
                  )}
                  <span className="text-[11px] font-mono text-neutral-400 group-hover:text-white font-semibold uppercase tracking-wider">
                    {project.category === 'design' ? 'STAT MATH' : 'QUANT LAB'}
                  </span>
                </div>

                {/* 6. Execution Metric Tracker */}
                <div className="lg:col-span-1 flex items-center justify-between lg:justify-end gap-1.5">
                  <span className="text-xs font-mono text-neutral-600 group-hover:text-neutral-400 transition-colors">
                    {project.year}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-neutral-500 group-hover:bg-[#FF4D00] group-hover:text-white group-hover:rotate-45 transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Floating high-quality hover-reveal image previews block */}
      <div className="pointer-events-none hidden lg:block">
        <AnimatePresence>
          {projects.map((project) => {
            const isHovered = hoveredPid === project.id;
            if (!isHovered) return null;

            return (
              <motion.div
                key={`preview-${project.id}`}
                initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 2,
                  x: mousePos.x + 25, 
                  y: mousePos.y - 120 
                }}
                exit={{ opacity: 0, scale: 0.8, rotate: -3 }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 25,
                  mass: 0.5
                }}
                className="absolute left-0 top-0 z-50 w-72 h-44 rounded-xl overflow-hidden border-2 border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.8)] filter brightness-105"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Embedded Glitch Media Visual Layer */}
                <div className="relative w-full h-full bg-neutral-900 glitch-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover glitch-channel-base"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Red Overlay Glitch */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center mix-blend-screen opacity-50 filter saturate-300 hue-rotate-[45deg]"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />

                  {/* Gradient bottom cover */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 flex flex-col justify-end">
                    <span className="text-[10px] font-mono text-[#FF4D00] font-black tracking-widest uppercase">
                      [ACCELERATED COMPILATION]
                    </span>
                    <span className="text-xs font-display font-black text-white uppercase tracking-tight">
                      {project.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
