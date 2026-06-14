import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { TextEffect } from '../types/wedding';

type AnimState = 'hidden' | 'visible';

function getStyle(effect: TextEffect, state: AnimState): CSSProperties {
  if (effect === 'none' || state === 'visible') {
    switch (effect) {
      case 'fadeUp':  return { opacity: 1, transform: 'translateY(0)',  transition: 'opacity 0.7s ease-out, transform 0.7s ease-out' };
      case 'fadeIn':  return { opacity: 1,                              transition: 'opacity 0.7s ease-out' };
      case 'zoomIn':  return { opacity: 1, transform: 'scale(1)',       transition: 'opacity 0.7s ease-out, transform 0.7s ease-out' };
      case 'typing':  return { opacity: 1, transform: 'translateX(0)',  transition: 'opacity 0.5s ease-out, transform 0.5s ease-out' };
      default:        return {};
    }
  }
  switch (effect) {
    case 'fadeUp':  return { opacity: 0, transform: 'translateY(40px)' };
    case 'fadeIn':  return { opacity: 0 };
    case 'zoomIn':  return { opacity: 0, transform: 'scale(0.85)' };
    case 'typing':  return { opacity: 0, transform: 'translateX(-12px)' };
    default:        return {};
  }
}

export function useScrollAnimation(effect: TextEffect = 'fadeUp') {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<AnimState>(effect === 'none' ? 'visible' : 'hidden');

  useEffect(() => {
    if (effect === 'none') { setState('visible'); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setState('visible'); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [effect]);

  return { ref, style: getStyle(effect, state) };
}
