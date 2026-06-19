import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ShieldAlert, Cpu, Sparkles, Check, Copy } from 'lucide-react';

export default function CryptoEasterEgg() {
  const [inputText, setInputText] = useState('');
  const [decrypted, setDecrypted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [copied, setCopied] = useState(false);

  // Hex encoded ciphertext of:
  // "SECRET_DECRYPT_KEY_2026: SUNDARAM_IS_EXCEPTIONAL"
  const RAW_HEX_CIPHER = '53 45 43 52 45 54 5f 44 45 43 52 59 50 54 5f 4b 45 59 5f 32 30 32 36 3a 20 53 55 4e 44 41 52 41 4d 5f 49 53 5f 45 58 43 45 50 54 49 4f 4e 41 4c';
  
  // The verification answer (case insensitive & spaces ignored)
  const CORRECT_ANSWER = 'SECRET_DECRYPT_KEY_2026: SUNDARAM_IS_EXCEPTIONAL';

  const handleVerify = (val: string) => {
    const sanitizedInput = val.trim().toUpperCase().replace(/\s+/g, ' ');
    const sanitizedCorrect = CORRECT_ANSWER.toUpperCase().replace(/\s+/g, ' ');
    
    if (sanitizedInput === sanitizedCorrect || val.trim().toUpperCase() === 'SUNDARAM_IS_EXCEPTIONAL') {
      setDecrypted(true);
    }
  };

  const handleAutoSolve = () => {
    setInputText(CORRECT_ANSWER);
    setDecrypted(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(RAW_HEX_CIPHER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-5 md:p-6 font-mono relative overflow-hidden backdrop-blur-md">
      {/* Bio-metric light border element */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4D00]/30 to-transparent" />
      
      <div className="flex flex-col gap-4">
        {/* Header Indicator */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#FF4D00] animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#FF4D00]">
              CRYPTOGRAPHIC CIPHER VERIFICATION LAYER [SECURE-MD]
            </span>
          </div>
          <span className="text-[9px] text-neutral-600 font-bold uppercase">
            STATUS: ACTIVE LOCK
          </span>
        </div>

        {/* Central Hex Code representation */}
        <div className="space-y-2">
          <span className="text-[10px] text-neutral-500 uppercase font-semibold block">
            RAW CHRONO-CIPHER DATA STREAM (HEX):
          </span>
          <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex flex-wrap items-center justify-between gap-3 relative group">
            <code className="text-[11px] text-white/70 select-all tracking-wider break-all max-w-[85%]">
              {RAW_HEX_CIPHER}
            </code>
            <button
              onClick={copyToClipboard}
              className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors duration-200"
              title="Copy hex stream"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Interactive decode controller */}
        <div className="space-y-3">
          <label className="text-[10px] text-neutral-500 uppercase font-semibold block">
            INPUT RESOLVED ALPHANUMERIC STRING:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                handleVerify(e.target.value);
              }}
              placeholder="Decode the Hex stream or type secret key..."
              disabled={decrypted}
              className="flex-grow px-4 py-2 bg-[#06090e] border border-neutral-800 rounded-lg text-xs text-white/90 placeholder-neutral-600 focus:outline-none focus:border-[#FF4D00]/50 transition-colors uppercase"
            />
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-3.5 py-2 rounded-lg border border-neutral-800 text-[10px] hover:border-neutral-700 hover:text-white transition-colors uppercase font-bold text-neutral-500"
              >
                HINT
              </button>
              
              <button
                onClick={handleAutoSolve}
                className="px-3.5 py-2 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/20 hover:bg-[#FF4D00] hover:text-white hover:border-transparent transition-all text-[10px] text-[#FF4D00] uppercase font-black tracking-wide"
              >
                RUN AUTO-RESOLVER
              </button>
            </div>
          </div>
        </div>

        {/* Animated dynamic hint message */}
        <AnimatePresence>
          {showHint && !decrypted && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-lg text-[10px] text-yellow-500/80 leading-relaxed">
                <strong>[DECRYPTION HINT]:</strong> Convert the Hexadecimal octets above back representing standard ASCII symbols. (e.g. <code>53</code> = <strong>S</strong>, <code>45</code> = <strong>E</strong>, and so on).
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Decrypted Secret Panel Modal-in-place block */}
        <AnimatePresence>
          {decrypted && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl space-y-3"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-green-400 animate-spin-slow" />
                <span className="text-[11px] text-green-400 font-extrabold tracking-widest uppercase">
                  INTEGRITY SECURE // DECRYPTION COMPLETE
                </span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                🎉 <strong>CONGRATULATIONS!</strong> You successfully targeted the hidden register layer. 
                <br /><br />
                <span className="text-white">"You discovered the system's inner core. Let's work together to design elite high-performance algorithms!"</span>
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a 
                  href="mailto:sundaram9336492674@gmail.com?subject=Cryptographic%20Comprehension%20Discovery&body=Hi%20Sundaram,%20I%20found%20your%20cryptographic%20easter%20egg!%20Let's%20discuss%20opportunities."
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-black text-[10px] font-black rounded-lg hover:bg-green-400 transition-colors uppercase tracking-widest"
                >
                  <Sparkles className="w-3.5 h-3.5" /> CLAIM CREDENTIAL PORTFOLIO ➜
                </a>
                
                <span className="text-[9px] text-[#FF4D00] font-bold tracking-widest">
                  [RECRUITER CODE: SECURE_SUNDARAM_2026]
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
