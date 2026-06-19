import { useState, useEffect } from 'react';
import { Play, RotateCcw, Activity, HelpCircle, Cpu, ShieldCheck, Flame, Compass, Settings, Trash2, CloudUpload } from 'lucide-react';
import HighlighterText from './HighlighterText';
import { useAuth } from '../hooks/useAuth';
import { db } from '../lib/firebase';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

// Fast direct SHA-256 JS standard implementation for synchronous hash calculations
function sha256Sync(ascii: string): string {
  function rightRotate(value: number, amount: number): number {
    return (value >>> amount) | (value << (32 - amount));
  }
  
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  const lengthProperty = 'length';
  let i, j; // Used as a counter across multiple loops

  const result: string[] = [];
  const words: number[] = [];
  const asciiLength = ascii[lengthProperty];
  
  const hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];

  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  const primes = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
    101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199
  ];

  let asciiBitCount = asciiLength * 8;
  words[asciiBitCount >> 5] |= 0x80 << (24 - (asciiBitCount % 32));
  words[(((asciiBitCount + 64) >> 9) << 4) + 15] = asciiBitCount;

  for (i = 0; i < asciiLength; i++) {
    words[i >> 2] |= ascii.charCodeAt(i) << (24 - (i % 4) * 8);
  }

  for (i = 0; i < words[lengthProperty]; i += 16) {
    const w = [];
    const workingHash = hash.slice(0);

    for (j = 0; j < 64; j++) {
      if (j < 16) {
        w[j] = words[i + j] || 0;
      } else {
        const s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
        const s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
        w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
      }

      const temp1 = (workingHash[7] + (rightRotate(workingHash[4], 6) ^ rightRotate(workingHash[4], 11) ^ rightRotate(workingHash[4], 25)) + 
                     ((workingHash[4] & workingHash[5]) ^ (~workingHash[4] & workingHash[6])) + k[j] + w[j]) | 0;
      const temp2 = ((rightRotate(workingHash[0], 2) ^ rightRotate(workingHash[0], 13) ^ rightRotate(workingHash[0], 22)) + 
                     ((workingHash[0] & workingHash[1]) ^ (workingHash[0] & workingHash[2]) ^ (workingHash[1] & workingHash[2]))) | 0;

      workingHash[7] = workingHash[6];
      workingHash[6] = workingHash[5];
      workingHash[5] = workingHash[4];
      workingHash[4] = (workingHash[3] + temp1) | 0;
      workingHash[3] = workingHash[2];
      workingHash[2] = workingHash[1];
      workingHash[1] = workingHash[0];
      workingHash[0] = (temp1 + temp2) | 0;
    }

    for (j = 0; j < 8; j++) {
      hash[j] = (hash[j] + workingHash[j]) | 0;
    }
  }

  for (i = 0; i < 8; i++) {
    let word = hash[i];
    if (word < 0) word += maxWord;
    let hex = word.toString(16);
    while (hex.length < 8) hex = '0' + hex;
    result.push(hex);
  }

  return result.join('');
}

export default function MathConsole() {
  const [mode, setMode] = useState<'crypto' | 'aero' | 'sharpe' | 'fourier'>('crypto');
  
  // 1. Cryptography Hashing States
  const [inputText, setInputText] = useState('Secure Analytics Vault v3');
  const [hashResult, setHashResult] = useState('');
  const [hashingSpeedMs, setHashingSpeedMs] = useState(0.04);
  const [isCopied, setIsCopied] = useState(false);

  // 2. Aerodynamics States
  const [payload, setPayload] = useState(350); // grams
  const [batteryCapacity, setBatteryCapacity] = useState(3300); // mAh
  const [voltageCells, setVoltageCells] = useState(4); // 4S (14.8V)
  const [propSize, setPropSize] = useState(7); // inches
  const [droneDryWeight, setDroneDryWeight] = useState(550); // grams

  // Sharpe optimizer states
  const [riskTolerance, setRiskTolerance] = useState<number>(50); // 0-100
  const [allocations, setAllocations] = useState<{ asset: string; weight: number; yield: number }[]>([
    { asset: 'BTC Sovereign Hedge', weight: 40, yield: 24.5 },
    { asset: 'Tech Indexes', weight: 35, yield: 11.8 },
    { asset: 'Sovereign Debt', weight: 15, yield: 4.5 },
    { asset: 'Volatility Arbitrage', weight: 10, yield: 16.1 }
  ]);
  const [expectedReturn, setExpectedReturn] = useState<number>(14.9);
  const [systemRisk, setSystemRisk] = useState<number>(8.2);

  // Fourier wave parameters
  const [frequency, setFrequency] = useState<number>(2);
  const [amplitude, setAmplitude] = useState<number>(20);

  // Firestore Live Persistence States & Handlers
  const { user } = useAuth();
  const [savedConfigs, setSavedConfigs] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      setSavedConfigs([]);
      return;
    }

    try {
      const q = query(
        collection(db, 'users', user.uid, 'configs'),
        orderBy('timestamp', 'desc')
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const configs: any[] = [];
        snapshot.forEach((doc) => {
          configs.push({ id: doc.id, ...doc.data() });
        });
        setSavedConfigs(configs);
      }, (error) => {
        console.error("Firestore real-time math configs listener error: ", error);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Cannot construct core listener setups:", e);
    }
  }, [user]);

  const saveCurrentConfig = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      let configData: any = {};
      if (mode === 'crypto') {
        configData = { inputText };
      } else if (mode === 'aero') {
        configData = { payload, batteryCapacity, voltageCells, propSize, droneDryWeight };
      } else if (mode === 'sharpe') {
        configData = { riskTolerance };
      } else if (mode === 'fourier') {
        configData = { frequency, amplitude };
      }

      await addDoc(collection(db, 'users', user.uid, 'configs'), {
        type: mode,
        data: configData,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Error committing dataset record to Firestore:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteConfig = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'configs', id));
    } catch (error) {
      console.error("Error purging document ID from Firebase DB:", error);
    }
  };

  const applyConfig = (config: any) => {
    const { type, data } = config;
    if (type === 'crypto') {
      setMode('crypto');
      if (data.inputText !== undefined) setInputText(data.inputText);
    } else if (type === 'aero') {
      setMode('aero');
      if (data.payload !== undefined) setPayload(data.payload);
      if (data.batteryCapacity !== undefined) setBatteryCapacity(data.batteryCapacity);
      if (data.voltageCells !== undefined) setVoltageCells(data.voltageCells);
      if (data.propSize !== undefined) setPropSize(data.propSize);
      if (data.droneDryWeight !== undefined) setDroneDryWeight(data.droneDryWeight);
    } else if (type === 'sharpe') {
      setMode('sharpe');
      if (data.riskTolerance !== undefined) setRiskTolerance(data.riskTolerance);
    } else if (type === 'fourier') {
      setMode('fourier');
      if (data.frequency !== undefined) setFrequency(data.frequency);
      if (data.amplitude !== undefined) setAmplitude(data.amplitude);
    }
  };

  // Sync update hash as client types
  useEffect(() => {
    const start = performance.now();
    const hash = sha256Sync(inputText);
    const end = performance.now();
    setHashResult(hash);
    setHashingSpeedMs(parseFloat((end - start || 0.02).toFixed(3)));
  }, [inputText]);

  // Run Markowitz portfolio solver
  useEffect(() => {
    const premiumWeight = Math.round(riskTolerance * 0.75);
    const indexWeight = Math.round((100 - premiumWeight) * 0.65);
    const stableWeight = Math.round((100 - premiumWeight - indexWeight) * 0.7);
    const hedgeWeight = 100 - premiumWeight - indexWeight - stableWeight;

    setAllocations([
      { asset: 'BTC Sovereign Hedge', weight: premiumWeight, yield: 24.5 },
      { asset: 'Global Equities Index', weight: indexWeight, yield: 12.1 },
      { asset: 'Treasury & Safe Yields', weight: stableWeight, yield: 4.8 },
      { asset: 'Mean Reversion Portfolio', weight: hedgeWeight, yield: 15.6 }
    ]);

    const avgYield = (premiumWeight * 24.5 + indexWeight * 12.1 + stableWeight * 4.8 + hedgeWeight * 15.6) / 100;
    const calculatedVolatility = 3 + (riskTolerance * 0.14);
    setExpectedReturn(parseFloat(avgYield.toFixed(2)));
    setSystemRisk(parseFloat(calculatedVolatility.toFixed(2)));
  }, [riskTolerance]);

  // Compute Aerodynamics model parameters on-the-fly!
  const calculateAeroMetrics = () => {
    // Battery weight approximate: 0.11g per mAh per Cells
    const batteryWeight = Math.round(batteryCapacity * voltageCells * 0.115);
    const totalWeight = droneDryWeight + payload + batteryWeight; // grams

    // Voltage computation (3.7V per cell standard)
    const systemVoltage = voltageCells * 3.7;

    // Propeller disk sweep area for quadcopter (4 props)
    // Convert inches diameter to meters radius
    const diskRadiusMeters = (propSize * 0.0254) / 2;
    const propellerSweepArea = 4 * Math.PI * Math.pow(diskRadiusMeters, 2);

    // Air density standard at sea level (kg/m^3)
    const rho = 1.225;

    // Mass in kg
    const massKg = totalWeight / 1000;
    const gravitationalForceN = massKg * 9.80665; // Force required for hover

    // Propeller aerodynamic figure of merit (efficiency parameter default: 0.6)
    const factorOfMerit = 0.58;

    // Thrust theory hover power computed inside Newtonian mechanics fluid volume flow
    // P_hover = sqrt(Thrust^3 / (2 * air_density * propeller_area))
    const analyticalHoverPowerWatts = (Math.pow(gravitationalForceN, 1.5) / Math.sqrt(2 * rho * propellerSweepArea)) / factorOfMerit;

    // Static Hover Current draw in Amps: Power / Voltage
    const hoverCurrentAmps = analyticalHoverPowerWatts / systemVoltage;

    // Safe payload capacity metric: Max thrust (4x motors, say 550g max pull each at 4S)
    const escMotorMaxThrust = 550 * 4 * (voltageCells / 4);
    const thrustToWeightRatio = parseFloat((escMotorMaxThrust / totalWeight).toFixed(2));

    // Flight time in minutes: (BatteryCapacity / 1000) / HoverCurrent * 60 minutes * 0.85 safe depth of discharge
    const calculatedFlightTimeMinutes = ((batteryCapacity / 1000) / hoverCurrentAmps) * 60 * 0.85;

    return {
      batteryWeight,
      totalWeight,
      hoverPower: Math.round(analyticalHoverPowerWatts),
      hoverCurrent: parseFloat(hoverCurrentAmps.toFixed(1)),
      thrustToWeightRatio,
      flightMinutes: Math.max(1, parseFloat(calculatedFlightTimeMinutes.toFixed(1))),
      warningMessage: thrustToWeightRatio < 1.4 ? 'OVERWEIGHT RISK: LOW HOVER POWER' : null
    };
  };

  const aero = calculateAeroMetrics();

  const copyHashToClipboard = () => {
    navigator.clipboard.writeText(hashResult);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Plot coordinates for graph svg wave generator
  const generateSineWavePath = () => {
    let points = [];
    for (let x = 0; x <= 400; x += 4) {
      const y = 50 + 
                Math.sin((x / 400) * frequency * Math.PI * 2) * amplitude + 
                Math.cos((x / 400) * frequency * 2 * Math.PI * 2) * (amplitude / 4);
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between h-full group transition-all border-[#FF4D00]/20 hover:border-[#FF4D00]/40 hover:shadow-[0_0_35px_rgba(255,77,0,0.1)]">
      
      {/* High-tech ambient background label */}
      <div className="absolute right-0 top-0 text-[#FF4D00]/5 select-none font-mono text-[90px] font-black tracking-tighter leading-none translate-x-6 -translate-y-4 pointer-events-none uppercase">
        MATX
      </div>

      <div className="space-y-4">
        {/* Header Title with Custom Navigation Selector */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-4 gap-3">
          <div className="space-y-0.5 text-left">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-mono text-[#FF4D00] uppercase tracking-widest font-black">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse"></span>
              SUNDARAM QUANT LABORATORY
            </span>
            <h3 className="text-base font-display font-black uppercase text-white tracking-tight">
              Live Operations & Solver Sandbox
            </h3>
          </div>
          
          <div className="flex bg-black p-1 rounded-lg border border-white/10 gap-0.5 self-start md:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => setMode('crypto')}
              className={`px-2 py-1 text-[9px] font-mono rounded transition-all uppercase whitespace-nowrap cursor-pointer ${
                mode === 'crypto' ? 'bg-[#FF4D00] text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Hashes
            </button>
            <button
              onClick={() => setMode('aero')}
              className={`px-2 py-1 text-[9px] font-mono rounded transition-all uppercase whitespace-nowrap cursor-pointer ${
                mode === 'aero' ? 'bg-[#FF4D00] text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Aerodynamics
            </button>
            <button
              onClick={() => setMode('sharpe')}
              className={`px-2 py-1 text-[9px] font-mono rounded transition-all uppercase whitespace-nowrap cursor-pointer ${
                mode === 'sharpe' ? 'bg-[#FF4D00] text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Optimal Risk
            </button>
            <button
              onClick={() => setMode('fourier')}
              className={`px-2 py-1 text-[9px] font-mono rounded transition-all uppercase whitespace-nowrap cursor-pointer ${
                mode === 'fourier' ? 'bg-[#FF4D00] text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Waves
            </button>
          </div>
        </div>

        {/* Dynamic Console Screen Frame */}
        <div className="bg-black/95 rounded-xl p-4 border border-white/5 min-h-[220px] flex flex-col justify-between text-left">
          
          {/* A. Live Cryptographic Hashing Analyzer */}
          {mode === 'crypto' && (
            <div className="space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                    Real-Time Input String
                  </span>
                  <span className="text-[9px] font-mono text-neutral-600">
                    ALGORITHM: SHA-256 (SYNC)
                  </span>
                </div>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter custom analytics key to hash..."
                  className="w-full bg-[#07090c] text-white font-mono text-xs px-3 py-2.5 rounded border border-white/10 focus:outline-none focus:border-[#FF4D00] transition-colors"
                />
              </div>

              <div className="space-y-2 bg-[#0C0D11] p-3 rounded-lg border border-white/5 relative group/code select-all">
                <div className="flex items-center justify-between text-[8px] font-mono text-neutral-500 pb-1.5 border-b border-white/5">
                  <span>EXPANDED HEX DIGEST SUITE</span>
                  <span className="text-[#FF4D00]">COMPILED IN {hashingSpeedMs}ms</span>
                </div>
                <div className="text-xs font-mono text-neutral-200 tracking-wider break-all leading-relaxed font-semibold pt-1">
                  {hashResult || 'n/a'}
                </div>

                <button
                  onClick={copyHashToClipboard}
                  className="absolute right-2 top-2 p-1 rounded bg-black/60 border border-white/10 hover:border-white/30 text-[8px] font-mono font-bold text-neutral-400 hover:text-white uppercase transition-colors pointer-events-auto cursor-pointer"
                >
                  {isCopied ? 'COPIED!' : 'COPY HASH'}
                </button>
              </div>

              <div className="text-[9px] font-mono text-neutral-500 leading-normal flex items-center gap-1.5 uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                <span>Verify integrity checksum of critical multivariate capstone databases instantaneously.</span>
              </div>
            </div>
          )}

          {/* B. Aerodynamics Payload & Hover Air Displacement Simulator */}
          {mode === 'aero' && (
            <div className="space-y-4 flex-grow flex flex-col justify-between text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Sliders Container Column */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-neutral-400 uppercase tracking-wider font-semibold">CUSTOM PAYLOAD</span>
                      <span className="text-[#FF4D00] font-bold">{payload} grams</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1400"
                      step="25"
                      value={payload}
                      onChange={(e) => setPayload(parseInt(e.target.value))}
                      className="w-full accent-[#FF4D00] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span className="text-neutral-400 uppercase tracking-wider font-semibold">BATTERY CAPACITY</span>
                      <span className="text-neutral-300 font-bold">{batteryCapacity} mAh</span>
                    </div>
                    <input
                      type="range"
                      min="1200"
                      max="8500"
                      step="100"
                      value={batteryCapacity}
                      onChange={(e) => setBatteryCapacity(parseInt(e.target.value))}
                      className="w-full accent-white h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="flex gap-2">
                    <div className="flex-1 space-y-1">
                      <label className="text-[8px] text-neutral-500 uppercase tracking-widest font-black block">LIPO CELL VOLTAGE</label>
                      <select
                        value={voltageCells}
                        onChange={(e) => setVoltageCells(parseInt(e.target.value))}
                        className="bg-[#0c0d11] text-neutral-300 border border-white/10 font-mono text-[10px] w-full p-1.5 rounded uppercase focus:outline-none"
                      >
                        <option value={3}>3 Cells (11.1V)</option>
                        <option value={4}>4 Cells (14.8V)</option>
                        <option value={6}>6 Cells (22.2V)</option>
                      </select>
                    </div>

                    <div className="flex-1 space-y-1">
                      <label className="text-[8px] text-neutral-500 uppercase tracking-widest font-black block">PROP DIAMETER</label>
                      <select
                        value={propSize}
                        onChange={(e) => setPropSize(parseInt(e.target.value))}
                        className="bg-[#0c0d11] text-neutral-300 border border-white/10 font-mono text-[10px] w-full p-1.5 rounded uppercase focus:outline-none"
                      >
                        <option value={5}>5 Inch</option>
                        <option value={7}>7 Inch</option>
                        <option value={9}>9 Inch</option>
                        <option value={10}>10 Inch</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Computation Output Column */}
                <div className="bg-[#07090c] border border-white/5 rounded-xl p-3 flex flex-col justify-between space-y-2 relative">
                  
                  {/* Realtime Flight Odometer Estimator */}
                  <div className="text-center py-2 space-y-0.5 border-b border-white/5">
                    <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">
                      ESTIMATED HOVER DURATION
                    </span>
                    <span className="text-3xl font-display font-black text-white block">
                      {aero.flightMinutes} <span className="text-xs font-mono text-neutral-400">MINS</span>
                    </span>
                  </div>

                  {/* Operational Telemetrics Readout */}
                  <div className="grid grid-cols-2 gap-1.5 text-[9px] font-mono text-neutral-400">
                    <div>
                      TOTAL WT: <span className="text-white font-bold">{aero.totalWeight}g</span>
                    </div>
                    <div>
                      CURR DRAW: <span className="text-white font-bold">{aero.hoverCurrent}A</span>
                    </div>
                    <div>
                      HOVER PWR: <span className="text-white font-bold">{aero.hoverPower}W</span>
                    </div>
                    <div>
                      THR-WT RAT: <span className="text-white font-bold">{aero.thrustToWeightRatio}x</span>
                    </div>
                  </div>

                  {/* Warning overlay or Safe status stamp */}
                  {aero.warningMessage ? (
                    <div className="bg-red-500/10 border border-red-500/20 rounded p-1.5 text-center text-[8px] font-mono text-red-400 font-extrabold uppercase">
                      ⚠️ {aero.warningMessage}
                    </div>
                  ) : (
                    <div className="bg-green-500/10 border border-green-500/20 rounded p-1.5 text-center text-[8px] font-mono text-green-400 font-extrabold uppercase">
                      ✓ ENVELOPE OPERATIONAL: SAFE THRUST
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* C. Sharpe Risk Tolerance Investment Slate */}
          {mode === 'sharpe' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-neutral-400 uppercase tracking-wider font-bold">Risk Aperture Focus</span>
                <span className="text-[#FF4D00] font-bold select-none">{riskTolerance}% Standard</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(parseInt(e.target.value))}
                className="w-full accent-[#FF4D00] h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#0D0D0D] p-2 rounded border border-white/5">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase block tracking-wider">Expected Return</span>
                  <span className="text-base font-mono font-bold text-[#FF4D00]">+{expectedReturn}%</span>
                </div>
                <div className="bg-[#0D0D0D] p-2 rounded border border-white/5">
                  <span className="text-[8px] font-mono text-neutral-500 uppercase block tracking-wider">System Volatility</span>
                  <span className="text-base font-mono font-bold text-neutral-400">{systemRisk}% σ</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest block font-bold">Calculated Weight Allocations</span>
                <div className="flex gap-1.5">
                  {allocations.map((alloc, idx) => (
                    <div 
                      key={idx} 
                      className="flex-grow bg-[#151515] p-1.5 rounded text-center text-[9px] border border-white/5 hover:border-[#FF4D00]/20 transition-all"
                      style={{ flexBasis: `${alloc.weight}%` }}
                      title={`${alloc.asset}: ${alloc.weight}% Allocation`}
                    >
                      <span className="font-mono text-neutral-300 block truncate font-bold">{alloc.asset.split(' ')[0]}</span>
                      <span className="font-mono font-black text-[#FF4D00] text-[10px]">{alloc.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* D. Wave Harmonization Plotter */}
          {mode === 'fourier' && (
            <div className="space-y-3 flex-grow flex flex-col justify-between">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Period (Freq)</label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.5"
                    value={frequency}
                    onChange={(e) => setFrequency(parseFloat(e.target.value))}
                    className="w-full accent-[#FF4D00] h-1 bg-neutral-800 rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-wider block">Amplitude</label>
                  <input
                    type="range"
                    min="5"
                    max="35"
                    value={amplitude}
                    onChange={(e) => setAmplitude(parseInt(e.target.value))}
                    className="w-full accent-[#FF4D00] h-1 bg-neutral-800 rounded"
                  />
                </div>
              </div>

              {/* Wave plotting dynamic dashboard */}
              <div className="border border-white/10 rounded overflow-hidden bg-[#070707] h-24 p-1 relative flex items-center justify-center">
                <svg className="w-full h-full text-[#FF4D00] overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
                  <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                  <line x1="100" y1="0" x2="100" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="200" y1="0" x2="200" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="300" y1="0" x2="300" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  
                  <path
                    d={generateSineWavePath()}
                    fill="none"
                    stroke="#FF4D00"
                    strokeWidth="2.5"
                    className="transition-all duration-100 ease-out"
                  />
                </svg>
                
                <div className="absolute left-2 bottom-1 bg-black/60 px-1 py-0.5 rounded text-[8px] font-mono text-neutral-500">
                  F={frequency}Hz A={amplitude}px
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Primary actions footer bar */}
      <div className="mt-4 flex gap-2 pt-1 border-t border-white/5">
        {mode === 'crypto' ? (
          <button
            onClick={() => setInputText(`Secure Core Multi-Node Matrix #${Math.floor(1000 + Math.random() * 9000)}`)}
            className="flex-grow py-2.5 rounded bg-[#FF4D00]/10 hover:bg-[#FF4D00] hover:text-white border border-[#FF4D00]/25 text-[#FF4D00] font-mono font-bold text-[10px] tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 active:scale-97 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" /> Randomize Salt Key
          </button>
        ) : mode === 'aero' ? (
          <button
            onClick={() => {
              setPayload(Math.floor(Math.random() * 800));
              setBatteryCapacity(1500 + Math.floor(Math.random() * 6) * 1000);
              setVoltageCells(3 + Math.floor(Math.random() * 3) * 1);
            }}
            className="flex-grow py-2.5 rounded bg-[#FF4D00]/10 hover:bg-[#FF4D00] hover:text-white border border-[#FF4D00]/25 text-[#FF4D00] font-mono font-bold text-[10px] tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 active:scale-97 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" /> Randomize UAV Configs
          </button>
        ) : mode === 'sharpe' ? (
          <button
            onClick={() => setRiskTolerance(Math.floor(10 + Math.random() * 80))}
            className="flex-grow py-2.5 rounded bg-[#FF4D00]/10 hover:bg-[#FF4D00] hover:text-white border border-[#FF4D00]/25 text-[#FF4D00] font-mono font-bold text-[10px] tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 active:scale-97 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Randomize Markowitz Bounds
          </button>
        ) : (
          <button
            onClick={() => {
              setFrequency(1.5 + Math.random() * 4);
              setAmplitude(10 + Math.floor(Math.random() * 23));
            }}
            className="flex-grow py-2.5 rounded bg-[#FF4D00]/10 hover:bg-[#FF4D00] hover:text-white border border-[#FF4D00]/25 text-[#FF4D00] font-mono font-bold text-[10px] tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 active:scale-97 cursor-pointer"
          >
            <Cpu className="w-3.5 h-3.5" /> Synthesize Sound Wave
          </button>
        )}

        <button
          onClick={saveCurrentConfig}
          disabled={!user || isSaving}
          className={`px-3.5 rounded font-mono font-black text-[10px] tracking-wider uppercase transition-all flex items-center justify-center gap-1 active:scale-97 cursor-pointer border ${
            !user 
              ? 'bg-neutral-900/40 border-white/5 text-neutral-600 cursor-not-allowed'
              : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/25 hover:bg-cyan-500 hover:text-black hover:border-transparent hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]'
          }`}
          title={!user ? "Connect your Google Lab ID to save" : "Sync Current Sandbox to Cloud Firestore"}
        >
          <CloudUpload className="w-3.5 h-3.5" />
          {isSaving ? 'SYNCYING...' : 'CLOUD SYNC'}
        </button>
      </div>

      {/* Real-time Cloud Persistent Observations Console */}
      <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-[10px] font-mono text-cyan-400/90 uppercase tracking-widest font-black">
              LIVE FIRESTORE CLOUD REPOSITORY
            </span>
          </div>
          {user && (
            <span className="text-[8px] font-mono text-neutral-500">
              {savedConfigs.length} ACTIVE RECORD(S)
            </span>
          )}
        </div>

        {!user ? (
          <div className="bg-neutral-900/30 border border-white/5 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="space-y-0.5">
              <span className="text-[9px] font-mono font-black text-amber-500 block uppercase tracking-wider">
                🔒 CLOUDSYNC INACTIVE / ANONYMOUS MODE
              </span>
              <p className="text-[8px] font-mono text-neutral-500 max-w-sm uppercase leading-normal">
                Connect your Google Lab ID in the top menu to securely enable real-time Firestore database storage for all customized simulation bounds.
              </p>
            </div>
            <button
              onClick={() => {
                const navBtn = document.querySelector('[onClick="loginWithGoogle"]');
                if (navBtn instanceof HTMLButtonElement) {
                  navBtn.click();
                } else {
                  // Direct trigger if query selector doesn't check
                  import('../lib/firebase').then(f => f.loginWithGoogle());
                }
              }}
              className="px-3 py-1.5 rounded bg-amber-500/10 hover:bg-amber-500 hover:text-black border border-amber-500/30 text-amber-500 text-[8px] font-mono font-black tracking-wider uppercase transition-colors cursor-pointer"
            >
              AUTHENTICATE NOW
            </button>
          </div>
        ) : (
          <div className="space-y-2 text-xs">
            {savedConfigs.length === 0 ? (
              <div className="bg-neutral-900/10 border border-dashed border-white/5 rounded-xl py-5 text-center select-none">
                <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                  CLOUD STORAGE REGISTER EMPTY. CLICK "CLOUD SYNC" TO STORE CURRENT FORMULAE.
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto custom-scroll pr-1">
                {savedConfigs.map((config) => (
                  <div 
                    key={config.id}
                    className="flex items-center justify-between bg-black/40 border border-white/5 hover:border-cyan-500/20 rounded-lg p-2 transition-all text-left"
                  >
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <div className="flex items-center gap-1.5 text-[8px] font-mono">
                        <span className={`px-1 py-0.2 rounded text-[7px] font-black uppercase text-white ${
                          config.type === 'crypto' ? 'bg-amber-600/60' :
                          config.type === 'aero' ? 'bg-purple-600/60' :
                          config.type === 'sharpe' ? 'bg-emerald-600/60' : 'bg-blue-600/60'
                        }`}>
                          {config.type}
                        </span>
                        <span className="text-neutral-500 font-semibold">
                          {config.timestamp?.seconds 
                            ? new Date(config.timestamp.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                            : 'sending...'
                          }
                        </span>
                      </div>
                      <div className="text-[9.5px] font-mono text-neutral-300 truncate font-semibold">
                        {config.type === 'crypto' && `Key: "${config.data?.inputText}"`}
                        {config.type === 'aero' && `Wt: ${config.data?.payload + (config.data?.droneDryWeight || 550)}g | Lipo: ${config.data?.batteryCapacity}mAh`}
                        {config.type === 'sharpe' && `Yield Targets: ${config.data?.riskTolerance}%`}
                        {config.type === 'fourier' && `Wave Freq: ${config.data?.frequency}Hz`}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => applyConfig(config)}
                        className="py-1 px-1.5 rounded bg-cyan-400/10 hover:bg-cyan-400 hover:text-black border border-cyan-400/20 text-cyan-400 font-mono text-[7.5px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                        title="Load to Sandbox"
                      >
                        RECALL
                      </button>
                      <button
                        onClick={() => deleteConfig(config.id)}
                        className="p-1 rounded bg-red-400/10 hover:bg-red-500 hover:text-white border border-red-400/20 text-red-400 transition-all cursor-pointer"
                        title="Purge Record"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

