import { useState, useEffect } from 'react';
import { useWeddingConfig } from '../context/WeddingContext';
import { useWeddingId } from '../context/WeddingIdContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../hooks/useTranslation';

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

const PREVIEW_ENTRIES: GuestbookEntry[] = [
  { id: '1', name: '김민준', message: '두 분의 행복한 시작을 진심으로 축하해요! 평생 사랑하세요 ❤️', created_at: '2026-09-15' },
  { id: '2', name: '박서연', message: '초대해줘서 고마워! 결혼 정말 축하해 🎉 행복하게 살아~', created_at: '2026-09-20' },
  { id: '3', name: '이지호', message: '두 분이 평생 함께 행복하시길 바랍니다. 결혼을 축하드립니다!', created_at: '2026-09-28' },
];

function DeleteModal({
  name,
  onConfirm,
  onCancel,
}: {
  name: string;
  onConfirm: (pw: string) => void;
  onCancel: () => void;
}) {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const t = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pw.trim()) { setError(true); return; }
    onConfirm(pw);
    setError(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-8"
      style={{ background: 'rgba(0,0,0,0.35)' }}
      onClick={onCancel}
    >
      <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl" onClick={e => e.stopPropagation()}>
        <p className="text-sm text-stone-700 mb-1" style={{ fontFamily: '"Noto Serif KR", Georgia, serif' }}>
          {t.guestbook.deleteTitle}
        </p>
        <p className="text-xs text-stone-400 mb-5">
          {t.guestbook.deleteDesc(name)}
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            placeholder={t.guestbook.deletePasswordPlaceholder}
            value={pw}
            onChange={e => { setPw(e.target.value); setError(false); }}
            autoFocus
            className={`w-full border rounded-xl px-4 py-2.5 text-sm text-stone-700 placeholder-stone-300 focus:outline-none transition-colors ${
              error ? 'border-red-300 focus:border-red-400' : 'border-stone-200 focus:border-rose-300'
            }`}
          />
          {error && <p className="text-[11px] text-red-400">{t.guestbook.deletePasswordRequired}</p>}
          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-400 hover:bg-stone-50 transition-colors">
              {t.guestbook.deleteCancel}
            </button>
            <button type="submit"
              className="flex-1 py-2.5 rounded-xl bg-rose-400 text-white text-sm hover:bg-rose-500 transition-colors">
              {t.guestbook.deleteConfirm}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Guestbook() {
  const { design } = useWeddingConfig();
  const { ref, style } = useScrollAnimation(design.textEffect);
  const weddingId = useWeddingId();
  const t = useTranslation();

  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [form, setForm] = useState({ name: '', password: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    if (!weddingId) {
      setEntries(PREVIEW_ENTRIES);
      return;
    }
    fetch(`/api/guestbook/${weddingId}`)
      .then(r => r.json())
      .then((data: GuestbookEntry[]) => setEntries(Array.isArray(data) ? data : []))
      .catch(() => setEntries([]));
  }, [weddingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.password.trim() || !form.message.trim()) return;
    if (!weddingId) {
      const fake: GuestbookEntry = {
        id: String(Date.now()), name: form.name.trim(), message: form.message.trim(),
        created_at: new Date().toISOString().slice(0, 10),
      };
      setEntries(prev => [fake, ...prev]);
      setForm({ name: '', password: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/guestbook/${weddingId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), password: form.password, message: form.message.trim() }),
      });
      if (!res.ok) throw new Error('post_failed');
      const refetch = await fetch(`/api/guestbook/${weddingId}`);
      const data: GuestbookEntry[] = await refetch.json();
      setEntries(Array.isArray(data) ? data : []);
      setForm({ name: '', password: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    } catch {
      // silent
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async (pw: string) => {
    const id = deletingId;
    setDeletingId(null);
    if (!id) return;
    if (!weddingId) {
      setEntries(prev => prev.filter(e => e.id !== id));
      return;
    }
    try {
      const res = await fetch(`/api/guestbook/${weddingId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password: pw }),
      });
      if (res.status === 403) {
        setDeleteError(t.guestbook.deleteError);
        setTimeout(() => setDeleteError(''), 2000);
        return;
      }
      if (!res.ok) throw new Error('delete_failed');
      setEntries(prev => prev.filter(e => e.id !== id));
    } catch {
      // silent
    }
  };

  const deletingEntry = entries.find(e => e.id === deletingId);

  return (
    <>
      {deletingId !== null && deletingEntry && (
        <DeleteModal
          name={deletingEntry.name}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingId(null)}
        />
      )}

      <section ref={ref} className="py-16 px-8 border-t"
        style={{ background: 'var(--bg-color)', borderColor: 'color-mix(in srgb, var(--text-color) 8%, transparent)', ...style }}>
        <div className="flex flex-col items-center gap-2 mb-10">
          <p className="text-[10px] tracking-[0.45em] uppercase" style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.5 }}>
            Guestbook
          </p>
          <h2 className="font-light tracking-widest" style={{ fontFamily: 'var(--wf-title)', color: 'var(--heading-color)', fontSize: 'var(--wf-heading-size)' }}>{t.sections.guestbook}</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
            <div className="w-1 h-1 rounded-full" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
            <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-10 space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t.guestbook.namePlaceholder}
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              maxLength={20}
              className="flex-1 border rounded-xl px-4 py-3 text-sm placeholder-stone-300 focus:outline-none transition-colors"
              style={{ borderColor: 'color-mix(in srgb, var(--text-color) 15%, transparent)', color: 'var(--text-color)', background: 'color-mix(in srgb, var(--bg-color) 90%, white 10%)' }}
            />
            <input
              type="password"
              placeholder={t.guestbook.passwordPlaceholder}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              maxLength={20}
              className="flex-1 border rounded-xl px-4 py-3 text-sm placeholder-stone-300 focus:outline-none transition-colors"
              style={{ borderColor: 'color-mix(in srgb, var(--text-color) 15%, transparent)', color: 'var(--text-color)', background: 'color-mix(in srgb, var(--bg-color) 90%, white 10%)' }}
            />
          </div>
          <textarea
            placeholder={t.guestbook.messagePlaceholder}
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            maxLength={100}
            rows={3}
            className="w-full border rounded-xl px-4 py-3 text-sm placeholder-stone-300 focus:outline-none transition-colors resize-none"
            style={{ borderColor: 'color-mix(in srgb, var(--text-color) 15%, transparent)', color: 'var(--text-color)', background: 'color-mix(in srgb, var(--bg-color) 90%, white 10%)' }}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: 'var(--sub-text-color)', opacity: 0.5 }}>{form.message.length} / 100</span>
            <button
              type="submit"
              disabled={submitting || !form.name.trim() || !form.password.trim() || !form.message.trim()}
              className="text-sm px-6 py-2 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: 'var(--point-color)', color: 'var(--bg-color)' }}
            >
              {submitted ? t.guestbook.submitted : submitting ? t.guestbook.submitting : t.guestbook.submit}
            </button>
          </div>
        </form>

        {deleteError && (
          <p className="text-center text-xs text-red-400 mb-4 -mt-4">{deleteError}</p>
        )}

        <div className="space-y-3">
          {entries.length === 0 && (
            <p className="text-center text-xs py-8" style={{ color: 'var(--sub-text-color)', opacity: 0.5 }}>{t.guestbook.empty}</p>
          )}
          {entries.map(({ id, name, message, created_at }) => (
            <div key={id} className="rounded-2xl px-4 py-4"
              style={{ background: 'color-mix(in srgb, var(--bg-color) 88%, var(--text-color) 12%)' }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-light" style={{ fontFamily: 'var(--wf-title)', color: 'var(--text-color)' }}>{name}</span>
                  <span className="text-[10px]" style={{ color: 'var(--sub-text-color)', opacity: 0.5 }}>{created_at.slice(0, 10)}</span>
                </div>
                <button
                  onClick={() => setDeletingId(id)}
                  className="p-1 transition-colors"
                  style={{ color: 'var(--sub-text-color)', opacity: 0.4 }}
                  aria-label="삭제"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <p className="leading-relaxed" style={{ color: 'var(--sub-text-color)', fontSize: 'var(--wf-body-size)' }}>{message}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
