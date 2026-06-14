import { useState } from 'react';
import { useWeddingConfig } from '../context/WeddingContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../hooks/useTranslation';

export default function Contact() {
  const { contacts, design } = useWeddingConfig();
  const { ref, style } = useScrollAnimation(design.textEffect);
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<'신랑' | '신부'>('신랑');

  const filtered = contacts.filter(c => c.side === activeTab);

  return (
    <section
      ref={ref}
      className="py-16 px-8 border-t"
      style={{ background: 'var(--bg-color)', borderColor: 'color-mix(in srgb, var(--text-color) 8%, transparent)', ...style }}
    >
      <div className="flex flex-col items-center gap-2 mb-10">
        <p className="text-[10px] tracking-[0.45em] uppercase" style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.5 }}>Contact</p>
        <h2 className="font-light tracking-widest" style={{ fontFamily: 'var(--wf-title)', color: 'var(--heading-color)', fontSize: 'var(--wf-heading-size)' }}>{t.sections.contact}</h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
          <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
        </div>
      </div>

      <div className="flex rounded-full border overflow-hidden mb-8"
        style={{ borderColor: 'color-mix(in srgb, var(--text-color) 15%, transparent)', background: 'color-mix(in srgb, var(--bg-color) 80%, white 20%)' }}>
        {(['신랑', '신부'] as const).map(side => (
          <button key={side} onClick={() => setActiveTab(side)}
            className="flex-1 py-2.5 text-sm tracking-wider transition-colors"
            style={{
              fontFamily: 'var(--wf-title)',
              background: activeTab === side ? 'var(--text-color)' : 'transparent',
              color: activeTab === side ? 'var(--bg-color)' : 'var(--sub-text-color)',
            }}>
            {side === '신랑' ? t.contact.groom : t.contact.bride}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(({ relation, name, phone }) => (
          <div key={relation} className="rounded-2xl px-5 py-4 flex items-center justify-between"
            style={{ background: 'color-mix(in srgb, var(--bg-color) 88%, var(--text-color) 12%)' }}>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--sub-text-color)', opacity: 0.7 }}>{relation}</span>
              <span className="text-base font-light tracking-widest" style={{ fontFamily: 'var(--wf-title)', color: 'var(--text-color)' }}>{name}</span>
            </div>
            <div className="flex gap-2">
              <a href={`tel:${phone}`}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                style={{ background: 'color-mix(in srgb, var(--point-color) 12%, var(--bg-color) 88%)', borderColor: 'color-mix(in srgb, var(--point-color) 25%, transparent)' }}>
                <svg className="w-4 h-4" style={{ color: 'var(--point-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a href={`sms:${phone}`}
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors"
                style={{ background: 'color-mix(in srgb, var(--bg-color) 85%, var(--text-color) 15%)', borderColor: 'color-mix(in srgb, var(--text-color) 15%, transparent)' }}>
                <svg className="w-4 h-4" style={{ color: 'var(--sub-text-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
