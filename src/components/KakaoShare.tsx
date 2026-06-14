import { useState } from 'react';
import { useWeddingConfig } from '../context/WeddingContext';

export default function KakaoShare() {
  const { groom, bride, date, venue } = useWeddingConfig();
  const [copied, setCopied] = useState(false);

  const title = `${groom.name} ♥ ${bride.name} 결혼합니다`;
  const text = `${date.replace(/-/g, '.')} · ${venue.name}`;
  const url = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // 사용자가 취소한 경우 무시
      }
      return;
    }
    // 데스크탑 fallback: URL 복사
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent
    }
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-5 pb-5 z-40 pointer-events-none">
      <button
        onClick={handleShare}
        className="pointer-events-auto w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-medium shadow-lg transition-opacity hover:opacity-90 active:scale-[0.98]"
        style={{ background: '#FEE500', color: '#3A1D1D' }}
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
          <path d="M12 3C6.477 3 2 6.582 2 11c0 2.67 1.487 5.034 3.8 6.54L4.9 21l4.1-2.14A11.3 11.3 0 0012 19c5.523 0 10-3.582 10-8S17.523 3 12 3z"/>
        </svg>
        {copied ? 'URL 복사됨 ✓' : '카카오톡으로 공유하기'}
      </button>
    </div>
  );
}
