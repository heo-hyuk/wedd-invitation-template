import { useWeddingConfig } from '../context/WeddingContext';
import { useTranslation } from '../hooks/useTranslation';

export default function CoverFullscreen() {
  const { groom, bride, date, time, venue, coverImage } = useWeddingConfig();
  const t = useTranslation();
  const d = new Date(date);
  const dateStr = t.weddingInfo.formatShortDate(d.getFullYear(), d.getMonth() + 1, d.getDate());

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 풀스크린 배경 */}
      {coverImage ? (
        <img src={coverImage} alt="cover" className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, var(--point-color) 0%, color-mix(in srgb, var(--point-color) 60%, var(--text-color) 40%) 50%, var(--text-color) 100%)' }} />
      )}
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 글래스모피즘 카드 */}
      <div className="relative z-10 w-full max-w-xs mx-auto px-4" style={{ animation: 'fadeInUp 1.2s ease both' }}>
        <div className="rounded-2xl px-8 py-8 text-center"
          style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.3)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}>
          <p className="text-[9px] tracking-[0.5em] text-white/70 uppercase mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Wedding Invitation
          </p>
          <div className="flex items-center gap-2 justify-center mb-4">
            <div className="h-px w-8 bg-white/40" />
            <div className="w-1 h-1 rounded-full bg-white/50" />
            <div className="h-px w-8 bg-white/40" />
          </div>
          <p className="text-white font-light tracking-widest mb-1"
            style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(22px, 5vw, var(--wf-title-size))' }}>
            {groom.name}
          </p>
          <p className="text-lg mb-1" style={{ color: 'var(--point-color)' }}>♡</p>
          <p className="text-white font-light tracking-widest mb-5"
            style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(22px, 5vw, var(--wf-title-size))' }}>
            {bride.name}
          </p>
          <div className="flex items-center gap-2 justify-center mb-4">
            <div className="h-px w-8 bg-white/40" />
            <div className="w-1 h-1 rounded-full bg-white/50" />
            <div className="h-px w-8 bg-white/40" />
          </div>
          <p className="text-white/80 tracking-widest" style={{ fontFamily: 'Georgia, serif', fontSize: 'var(--wf-cover-sub-size)' }}>{dateStr}</p>
          <p className="text-white/60 tracking-wide mt-1" style={{ fontSize: 'var(--wf-cover-sub-size)' }}>{t.weddingInfo.formatTime(time)} &nbsp;·&nbsp; {venue.name}</p>
        </div>
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-8 flex flex-col items-center gap-1.5 z-10"
        style={{ animation: 'fadeInUp 1.8s ease both' }}>
        <p className="text-[9px] tracking-[0.4em] text-white/60 uppercase">scroll</p>
        <div style={{ animation: 'bounce 1.6s infinite' }}>
          <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
