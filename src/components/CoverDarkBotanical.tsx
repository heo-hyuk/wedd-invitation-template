import { useWeddingConfig } from '../context/WeddingContext';
import { useTranslation } from '../hooks/useTranslation';

function CornerOrnament({ flip, mirror }: { flip?: boolean; mirror?: boolean }) {
  const sx = mirror ? -1 : 1;
  const sy = flip ? -1 : 1;
  return (
    <svg viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 90, height: 90, transform: `scale(${sx}, ${sy})` }}>
      <path d="M2 2 L44 2" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <path d="M2 2 L2 44" stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
      <circle cx="2" cy="2" r="1.5" fill="currentColor" opacity="0.9" />
      <path d="M2 28 Q18 10 30 16 Q20 24 2 28Z" fill="currentColor" opacity="0.45" />
      <path d="M2 44 Q22 26 34 34 Q22 40 2 44Z" fill="currentColor" opacity="0.38" />
      <path d="M18 2 Q14 22 24 30 Q28 20 18 2Z" fill="currentColor" opacity="0.38" />
      <path d="M36 2 Q28 18 36 28 Q42 18 36 2Z" fill="currentColor" opacity="0.32" />
      <circle cx="36" cy="34" r="4.5" fill="currentColor" opacity="0.25" />
      <ellipse cx="32" cy="31" rx="3.5" ry="5.5" transform="rotate(-25 32 31)" fill="currentColor" opacity="0.4" />
      <ellipse cx="40" cy="30" rx="3.5" ry="5.5" transform="rotate(20 40 30)" fill="currentColor" opacity="0.38" />
      <circle cx="36" cy="33" r="2" fill="currentColor" opacity="0.6" />
      <path d="M2 36 Q10 30 20 35" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M30 2 Q26 10 32 20" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
      <circle cx="14" cy="8" r="1" fill="currentColor" opacity="0.5" />
      <circle cx="8" cy="14" r="1" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

function CenterOrnament() {
  return (
    <svg viewBox="0 0 160 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 160, height: 24 }}>
      <path d="M0 12 L55 12" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <path d="M105 12 L160 12" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <circle cx="80" cy="12" r="3" fill="currentColor" opacity="0.6" />
      <ellipse cx="67" cy="12" rx="7" ry="3" transform="rotate(-10 67 12)" fill="currentColor" opacity="0.35" />
      <ellipse cx="93" cy="12" rx="7" ry="3" transform="rotate(10 93 12)" fill="currentColor" opacity="0.35" />
      <circle cx="58" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
      <circle cx="102" cy="12" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export default function CoverDarkBotanical() {
  const { groom, bride, date, time, venue } = useWeddingConfig();
  const t = useTranslation();
  const d = new Date(date);
  const dateStr = `${d.getFullYear()} · ${String(d.getMonth() + 1).padStart(2, '0')} · ${String(d.getDate()).padStart(2, '0')}`;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--bg-color)' }}>

      {/* 골드 테두리 프레임 */}
      <div className="absolute inset-5 rounded-sm pointer-events-none"
        style={{ border: '1px solid var(--point-color)', opacity: 0.3 }} />
      <div className="absolute inset-7 rounded-sm pointer-events-none"
        style={{ border: '0.5px solid var(--point-color)', opacity: 0.15 }} />

      {/* 코너 장식 */}
      <div className="absolute top-4 left-4 pointer-events-none" style={{ color: 'var(--point-color)' }}>
        <CornerOrnament />
      </div>
      <div className="absolute top-4 right-4 pointer-events-none" style={{ color: 'var(--point-color)' }}>
        <CornerOrnament mirror />
      </div>
      <div className="absolute bottom-4 left-4 pointer-events-none" style={{ color: 'var(--point-color)' }}>
        <CornerOrnament flip />
      </div>
      <div className="absolute bottom-4 right-4 pointer-events-none" style={{ color: 'var(--point-color)' }}>
        <CornerOrnament flip mirror />
      </div>

      {/* 중앙 콘텐츠 */}
      <div className="flex flex-col items-center px-16 z-10"
        style={{ animation: 'fadeInUp 1.2s ease both', color: 'var(--point-color)' }}>

        <p className="text-[9px] tracking-[0.6em] uppercase mb-8"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.65 }}>
          Wedding Invitation
        </p>

        <CenterOrnament />

        <div className="my-8 flex flex-col items-center gap-1">
          <p className="tracking-[0.18em] leading-none text-center"
            style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(24px, 5.5vw, var(--wf-title-size))', color: 'var(--heading-color)' }}>
            {groom.name}
          </p>
          <p className="text-base my-3" style={{ color: 'var(--point-color)' }}>♡</p>
          <p className="tracking-[0.18em] leading-none text-center"
            style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(24px, 5.5vw, var(--wf-title-size))', color: 'var(--heading-color)' }}>
            {bride.name}
          </p>
        </div>

        <CenterOrnament />

        <div className="mt-8 flex flex-col items-center gap-1.5">
          <p className="tracking-[0.35em]"
            style={{ fontFamily: 'Georgia, serif', color: 'var(--sub-text-color)', opacity: 0.8, fontSize: 'var(--wf-cover-sub-size)' }}>
            {dateStr}
          </p>
          <p className="tracking-widest" style={{ color: 'var(--sub-text-color)', opacity: 0.6, fontSize: 'var(--wf-cover-sub-size)' }}>
            {t.weddingInfo.formatTime(time)} &nbsp;·&nbsp; {venue.name}
          </p>
        </div>
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-8 flex flex-col items-center gap-1.5 z-10"
        style={{ animation: 'fadeInUp 1.8s ease both' }}>
        <p className="text-[9px] tracking-[0.4em] uppercase" style={{ color: 'var(--sub-text-color)', opacity: 0.4 }}>scroll</p>
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
