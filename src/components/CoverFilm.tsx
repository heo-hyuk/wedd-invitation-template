import { useWeddingConfig } from '../context/WeddingContext';
import { useTranslation } from '../hooks/useTranslation';

const FILM_HOLES = [0, 1, 2, 3, 4, 5, 6];

export default function CoverFilm() {
  const { groom, bride, date, time, venue } = useWeddingConfig();
  const t = useTranslation();
  const d = new Date(date);
  const year  = d.getFullYear();
  const month = d.toLocaleString('en', { month: 'short' }).toUpperCase();
  const day   = String(d.getDate()).padStart(2, '0');

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-color)' }}>

      {/* 그레인 오버레이 */}
      <div className="absolute inset-0 pointer-events-none z-0" style={{ opacity: 0.2 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="film-grain-f">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#film-grain-f)" />
        </svg>
      </div>

      {/* 필름 스트립 — 왼쪽 */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex flex-col items-center py-3"
        style={{ width: 28, background: 'var(--text-color)' }}>
        {FILM_HOLES.map(i => (
          <div key={i} className="rounded-sm"
            style={{
              width: 10, height: 14,
              background: 'var(--bg-color)',
              opacity: 0.85,
              marginTop: i === 0 ? 8 : 0,
              marginBottom: 8,
              flexShrink: 0,
            }} />
        ))}
      </div>

      {/* 필름 스트립 — 오른쪽 */}
      <div className="absolute right-0 top-0 bottom-0 z-10 flex flex-col items-center py-3"
        style={{ width: 28, background: 'var(--text-color)' }}>
        {FILM_HOLES.map(i => (
          <div key={i} className="rounded-sm"
            style={{
              width: 10, height: 14,
              background: 'var(--bg-color)',
              opacity: 0.85,
              marginTop: i === 0 ? 8 : 0,
              marginBottom: 8,
              flexShrink: 0,
            }} />
        ))}
      </div>

      {/* 상하 필름 바 */}
      <div className="absolute top-0 left-0 right-0 z-10" style={{ height: 6, background: 'var(--text-color)' }} />
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: 6, background: 'var(--text-color)' }} />

      {/* 메인 콘텐츠 */}
      <div className="relative z-20 flex flex-col items-center px-12"
        style={{ animation: 'fadeInUp 1.2s ease both' }}>

        <p className="text-[8px] tracking-[0.6em] uppercase mb-8"
          style={{ fontFamily: '"Courier New", monospace', color: 'var(--point-color)', opacity: 0.7 }}>
          ✦ WEDDING ✦
        </p>

        <p className="tracking-[0.15em] leading-none text-center mb-4"
          style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(24px, 5.5vw, var(--wf-title-size))', color: 'var(--heading-color)' }}>
          {groom.name}
        </p>

        <p className="text-sm my-2" style={{ color: 'var(--point-color)' }}>♡</p>

        <p className="tracking-[0.15em] leading-none text-center mb-12"
          style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(24px, 5.5vw, var(--wf-title-size))', color: 'var(--heading-color)' }}>
          {bride.name}
        </p>

        {/* 필름 스타일 날짜 */}
        <div className="flex items-baseline gap-2 mb-3" style={{ fontFamily: '"Courier New", monospace' }}>
          <span className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
            {day}
          </span>
          <span className="tracking-[0.3em]" style={{ color: 'var(--point-color)', opacity: 0.85, fontSize: 'var(--wf-cover-sub-size)' }}>
            {month}
          </span>
          <span className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-color)', opacity: 0.8 }}>
            {year}
          </span>
        </div>

        {/* 정보 바 */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-sm"
          style={{ background: 'var(--point-color)', opacity: 0.85 }}>
          <span className="tracking-widest uppercase"
            style={{ fontFamily: '"Courier New", monospace', color: 'var(--bg-color)', fontSize: 'var(--wf-cover-sub-size)' }}>
            {t.weddingInfo.formatTime(time)} · {venue.name}
          </span>
        </div>
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-10 flex flex-col items-center gap-1.5 z-20"
        style={{ animation: 'fadeInUp 1.8s ease both' }}>
        <p className="text-[9px] tracking-[0.4em] uppercase"
          style={{ fontFamily: '"Courier New", monospace', color: 'var(--sub-text-color)', opacity: 0.4 }}>scroll</p>
        <div style={{ animation: 'bounce 1.6s infinite' }}>
          <svg className="w-4 h-4" style={{ color: 'var(--point-color)', opacity: 0.5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(6px); } }
      `}</style>
    </div>
  );
}
