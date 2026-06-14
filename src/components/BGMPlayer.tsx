import { useEffect, useRef, useState } from 'react';

interface Props {
  url: string;
  name: string;
  autoPlay: boolean;
  initialVolume: number;
}

export default function BGMPlayer({ url, name, autoPlay, initialVolume }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(initialVolume);
  const [showVolume, setShowVolume] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;
    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = initialVolume / 100;
    audio.addEventListener('play',  () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('error', () => setError(true));
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [url, initialVolume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume / 100;
  }, [volume]);

  // 자동재생: 첫 사용자 인터랙션 후 시작 (모바일 정책 대응)
  useEffect(() => {
    if (!autoPlay || !url || error) return;
    const tryPlay = () => {
      audioRef.current?.play().catch(() => {});
      document.removeEventListener('click',      tryPlay);
      document.removeEventListener('touchstart', tryPlay);
    };
    document.addEventListener('click',      tryPlay, { once: true });
    document.addEventListener('touchstart', tryPlay, { once: true });
    return () => {
      document.removeEventListener('click',      tryPlay);
      document.removeEventListener('touchstart', tryPlay);
    };
  }, [autoPlay, url, error]);

  const toggle = () => {
    if (!audioRef.current || error) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setError(true));
    }
  };

  if (!url || error) return null;

  return (
    <div className="fixed bottom-24 right-4 z-40 flex flex-col items-end gap-2">
      {showVolume && (
        <div className="flex flex-col items-center gap-1.5 px-3 py-3 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-stone-100">
          <span className="text-[10px] text-stone-400 tracking-wide">{name}</span>
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12M9.172 9.172a4 4 0 000 5.656" />
            </svg>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              className="w-20 accent-rose-400"
            />
            <span className="text-[10px] text-stone-400 w-6 text-right">{volume}</span>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          toggle();
          setShowVolume(v => !v);
        }}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border transition-all ${
          playing
            ? 'bg-rose-400 border-rose-300 text-white'
            : 'bg-white/90 border-stone-200 text-stone-500'
        }`}
        style={playing ? { animation: 'bgm-spin 3s linear infinite' } : undefined}
        aria-label={playing ? '음악 정지' : '음악 재생'}
        title={name}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" />
        </svg>
      </button>

      <style>{`
        @keyframes bgm-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
