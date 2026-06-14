import { useEffect, useRef } from 'react';

type Petal = { x: number; y: number; vx: number; vy: number; angle: number; vAngle: number; size: number; opacity: number; phase: number };

function create(width: number): Petal {
  return { x: Math.random() * width, y: -20 - Math.random() * 100, vx: (Math.random() - 0.5) * 1.4, vy: 0.7 + Math.random() * 1.4, angle: Math.random() * Math.PI * 2, vAngle: (Math.random() - 0.5) * 0.05, size: 4 + Math.random() * 8, opacity: 0.5 + Math.random() * 0.45, phase: Math.random() * Math.PI * 2 };
}

function draw(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.angle);
  ctx.globalAlpha = p.opacity;
  ctx.beginPath();
  ctx.fillStyle = '#e8314a';
  ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = '#f06080';
  ctx.ellipse(0, -p.size * 0.3, p.size * 0.25, p.size * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default function RosePetal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const petals = Array.from({ length: 22 }, () => create(canvas.width));
    let frame = 0, raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      for (const p of petals) {
        p.x += p.vx + Math.sin(frame * 0.02 + p.phase) * 0.7; p.y += p.vy; p.angle += p.vAngle;
        if (p.y > canvas.height + 20) Object.assign(p, { ...create(canvas.width), y: -20 });
        draw(ctx, p);
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}
