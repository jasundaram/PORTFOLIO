import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function InteractiveConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let animationFrameId: number;

    const maxNodes = 65;
    const connectionRadius = 115;
    const mouseInfluenceRadius = 180;
    const gravityForce = 0.04;

    // Responsive Canvas dimensions via ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: boxWidth, height: boxHeight } = entry.contentRect;
        width = boxWidth;
        height = boxHeight;
        
        canvas.width = width;
        canvas.height = height;

        // Initialize particles inside the new layout bounds
        initNodes(boxWidth, boxHeight);
      }
    });

    resizeObserver.observe(container);

    const initNodes = (w: number, h: number) => {
      nodes = [];
      for (let i = 0; i < maxNodes; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 1,
        });
      }
    };

    // Tracking mouse positions relative to this canvas viewport
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Update Node parameters
      nodes.forEach((node) => {
        // Inertia movement
        node.x += node.vx;
        node.y += node.vy;

        // Boundary reflection
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Gentle attraction to cursor (applied data flow simulation)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseInfluenceRadius) {
            const force = (mouseInfluenceRadius - dist) / mouseInfluenceRadius;
            node.x += (dx / dist) * force * gravityForce * 4;
            node.y += (dy / dist) * force * gravityForce * 4;
          }
        }

        // Render point vertex
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 77, 0, 0.18)'; // Soft brand accent dot
        ctx.fill();
      });

      // Draw mathematical connection paths
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionRadius) {
            const alpha = (1 - dist / connectionRadius) * 0.085;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.45;
            ctx.stroke();
          }
        }

        // Draw direct lines to the cursor if interacting
        if (mouse.x !== null && mouse.y !== null) {
          const node = nodes[i];
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseInfluenceRadius) {
            const alpha = (1 - dist / mouseInfluenceRadius) * 0.12;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 77, 0, ${alpha})`; // Glowing active interactive tracer
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0"
    >
      <canvas 
        ref={canvasRef} 
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
}
