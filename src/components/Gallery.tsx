import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import { useWeddingConfig } from '../context/WeddingContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../hooks/useTranslation';

export default function Gallery() {
  const { gallery, design } = useWeddingConfig();
  const { ref, style } = useScrollAnimation(design.textEffect);
  const t = useTranslation();
  const [current, setCurrent] = useState(1);

  if (!gallery || gallery.length === 0) return null;

  return (
    <section ref={ref} className="py-16 border-t" style={{ background: 'var(--bg-color)', borderColor: 'color-mix(in srgb, var(--text-color) 8%, transparent)', ...style }}>
      <div className="flex flex-col items-center gap-2 mb-10 px-8">
        <p
          className="text-[10px] tracking-[0.45em] uppercase"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--point-color)', opacity: 0.5 }}
        >
          Gallery
        </p>
        <h2
          className="font-light tracking-widest"
          style={{ fontFamily: 'var(--wf-title)', color: 'var(--heading-color)', fontSize: 'var(--wf-heading-size)' }}
        >
          {t.sections.gallery}
        </h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
          <div className="w-1 h-1 rounded-full" style={{ background: 'var(--point-color)', opacity: 0.5 }} />
          <div className="h-px w-10" style={{ background: 'var(--point-color)', opacity: 0.35 }} />
        </div>
      </div>

      <div className="select-none" style={{ WebkitUserSelect: 'none' }}>
        <Swiper
          loop={true}
          slidesPerView={1.15}
          centeredSlides={true}
          spaceBetween={10}
          onSlideChange={(swiper: SwiperInstance) =>
            setCurrent(((swiper.realIndex) % gallery.length) + 1)
          }
        >
          {gallery.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="overflow-hidden rounded-2xl bg-stone-100" style={{ aspectRatio: '3 / 4' }}>
                <img
                  src={src}
                  alt={`갤러리 ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center mt-5">
        <span
          className="text-xs tracking-widest"
          style={{ fontFamily: 'Georgia, serif', color: 'var(--sub-text-color)' }}
        >
          {current} / {gallery.length}
        </span>
      </div>
    </section>
  );
}
