import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Flame, Compass, Laptop, Calendar, Award, Database, Cpu, Activity, ShieldCheck } from 'lucide-react';
import { GEAR, TESTIMONIALS } from '../data';
import Odometer from './Odometer';

export default function BentoStats() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Slide through testimonial cards
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = TESTIMONIALS[activeTestimonial];

  // Education Timeline Items
  const educationTimeline = [
    {
      degree: 'B.Sc. Mathematics Honours',
      institution: 'School of Basic Sciences',
      period: 'Pursuing (Current)',
      scoreVal: 65,
      scorePrefix: 'Current Score: ',
      scoreSuffix: '%',
      coursework: 'Probability & Statistics, Complex Analysis, Number Theory, Numerical Analysis',
      icon: GraduationCap,
      color: '#FF4D00'
    },
    {
      degree: 'Higher Secondary (Class 12th)',
      institution: "St. Mary's School, Bhadohi",
      period: 'Completed - 2022',
      scoreVal: 84,
      scorePrefix: 'Score: ',
      scoreSuffix: '%',
      coursework: 'Advanced Physics, Chemistry, and Higher Mathematics',
      icon: Award,
      color: '#00D1FF'
    },
    {
      degree: 'Secondary School (Class 10th)',
      institution: "St. Mary's School, Bhadohi",
      period: 'Completed - 2020',
      scoreVal: 86,
      scorePrefix: 'Score: ',
      scoreSuffix: '%',
      coursework: 'General Science, Mathematics, English Lit, Social Sciences',
      icon: Calendar,
      color: '#00FF66'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Dynamic Odometer Quantitative Telemetry Hub */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-2 text-neutral-500 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Database className="w-3.5 h-3.5 text-[#FF4D00]" /> Star Schema Scales
          </div>
          <div className="space-y-0.5">
            <span className="text-3xl md:text-4xl font-display font-black text-white block">
              <Odometer value={250} suffix="K" decimals={0} />
            </span>
            <span className="text-[10px] text-neutral-400 font-sans block leading-none">
              Clean capstone transaction rows
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-2 text-neutral-500 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Activity className="w-3.5 h-3.5 text-[#00D1FF]" /> Flight Stability
          </div>
          <div className="space-y-0.5">
            <span className="text-3xl md:text-4xl font-display font-black text-white block">
              <Odometer value={2.5} prefix="< " suffix=" cm" decimals={1} />
            </span>
            <span className="text-[10px] text-neutral-400 font-sans block leading-none">
              Helical hovering displacement bounds
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-2 text-neutral-500 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <Cpu className="w-3.5 h-3.5 text-[#00FF66]" /> R² Confidence Score
          </div>
          <div className="space-y-0.5">
            <span className="text-3xl md:text-4xl font-display font-black text-white block">
              <Odometer value={0.94} prefix="R²: " decimals={2} />
            </span>
            <span className="text-[10px] text-neutral-400 font-sans block leading-none">
              Multivariate cost predicting model
            </span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-2 text-neutral-500 font-mono text-[9px] uppercase tracking-wider font-extrabold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF4D00]" /> UX Web Vitals
          </div>
          <div className="space-y-0.5">
            <span className="text-3xl md:text-4xl font-display font-black text-white block">
              <Odometer value={98} suffix="%" decimals={0} />
            </span>
            <span className="text-[10px] text-neutral-400 font-sans block leading-none">
              Portal Lighthouse speed grading
            </span>
          </div>
        </div>
      </div>

      {/* Top row: Gear */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* 1. Technical Tool Stack */}
        <div className="glass-panel text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#FF4D00] uppercase tracking-[0.2em] font-extrabold mb-2">
              <Laptop className="w-3.5 h-3.5 text-[#FF4D00]" /> 04.1 - ANALYSIS INFRASTRUCTURE
            </span>
            <h3 className="text-xl md:text-3xl font-display font-black uppercase text-white tracking-tight">
              Operational Toolkit
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-lg font-sans">
              Scientific environments, dynamic databases, and customized charting canvases configured for quantitative clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GEAR.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-4 transition-all hover:bg-white/[0.05] hover:border-[#FF4D00]/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.02)]"
              >
                <div className="p-1.5 bg-[#121212] border border-white/10 rounded text-[#FF4D00] flex-shrink-0">
                  <Laptop className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs font-bold text-white block truncate">
                    {item.name}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block truncate">
                    {item.category} | {item.specs}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: Education Timeline & Testimonials */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 3. Education Timeline Card (Col-span 2) */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 md:p-8 hover:border-white/15 transition-all shadow-2xl">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#FF4D00] uppercase tracking-[0.2em] font-extrabold mb-4">
            <GraduationCap className="w-4 h-4 text-[#FF4D00]" /> 04.3 - ACADEMIC TIMELINE & MILESTONES
          </span>
          <h3 className="text-xl md:text-3xl font-display font-black uppercase text-white tracking-tight mb-8">
            Graduation & Coursework
          </h3>

          <div className="relative border-l border-white/10 ml-3 md:ml-4 space-y-8">
            {educationTimeline.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="relative pl-7 md:pl-9 group text-left">
                  {/* Outer circle dot */}
                  <div className="absolute -left-3.5 top-0.5 w-7 h-7 rounded-full bg-[#05070c] border border-white/15 flex items-center justify-center group-hover:border-[#FF4D00] transition-colors">
                    <IconComp className="w-3.5 h-3.5" style={{ color: item.color }} />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h4 className="text-sm md:text-base font-display font-black text-white uppercase tracking-wider m-0">
                        {item.degree}
                      </h4>
                      <span className="px-2 py-0.5 bg-white/5 rounded border border-white/10 text-[9px] font-mono text-[#FF4D00] uppercase tracking-wider font-semibold">
                        {item.period}
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#FF4D00]/10 rounded border border-[#FF4D00]/20 text-[10px] font-mono text-white tracking-wider font-black uppercase inline-flex items-center">
                        <Odometer value={item.scoreVal} prefix={item.scorePrefix} suffix={item.scoreSuffix} decimals={0} />
                      </span>
                    </div>
                    
                    <p className="text-xs text-neutral-300 font-medium m-0">
                      {item.institution}
                    </p>
                    
                    <p className="text-[11px] text-neutral-400 font-sans leading-relaxed m-0 font-light">
                      <strong className="text-neutral-300 font-mono text-[9px] uppercase tracking-wider block mb-0.5">Core Coursework Focus:</strong>
                      {item.coursework}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Testimonial Column (Col-span 1) */}
        <div className="glass-panel rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute right-8 top-8 opacity-[0.02] text-white pointer-events-none">
            <Flame className="w-24 h-24" />
          </div>

          <div>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#FF4D00] uppercase tracking-[0.2em] font-bold">
              <Compass className="w-3.5 h-3.5 text-[#FF4D00]" />
              04.4 - ENDORSEMENTS
            </span>
            <h3 className="text-lg md:text-xl font-display font-black uppercase text-white tracking-tight mt-1">
              Endorsements
            </h3>
          </div>

          <div className="my-6 min-h-[140px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-4 text-left"
              >
                <p className="text-xs italic text-neutral-300 leading-relaxed pr-2 font-serif">
                  "{currentTestimonial.quote}"
                </p>
                
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    className="w-8 h-8 rounded-full border border-white/10 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white block">
                      {currentTestimonial.author}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block leading-none">
                      {currentTestimonial.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Paginated Testimonial dots */}
          <div className="flex gap-1.5 justify-start mt-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-1.5 rounded transition-all cursor-pointer ${
                  i === activeTestimonial ? 'w-5 bg-[#FF4D00]' : 'w-1.5 bg-neutral-700'
                }`}
                aria-label={`Inquire ${i + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
