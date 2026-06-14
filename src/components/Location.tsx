import { useState } from 'react';
import { useWeddingConfig } from '../context/WeddingContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../hooks/useTranslation';

type Tab = 'subway' | 'bus' | 'car' | 'parking';

export default function Location() {
  const { venue, design } = useWeddingConfig();
  const { ref, style } = useScrollAnimation(design.textEffect);
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState<Tab>('subway');
  const [copied, setCopied] = useState(false);

  const TABS: { key: Tab; label: string }[] = [
    { key: 'subway',  label: t.location.subway  },
    { key: 'bus',     label: t.location.bus     },
    { key: 'car',     label: t.location.car     },
    { key: 'parking', label: t.location.parking },
  ];

  const kakaoMapUrl = `https://map.kakao.com/?q=${encodeURIComponent(venue.name)}`;
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(venue.name + ' ' + venue.address)}`;
  const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${venue.lat},${venue.lng}`;
  const googleEmbedUrl = `https://maps.google.com/maps?q=${venue.lat},${venue.lng}&z=16&output=embed&hl=ko`;

  const handleCopy = () => {
    navigator.clipboard.writeText(venue.address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const tabText: Record<Tab, string> = {
    subway:  venue.directions.subway,
    bus:     venue.directions.bus,
    car:     venue.directions.car,
    parking: venue.directions.parking,
  };

  return (
    <section
      ref={ref}
      className="py-20 border-t"
      style={{ background: 'var(--bg-color)', borderColor: 'color-mix(in srgb, var(--text-color) 8%, transparent)', ...style }}
    >
      {/* 섹션 타이틀 */}
      <div className="flex flex-col items-center gap-2 mb-12 px-8">
        <p className="text-[9px] tracking-[0.5em] uppercase"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.5 }}>Location</p>
        <h2 className="font-light tracking-[0.3em]"
          style={{ fontFamily: 'var(--wf-title)', color: 'var(--heading-color)', fontSize: 'var(--wf-heading-size)' }}>{t.sections.location}</h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px w-8" style={{ background: 'var(--point-color)', opacity: 0.3 }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--point-color)', opacity: 0.4 }} />
          <div className="h-px w-8" style={{ background: 'var(--point-color)', opacity: 0.3 }} />
        </div>
      </div>

      {/* 장소 정보 */}
      <div className="px-8 mb-6 text-center">
        <p className="text-sm font-light tracking-widest mb-1"
          style={{ fontFamily: 'var(--wf-title)', color: 'var(--text-color)' }}>{venue.name}</p>
        {venue.hall && (
          <p className="text-[11px] tracking-wide" style={{ color: 'var(--sub-text-color)' }}>{venue.hall}</p>
        )}
      </div>

      {/* 지도 */}
      <div className="mx-4 mb-2 rounded-2xl overflow-hidden" style={{ height: '340px' }}>
        <iframe
          title="wedding-venue-map"
          src={googleEmbedUrl}
          style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* 주소 + 복사 */}
      <div className="px-8 mb-8">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-between px-5 py-3.5 rounded-xl transition-colors group"
          style={{ background: 'color-mix(in srgb, var(--bg-color) 85%, var(--text-color) 15%)' }}
        >
          <span className="text-xs tracking-wide" style={{ color: 'var(--sub-text-color)' }}>{venue.address}</span>
          <span className="text-[10px] whitespace-nowrap ml-3 transition-colors" style={{ color: 'var(--sub-text-color)', opacity: 0.6 }}>
            {copied ? t.location.copied : t.location.copy}
          </span>
        </button>
      </div>

      {/* 지도 앱 버튼 */}
      <div className="px-8 mb-10">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: t.location.kakaoMap, href: kakaoMapUrl },
            { label: t.location.naverMap, href: naverMapUrl },
            { label: t.location.googleMap, href: googleMapUrl },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center py-3 rounded-xl text-[11px] tracking-wide transition-colors border"
              style={{ borderColor: 'color-mix(in srgb, var(--text-color) 15%, transparent)', color: 'var(--sub-text-color)' }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* 교통 안내 */}
      <div className="px-8">
        <p className="text-[9px] tracking-[0.4em] uppercase mb-4 text-center"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--sub-text-color)', opacity: 0.6 }}>Direction</p>

        {/* 탭 */}
        <div className="flex mb-5" style={{ borderBottom: '1px solid color-mix(in srgb, var(--text-color) 10%, transparent)' }}>
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex-1 pb-3 text-[11px] tracking-wide transition-colors relative"
              style={{ color: activeTab === key ? 'var(--text-color)' : 'color-mix(in srgb, var(--text-color) 35%, transparent)' }}
            >
              {label}
              {activeTab === key && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-px" style={{ background: 'var(--text-color)' }} />
              )}
            </button>
          ))}
        </div>

        <p className="leading-7 whitespace-pre-line min-h-[3.5rem]" style={{ color: 'var(--sub-text-color)', fontSize: 'var(--wf-body-size)' }}>
          {tabText[activeTab]}
        </p>
      </div>
    </section>
  );
}
