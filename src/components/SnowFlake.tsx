import { useEffect, useRef } from 'react';

type Flake = { x: number; y: number; vx: number; vy: number; size: number; opacity: number; phase: number; rotation: number };

function create(width: number): Flake {
  return { x: Math.random() * width, y: -20 - Math.random() * 100, vx: (Math.random() - 0.5) * 0.8, vy: 0.4 + Math.random() * 0.9, size: 3 + Math.random() * 7, opacity: 0.5 + Math.random() * 0.5, phase: Math.random() * Math.PI * 2, rotation: Math.random() * Math.PI * 2 };
}

function drawHexagon(ctx: CanvasRenderingContext2D, f: Flake) {
  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(f.rotation);
  ctx.globalAlpha = f.opacity;
  ctx.strokeStyle = '#e8f4fd';
  ctx.lineWidth = f.size * 0.15;
  // 6 arms
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(angle) * f.size, Math.sin(angle) * f.size);
    ctx.stroke();
    // small branches
    const mx = Math.cos(angle) * f.size * 0.5;
    const my = Math.sin(angle) * f.size * 0.5;
    const bLen = f.size * 0.28;
    const ba = angle + Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(mx - Math.cos(ba) * bLen, my - Math.sin(ba) * bLen);
    ctx.lineTo(mx + Math.cos(ba) * bLen, my + Math.sin(ba) * bLen);
    ctx.stroke();
  }
  ctx.restore();
}

export default function SnowFlake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const flakes = Array.from({ length: 25 }, () => create(canvas.width));
    let frame = 0, raf: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      for (const f of flakes) {
        f.x += f.vx + Math.sin(frame * 0.015 + f.phase) * 0.4; f.y += f.vy; f.rotation += 0.008;
        if (f.y > canvas.height + 20) Object.assign(f, { ...create(canvas.width), y: -20 });
        drawHexagon(ctx, f);
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}
