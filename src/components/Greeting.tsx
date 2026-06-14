import { useWeddingConfig } from '../context/WeddingContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../hooks/useTranslation';

export default function Greeting() {
  const { groom, bride, greeting, design } = useWeddingConfig();
  const { ref, style } = useScrollAnimation(design.textEffect);
  const t = useTranslation();

  return (
    <section
      ref={ref}
      className="py-16 px-8 border-t"
      style={{ background: 'var(--bg-color)', borderColor: 'color-mix(in srgb, var(--text-color) 8%, transparent)', ...style }}
    >
      <div className="flex flex-col items-center gap-2 mb-10">
        <div className="flex items-center gap-2">
          <div className="h-px w-12" style={{ background: 'var(--point-color)', opacity: 0.3 }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
          <div className="h-px w-12" style={{ background: 'var(--point-color)', opacity: 0.3 }} />
        </div>
      </div>

      <p className="leading-9 text-center whitespace-pre-line mb-12"
        style={{ fontFamily: 'var(--wf-body)', color: 'var(--sub-text-color)', fontSize: 'var(--wf-body-size)' }}>
        {greeting}
      </p>

      <div className="flex items-center gap-3 mb-10 justify-center">
        <div className="h-px w-8" style={{ background: 'var(--point-color)', opacity: 0.25 }} />
        <span style={{ color: 'var(--point-color)', opacity: 0.5, fontSize: 12 }}>♡</span>
        <div className="h-px w-8" style={{ background: 'var(--point-color)', opacity: 0.25 }} />
      </div>

      <div className="flex flex-col items-center gap-5">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--sub-text-color)', opacity: 0.7 }}>{t.greeting.groomSide}</p>
          <p className="leading-7" style={{ fontFamily: 'var(--wf-title)', color: 'var(--sub-text-color)', fontSize: 'var(--wf-body-size)' }}>
            {t.greeting.formatGroomLineage(groom.fatherName, groom.motherName, groom.name)}
          </p>
        </div>
        <div className="w-px h-6" style={{ background: 'var(--point-color)', opacity: 0.15 }} />
        <div className="text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: 'var(--sub-text-color)', opacity: 0.7 }}>{t.greeting.brideSide}</p>
          <p className="leading-7" style={{ fontFamily: 'var(--wf-title)', color: 'var(--sub-text-color)', fontSize: 'var(--wf-body-size)' }}>
            {t.greeting.formatBrideLineage(bride.fatherName, bride.motherName, bride.name)}
          </p>
        </div>
      </div>
    </section>
  );
}
