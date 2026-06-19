import { Sparkles, BarChart2, BookOpen, Compass, Cpu } from 'lucide-react';
import PhysicsSandbox from './PhysicsSandbox';
import HighlighterText from './HighlighterText';

export default function AboutBio() {
  return (
    <div className="glass-panel rounded-2xl p-6 md:p-10 shadow-2xl space-y-8" id="about-bio-root">
      {/* Introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        <div className="lg:col-span-7 space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#FF4D00] uppercase tracking-[0.2em] font-extrabold mb-1">
            <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-pulse"></span>
            About Me - Profile Story
          </span>
          <h3 className="text-2xl md:text-4xl font-display font-black uppercase text-white tracking-tight leading-none m-0">
            Translating Theoretical Numbers Into Live Intelligence
          </h3>
          <p className="text-sm text-neutral-300 leading-relaxed font-sans font-light mt-4">
            Hi, I'm <strong className="text-white font-semibold font-display">Sundaram Jaiswal</strong>. I am a highly detail-oriented Data Analyst deeply passionate about bridging pure mathematical logic and computational data modeling.
          </p>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            <HighlighterText>Backed by a rigorous academic grounding in mathematics, I specialize in crafting elegant relational star-schema databases, programming custom Python-based analytics classifiers, authoring robust DAX algorithms, and setting up high-performance visual Power BI dashboards to drive strategic enterprise value.</HighlighterText>
          </p>
        </div>

        {/* Philosophy Callout Card */}
        <div className="lg:col-span-5 bg-black/60 border border-white/10 p-6 rounded space-y-3 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-2 top-2 opacity-[0.03] text-white">
            <Sparkles className="w-20 h-20" />
          </div>
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
            ANALYTICAL PHILOSOPHY
          </span>
          <p className="text-xs italic text-neutral-300 leading-relaxed font-serif">
            "Behind every chaotic corporate dataset lies a beautiful, silent mathematical grid. My mission is to design the exact query pathway that lets that logic outline itself."
          </p>
          <span className="text-[10px] font-mono text-[#FF4D00] uppercase tracking-wider block font-bold">
            SUNDARAM DIRECTIVE
          </span>
        </div>
      </div>

      {/* Skills Highlight split columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/5">
        
        {/* Category 1: Data & Analytics */}
        <div className="space-y-4 p-5 rounded-xl glass-panel glass-panel-hover">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FF4D00]/10 border border-[#FF4D00]/25 rounded text-[#FF4D00]">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">
                SKILLS - 01
              </span>
              <h4 className="text-xs font-display font-black uppercase text-white tracking-wider m-0">
                Data & Analytics
              </h4>
            </div>
          </div>
          <ul className="space-y-1.5 text-[10px] font-mono text-neutral-300 uppercase list-none p-0 m-0">
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Data Modeling</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> EDA (Statistical)</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Advanced DAX</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Dynamic Querying</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> AI-Driven Analytics</li>
          </ul>
        </div>

        {/* Category 2: Tools & Tech */}
        <div className="space-y-4 p-5 rounded-xl glass-panel glass-panel-hover">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FF4D00]/10 border border-[#FF4D00]/25 rounded text-[#FF4D00]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">
                SKILLS - 02
              </span>
              <h4 className="text-xs font-display font-black uppercase text-white tracking-wider m-0">
                Tools & Technologies
              </h4>
            </div>
          </div>
          <ul className="space-y-1.5 text-[10px] font-mono text-neutral-300 uppercase list-none p-0 m-0">
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Python (Core)</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> SQL (Postgres / Lite)</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Microsoft Excel</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Microsoft Power BI</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> WordPress & Elementor</li>
          </ul>
        </div>

        {/* Category 3: Mathematical Expertise */}
        <div className="space-y-4 p-5 rounded-xl glass-panel glass-panel-hover">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FF4D00]/10 border border-[#FF4D00]/25 rounded text-[#FF4D00]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">
                SKILLS - 03
              </span>
              <h4 className="text-xs font-display font-black uppercase text-white tracking-wider m-0">
                Pure Mathematics
              </h4>
            </div>
          </div>
          <ul className="space-y-1.5 text-[10px] font-mono text-neutral-300 uppercase list-none p-0 m-0">
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Probability & Stats</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Numerical Analysis</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Number Theory</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Applied Cryptography</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Complex Analysis</li>
          </ul>
        </div>

        {/* Category 4: Soft Strengths */}
        <div className="space-y-4 p-5 rounded-xl glass-panel glass-panel-hover">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#FF4D00]/10 border border-[#FF4D00]/25 rounded text-[#FF4D00]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block">
                SKILLS - 04
              </span>
              <h4 className="text-xs font-display font-black uppercase text-white tracking-wider m-0">
                Core Strengths
              </h4>
            </div>
          </div>
          <ul className="space-y-1.5 text-[10px] font-mono text-neutral-300 uppercase list-none p-0 m-0">
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Agile Leadership</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Public Speaking</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Complex Problem Solving</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Strategic Planning</li>
            <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#FF4D00] rounded-sm"></span> Analytical Discipline</li>
          </ul>
        </div>

      </div>

      {/* Physics Sandbox Section */}
      <div className="pt-6 border-t border-white/5 space-y-3">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono text-[#FF4D00] uppercase tracking-widest font-black">
            DECISION PATHWAY SANDBOX
          </span>
          <p className="text-xs text-neutral-400 font-sans max-w-2xl leading-relaxed">
            Click, drag, and toss the skill nodes below to test gravity, mass ratios, and collision forces in real-time. Toggle <strong className="text-white">Zero-G</strong> to watch vector lines form and float freely.
          </p>
        </div>
        <PhysicsSandbox />
      </div>

      {/* Diverse Hobbies & Interests Callout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-white/5 text-xs">
        <div className="p-4 rounded bg-black/40 border border-white/5">
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            Manufacturing Business Interest
          </span>
          <p className="text-neutral-300 leading-relaxed font-sans font-light">
            Deep interest in green industrial economies, specifically tracking the supply chain, cost structures, and chemical formulas of <strong className="text-[#FF4D00]">sustainable bioplastics</strong>.
          </p>
        </div>
        <div className="p-4 rounded bg-black/40 border border-white/5">
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            Aerodynamics & Flight Hardware
          </span>
          <p className="text-neutral-300 leading-relaxed font-sans font-light">
            Building, tuning, and compiling flight control code for custom remote-controlled <strong className="text-[#FF4D00]">multirotor drones</strong>, focusing on the aerodynamics of extreme stabilization.
          </p>
        </div>
        <div className="p-4 rounded bg-black/40 border border-white/5">
          <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
            Recreational Pursuit & Focus
          </span>
          <p className="text-neutral-300 leading-relaxed font-sans font-light">
            Enthused observer of high-level professional cricket strategy, while keeping fully disciplined with world <strong className="text-[#FF4D00]">current affairs</strong> and comprehensive general studies.
          </p>
        </div>
      </div>

      {/* Enthusiasm & Pitch Line */}
      <div className="bg-[#FF4D00]/10 border border-[#FF4D00]/20 p-5 rounded flex flex-col sm:flex-row items-center sm:justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h5 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5 m-0">
            <Compass className="w-3.5 h-3.5 text-[#FF4D00] animate-spin-slow" /> Active Analytical Consulting Availability
          </h5>
          <p className="text-xs text-[#CCCCCC] leading-relaxed max-w-xl mt-1.5 font-sans">
            I approach every project—from pure mathematical model proofs to complex enterprise Business Intelligence pipelines—with absolute analytical rigor, communication transparency, and energy. Let's optimize your data logs next.
          </p>
        </div>
        <button
          onClick={() => {
            const el = document.getElementById('contract-desk');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          className="px-5 py-3 rounded bg-[#FF4D00] text-white hover:bg-white hover:text-black font-mono text-[10px] uppercase font-bold tracking-widest border border-transparent hover:border-white transition-all whitespace-nowrap cursor-pointer select-none"
          id="assignment-booking-btn"
        >
          Open Contract Brief
        </button>
      </div>
    </div>
  );
}
