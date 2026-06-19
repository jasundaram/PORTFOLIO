import { useState, useEffect } from 'react';
import { PROJECTS } from './data';
import { ProjectItem } from './types';
import HeroSlider from './components/HeroSlider';
import PortfolioGrid from './components/PortfolioGrid';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import BentoStats from './components/BentoStats';
import AboutBio from './components/AboutBio';
import LightboxModal from './components/LightboxModal';
import MathConsole from './components/MathConsole';
import CipherText from './components/CipherText';
import BlogSection from './components/BlogSection';
import TerminalPreloader from './components/TerminalPreloader';
import InfiniteMarquee from './components/InfiniteMarquee';
import FloatingNavbar from './components/FloatingNavbar';
import CryptoEasterEgg from './components/CryptoEasterEgg';
import InteractiveConstellation from './components/InteractiveConstellation';
import Lenis from 'lenis';
import { Compass, Sparkles, Layers, Anchor, Monitor, Camera, Menu, X, ArrowUp } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filter projects to showcase featured highlight cases in the carousel
  const carouselHighlights = PROJECTS.slice(0, 3);

  useEffect(() => {
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PROJECTS.length;
    setSelectedProject(PROJECTS[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = PROJECTS.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    setSelectedProject(PROJECTS[prevIndex]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#FF4D00] selection:text-white bg-[#05070c] text-white relative overflow-hidden" id="studio-app-root">
      {/* Subtle organic film grain noise overlay */}
      <div className="noise-overlay" />

      {/* High-Tech Terminal boot preloader loading screen */}
      <TerminalPreloader onComplete={() => setIsLoading(false)} />

      {/* Abstract Grid and Light background overlays */}
      <div className="absolute inset-x-0 top-0 h-[800px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#FF4D00]/10 via-[#FF4D00]/1 to-transparent opacity-60 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:45px_45px] opacity-45 pointer-events-none z-0" />
      <InteractiveConstellation />
      
      {/* 1. FLOATING TRANS-CAPSULE NAVIGATION BAR */}
      <FloatingNavbar onScrollToSection={scrollToSection} />

      {/* 2. CHRONICLE HERO LANDING ZONE */}
      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-16 space-y-20 md:space-y-32 w-full">
        <section id="featured-landing" className="space-y-8">
          <div className="space-y-4">
            <p className="text-[12px] uppercase tracking-[0.4em] text-[#FF4D00] font-bold">
              <CipherText text="Data Analyst & Quantitative Engineering Enthusiast" delay={150} />
            </p>
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85] tracking-[-0.04em] uppercase m-0 max-w-5xl font-display flex flex-col">
              <CipherText text="Sundaram" delay={300} />
              <CipherText text="Jaiswal" className="text-transparent text-stroke-white hover:text-stroke-none" delay={450} />
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch pt-2 pb-1">
              <div className="lg:col-span-3 border-l-2 border-[#FF4D00] pl-6 glass-panel p-6 md:p-8 rounded-r-xl flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-white text-sm md:text-base font-sans font-light leading-relaxed">
                    Bridging the gap between theoretical mathematics and applied data science to drive strategic business value. Specializing in high-performance data modeling, dynamic Power BI interfaces, and algorithmic problem-solving.
                  </p>
                  <p className="text-neutral-400 text-xs font-sans leading-relaxed">
                    Based in Lucknow, India. Fully integrated workflow utilizing Python, advanced DAX formulations, and statistical frameworks to configure robust operational assets.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 pt-1">
                  <button
                    onClick={() => scrollToSection('works-gallery')}
                    className="px-6 py-3 rounded bg-[#FF4D00] text-white hover:bg-white hover:text-black font-mono text-[10px] uppercase font-bold tracking-widest border border-transparent hover:border-white transition-all cursor-pointer"
                  >
                    View Projects
                  </button>
                  <button
                    onClick={() => scrollToSection('studio-bio')}
                    className="px-4 py-3 rounded bg-transparent text-white hover:bg-white/10 font-mono text-[10px] uppercase font-bold tracking-widest border border-white/20 transition-all cursor-pointer"
                  >
                    Experience Bio
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2">
                <MathConsole />
              </div>
            </div>
          </div>

          <HeroSlider slides={carouselHighlights} onOpenProject={setSelectedProject} />
        </section>

        {/* 3. INTERACTIVE PROCESS COMPARISON */}
        <section id="workflow-reveal" className="scroll-mt-24 space-y-4">
          <BeforeAfterSlider
            beforeImage="https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=1000"
            afterImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000"
            beforeLabel="1. Raw Logs & Disorganized Matrices"
            afterLabel="2. Interactive Star-Schema Dashboard"
            title="Data Pipeline Transformation & Visualization"
            description="Explore our architectural data flow from highly chaotic, messy commercial CSV spreadsheets to fine-tuned, ultra-structured Power BI business intelligence graphs."
          />
        </section>

        <InfiniteMarquee className="rotate-1" />

        {/* 4. DISCIPLINARY CATALOG GRID */}
        <section id="works-gallery" className="scroll-mt-24 space-y-8">
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#FF4D00] font-bold block">
              03 DIGITAL PORTFOLIOWORKS & PAPERS
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase">
              Select Analytical Case Studies
            </h2>
          </div>

          <PortfolioGrid projects={PROJECTS} onOpenProject={setSelectedProject} />
        </section>

        <InfiniteMarquee className="-rotate-1 bg-[#FF4D00]/5" />

        {/* 5. BIO & STUDIO DIAGNOSTICS BENTO */}
        <section id="studio-bio" className="scroll-mt-24 space-y-8">
          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#FF4D00] font-bold block">
              04 MATHEMATICAL BIOGRAPHY & FOCUS
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase">
              About Me & General Studies
            </h2>
          </div>

          <AboutBio />
          <BentoStats />
        </section>

        <InfiniteMarquee className="skew-y-1 bg-purple-500/[0.02]" />

        {/* 6. TECHNICAL RESEARCH JOURNAL (BLOG) SECTION */}
        <BlogSection />
      </main>

      {/* 7. IMMERSIVE LIGHTBOX LIGHTROOM */}
      <LightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />

      {/* 8. HIGH-END FOOTER DESIGN */}
      <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="md:col-span-2 space-y-4">
              <span className="text-white text-base font-display font-semibold tracking-wider uppercase flex items-center gap-2">
                SUNDARAM JAISWAL
              </span>
              <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
                Applied analytics, quantitative engineering, and mathematics. Bridging pure numbers and operational mechanics to solve modern information problems.
              </p>
            </div>

            <div className="space-y-3.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
                Social Repositories
              </span>
              <ul className="space-y-2 text-xs font-mono font-medium">
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">GitHub Archive ➜</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">LinkedIn Profile ➜</a></li>
                <li><span className="hover:text-white transition-colors cursor-text">Score Rank: Elite Analyst</span></li>
              </ul>
            </div>

            <div className="space-y-3.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold block">
                Direct Contact Desk
              </span>
              <ul className="space-y-2 text-xs font-mono font-medium">
                <li><a href="mailto:sundaram9336492674@gmail.com" className="hover:text-white transition-colors cursor-pointer">sundaram9336492674@gmail.com</a></li>
                <li><a href="tel:+919336492674" className="hover:text-white transition-colors cursor-pointer">+91-9336492674</a></li>
                <li><span className="text-[#FF4D00] font-bold">Lucknow, UP, India</span></li>
              </ul>
            </div>
          </div>

          {/* Interactive Cryptographic Easter Egg Terminal */}
          <div className="pt-4">
            <CryptoEasterEgg />
          </div>

          <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600">
            <span>© 2026 Sundaram Jaiswal. All quantitative rights reserved worldwide.</span>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-neutral-900 rounded-lg hover:text-white border border-neutral-800 transition-colors cursor-pointer"
            >
              Back to Peak <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

