import { useWeddingConfig } from '../context/WeddingContext';
import { useTranslation } from '../hooks/useTranslation';

const LEAF = '#9ab88a';

function FloralDecor({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 390 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', display: 'block', opacity: 0.85, transform: flip ? 'scaleY(-1)' : undefined }}
    >
      {/* Main branch */}
      <path d="M0 95 Q80 65 160 72 Q240 78 310 52 Q350 38 390 42"
        stroke={LEAF} strokeWidth="1.1" opacity="0.45" />

      {/* Left eucalyptus */}
      <ellipse cx="28" cy="84" rx="13" ry="5.5" transform="rotate(-42 28 84)" fill={LEAF} opacity="0.38" />
      <ellipse cx="52" cy="73" rx="13" ry="5.5" transform="rotate(-25 52 73)" fill={LEAF} opacity="0.38" />
      <ellipse cx="14" cy="74" rx="11" ry="5" transform="rotate(-58 14 74)" fill={LEAF} opacity="0.32" />
      <ellipse cx="75" cy="65" rx="12" ry="5" transform="rotate(-12 75 65)" fill={LEAF} opacity="0.32" />

      {/* Left flower */}
      <circle cx="108" cy="52" r="17" fill="var(--point-color)" opacity="0.18" />
      <ellipse cx="100" cy="46" rx="10" ry="14" transform="rotate(-22 100 46)" fill="var(--point-color)" opacity="0.38" />
      <ellipse cx="116" cy="44" rx="10" ry="14" transform="rotate(18 116 44)" fill="var(--point-color)" opacity="0.35" />
      <ellipse cx="107" cy="56" rx="12" ry="8" fill="var(--point-color)" opacity="0.32" />
      <circle cx="108" cy="50" r="5.5" fill="var(--point-color)" opacity="0.52" />

      {/* Middle leaves */}
      <ellipse cx="168" cy="64" rx="14" ry="5.5" transform="rotate(-14 168 64)" fill={LEAF} opacity="0.36" />
      <ellipse cx="194" cy="57" rx="12" ry="5" transform="rotate(12 194 57)" fill={LEAF} opacity="0.32" />

      {/* Center large flower */}
      <circle cx="238" cy="40" r="20" fill="var(--point-color)" opacity="0.16" />
      <ellipse cx="228" cy="34" rx="12" ry="17" transform="rotate(-28 228 34)" fill="var(--point-color)" opacity="0.38" />
      <ellipse cx="248" cy="32" rx="12" ry="17" transform="rotate(22 248 32)" fill="var(--point-color)" opacity="0.36" />
      <ellipse cx="236" cy="50" rx="14" ry="9" fill="var(--point-color)" opacity="0.3" />
      <ellipse cx="228" cy="40" rx="8" ry="12" transform="rotate(-10 228 40)" fill="var(--point-color)" opacity="0.42" />
      <circle cx="238" cy="39" r="6.5" fill="var(--point-color)" opacity="0.5" />

      {/* Right eucalyptus */}
      <ellipse cx="298" cy="50" rx="13" ry="5.5" transform="rotate(28 298 50)" fill={LEAF} opacity="0.36" />
      <ellipse cx="322" cy="40" rx="13" ry="5.5" transform="rotate(17 322 40)" fill={LEAF} opacity="0.36" />
      <ellipse cx="347" cy="33" rx="12" ry="5" transform="rotate(7 347 33)" fill={LEAF} opacity="0.33" />
      <ellipse cx="370" cy="28" rx="11" ry="4.5" transform="rotate(-3 370 28)" fill={LEAF} opacity="0.3" />

      {/* Small right flower bud */}
      <circle cx="280" cy="58" r="9" fill="var(--point-color)" opacity="0.22" />
      <ellipse cx="276" cy="55" rx="6" ry="9" transform="rotate(-15 276 55)" fill="var(--point-color)" opacity="0.35" />
      <ellipse cx="284" cy="54" rx="6" ry="9" transform="rotate(12 284 54)" fill="var(--point-color)" opacity="0.32" />
      <circle cx="280" cy="56" r="3.5" fill="var(--point-color)" opacity="0.5" />
    </svg>
  );
}

export default function CoverWatercolor() {
  const { groom, bride, date, time, venue } = useWeddingConfig();
  const t = useTranslation();
  const d = new Date(date);
  const year = d.getFullYear();
  const day  = d.getDate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-color)' }}>
      {/* 상단 꽃 장식 */}
      <div style={{ animation: 'fadeIn 1.4s ease both', flexShrink: 0 }}>
        <FloralDecor />
      </div>

      {/* 중앙 콘텐츠 */}
      <div className="flex-1 flex flex-col items-center justify-center px-10 py-6"
        style={{ animation: 'fadeInUp 1.2s ease both' }}>
        <p className="text-[9px] tracking-[0.5em] uppercase mb-8"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.7 }}>
          Wedding Invitation
        </p>

        <p className="tracking-[0.18em] leading-none text-center mb-3"
          style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(24px, 5.5vw, var(--wf-title-size))', color: 'var(--heading-color)' }}>
          {groom.name}
        </p>

        <p className="text-base mb-3" style={{ color: 'var(--point-color)', opacity: 0.8 }}>♡</p>

        <p className="tracking-[0.18em] leading-none text-center mb-10"
          style={{ fontFamily: 'var(--wf-title)', fontSize: 'clamp(24px, 5.5vw, var(--wf-title-size))', color: 'var(--heading-color)' }}>
          {bride.name}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8" style={{ background: 'var(--point-color)', opacity: 0.3 }} />
          <p className="tracking-widest" style={{ fontFamily: 'Georgia, serif', color: 'var(--sub-text-color)', fontSize: 'var(--wf-cover-sub-size)' }}>
            {year}. {String(d.getMonth() + 1).padStart(2, '0')}. {String(day).padStart(2, '0')}
          </p>
          <div className="h-px w-8" style={{ background: 'var(--point-color)', opacity: 0.3 }} />
        </div>

        <p className="tracking-widest text-center" style={{ color: 'var(--sub-text-color)', opacity: 0.7, fontSize: 'var(--wf-cover-sub-size)' }}>
          {t.weddingInfo.formatTime(time)} · {venue.name}
        </p>
      </div>

      {/* 하단 꽃 장식 */}
      <div style={{ animation: 'fadeIn 1.4s ease both', flexShrink: 0 }}>
        <FloralDecor flip />
      </div>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
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
        @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
        @keyframes bounce    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(6px); } }
      `}</style>
    </div>
  );
}
