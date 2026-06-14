import { useWeddingConfig } from '../context/WeddingContext';
import { useTranslation } from '../hooks/useTranslation';

export default function CoverMinimal() {
  const { groom, bride, date, time, venue } = useWeddingConfig();
  const t = useTranslation();
  const d = new Date(date);
  const dateStr = `${d.getFullYear()} · ${String(d.getMonth() + 1).padStart(2, '0')} · ${String(d.getDate()).padStart(2, '0')}`;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center"
      style={{ background: 'var(--bg-color)' }}>

      {/* 상단 이중 라인 */}
      <div className="absolute top-[10%] inset-x-10 flex flex-col gap-1.5">
        <div className="h-px" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
        <div className="h-px" style={{ background: 'var(--point-color)', opacity: 0.15 }} />
      </div>

      {/* 중앙 콘텐츠 */}
      <div className="flex flex-col items-center px-14" style={{ animation: 'fadeInUp 1.2s ease both' }}>
        <p className="text-[9px] tracking-[0.6em] uppercase mb-14"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.75 }}>
          Wedding Invitation
        </p>

        <p className="tracking-[0.15em] leading-none text-center"
          style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(26px, 6vw, var(--wf-title-size))', color: 'var(--heading-color)' }}>
          {groom.name}
        </p>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.4 }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--point-color)' }} />
          <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.4 }} />
        </div>

        <p className="tracking-[0.15em] leading-none text-center"
          style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(26px, 6vw, var(--wf-title-size))', color: 'var(--heading-color)' }}>
          {bride.name}
        </p>

        <div className="mt-14 flex flex-col items-center gap-1.5">
          <p className="tracking-[0.35em]"
            style={{ fontFamily: 'Georgia, serif', color: 'var(--sub-text-color)', opacity: 0.8, fontSize: 'var(--wf-cover-sub-size)' }}>
            {dateStr}
          </p>
          <p className="tracking-widest" style={{ color: 'var(--sub-text-color)', opacity: 0.6, fontSize: 'var(--wf-cover-sub-size)' }}>
            {t.weddingInfo.formatTime(time)} &nbsp;·&nbsp; {venue.name}
          </p>
        </div>
      </div>

      {/* 하단 이중 라인 */}
      <div className="absolute bottom-[10%] inset-x-10 flex flex-col gap-1.5">
        <div className="h-px" style={{ background: 'var(--point-color)', opacity: 0.15 }} />
        <div className="h-px" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-6 flex flex-col items-center gap-1.5"
        style={{ animation: 'fadeInUp 1.8s ease both' }}>
        <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'var(--sub-text-color)', opacity: 0.4 }}>scroll</p>
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
