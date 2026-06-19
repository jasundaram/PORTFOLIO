import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Copy, Check, Info, Tag, Calendar, Monitor, Cpu } from 'lucide-react';
import { ProjectItem } from '../types';
import HighlighterText from './HighlighterText';

interface LightboxModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function LightboxModal({ project, onClose, onNext, onPrev }: LightboxModalProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!project) return null;

  const handleCopyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
        {/* Close on outer background tap */}
        <div className="absolute inset-0 z-0 cursor-zoom-out" onClick={onClose} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 180 }}
          className="relative bg-[#121212] border border-white/5 text-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row z-10 shadow-2xl"
        >
          {/* Close Button Pin */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 bg-black/60 hover:bg-[#FF4D00] text-neutral-300 hover:text-white p-2.5 rounded border border-white/10 backdrop-blur-md transition-colors"
            id="close-lightbox-btn"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Side: Image Stage with Next/Prev navigators */}
          <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] md:min-h-0 select-none group">
            <img
              src={project.image}
              alt={project.title}
              className="max-h-[50vh] md:max-h-[80vh] w-full object-contain"
              referrerPolicy="no-referrer"
            />

            {/* Pagination Controls */}
            <div className="absolute inset-x-4 flex justify-between items-center z-10 pointer-events-none">
              <button
                onClick={onPrev}
                className="p-3.5 rounded bg-black/70 border border-white/10 text-neutral-300 hover:text-white hover:bg-[#FF4D00] hover:border-[#FF4D00] pointer-events-auto transition-all duration-200 active:scale-90"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNext}
                className="p-3.5 rounded bg-black/70 border border-white/10 text-neutral-300 hover:text-white hover:bg-[#FF4D00] hover:border-[#FF4D00] pointer-events-auto transition-all duration-200 active:scale-90"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Category overlay */}
            <div className="absolute bottom-4 left-4 bg-black/75 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded text-[10px] font-mono tracking-widest text-white uppercase font-bold">
              <span className="text-[#FF4D00]">{project.category === 'design' ? 'DATA & ANALYTICS' : 'QUANTITATIVE SYSTEM'}</span> | {project.subCategory}
            </div>
          </div>

          {/* Right Side: Showcase Metadata & Description */}
          <div className="w-full md:w-[385px] bg-[#121212] border-t md:border-t-0 md:border-l border-white/5 p-6 md:p-8 overflow-y-auto flex flex-col justify-between max-h-[40vh] md:max-h-[80vh]">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#FF4D00] tracking-widest uppercase mb-1 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#FF4D00]" /> CASE STUDY - {project.year}
                </span>
                <h3 className="text-2xl font-display font-black uppercase text-white tracking-tight leading-snug">
                  {project.title}
                </h3>
              </div>

              <div>
                <h4 className="text-[10px] font-mono text-[#FF4D00] uppercase tracking-widest mb-2 flex items-center gap-1.5 font-bold">
                  <Info className="w-3.5 h-3.5" />
                  DESCRIPTION
                </h4>
                <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                  <HighlighterText>{project.description}</HighlighterText>
                </p>
              </div>

              {/* Case Study Section */}
              {project.caseStudy && (
                <div className="pt-5 border-t border-white/5 space-y-4">
                  <div className="space-y-1">
                    <h5 className="text-[9px] font-mono text-white uppercase tracking-[0.2em] font-extrabold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span>
                      Project Goal
                    </h5>
                    <p className="text-[11px] text-neutral-400 leading-relaxed pl-3 font-sans">
                      <HighlighterText>{project.caseStudy.goal}</HighlighterText>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-[9px] font-mono text-white uppercase tracking-[0.2em] font-extrabold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span>
                      My Process
                    </h5>
                    <p className="text-[11px] text-neutral-400 leading-relaxed pl-3 whitespace-pre-line font-sans">
                      <HighlighterText>{project.caseStudy.process}</HighlighterText>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h5 className="text-[9px] font-mono text-white uppercase tracking-[0.2em] font-extrabold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span>
                      Outcome/Result
                    </h5>
                    <p className="text-[11px] text-neutral-400 leading-relaxed pl-3 font-sans pb-1">
                      <HighlighterText>{project.caseStudy.outcome}</HighlighterText>
                    </p>
                  </div>
                </div>
              )}

              {/* Technical Spec Grid */}
              <div>
                <h4 className="text-[10px] font-mono text-[#FF4D00] uppercase tracking-widest mb-3 flex items-center gap-1.5 font-bold">
                  {project.category === 'design' ? (
                    <Monitor className="w-3.5 h-3.5 text-[#FF4D00]" />
                  ) : (
                    <Cpu className="w-3.5 h-3.5 text-[#FF4D00]" />
                  )}
                  {project.category === 'design' ? 'DESIGN SPECS' : 'CAMERA DIAGNOSTICS'}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(project.metadata).map(([key, val]) => (
                    <div key={key} className="bg-black/60 p-2.5 rounded border border-white/5 flex flex-col">
                      <span className="text-[9px] font-mono uppercase text-neutral-500 tracking-wider font-semibold">
                        {key}
                      </span>
                      <span className="text-xs font-bold text-neutral-200 mt-0.5 truncate">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dominant Color Swatch Picker */}
              <div>
                <h4 className="text-[10px] font-mono text-[#FF4D00] uppercase tracking-widest mb-2.5 font-bold">
                  EXTRACTED SWATCH SCHEME
                </h4>
                <div className="flex items-center gap-1.5 bg-black p-1.5 rounded border border-white/5">
                  {project.palette.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCopyColor(color)}
                      className="group relative flex-1 h-10 rounded transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={`Copy ${color}`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded">
                        {copiedColor === color ? (
                          <Check className="w-3.5 h-3.5 text-white stroke-[3px]" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-white" />
                        )}
                      </div>
                      
                      {/* Copy Notification Bubble */}
                      {copiedColor === color && (
                        <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[#FF4D00] text-[9px] text-white px-2 py-0.5 rounded font-mono font-bold border border-[#FF4D00]/20 shadow-xl whitespace-nowrap z-50 animate-bounce uppercase tracking-wider">
                          Copied!
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="text-[8px] font-mono text-neutral-500 mt-2 text-center uppercase tracking-widest">
                  Tap swatch blocks to copy hex references
                </div>
              </div>
            </div>

            {/* Case Tags footer */}
            <div className="pt-6 border-t border-white/5 mt-6">
              <div className="flex items-center gap-1.5 mb-2 text-[9px] font-mono tracking-[0.15em] text-neutral-500 uppercase font-bold">
                <Tag className="w-3 h-3 text-[#FF4D00]" /> CASE TAG REFERENCE
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] font-mono bg-black text-neutral-400 px-2.5 py-1 rounded border border-white/5 uppercase"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
