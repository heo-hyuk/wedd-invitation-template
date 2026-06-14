import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; size: number; opacity: number; phase: number; phaseSpeed: number; color: string };

const COLORS = ['#ffd700', '#ffe566', '#fff0a0', '#c0c0c0', '#e8e8e8', '#ffc0cb'];

function create(width: number, height: number): Particle {
  return { x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, size: 1 + Math.random() * 3, opacity: 0.3 + Math.random() * 0.7, phase: Math.random() * Math.PI * 2, phaseSpeed: 0.04 + Math.random() * 0.06, color: COLORS[Math.floor(Math.random() * COLORS.length)] };
}

export default function Glitter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const particles = Array.from({ length: 60 }, () => create(canvas.width, canvas.height));
    let raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.phase += p.phaseSpeed;
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;
        const alpha = p.opacity * (0.3 + 0.7 * Math.abs(Math.sin(p.phase)));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 4;
        // diamond shape
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}
