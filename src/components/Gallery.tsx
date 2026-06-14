import { useState, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useWeddingConfig } from '../context/WeddingContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from '../hooks/useTranslation';
import { compressImage, formatBytes, isSupportedImage } from '../utils/imageCompressor';
import { uploadImage } from '../utils/uploadImage';

const MAX_IMAGES = 10;

interface Toast {
  id: number;
  original: number;
  compressed: number;
}

interface Props {
  gallery?: string[];
  onGalleryChange?: (images: string[]) => void;
}

// ── 정렬 가능한 썸네일 ────────────────────────────────────
function SortableThumbnail({
  src,
  idx,
  onRemove,
}: {
  src: string;
  idx: number;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: src,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        aspectRatio: '1',
        opacity: isDragging ? 0.35 : 1,
      }}
      className="relative group rounded-xl overflow-hidden bg-stone-100 cursor-grab active:cursor-grabbing touch-none"
      {...attributes}
      {...listeners}
    >
      <img
        src={src}
        alt={`gallery-${idx}`}
        className="w-full h-full object-cover pointer-events-none select-none"
        draggable={false}
      />
      <button
        onClick={e => {
          e.stopPropagation();
          onRemove();
        }}
        onPointerDown={e => e.stopPropagation()}
        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-stone-900/60 text-white text-[11px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80 cursor-pointer touch-auto"
      >
        ✕
      </button>
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────
export default function Gallery({ gallery: galleryProp, onGalleryChange }: Props = {}) {
  const { gallery: ctxGallery, design } = useWeddingConfig();
  const { ref, style } = useScrollAnimation(design.textEffect);
  const t = useTranslation();
  const gallery = galleryProp ?? ctxGallery;

  // Display mode state
  const [current, setCurrent] = useState(1);

  // Upload mode state
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastIdRef = useRef(0);

  // Sort drag state
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
  );

  const addToast = (original: number, compressed: number) => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev, { id, original, compressed }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const processFiles = useCallback(
    async (files: File[]) => {
      if (!onGalleryChange) return;

      const remaining = MAX_IMAGES - gallery.length;
      if (remaining <= 0) {
        alert('최대 10장까지 업로드 가능합니다');
        return;
      }

      const supported = files.filter(isSupportedImage).slice(0, remaining);
      if (files.length > remaining) alert('최대 10장까지 업로드 가능합니다');
      if (!supported.length) return;

      setIsCompressing(true);
      try {
        const results = await Promise.all(supported.map(compressImage));
        const urls = await Promise.all(results.map(r => uploadImage(r.file)));
        results.forEach(r => addToast(r.originalSize, r.compressedSize));
        onGalleryChange([...gallery, ...urls]);
      } finally {
        setIsCompressing(false);
      }
    },
    [gallery, onGalleryChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      processFiles(Array.from(e.dataTransfer.files));
    },
    [processFiles],
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(e.target.files ?? []));
    e.target.value = '';
  };

  const removeImage = (idx: number) => {
    onGalleryChange?.(gallery.filter((_, i) => i !== idx));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = gallery.indexOf(active.id as string);
    const newIndex = gallery.indexOf(over.id as string);
    if (oldIndex !== -1 && newIndex !== -1) {
      onGalleryChange?.(arrayMove(gallery, oldIndex, newIndex));
    }
  };

  // ── 업로드 모드 ──────────────────────────────────────────
  if (onGalleryChange) {
    return (
      <div className="space-y-4">
        {/* 토스트 */}
        <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
          {toasts.map(t => (
            <div
              key={t.id}
              className="bg-stone-800 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg"
            >
              {formatBytes(t.original)} → {formatBytes(t.compressed)}
            </div>
          ))}
        </div>

        {/* 파일 드롭 영역 */}
        <div
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
            gallery.length >= MAX_IMAGES
              ? 'border-stone-200 bg-stone-50 opacity-50 cursor-not-allowed'
              : isDragOver
              ? 'border-rose-400 bg-rose-50 cursor-copy'
              : 'border-stone-300 hover:border-rose-300 hover:bg-rose-50/50 cursor-pointer'
          }`}
          onDragOver={e => {
            e.preventDefault();
            // 파일 드래그만 반응 (썸네일 정렬 드래그는 무시)
            if (e.dataTransfer.types.includes('Files') && gallery.length < MAX_IMAGES) {
              setIsDragOver(true);
            }
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() =>
            gallery.length < MAX_IMAGES && !isCompressing && fileInputRef.current?.click()
          }
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInput}
            disabled={gallery.length >= MAX_IMAGES || isCompressing}
          />

          {isCompressing ? (
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
              <p className="text-xs text-stone-400">이미지 최적화 중...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <svg
                className={`w-10 h-10 transition-colors ${isDragOver ? 'text-rose-400' : 'text-stone-300'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm text-stone-500">사진을 드래그하거나 클릭해서 업로드하세요</p>
              <p className="text-xs text-stone-300">
                {gallery.length >= MAX_IMAGES ? '최대 10장 도달' : `${gallery.length} / ${MAX_IMAGES}장`}
              </p>
            </div>
          )}
        </div>

        {/* 썸네일 정렬 그리드 */}
        {gallery.length > 0 && (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={gallery} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-3 gap-2">
                {gallery.map((src, idx) => (
                  <SortableThumbnail
                    key={src}
                    src={src}
                    idx={idx}
                    onRemove={() => removeImage(idx)}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay>
              {activeId && (
                <div
                  className="rounded-xl overflow-hidden shadow-2xl ring-2 ring-rose-400 scale-105"
                  style={{ aspectRatio: '1' }}
                >
                  <img
                    src={activeId}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              )}
            </DragOverlay>
          </DndContext>
        )}

        {gallery.length > 1 && (
          <p className="text-[10px] text-stone-300 text-center">드래그해서 순서를 바꿀 수 있어요</p>
        )}
      </div>
    );
  }

  // ── 표시 모드 (Swiper 캐러셀) ────────────────────────────
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
