import { useWeddingConfig } from '../context/WeddingContext';
import { useTranslation } from '../hooks/useTranslation';

export default function CoverPolaroid() {
  const { groom, bride, date, time, venue, coverImage } = useWeddingConfig();
  const t = useTranslation();
  const d = new Date(date);
  const dateStr = `${d.getFullYear()}. ${String(d.getMonth() + 1).padStart(2, '0')}. ${String(d.getDate()).padStart(2, '0')}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8"
      style={{ background: 'var(--bg-color)' }}>
      <div style={{ animation: 'fadeInUp 1.2s ease both' }}
        className="flex flex-col items-center gap-6 w-full max-w-xs">

        <p className="text-[10px] tracking-[0.45em] uppercase"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.65 }}>
          Wedding Invitation
        </p>

        {/* 폴라로이드 카드 */}
        <div className="w-full shadow-[0_8px_40px_rgba(0,0,0,0.12)] rounded-sm"
          style={{ padding: '12px 12px 20px', background: 'color-mix(in srgb, var(--bg-color) 20%, white 80%)' }}>
          {/* 사진 영역 */}
          <div className="w-full overflow-hidden" style={{ aspectRatio: '3/4', maxHeight: 280 }}>
            {coverImage ? (
              <img src={coverImage} alt="cover" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center"
                style={{ background: 'color-mix(in srgb, var(--bg-color) 60%, var(--point-color) 40%)' }}>
                <span style={{ color: 'var(--point-color)', opacity: 0.5, fontSize: 32 }}>♡</span>
              </div>
            )}
          </div>
          {/* 하단 텍스트 */}
          <div className="pt-4 pb-1 text-center space-y-1.5">
            <p className="tracking-widest"
              style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(22px, 5vw, var(--wf-title-size))', color: 'var(--heading-color)' }}>
              {groom.name} &nbsp;♡&nbsp; {bride.name}
            </p>
            <p className="tracking-widest" style={{ fontFamily: 'Georgia, serif', color: 'var(--sub-text-color)', fontSize: 'var(--wf-cover-sub-size)' }}>
              {dateStr}
            </p>
            <p className="tracking-wide" style={{ color: 'var(--sub-text-color)', opacity: 0.7, fontSize: 'var(--wf-cover-sub-size)' }}>{venue.name}</p>
          </div>
        </div>

        <div className="tracking-widest uppercase" style={{ color: 'var(--sub-text-color)', opacity: 0.7, fontSize: 'var(--wf-cover-sub-size)' }}>{t.weddingInfo.formatTime(time)}</div>
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
