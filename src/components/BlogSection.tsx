import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Cpu, Leaf, Shield, ArrowUpRight, Clock, FileText, X, Sparkles } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  domain: 'Mathematics' | 'Hardware' | 'Sustainability' | 'Data Security';
  date: string;
  readTime: string;
  abstract: string;
  fullArticle: string[];
  color: string; // Theme color class (e.g. text-[#A855F7])
  borderColor: string; // Border accent
  haloColor: string; // Radial gradient halo RGBA color
  icon: any;
  asymmetryClass: string; // Custom positioning class to create asymmetry
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 'math-poly',
    title: 'On Multivariate Polynomial Regressions for Additive Yield Estimation',
    domain: 'Mathematics',
    date: 'June 15, 2026',
    readTime: '6 min read',
    abstract: 'Exploring how multi-variable matrix systems resolve non-linear optimization bottlenecks in material workflows, utilizing high-stability regression equations.',
    fullArticle: [
      'Mathematical models in commercial engineering often suffer from high-dimensionality conflicts when modeling additive mixtures. In this article, copy-pasted linear models are replaced with custom multivariate polynomial structures calibrated for non-linear decay curves.',
      'By mapping multiple input fields into a unified system of linear equations, we extract exact coefficients that describe cross-variable synergies. For example, the interaction between environmental moisture retention factors and substrate thickness is non-linear and governed by a second-order polynomial frontier.',
      'Our numerical solution utilizes a minimized least-squares solver in Python to compute regression matrices. The calculated R-squared exceeds 0.94, guaranteeing premium reliability. This mathematical rigor prevents industrial over-engineering and keeps project estimations stable under extreme real-world stress.',
      'In conclusion, applied mathematical modeling serves as the backbone of strategic analytics. High-fidelity polynomial regressions replace gut-based estimations with verified numerical frameworks.'
    ],
    color: 'text-purple-400',
    borderColor: 'bg-purple-500',
    haloColor: 'rgba(168,85,247,0.12)',
    icon: BookOpen,
    asymmetryClass: 'lg:mt-0 lg:pb-8'
  },
  {
    id: 'hardware-pid',
    title: 'Calibrating Low-Latency PID Control Feedback Loops on Embedded Avionics',
    domain: 'Hardware',
    date: 'May 28, 2026',
    readTime: '8 min read',
    abstract: 'Unpacking the mechanics of rotor thrust dampening, differential error feedback equations, and microcontroller sensor frequency limits under turbulent winds.',
    fullArticle: [
      'Embedded hardware systems running real-time path stabilizers require precise, fast frequency sampling. Standard PID (Proportional-Integral-Derivative) code is often limited by sensor noise and high-latency processor registers.',
      'We construct a low-friction physics framework using Pixhawk and Arduino microcontrollers. The model continuously solves localized differential displacement vectors at 400Hz. This rate minimizes the phase lag between sensor input (IMU data) and motor speed adjustment.',
      'To prevent integral windup—a common mechanical error—we implemented a custom dynamic clamping algorithm. When the rotor throttle output hits physical saturation, the accumulator halts integration immediately, avoiding trajectory overshoot.',
      'The outcome is highly precise stabilization: autonomous hovering variance drops from 20cm to less than 2.5cm, establishing elite reliability curves for light atmospheric drone crafts.'
    ],
    color: 'text-orange-400',
    borderColor: 'bg-[#FF4D00]',
    haloColor: 'rgba(255,77,0,0.12)',
    icon: Cpu,
    asymmetryClass: 'lg:mt-16 lg:pb-12'
  },
  {
    id: 'sus-elasticity',
    title: 'Eco-Material Elastomer Decays Under Continuous Micro-Climatic Exposure',
    domain: 'Sustainability',
    date: 'May 12, 2026',
    readTime: '5 min read',
    abstract: 'Modeling physical tensile decay variables in starch-based plastics and PLA parameters, mapping durability limits through multivariate Python models.',
    fullArticle: [
      'Bio-based alternatives to conventional plastics are critical for global sustainability, yet their mechanical degradation profile is highly sensitive to environmental climate. This study models degradation as a function of temperature, relative humidity, and UV index.',
      'Using multivariate statistical analysis, we tracked decay rates in cornstarch-based composites and polylactic acid (PLA) polymers. Over a 180-day cycle, the materials were subjected to continuous micro-climatic inputs while tensile strength was calculated via localized elasticity checks.',
      'The linear decay model failed to map the final structural failure point. We introduced a customized logarithmic decay function that incorporates additive ratio parameters, helping pinpoint the precise week where tensile strength drops below operational requirements.',
      'Integrating these predictive equations into Excel estimation sheets allows sustainable manufacturers to select optimal bioplastic mixtures. This balancing keeps composite costs down while protecting product shelf-life.'
    ],
    color: 'text-emerald-400',
    borderColor: 'bg-emerald-500',
    haloColor: 'rgba(16,185,129,0.12)',
    icon: Leaf,
    asymmetryClass: 'lg:-mt-8 lg:pb-6'
  },
  {
    id: 'sec-crypto',
    title: 'Cryptographic Prime Fields & GCD Validation in Zero-Transit Architectures',
    domain: 'Data Security',
    date: 'April 09, 2026',
    readTime: '7 min read',
    abstract: 'A deep look into Miller-Rabin primality thresholds, custom key hashing iterations, and GCD verification algorithms to guarantee zero transactional bit-shifting.',
    fullArticle: [
      'In high-speed, distributed database architectures, verifying data packets between remote worker nodes without exposing true network contents is a primary security objective.',
      'We present a zero-transit authentication module utilizing cryptographic prime fields. First, localized prime components are validated using randomized Miller-Rabin checking routines, avoiding slow deterministic division sweeps.',
      'Second, GCD (Greatest Common Divisor) hashing operations are injected directly into transactional handshakes. Because these calculations are computationally efficient (O(log n) complexity), they cause zero performance overhead, even on light consumer hardware.',
      'Applying this theoretical network layer eliminates the risk of replay injections or standard bit-shifting tampering. It ensures pristine analytical security for transactional rows handled across unsanctified networks.'
    ],
    color: 'text-sky-400',
    borderColor: 'bg-sky-500',
    haloColor: 'rgba(14,165,233,0.12)',
    icon: Shield,
    asymmetryClass: 'lg:mt-8 lg:pb-10'
  }
];

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="technical-blog" className="scroll-mt-24 space-y-8 pb-12">
      {/* Section Typography Title */}
      <div className="space-y-1">
        <span className="text-[11px] font-mono tracking-[0.3em] text-[#FF4D00] font-bold block">
          05 RESEARCH INDEX & JOURNAL WORK
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase">
          Technical Letters & Analysis
        </h2>
        <p className="text-neutral-400 text-sm max-w-2xl font-sans">
          Bespoke research articles uncovering numerical breakthroughs and applied data-modeling strategies across mathematical physical landscapes.
        </p>
      </div>

      {/* Asymmetric Minimalist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start pt-4">
        {/* Left Column (Mathematics & Sustainability) */}
        <div className="space-y-8 flex flex-col">
          {[BLOG_POSTS[0], BLOG_POSTS[2]].map((post) => {
            const Icon = post.icon;
            return (
              <div
                key={post.id}
                className={`relative group ${post.asymmetryClass} cursor-pointer rounded-2xl glass-panel text-left overflow-hidden transition-all duration-300 hover:border-white/20`}
                onClick={() => setSelectedPost(post)}
              >
                {/* Horizontal Category Line indicator at the very top */}
                <div className={`h-1.5 w-full ${post.borderColor} opacity-85`} />

                {/* Faint Dark Background Tint & Radial Halo glow hidden by default */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none -z-10 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${post.haloColor} 0%, transparent 70%)`
                  }}
                />

                <div className="p-6 md:p-8 space-y-4">
                  {/* Category Pill and Read Time */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider ${post.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                      {post.domain}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Scaled Text Content Wrapper */}
                  <div className="transition-all duration-300 transform group-hover:translate-x-1 space-y-2">
                    <h3 className="text-lg md:text-xl font-display font-bold text-white leading-snug group-hover:text-[#FF4D00] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-neutral-400 text-xs md:text-sm font-sans font-light leading-relaxed">
                      {post.abstract}
                    </p>
                  </div>

                  {/* Date and Action link */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-mono">
                    <span className="text-neutral-500">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-[#FF4D00] group-hover:text-white transition-colors">
                      Access Memo <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column (Hardware & Data Security) */}
        <div className="space-y-8 flex flex-col">
          {[BLOG_POSTS[1], BLOG_POSTS[3]].map((post) => {
            const Icon = post.icon;
            return (
              <div
                key={post.id}
                className={`relative group ${post.asymmetryClass} cursor-pointer rounded-2xl glass-panel text-left overflow-hidden transition-all duration-300 hover:border-white/20`}
                onClick={() => setSelectedPost(post)}
              >
                {/* Horizontal Category Line indicator at the very top */}
                <div className={`h-1.5 w-full ${post.borderColor} opacity-85`} />

                {/* Faint Dark Background Tint & Radial Halo glow hidden by default */}
                <div 
                  className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none -z-10 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${post.haloColor} 0%, transparent 70%)`
                  }}
                />

                <div className="p-6 md:p-8 space-y-4">
                  {/* Category Pill and Read Time */}
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider ${post.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                      {post.domain}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Scaled Text Content Wrapper */}
                  <div className="transition-all duration-300 transform group-hover:translate-x-1 space-y-2">
                    <h3 className="text-lg md:text-xl font-display font-bold text-white leading-snug group-hover:text-[#FF4D00] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-neutral-400 text-xs md:text-sm font-sans font-light leading-relaxed">
                      {post.abstract}
                    </p>
                  </div>

                  {/* Date and Action link */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[11px] font-mono">
                    <span className="text-neutral-500">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-[#FF4D00] group-hover:text-white transition-colors">
                      Access Memo <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Expandable Article Modal Drawer */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-[#05070c] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Color Line on top */}
              <div className={`h-2 w-full ${selectedPost.borderColor}`} />

              <div className="p-6 md:p-10 space-y-6">
                {/* Header Information */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider ${selectedPost.color}`}>
                      {selectedPost.domain}
                    </span>
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="p-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tight leading-tight">
                    {selectedPost.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-400 items-center">
                    <span>Date: {selectedPost.date}</span>
                    <span className="text-neutral-600">•</span>
                    <span>Speed: {selectedPost.readTime}</span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-[#FF4D00] font-semibold">Author: S. Jaiswal</span>
                  </div>
                </div>

                {/* Abstract Box */}
                <div className="p-4 bg-white/[0.02] border-l-2 border-[#FF4D00] rounded-r-lg font-sans text-neutral-300 text-sm italic leading-relaxed">
                  " {selectedPost.abstract} "
                </div>

                {/* Full Article Text Block */}
                <div className="space-y-4 text-neutral-300 text-sm md:text-base leading-relaxed font-sans font-light">
                  {selectedPost.fullArticle.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>

                {/* Footer close button */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF4D00]" /> Research Memorandum
                  </span>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-5 py-2.5 bg-[#FF4D00] hover:bg-orange-600 text-white font-mono text-xs uppercase font-bold tracking-widest rounded-lg transition-colors cursor-pointer"
                  >
                    Close Letter
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
