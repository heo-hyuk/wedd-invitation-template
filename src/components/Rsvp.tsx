import { useState } from 'react';
import { useWeddingConfig } from '../context/WeddingContext';
import { useWeddingId } from '../context/WeddingIdContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../hooks/useTranslation';

type RadioGroupProps<T extends string> = { options: { value: T; label: string }[]; value: T | null; onChange: (v: T) => void };

function RadioGroup<T extends string>({ options, value, onChange }: RadioGroupProps<T>) {
  return (
    <div className="flex gap-2">
      {options.map(opt => (
        <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
          className="flex-1 py-2.5 rounded-xl text-sm border transition-colors"
          style={{
            fontFamily: 'var(--wf-title)',
            background: value === opt.value ? 'var(--text-color)' : 'color-mix(in srgb, var(--bg-color) 90%, white 10%)',
            borderColor: value === opt.value ? 'var(--text-color)' : 'color-mix(in srgb, var(--text-color) 15%, transparent)',
            color: value === opt.value ? 'var(--bg-color)' : 'var(--sub-text-color)',
          }}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ fontFamily: 'Georgia, serif', color: 'var(--sub-text-color)', opacity: 0.7 }}>
      {children}
    </p>
  );
}

const COUNT_MAP: Record<'1' | '2' | '3+', number> = { '1': 1, '2': 2, '3+': 3 };

export default function Rsvp() {
  const { design } = useWeddingConfig();
  const { ref, style } = useScrollAnimation(design.textEffect);
  const weddingId = useWeddingId();
  const t = useTranslation();

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no' | null>(null);
  const [count, setCount] = useState<'1' | '2' | '3+' | null>(null);
  const [meal, setMeal] = useState<'yes' | 'no' | null>(null);
  const [message, setMessage] = useState('');

  const isValid = name.trim() !== '' && attendance !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || attendance === null) return;

    if (!weddingId) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    try {
      await fetch(`/api/rsvp/${weddingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          attendance,
          ...(attendance === 'yes' && count ? { guests: COUNT_MAP[count] } : {}),
          ...(attendance === 'yes' && meal ? { meal } : {}),
          ...(message.trim() ? { message: message.trim() } : {}),
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="py-16 px-8 border-t"
      style={{ background: 'var(--bg-color)', borderColor: 'color-mix(in srgb, var(--text-color) 8%, transparent)', ...style }}>
      <div className="flex flex-col items-center gap-2 mb-10">
        <p className="text-[10px] tracking-[0.45em] uppercase" style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.5 }}>RSVP</p>
        <h2 className="font-light tracking-widest" style={{ fontFamily: 'var(--wf-title)', color: 'var(--heading-color)', fontSize: 'var(--wf-heading-size)' }}>{t.sections.rsvp}</h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
          <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
        </div>
      </div>

      {submitted ? (
        <div className="flex flex-col items-center gap-4 py-10 text-center" style={{ animation: 'fadeInUp 0.6s ease both' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ background: 'color-mix(in srgb, var(--point-color) 15%, var(--bg-color) 85%)' }}>
            <svg className="w-6 h-6" style={{ color: 'var(--point-color)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm tracking-wide" style={{ fontFamily: 'var(--wf-title)', color: 'var(--text-color)' }}>{t.rsvp.successTitle}</p>
          <p className="text-xs" style={{ color: 'var(--sub-text-color)' }}>{t.rsvp.successSub}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <FieldLabel>{t.rsvp.nameLabel}</FieldLabel>
            <input type="text" placeholder={t.rsvp.namePlaceholder} value={name} onChange={e => setName(e.target.value)} maxLength={20}
              className="w-full border rounded-xl px-4 py-3 text-sm placeholder-stone-300 focus:outline-none transition-colors"
              style={{ borderColor: 'color-mix(in srgb, var(--text-color) 15%, transparent)', color: 'var(--text-color)', background: 'color-mix(in srgb, var(--bg-color) 90%, white 10%)' }} />
          </div>
          <div>
            <FieldLabel>{t.rsvp.attendanceLabel}</FieldLabel>
            <RadioGroup
              options={[{ value: 'yes', label: t.rsvp.yes }, { value: 'no', label: t.rsvp.no }]}
              value={attendance}
              onChange={v => { setAttendance(v); if (v === 'no') { setCount(null); setMeal(null); } }}
            />
          </div>
          {attendance === 'yes' && (
            <>
              <div style={{ animation: 'fadeInUp 0.35s ease both' }}>
                <FieldLabel>{t.rsvp.countLabel}</FieldLabel>
                <RadioGroup
                  options={[{ value: '1', label: t.rsvp.count1 }, { value: '2', label: t.rsvp.count2 }, { value: '3+', label: t.rsvp.count3 }]}
                  value={count}
                  onChange={setCount}
                />
              </div>
              <div style={{ animation: 'fadeInUp 0.45s ease both' }}>
                <FieldLabel>{t.rsvp.mealLabel}</FieldLabel>
                <RadioGroup
                  options={[{ value: 'yes', label: t.rsvp.mealYes }, { value: 'no', label: t.rsvp.mealNo }]}
                  value={meal}
                  onChange={setMeal}
                />
              </div>
            </>
          )}
          <div>
            <FieldLabel>{t.rsvp.messageLabel}</FieldLabel>
            <textarea placeholder={t.rsvp.messagePlaceholder} value={message} onChange={e => setMessage(e.target.value)} maxLength={200} rows={3}
              className="w-full border rounded-xl px-4 py-3 text-sm placeholder-stone-300 focus:outline-none transition-colors resize-none"
              style={{ borderColor: 'color-mix(in srgb, var(--text-color) 15%, transparent)', color: 'var(--text-color)', background: 'color-mix(in srgb, var(--bg-color) 90%, white 10%)' }} />
            <p className="text-right text-[10px] mt-1" style={{ color: 'var(--sub-text-color)', opacity: 0.5 }}>{message.length} / 200</p>
          </div>
          <button type="submit" disabled={!isValid || submitting}
            className="w-full py-4 rounded-xl text-sm tracking-widest transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: isValid && !submitting ? 'var(--text-color)' : 'transparent',
              color: isValid && !submitting ? 'var(--bg-color)' : 'var(--sub-text-color)',
              border: isValid && !submitting ? 'none' : '1px solid color-mix(in srgb, var(--text-color) 15%, transparent)',
              fontFamily: 'var(--wf-title)',
            }}>
            {submitting ? t.rsvp.submitting : t.rsvp.submit}
          </button>
        </form>
      )}
      <style>{`@keyframes fadeInUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }`}</style>
    </section>
  );
}
