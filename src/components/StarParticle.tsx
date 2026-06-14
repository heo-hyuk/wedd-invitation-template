import { useEffect, useRef } from 'react';

type Star = {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  twinkle: number; twinkleSpeed: number;
  opacity: number;
};

function createStar(width: number, height: number): Star {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25,
    size: 1 + Math.random() * 2.5,
    twinkle: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.025 + Math.random() * 0.04,
    opacity: 0.4 + Math.random() * 0.6,
  };
}

export default function StarParticle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const stars: Star[] = Array.from({ length: 30 }, () => createStar(canvas.width, canvas.height));
    let raf: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.twinkle += s.twinkleSpeed;
        if (s.x < -5) s.x = canvas.width + 5;
        if (s.x > canvas.width + 5) s.x = -5;
        if (s.y < -5) s.y = canvas.height + 5;
        if (s.y > canvas.height + 5) s.y = -5;

        const alpha = s.opacity * (0.4 + 0.6 * Math.abs(Math.sin(s.twinkle)));
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#fff8e1';
        ctx.shadowColor = '#ffd54f';
        ctx.shadowBlur = s.size * 5;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />;
}
