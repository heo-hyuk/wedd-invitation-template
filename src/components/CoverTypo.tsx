import { useWeddingConfig } from '../context/WeddingContext';
import { useTranslation } from '../hooks/useTranslation';

export default function CoverTypo() {
  const { groom, bride, date, time, venue, coverImage } = useWeddingConfig();
  const t = useTranslation();
  const d = new Date(date);
  const month = d.toLocaleString('en', { month: 'short' }).toUpperCase();
  const year  = d.getFullYear();
  const day   = String(d.getDate()).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 gap-0 overflow-hidden"
      style={{ background: 'var(--bg-color)' }}>

      <div className="flex flex-col items-center w-full max-w-xs" style={{ animation: 'fadeInUp 1.2s ease both' }}>
        <p className="text-[9px] tracking-[0.5em] uppercase mb-3"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--sub-text-color)', opacity: 0.8 }}>
          We Are Getting Married
        </p>

        <div className="flex items-center gap-2 mb-4">
          <div className="h-px w-8" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--point-color)', opacity: 0.6 }} />
          <div className="h-px w-8" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
        </div>

        <h1 className="text-center leading-tight mb-4"
          style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(20px, 6vw, var(--wf-title-size))', color: 'var(--heading-color)', letterSpacing: '0.12em' }}>
          {groom.name}<br />
          <span className="text-lg" style={{ color: 'var(--point-color)' }}>♡</span><br />
          {bride.name}
        </h1>

        {/* 중앙 사진 */}
        <div className="w-full overflow-hidden mb-4" style={{ aspectRatio: '4/3', maxHeight: 200 }}>
          {coverImage ? (
            <img src={coverImage} alt="cover" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: 'color-mix(in srgb, var(--bg-color) 60%, var(--point-color) 40%)' }}>
              <span className="text-2xl tracking-widest" style={{ fontFamily: 'Georgia, serif', color: 'var(--sub-text-color)', opacity: 0.6 }}>PHOTO</span>
            </div>
          )}
        </div>

        {/* 하단 날짜 */}
        <div className="text-center space-y-1">
          <p className="text-2xl tracking-[0.3em]" style={{ fontFamily: 'Georgia, serif', color: 'var(--text-color)' }}>
            {day} · {month} · {year}
          </p>
          <p className="tracking-widest" style={{ color: 'var(--sub-text-color)', fontSize: 'var(--wf-cover-sub-size)' }}>{t.weddingInfo.formatTime(time)} &nbsp;·&nbsp; {venue.name}</p>
        </div>
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-10 flex flex-col items-center gap-1.5"
        style={{ animation: 'fadeInUp 1.8s ease both' }}>
        <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'var(--sub-text-color)', opacity: 0.5 }}>scroll</p>
        <div style={{ animation: 'bounce 1.6s infinite' }}>
          <svg className="w-4 h-4" style={{ color: 'var(--point-color)', opacity: 0.4 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
