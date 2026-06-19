import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Check, AlertTriangle, Cpu } from 'lucide-react';

interface TerminalPreloaderProps {
  onComplete: () => void;
}

interface LogLine {
  text: string;
  type: 'info' | 'success' | 'warn' | 'system';
  delay: number;
}

export default function TerminalPreloader({ onComplete }: TerminalPreloaderProps) {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [progress, setProgress] = useState(0);
  const [bootStatus, setBootStatus] = useState<'loading' | 'glitch' | 'done'>('loading');
  const [hexAddress, setHexAddress] = useState('0x00000000');
  
  const rawLogs: LogLine[] = [
    { text: 'SYSTEM SECTOR BOOT INITIATED...', type: 'system', delay: 80 },
    { text: 'SETTING UP SECURE MEMORY BUFFERS: FOUND 64.0 GB ECC LPDDR5X...', type: 'info', delay: 250 },
    { text: 'CONNECTING CORE CLUSTER TO SECURE_SUNDARAM_JAISWAL_NODE...', type: 'info', delay: 450 },
    { text: 'PORT NODE ALIVE AT address 162.244.11.90 // DELAY: 4ms // STATUS: OPTIMAL', type: 'success', delay: 650 },
    { text: 'COMPILING QUANTITATIVE VALUATION MATRICES...', type: 'system', delay: 850 },
    { text: 'SEEDING HEURISTIC BIOMETRIC BIO & MULTIVARIATE EQUATION ENGINES...', type: 'info', delay: 1050 },
    { text: 'SUCCESS: HIGH-STABILITY REGRESSION COEFFICIENT CONVERGED AT 0.984', type: 'success', delay: 1300 },
    { text: 'DECRYPTING PORTFOLIO PROJECT COMPILATION PACKETS...', type: 'info', delay: 1500 },
    { text: 'WARNING: MULTIPLE SANDBOX INTERFERENCES FOUND. RESOLVING GCD CRYPTO-CIPHERS...', type: 'warn', delay: 1700 },
    { text: 'DECRYPTION RATIO 100% SUCCESSFUL [AES-256-GCM KEY VALIDATED]', type: 'success', delay: 1950 },
    { text: 'ESTABLISHING PORT 3000 COMPLIANCE PROTOCOLS...', type: 'info', delay: 2100 },
    { text: 'TOKEN AUTHENTICATION SECURED // ACCESS GRANTED', type: 'success', delay: 2250 },
  ];

  // Rotate randomized Hex-addresses representing computer registers
  useEffect(() => {
    const interval = setInterval(() => {
      const hex = '0x' + Array.from({ length: 8 }, () => 
        Math.floor(Math.random() * 16).toString(16).toUpperCase()
      ).join('');
      setHexAddress(hex);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  // Set progressive timers for logs & loading bar
  useEffect(() => {
    rawLogs.forEach((log) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log]);
      }, log.delay);
    });

    // Control loader percentage progress dynamically
    const progressInterval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const diff = Math.random() * 22;
        return Math.min(oldProgress + diff, 100);
      });
    }, 280);

    // Glitch trigger before entering the main environment
    const glitchTimeout = setTimeout(() => {
      setBootStatus('glitch');
    }, 2450);

    const finishTimeout = setTimeout(() => {
      setBootStatus('done');
      setTimeout(onComplete, 350); // complete callback after fade animation
    }, 2800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(glitchTimeout);
      clearTimeout(finishTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {bootStatus !== 'done' && (
        <motion.div
          id="terminal-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(16px)' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed inset-0 bg-[#030508] z-50 flex flex-col items-center justify-center p-6 font-mono select-none overflow-hidden"
        >
          {/* Subtle grid and digital scanline overlay effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,77,0,0.02),_rgba(0,255,0,0.01),_rgba(0,0,255,0.02))] bg-[size:100%_4px,_6px_100%] pointer-events-none z-10" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FF4D00]/5 to-transparent pointer-events-none" />

          {/* Glitch overlay triggers near completion for cyber-quantum style */}
          {bootStatus === 'glitch' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0, 0.6, 1, 0] }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-red-950/20 z-20 flex items-center justify-center pointer-events-none"
            >
              <div className="text-[#FF4D00] text-7xl md:text-9xl font-black tracking-widest opacity-35 select-none uppercase">
                ACCESS_OK
              </div>
            </motion.div>
          )}

          {/* Core high-tech Glassmorphism console block */}
          <div className="w-full max-w-2xl bg-[#06090e]/95 border border-white/10 rounded-2xl p-6 relative shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col justify-between aspect-[1.55]">
            
            {/* Window upper title strip */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 animate-pulse" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                <div className="w-3 h-3 rounded-full bg-green-500/30" />
                <span className="text-[10px] text-neutral-400 font-bold ml-2 tracking-widest flex items-center gap-1.5 uppercase">
                  <Terminal className="w-3.5 h-3.5 text-[#FF4D00]" /> COGNITIVE BOOT CONSOLE
                </span>
              </div>
              <div className="text-[10px] text-neutral-500 font-extrabold tracking-widest">
                ADDR: <span className="text-white/85 font-mono">{hexAddress}</span>
              </div>
            </div>

            {/* Simulated Live System Output Log Stream */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-none text-[10px] sm:text-[11px] md:text-sm">
              {logs.map((log, index) => {
                let badgeColor = 'text-[#FF4D00]';
                let iconComponent = <Cpu className="w-3.5 h-3.5 text-neutral-500" />;
                
                if (log.type === 'success') {
                  badgeColor = 'text-green-400';
                  iconComponent = <Check className="w-3 h-3 text-green-400" />;
                } else if (log.type === 'warn') {
                  badgeColor = 'text-yellow-400 font-extrabold';
                  iconComponent = <AlertTriangle className="w-3 h-3 text-yellow-400" />;
                } else if (log.type === 'system') {
                  badgeColor = 'text-purple-400';
                  iconComponent = <Terminal className="w-3 h-3 text-purple-400" />;
                }

                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-start gap-2.5 py-0.5 leading-relaxed text-left"
                  >
                    <span className="pt-0.5 flex-shrink-0">{iconComponent}</span>
                    <span className="text-white/30 select-none font-mono">
                      [{(index + 1).toString().padStart(2, '0')}]:
                    </span>
                    <span className={log.type === 'warn' ? 'text-yellow-300 font-semibold' : 'text-neutral-200 font-light'}>
                      {log.text}
                    </span>
                  </motion.div>
                );
              })}
              
              {/* Spinning loading indicator at the cursor bottom */}
              {logs.length < rawLogs.length && (
                <div className="flex items-center gap-2 py-0.5 text-[#FF4D00]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] animate-ping" />
                  <span className="animate-pulse text-[10px] uppercase font-bold tracking-widest">RUNNING MATRIX COMPILE MODULES...</span>
                </div>
              )}
            </div>

            {/* Bottom Progress loader status */}
            <div className="pt-4 border-t border-white/5 mt-4 space-y-2">
              <div className="flex justify-between items-center text-[10px] text-neutral-400 font-semibold tracking-widest">
                <span className="flex items-center gap-1.5 text-neutral-500 uppercase">
                  <Cpu className="w-3 h-3 text-[#FF4D00] animate-pulse" /> COMPILER THREAD RATIO
                </span>
                <span className="text-white font-mono text-xs">{Math.round(progress)}%</span>
              </div>

              {/* Graphical loading progress visualization */}
              <div className="w-full h-2.5 bg-neutral-950 border border-white/5 rounded-full overflow-hidden p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-orange-600 via-[#FF4D00] to-yellow-500 rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[8px] md:text-[9px] text-neutral-600 font-mono">
                <span>[MODULE: EXCEL_REGRESSION_INTEGRATION]</span>
                <span className="text-white/50">[SUNDARAM JAISWAL CORE SYSTEM]</span>
              </div>
            </div>
          </div>
          
          {/* Background system notes */}
          <div className="mt-8 text-[11px] text-neutral-500 tracking-[0.25em] h-4 uppercase max-w-sm text-center font-bold">
            Data Analyst & Quant Engineering Environment
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
