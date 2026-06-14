import { useWeddingConfig } from '../context/WeddingContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../hooks/useTranslation';

function getDday(dateStr: string): string {
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(dateStr); target.setHours(0,0,0,0);
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return 'D-Day';
  return diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`;
}

export default function WeddingInfo() {
  const { date, time, venue, design } = useWeddingConfig();
  const { ref, style } = useScrollAnimation(design.textEffect);
  const t = useTranslation();

  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const dday = getDday(date);

  return (
    <section
      ref={ref}
      className="py-16 px-8 border-t"
      style={{ background: 'var(--bg-color)', borderColor: 'color-mix(in srgb, var(--text-color) 8%, transparent)', ...style }}
    >
      <div className="flex flex-col items-center gap-2 mb-12">
        <p className="text-[10px] tracking-[0.45em] uppercase" style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.5 }}>Wedding Info</p>
        <h2 className="font-light tracking-widest" style={{ fontFamily: 'var(--wf-title)', color: 'var(--heading-color)', fontSize: 'var(--wf-heading-size)' }}>{t.sections.weddingInfo}</h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
          <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 mb-10">
        <p className="text-3xl font-light tracking-widest" style={{ fontFamily: 'var(--wf-title)', color: 'var(--text-color)' }}>
          {year}.{String(month).padStart(2,'0')}.{String(day).padStart(2,'0')}
        </p>
        <p className="text-sm tracking-wider" style={{ fontFamily: 'Georgia, serif', color: 'var(--sub-text-color)' }}>
          {t.weddingInfo.formatDate(year, month, day, d.getDay())} &nbsp;·&nbsp; {t.weddingInfo.formatTime(time)}
        </p>
        <div className="mt-1 px-4 py-1.5 rounded-full border"
          style={{ borderColor: 'color-mix(in srgb, var(--point-color) 50%, transparent)', background: 'color-mix(in srgb, var(--bg-color) 80%, white 20%)' }}>
          <span className="text-xs tracking-widest" style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)' }}>{dday}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-10 justify-center">
        <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.25 }} />
        <span style={{ color: 'var(--point-color)', opacity: 0.5, fontSize: 10 }}>✦</span>
        <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.25 }} />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-lg font-light tracking-widest" style={{ fontFamily: 'var(--wf-title)', color: 'var(--text-color)' }}>{venue.name}</p>
        <p className="text-sm tracking-wider" style={{ color: 'var(--sub-text-color)' }}>{venue.hall}</p>
        <div className="mt-2 flex items-center gap-2">
          <svg className="w-3 h-3 shrink-0" style={{ color: 'var(--sub-text-color)', opacity: 0.5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-xs" style={{ color: 'var(--sub-text-color)' }}>{venue.address}</p>
        </div>
      </div>
    </section>
  );
}
