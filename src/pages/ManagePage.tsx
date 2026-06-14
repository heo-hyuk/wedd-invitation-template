import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface RsvpEntry {
  id: string;
  name: string;
  attendance: 'yes' | 'no';
  guests: number | null;
  meal: string | null;
  message: string | null;
  created_at: string;
}

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface ManageData {
  groom: string;
  bride: string;
  date: string;
  venueName: string;
  rsvp: RsvpEntry[];
  guestbook: GuestbookEntry[];
}

type Tab = 'rsvp' | 'guestbook';

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

const STORAGE_KEY = 'wedd_manage_key';

export default function ManagePage() {
  const [searchParams] = useSearchParams();

  const [key, setKey] = useState<string>('');
  const [keyInput, setKeyInput] = useState('');
  const [data, setData] = useState<ManageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<Tab>('rsvp');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const qKey = searchParams.get('key');
    const storedKey = localStorage.getItem(STORAGE_KEY);
    const resolved = qKey ?? storedKey ?? '';
    if (resolved) setKey(resolved);
  }, [searchParams]);

  useEffect(() => {
    if (!key) return;
    fetchData(key);
  }, [key]);

  const fetchData = async (k: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/manage?key=${encodeURIComponent(k)}`);
      if (res.status === 403 || res.status === 401) {
        setError('관리 키가 올바르지 않습니다.');
        setKey('');
        return;
      }
      if (!res.ok) throw new Error('서버 오류');
      const json: ManageData = await res.json();
      setData(json);
      localStorage.setItem(STORAGE_KEY, k);
      window.history.replaceState({}, '', '/manage');
    } catch {
      setError('데이터를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    setKey(keyInput.trim());
  };

  const deleteGuestbook = async (id: string) => {
    if (!key) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/manage?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'guestbook', id }),
      });
      if (!res.ok) throw new Error();
      setData(prev => prev ? { ...prev, guestbook: prev.guestbook.filter(g => g.id !== id) } : prev);
    } catch {
      alert('삭제 실패');
    } finally {
      setDeletingId(null);
    }
  };

  if (!key) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <p className="text-[9px] tracking-[0.5em] text-amber-700/40 uppercase mb-2"
              style={{ fontFamily: 'Georgia, serif' }}>Admin</p>
            <h1 className="text-base font-light text-stone-700 tracking-widest">관리자 인증</h1>
            <p className="text-xs text-stone-400 mt-2 leading-relaxed">
              발급받은 관리 키를 입력해주세요
            </p>
          </div>
          <form onSubmit={handleKeySubmit} className="space-y-3">
            <input
              type="text"
              value={keyInput}
              onChange={e => setKeyInput(e.target.value)}
              placeholder="관리 키 입력"
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-700 focus:outline-none focus:border-rose-300 tracking-wide"
              autoComplete="off"
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-rose-400 text-white text-sm rounded-xl hover:bg-rose-500 transition-colors tracking-wide"
            >
              확인
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <svg className="w-6 h-6 animate-spin text-rose-300" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
        </svg>
      </div>
    );
  }

  if (!data) return null;

  const attending = data.rsvp.filter(r => r.attendance === 'yes');
  const notAttending = data.rsvp.filter(r => r.attendance === 'no');
  const totalGuests = attending.reduce((sum, r) => sum + (r.guests ?? 1), 0);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-100 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <div>
            <p className="text-xs font-light text-stone-600 tracking-widest">
              {data.groom} ♥ {data.bride}
            </p>
            <p className="text-[10px] text-stone-400">{data.date.replace(/-/g, '.')} · {data.venueName}</p>
          </div>
          <button
            onClick={() => { setKey(''); setData(null); localStorage.removeItem(STORAGE_KEY); }}
            className="text-[11px] text-stone-400 hover:text-stone-600 transition-colors"
          >
            로그아웃
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-5 py-8 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '참석', value: attending.length, unit: '명', color: 'text-emerald-600' },
            { label: '불참', value: notAttending.length, unit: '명', color: 'text-rose-400' },
            { label: '총 인원', value: totalGuests, unit: '명', color: 'text-stone-600' },
          ].map(({ label, value, unit, color }) => (
            <div key={label} className="bg-white rounded-2xl px-4 py-5 text-center shadow-sm">
              <p className={`text-2xl font-light ${color}`}>{value}</p>
              <p className="text-[10px] text-stone-400 tracking-wide mt-1">{unit} · {label}</p>
            </div>
          ))}
        </div>

        <div className="flex border-b border-stone-200">
          {(['rsvp', 'guestbook'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 pb-3 text-sm tracking-wide transition-colors relative ${
                tab === t ? 'text-stone-700' : 'text-stone-300 hover:text-stone-400'
              }`}
            >
              {t === 'rsvp' ? `참석 응답 (${data.rsvp.length})` : `방명록 (${data.guestbook.length})`}
              {tab === t && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-stone-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {tab === 'rsvp' && (
          <div className="space-y-2">
            {data.rsvp.length === 0 && (
              <p className="text-center text-xs text-stone-300 py-12">아직 응답이 없습니다</p>
            )}
            {data.rsvp.map(r => (
              <div key={r.id} className="bg-white rounded-2xl px-5 py-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-stone-700">{r.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      r.attendance === 'yes'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-rose-50 text-rose-400'
                    }`}>
                      {r.attendance === 'yes' ? '참석' : '불참'}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-300">{formatDate(r.created_at)}</span>
                </div>
                {r.attendance === 'yes' && (
                  <div className="flex gap-3 text-[11px] text-stone-400">
                    {r.guests != null && <span>{r.guests}명 참석</span>}
                    {r.meal && <span>· {r.meal === 'yes' ? '식사 예정' : '식사 불참'}</span>}
                  </div>
                )}
                {r.message && (
                  <p className="text-xs text-stone-400 mt-2 leading-relaxed border-t border-stone-50 pt-2">
                    {r.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === 'guestbook' && (
          <div className="space-y-2">
            {data.guestbook.length === 0 && (
              <p className="text-center text-xs text-stone-300 py-12">아직 방명록이 없습니다</p>
            )}
            {data.guestbook.map(g => (
              <div key={g.id} className="bg-white rounded-2xl px-5 py-4 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm text-stone-700">{g.name}</span>
                      <span className="text-[10px] text-stone-300">{formatDate(g.created_at)}</span>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed">{g.message}</p>
                  </div>
                  <button
                    onClick={() => deleteGuestbook(g.id)}
                    disabled={deletingId === g.id}
                    className="shrink-0 text-[11px] text-stone-300 hover:text-red-400 transition-colors disabled:opacity-40 mt-0.5"
                  >
                    {deletingId === g.id ? '...' : '삭제'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
