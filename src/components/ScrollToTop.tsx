import { useEffect, useState } from 'react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <button
      onClick={scrollUp}
      aria-label="맨 위로"
      className="fixed bottom-24 right-4 z-40 w-10 h-10 rounded-full bg-white border border-stone-200 shadow-md flex items-center justify-center hover:bg-stone-50 transition-all"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
      }}
    >
      <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
