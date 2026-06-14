import { useEffect, useState } from 'react';
import { WeddingContext } from '../context/WeddingContext';
import { WeddingIdContext } from '../context/WeddingIdContext';
import type { WeddingConfig } from '../types/wedding';
import { DEFAULT_DESIGN } from '../types/wedding';
import { buildCssVars } from '../utils/designTheme';
import SectionList from '../components/SectionList';
import KakaoShare from '../components/KakaoShare';
import ScrollToTop from '../components/ScrollToTop';
import BGMPlayer from '../components/BGMPlayer';

function updateOgTags(data: WeddingConfig) {
  const title = `${data.groom.name} ♥ ${data.bride.name} 결혼합니다`;
  const description = `${data.date.replace(/-/g, '.')} · ${data.venue.name}`;
  document.title = title;

  const set = (property: string, content: string) => {
    let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  set('og:title', title);
  set('og:description', description);
  const img = data.gallery.find(g => !g.startsWith('data:'));
  if (img) set('og:image', img);
}

export default function ViewPage() {
  const [data, setData] = useState<WeddingConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/wedding.json')
      .then(res => {
        if (!res.ok) throw new Error('fetch_error');
        return res.json();
      })
      .then((json: WeddingConfig) => {
        const mergedDesign = { ...DEFAULT_DESIGN, ...(json.design ?? {}) };
        if (!mergedDesign.pointColor && mergedDesign.keyColor) {
          mergedDesign.pointColor = mergedDesign.keyColor;
        }
        setData({ ...json, design: mergedDesign });
        updateOgTags(json);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-8 h-8 animate-spin text-rose-300" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
          </svg>
          <p className="text-xs text-stone-400 tracking-widest">불러오는 중…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-6 px-8">
        <div className="text-center">
          <p className="text-6xl mb-4">💌</p>
          <h1 className="text-base font-medium text-stone-600 mb-2 tracking-widest">청첩장을 불러오지 못했습니다</h1>
          <p className="text-xs text-stone-400 tracking-wide">
            잠시 후 다시 시도해주세요.
          </p>
        </div>
      </div>
    );
  }

  const cssVars = buildCssVars(data.design);

  return (
    <WeddingIdContext.Provider value="wedding">
      <WeddingContext.Provider value={data}>
        <div className="min-h-screen bg-white">
          <div className="mx-auto w-full max-w-[480px] pb-24" style={cssVars}>
            <SectionList sections={data.sections} />
          </div>
          <KakaoShare />
          <ScrollToTop />
          {data.bgm && data.bgm.type !== 'none' && data.bgm.url && (
            <BGMPlayer
              url={data.bgm.url}
              name={data.bgm.name}
              autoPlay={data.bgm.autoPlay}
              initialVolume={data.bgm.volume}
            />
          )}
        </div>
      </WeddingContext.Provider>
    </WeddingIdContext.Provider>
  );
}
