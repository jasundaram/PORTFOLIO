import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Camera, Layers } from 'lucide-react';
import { ProjectItem } from '../types';

interface HeroSliderProps {
  slides: ProjectItem[];
  onOpenProject: (project: ProjectItem) => void;
}

export default function HeroSlider({ slides, onOpenProject }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const currentSlide = slides[currentIndex];

  // Slide transition configurations
  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    })
  };

  return (
    <div id="hero-slider-stage" className="relative h-[550px] md:h-[650px] w-full rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl group">
      {/* Background Slideshow Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full glitch-image-wrapper"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070c] via-[#05070c]/50 to-transparent z-10" />
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="w-full h-full object-cover glitch-image-base filter brightness-[0.7] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />

            {/* Glitch Channel 1 (Red Accent) */}
            <img
              src={currentSlide.image}
              alt={`${currentSlide.title} Red channel glitch`}
              className="glitch-channel glitch-red filter brightness-[0.7] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />

            {/* Glitch Channel 2 (Blue Accent) */}
            <img
              src={currentSlide.image}
              alt={`${currentSlide.title} Blue channel glitch`}
              className="glitch-channel glitch-blue filter brightness-[0.7] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Category Tag */}
      <div className="absolute top-6 left-6 z-20 flex gap-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 glass-pill rounded-full text-[10px] font-mono font-bold text-neutral-200 uppercase tracking-widest animate-pulse">
          {currentSlide.category === 'design' ? (
            <Layers className="w-3.5 h-3.5 text-[#FF4D00]" />
          ) : (
            <Camera className="w-3.5 h-3.5 text-[#FF4D00]" />
          )}
          Featured {currentSlide.category} Case
        </span>
        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 glass-pill rounded-full text-[10px] font-mono text-neutral-400">
          Est. {currentSlide.year}
        </span>
      </div>

      {/* Content Overlay Panel */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs md:text-sm font-mono text-[#FF4D00] font-bold tracking-widest block uppercase">
            {currentSlide.subCategory}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white leading-tight uppercase">
            {currentSlide.title}
          </h2>
          <p className="text-neutral-300 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-none max-w-xl">
            {currentSlide.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {currentSlide.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-[10px] font-mono bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/90 px-2.5 py-0.5 rounded uppercase">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => onOpenProject(currentSlide)}
          className="group inline-flex items-center gap-2 bg-[#FF4D00] text-white font-mono font-bold tracking-wider text-xs px-6 py-4 rounded-lg hover:bg-white hover:text-black active:scale-95 transition-all shadow-lg self-start md:self-auto shrink-0 cursor-pointer"
        >
          EXPLORE CASE STUDY
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Left/Right Action Arrows */}
      <div className="absolute inset-y-1/2 left-4 right-4 z-25 flex justify-between h-0 items-center pointer-events-none">
        <button
          onClick={handlePrev}
          className="p-2.5 rounded-lg bg-black/60 hover:bg-[#FF4D00] border border-white/10 text-white transition-all backdrop-blur-md pointer-events-auto active:scale-90"
          aria-label="Previous Project"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNext}
          className="p-2.5 rounded-lg bg-black/60 hover:bg-[#FF4D00] border border-white/10 text-white transition-all backdrop-blur-md pointer-events-auto active:scale-90"
          aria-label="Next Project"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute right-6 top-6 z-20 flex gap-1.5 glass-panel p-2 rounded-xl">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 'right' : 'left');
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-[#FF4D00]' : 'w-2 bg-neutral-600 hover:bg-neutral-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
