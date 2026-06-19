import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Play, RotateCcw, AlertTriangle, ArrowDown, HelpCircle, Flame } from 'lucide-react';

interface PhysicsTag {
  id: string;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  color: string;
}

const SKILL_KEYWORDS = [
  { text: 'Python (Core)', color: '#4584B6' },
  { text: 'SQL', color: '#0064a5' },
  { text: 'Microsoft Power BI', color: '#f2c811' },
  { text: 'Advanced DAX', color: '#FF4D00' },
  { text: 'Statistical EDA', color: '#10b981' },
  { text: 'Numerical Analysis', color: '#a855f7' },
  { text: 'Applied Cryptography', color: '#06b6d4' },
  { text: 'Number Theory', color: '#ec4899' },
  { text: 'Data Modeling', color: '#3b82f6' },
  { text: 'Advanced Excel', color: '#107c41' },
  { text: 'Aerodynamics', color: '#f97316' },
  { text: 'AI Analytics', color: '#6366f1' },
  { text: 'Probability & Stats', color: '#84cc16' }
];

export default function PhysicsSandbox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gravityEnabled, setGravityEnabled] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [activeInstruction, setActiveInstruction] = useState('DRAG TO TOSS DATA PATHS');

  // Interactive mouse state tracking refs
  const mouseRef = useRef<{ x: number; y: number; isDown: boolean }>({ x: 0, y: 0, isDown: false });
  const selectedTagRef = useRef<PhysicsTag | null>(null);
  const grabOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Hold state array internally via ref so the loop has access to changes on-the-fly
  const tagsRef = useRef<PhysicsTag[]>([]);

  // Measurement helpers
  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = getCanvasContext();
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animId: number;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        canvas.width = width;
        canvas.height = height;

        // Initialize particles if they haven't been loaded yet or after a resizing
        if (tagsRef.current.length === 0) {
          initializeTags(width, height);
        } else {
          // Wrap particles back inside bounding boxes
          tagsRef.current.forEach(tag => {
            if (tag.x + tag.width > width) tag.x = width - tag.width - 15;
            if (tag.y + tag.height > height) tag.y = height - tag.height - 15;
          });
        }
      }
    });

    resizeObserver.observe(container);

    // Dynamic measurement logic that pre-renders nodes to find accurate canvas dimensions
    const initializeTags = (w: number, h: number) => {
      ctx.font = 'bold 11px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
      
      const newTags: PhysicsTag[] = SKILL_KEYWORDS.map((item, index) => {
        const textMetrics = ctx.measureText(item.text.toUpperCase());
        const tagWidth = textMetrics.width + 24; // Padding
        const tagHeight = 26; // High standard layout height
        
        // Random layout positions spread nicely across the top third
        const colLength = Math.ceil(Math.sqrt(SKILL_KEYWORDS.length));
        const rowIdx = Math.floor(index / colLength);
        const colIdx = index % colLength;

        const posX = 40 + colIdx * (w / colLength) + Math.random() * 20;
        const posY = 30 + rowIdx * 45 + Math.random() * 15;

        return {
          id: `tag-${index}`,
          text: item.text,
          x: posX,
          y: posY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 0.5,
          width: tagWidth,
          height: tagHeight,
          color: item.color,
        };
      });

      tagsRef.current = newTags;
    };

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Set up mouse events relative to canvas space bounds
  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    mouseRef.current = { x, y, isDown: true };

    // Check if user clicked inside any tag pill outline boundary
    const hitTag = tagsRef.current.find((tag) => {
      return (
        x >= tag.x &&
        x <= tag.x + tag.width &&
        y >= tag.y &&
        y <= tag.y + tag.height
      );
    });

    if (hitTag) {
      selectedTagRef.current = hitTag;
      grabOffsetRef.current = {
        x: x - hitTag.x,
        y: y - hitTag.y,
      };
      setActiveInstruction(`DRAGGING: "${hitTag.text.toUpperCase()}"`);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(e);
    mouseRef.current.x = x;
    mouseRef.current.y = y;

    if (mouseRef.current.isDown && selectedTagRef.current) {
      const tag = selectedTagRef.current;
      tag.x = x - grabOffsetRef.current.x;
      tag.y = y - grabOffsetRef.current.y;
      
      // Calculate instantaneous dragging speed so they fly when thrown!
      tag.vx = (x - mouseRef.current.x) * 0.25;
      tag.vy = (y - mouseRef.current.y) * 0.25;
    }
  };

  const handleMouseUp = () => {
    mouseRef.current.isDown = false;
    selectedTagRef.current = null;
    setActiveInstruction('DRAG TO TOSS DATA PATHS');
  };

  // Main high-frequency physics cycle
  useEffect(() => {
    let animId: number;
    
    const gravity = 0.22; // Gravity force
    const bounce = 0.55;  // Core bounciness restitution
    const airDrag = 0.985; // Air friction resistance

    const updatePhysics = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(updatePhysics);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animId = requestAnimationFrame(updatePhysics);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Loop over and calculate individual trajectories
      const tags = tagsRef.current;
      
      for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];

        // Only compute gravity/drag of non-selected element
        if (tag !== selectedTagRef.current) {
          // Apply gravity velocity
          if (gravityEnabled) {
            tag.vy += gravity;
          }

          // Apply natural air resistance
          tag.vx *= airDrag;
          tag.vy *= airDrag;

          // Propagate calculations
          tag.x += tag.vx;
          tag.y += tag.vy;

          // Boundary constraints (reflect on hitting bottom, walls, or top)
          if (tag.y + tag.height > h) {
            tag.y = h - tag.height;
            tag.vy = -tag.vy * bounce;
            // Friction on hitting the floor
            tag.vx *= 0.85;
          }
          if (tag.y < 0) {
            tag.y = 0;
            tag.vy = -tag.vy * bounce;
          }
          if (tag.x + tag.width > w) {
            tag.x = w - tag.width;
            tag.vx = -tag.vx * bounce;
          }
          if (tag.x < 0) {
            tag.x = 0;
            tag.vx = -tag.vx * bounce;
          }
        } else {
          // If selected, follow mouse drag speed dynamically
          const mouse = mouseRef.current;
          tag.vx = (mouse.x - grabOffsetRef.current.x - tag.x) * 0.28;
          tag.vy = (mouse.y - grabOffsetRef.current.y - tag.y) * 0.28;
          tag.x += tag.vx;
          tag.y += tag.vy;
        }

        // Apply Tag-to-Tag elastic collisions
        for (let j = i + 1; j < tags.length; j++) {
          const o = tags[j];

          // Compute overlapping dimensions
          const intersectX = Math.max(0, Math.min(tag.x + tag.width, o.x + o.width) - Math.max(tag.x, o.x));
          const intersectY = Math.max(0, Math.min(tag.y + tag.height, o.y + o.height) - Math.max(tag.y, o.y));

          // If there is collision overlapping on both horizontal & vertical axes
          if (intersectX > 0 && intersectY > 0) {
            // Push tags apart slightly to fix overlaps
            if (intersectX < intersectY) {
              const pushX = intersectX / 2;
              if (tag.x < o.x) {
                tag.x -= pushX;
                o.x += pushX;
              } else {
                tag.x += pushX;
                o.x -= pushX;
              }
              // Swap X elastic speeds
              const tempVx = tag.vx;
              tag.vx = o.vx * bounce;
              o.vx = tempVx * bounce;
            } else {
              const pushY = intersectY / 2;
              if (tag.y < o.y) {
                tag.y -= pushY;
                o.y += pushY;
              } else {
                tag.y += pushY;
                o.y -= pushY;
              }
              // Swap Y elastic speeds
              const tempVy = tag.vy;
              tag.vy = o.vy * bounce;
              o.vy = tempVy * bounce;
            }
          }
        }

        // Beautiful pixel rendering for standard tag elements inside the flat canvas
        ctx.save();
        ctx.translate(tag.x + tag.width/2, tag.y + tag.height/2);

        // Add a micro wobble if dragging or moving super fast
        const velocityMagnitude = Math.hypot(tag.vx, tag.vy);
        const wobble = Math.min(velocityMagnitude * 0.008, 0.05);

        // Render sleek rounded pill design template with dual border outline glows
        ctx.beginPath();
        const r = 4; // Capsule roundedness degree
        const tw = tag.width;
        const th = tag.height;

        ctx.beginPath();
        ctx.roundRect(-tw / 2, -th / 2, tw, th, r);
        ctx.closePath();

        // Semi-transparent deep fill card body background
        ctx.fillStyle = 'rgba(10, 12, 18, 0.88)';
        ctx.fill();

        // Set glow strokes using the tag properties
        ctx.strokeStyle = tag === selectedTagRef.current 
          ? '#FF4D00' 
          : 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = tag === selectedTagRef.current ? 1.5 : 0.85;
        ctx.stroke();

        // Aesthetic branding indicator (left tiny bullet indicator on each tag)
        ctx.beginPath();
        ctx.arc(-tw / 2 + 10, 0, 3, 0, Math.PI * 2);
        ctx.fillStyle = tag.color;
        ctx.fill();

        // Text writing layout configs
        ctx.font = 'bold 10px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(tag.text.toUpperCase(), -tw / 2 + 18, 0.5);

        // Draw visual connecting vector indicators in debugMode
        if (debugMode) {
          ctx.strokeStyle = 'rgba(255, 77, 0, 0.35)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(tag.vx * 15, tag.vy * 15);
          ctx.stroke();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(updatePhysics);
    };

    updatePhysics();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [gravityEnabled, debugMode]);

  // Scatter/Explosion trigger that shoots skills all over the container
  const handleScatterExplosion = () => {
    tagsRef.current.forEach((tag) => {
      tag.vx = (Math.random() - 0.5) * 16;
      tag.vy = -Math.random() * 14 - 4;
    });
    setActiveInstruction('SYSTEM ENGINE SCATTERED!');
  };

  const handleReset = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;

    tagsRef.current.forEach((tag, index) => {
      const colLength = Math.ceil(Math.sqrt(SKILL_KEYWORDS.length));
      const rowIdx = Math.floor(index / colLength);
      const colIdx = index % colLength;

      tag.x = 40 + colIdx * (w / colLength);
      tag.y = 30 + rowIdx * 45;
      tag.vx = (Math.random() - 0.5) * 1;
      tag.vy = 0;
    });
    setActiveInstruction('RE-ALIGNED TO INITIAL STATE');
  };

  return (
    <div className="bg-neutral-900/40 border border-white/5 rounded-2xl overflow-hidden font-mono text-xs flex flex-col h-[420px] relative backdrop-blur-md">
      
      {/* Top Controller dashboard header bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-3 border-b border-white/5 bg-black/60 gap-3 z-10 select-none">
        
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-ping" />
          <span className="text-[10px] tracking-widest font-black uppercase text-white/90">
            QUANT SKILLS SANDBOX (COLLISION SOLVER)
          </span>
        </div>

        {/* Floating actions menu */}
        <div className="flex flex-wrap items-center gap-2">
          
          <button
            onClick={() => setGravityEnabled(!gravityEnabled)}
            className={`px-3 py-1 rounded border text-[9px] font-black tracking-wider uppercase transition-colors pointer-events-auto cursor-pointer ${
              gravityEnabled 
                ? 'bg-transparent border-white/10 text-neutral-400 hover:text-white' 
                : 'bg-[#FF4D00]/10 border-[#FF4D00]/30 text-[#FF4D00] hover:bg-[#FF4D00] hover:text-black'
            }`}
          >
            {gravityEnabled ? '🪐 GRAVITY: ON' : '🛸 ZERO-G ORBIT: ON'}
          </button>

          <button
            onClick={handleScatterExplosion}
            className="px-2.5 py-1 rounded bg-[#FF4D00] text-white hover:bg-white hover:text-black text-[9px] font-black tracking-wider uppercase transition-all flex items-center gap-1 cursor-pointer"
            title="Inject velocity vector scatter"
          >
            <Flame className="w-3 h-3 text-current" /> EXPLODE
          </button>

          <button
            onClick={() => setDebugMode(!debugMode)}
            className={`px-2 py-1 rounded border text-[9px] uppercase font-black transition-colors cursor-pointer ${
              debugMode
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'border-white/10 text-neutral-500 hover:text-white'
            }`}
          >
            VECTORS
          </button>

          <button
            onClick={handleReset}
            className="p-1 px-2 rounded border border-white/10 text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Reset sandbox"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Physics Interactive Stage */}
      <div 
        ref={containerRef} 
        className="flex-1 w-full relative overflow-hidden bg-[#07090d]/40"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="absolute inset-0 block w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Ambient bottom instructions text overlay */}
        <div className="absolute bottom-3 left-4 right-4 pointer-events-none flex items-center justify-between text-[9px] text-neutral-500 font-bold tracking-widest uppercase">
          <span>{activeInstruction}</span>
          <span className="hidden sm:inline">VELOCITY SOLVER: SWIFT-COLLIDE-v3</span>
        </div>
      </div>

      {/* Footer statistics readout panel */}
      <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5 bg-black/40 text-[9px] text-neutral-500 tracking-wider font-semibold py-1.5 select-none text-center">
        <div>
          ELASTICITY: <span className="text-white font-mono">0.55e</span>
        </div>
        <div>
          MASS DETECTOR: <span className="text-white font-mono">VARIABLE PILL</span>
        </div>
        <div>
          BOUNDS MODE: <span className="text-[#FF4D00] font-mono">CLAMP-REFLECT</span>
        </div>
      </div>

    </div>
  );
}
