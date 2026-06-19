import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Menu, X, ArrowUpRight, Cpu, LogIn, LogOut, ShieldCheck, User as UserIcon } from 'lucide-react';
import { loginWithGoogle, logoutUser } from '../lib/firebase';
import { useAuth } from '../hooks/useAuth';

interface FloatingNavbarProps {
  onScrollToSection: (id: string) => void;
}

const NAV_ITEMS = [
  { id: 'featured-landing', label: 'Home', num: '01' },
  { id: 'workflow-reveal', label: 'Pipelines', num: '02' },
  { id: 'works-gallery', label: 'Works', num: '03' },
  { id: 'studio-bio', label: 'Bio', num: '04' },
  { id: 'technical-blog', label: 'Journal', num: '05' },
];

export default function FloatingNavbar({ onScrollToSection }: FloatingNavbarProps) {
  const { user } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('featured-landing');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor active sections on scroll using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the middle center viewport
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    // Also monitor general scrolling to make pill slightly more compact when scrolled down
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setActiveSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-5 left-0 right-0 z-40 px-4 md:px-8 flex justify-center pointer-events-none select-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto relative flex flex-col items-center w-full max-w-4xl rounded-full border border-white/10 bg-[#05070c]/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 ${
          scrolled ? 'py-2 px-3 md:px-4 max-w-3xl' : 'py-3.5 px-5 md:px-6'
        }`}
      >
        <div className="w-full flex items-center justify-between">
          
          {/* Brand Monogram capsule anchor */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveSection('featured-landing');
            }}
            className="flex items-center gap-3 text-left cursor-pointer group pl-2"
          >
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-display font-extrabold text-sm group-hover:bg-[#FF4D00] group-hover:text-white transition-all duration-300">
              S
            </div>
            <div className="hidden sm:block leading-none">
              <span className="text-[10px] font-black font-display tracking-wider text-white uppercase block group-hover:text-[#FF4D00] transition-colors">
                SUNDARAM
              </span>
              <span className="text-[7px] font-mono text-white/40 block tracking-widest uppercase">
                QUANT DATA LABS
              </span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-full border border-white/5 relative">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-1.5 rounded-full text-[10px] font-mono font-medium tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {/* Sliding orange active pill highlight overlay */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavHighlightPill"
                      className="absolute inset-0 bg-[#FF4D00] rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action Call for custom CV or system state with Firebase Google Auth integration */}
          <div className="hidden sm:flex items-center gap-3 pr-2 relative">
            <a
              href="#works-gallery"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('works-gallery');
              }}
              className="px-3.5 py-1.5 rounded-full border border-white/5 text-[9px] font-mono font-bold tracking-widest text-neutral-400 hover:text-white hover:bg-white/5 transition-all uppercase flex items-center gap-1"
            >
              PORTFOLIO INDEX
            </a>

            {/* Auth Action triggers */}
            {!user ? (
              <button
                onClick={loginWithGoogle}
                className="px-3.5 py-1.5 rounded-full bg-[#FF4D00] text-white text-[9px] font-mono font-black tracking-widest uppercase flex items-center gap-1.5 cursor-pointer hover:shadow-[0_0_15px_rgba(255,77,0,0.4)] transition-all active:scale-95"
              >
                <LogIn className="w-3 h-3" /> CONNECT GOOGLE ID
              </button>
            ) : (
              <div 
                className="relative"
                onMouseEnter={() => setIsProfileDropdownOpen(true)}
                onMouseLeave={() => setIsProfileDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#00D1FF]/30 bg-black/40 hover:border-[#00D1FF] transition-all cursor-pointer group"
                >
                  <div className="relative">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'Authorized User'} 
                        referrerPolicy="no-referrer"
                        className="w-5.5 h-5.5 rounded-full border border-white/20"
                      />
                    ) : (
                      <div className="w-5.5 h-5.5 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] text-white">
                        <UserIcon className="w-3 h-3" />
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-green-400 border border-black animate-pulse"></span>
                  </div>
                  <span className="text-[9px] font-mono font-black text-white/90 tracking-widest uppercase max-w-[85px] truncate">
                    {user.displayName?.split(' ')[0] || 'ANALYST'}
                  </span>
                </button>

                {/* Dropdown menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-1.5 w-52 rounded-xl bg-[#07090d]/100 border border-[#00D1FF]/20 backdrop-blur-xl p-3.5 shadow-2xl z-50 text-left space-y-3"
                    >
                      <div className="border-b border-white/5 pb-2 text-[9px] space-y-0.5">
                        <div className="font-mono text-neutral-500 uppercase tracking-widest font-black flex items-center gap-1.5">
                          <ShieldCheck className="w-3 h-3 text-green-400" /> SECURED PORTAL SESSION
                        </div>
                        <div className="font-sans text-white font-bold truncate">{user.displayName}</div>
                        <div className="font-mono text-neutral-400 text-[8.5px] truncate">{user.email}</div>
                      </div>

                      <div className="text-[8.5px] text-neutral-500 font-mono leading-relaxed uppercase">
                        Real-time quantitative analytics and cloud databases are actively persistent.
                      </div>

                      <button
                        onClick={logoutUser}
                        className="w-full py-1.5 rounded bg-red-500/10 hover:bg-red-500 hover:text-white border border-red-500/20 text-red-400 font-mono font-bold text-[9px] tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3 h-3" /> DISCONNECT CORE
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile hamburger menu button inside capsule */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/5 transition-all outline-none"
            aria-label="Toggle capsule options navigation"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-[#FF4D00]" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Options Drawer with elegant height animation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="w-full overflow-hidden md:hidden mt-3 px-3"
            >
              <div className="py-3 border-t border-white/5 flex flex-col gap-1 text-left">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`text-left w-full px-4 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase flex items-center justify-between transition-colors ${
                        isActive 
                          ? 'bg-[#FF4D00] text-white font-bold' 
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-[9px] opacity-40">{item.num}</span>
                        {item.label}
                      </span>
                      {isActive && <Cpu className="w-3.5 h-3.5 text-white animate-pulse" />}
                    </button>
                  );
                })}

                {/* Mobile Auth options */}
                <div className="mt-2 pt-3 border-t border-white/5 space-y-2">
                  {!user ? (
                    <button
                      onClick={loginWithGoogle}
                      className="w-full py-2.5 rounded-full bg-[#FF4D00] text-white font-mono font-bold text-[10px] tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" /> CONNECT GOOGLE ID
                    </button>
                  ) : (
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        {user.photoURL && (
                          <img 
                            src={user.photoURL} 
                            alt={user.displayName || 'Security Core'} 
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-full border border-white/10"
                          />
                        )}
                        <div className="leading-tight text-left">
                          <div className="text-xs font-bold text-white font-sans">{user.displayName}</div>
                          <div className="text-[9px] font-mono text-neutral-400 truncate max-w-[180px]">{user.email}</div>
                        </div>
                      </div>
                      <button
                        onClick={logoutUser}
                        className="w-full py-2 rounded-lg bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 border border-red-500/20 font-mono text-[9px] tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" /> DISCONNECT PORTAL
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}
