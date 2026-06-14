import { useRef, useState } from 'react';
import type { AccountInfo } from '../types/wedding';
import { useWeddingConfig } from '../context/WeddingContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../hooks/useTranslation';
import type { Translations } from '../i18n/translations';

function Toast({ text, show }: { text: string; show: boolean }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-stone-800 text-white text-xs tracking-wider shadow-lg pointer-events-none"
      style={{ opacity: show ? 1 : 0, transform: show ? 'translate(-50%, 0)' : 'translate(-50%, 8px)', transition: 'opacity 0.25s ease, transform 0.25s ease' }}>
      {text}
    </div>
  );
}

function AccountRow({ relation, bank, number, holder, onCopy, t }: {
  relation: string; bank: string; number: string; holder: string; onCopy: () => void;
  t: Translations['account'];
}) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(number).then(() => {
      setCopied(true); onCopy();
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="flex items-center justify-between pt-3">
      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--sub-text-color)', opacity: 0.7 }}>{relation}</span>
        <span className="text-sm font-light" style={{ fontFamily: 'var(--wf-title)', color: 'var(--text-color)' }}>{holder}</span>
        <span className="text-xs" style={{ color: 'var(--sub-text-color)' }}>{bank} · {number}</span>
      </div>
      <button onClick={handleCopy}
        className="shrink-0 text-xs border rounded-full px-4 py-1.5 transition-colors"
        style={copied
          ? { borderColor: 'var(--point-color)', background: 'var(--point-color)', color: 'var(--bg-color)' }
          : { borderColor: 'color-mix(in srgb, var(--text-color) 15%, transparent)', color: 'var(--sub-text-color)' }}>
        {copied ? t.copied : t.copy}
      </button>
    </div>
  );
}

function Accordion({ side, label, accounts, onCopy, t }: {
  side: '신랑' | '신부'; label: string; accounts: AccountInfo[]; onCopy: () => void;
  t: Translations['account'];
}) {
  const [open, setOpen] = useState(side === '신랑');
  const filtered = accounts.filter(a => a.side === side);
  return (
    <div className="rounded-2xl overflow-hidden border"
      style={{ borderColor: 'color-mix(in srgb, var(--text-color) 12%, transparent)', background: 'color-mix(in srgb, var(--bg-color) 88%, white 12%)' }}>
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4">
        <span className="text-sm tracking-widest font-light" style={{ fontFamily: 'var(--wf-title)', color: 'var(--text-color)' }}>{label}</span>
        <svg className="w-4 h-4 transition-transform duration-300"
          style={{ color: 'var(--sub-text-color)', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr', transition: 'grid-template-rows 0.3s ease' }}>
        <div className="overflow-hidden">
          <div className="px-5 pb-4 space-y-3 border-t" style={{ borderColor: 'color-mix(in srgb, var(--text-color) 8%, transparent)' }}>
            {filtered.map(({ relation, bank, number, holder }) => (
              <AccountRow key={relation} relation={relation} bank={bank} number={number} holder={holder} onCopy={onCopy} t={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Account() {
  const { accounts, design } = useWeddingConfig();
  const { ref, style } = useScrollAnimation(design.textEffect);
  const t = useTranslation();
  const [showToast, setShowToast] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setShowToast(true);
    toastTimer.current = setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <>
      <Toast text={t.account.copyToast} show={showToast} />
      <section
        ref={ref}
        className="py-16 px-8 border-t"
        style={{ background: 'var(--bg-color)', borderColor: 'color-mix(in srgb, var(--text-color) 8%, transparent)', ...style }}
      >
        <div className="flex flex-col items-center gap-2 mb-10">
          <p className="text-[10px] tracking-[0.45em] uppercase" style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.5 }}>Account</p>
          <h2 className="font-light tracking-widest" style={{ fontFamily: 'var(--wf-title)', color: 'var(--heading-color)', fontSize: 'var(--wf-heading-size)' }}>{t.sections.account}</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
            <div className="w-1 h-1 rounded-full" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
            <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
          </div>
        </div>
        <div className="space-y-3">
          <Accordion side="신랑" label={t.account.groom} accounts={accounts} onCopy={handleCopy} t={t.account} />
          <Accordion side="신부" label={t.account.bride} accounts={accounts} onCopy={handleCopy} t={t.account} />
        </div>
      </section>
    </>
  );
}
