import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import { thumbFor } from "@/lib/images";

type CollectionImageGalleryProps = {
  images: string[];
  /** Per-image titles for fullscreen overlay (same order as `images`). */
  imageTitles?: string[];
  /** Copyright line in fullscreen, e.g. "Hallie Graham". */
  lightboxCopyright?: string;
  /** Reset selection when the project (slug) changes */
  galleryKey?: string;
  /** Smaller thumbnails for portfolio grid cards */
  compact?: boolean;
  /** Controlled selection index (syncs main image + thumbnails from parent). */
  selectedIndex?: number;
  /** Called when the selected image index changes (including reset to 0). */
  onSelectedIndexChange?: (index: number) => void;
};

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 8V4h4M4 4l5 5M20 8V4h-4M20 4l-5 5M4 16v4h4M4 20l5-5M20 16v4h-4M20 20l-5-5"
      />
    </svg>
  );
}

function CloseFullscreenIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
    </svg>
  );
}

const navButtonClass = [
  "absolute z-10 inline-flex rounded-md bg-white/95 text-neutral-900 shadow-md backdrop-blur-sm transition",
  "hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2",
].join(" ");

export function CollectionImageGallery({
  images,
  imageTitles,
  lightboxCopyright = "Hallie Graham",
  galleryKey,
  compact,
  selectedIndex,
  onSelectedIndexChange,
}: CollectionImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setSelected(0);
    setLightboxOpen(false);
  }, [galleryKey]);

  useEffect(() => {
    if (selectedIndex === undefined || images.length === 0) return;
    setSelected(Math.min(Math.max(0, selectedIndex), images.length - 1));
  }, [selectedIndex, images.length]);

  useEffect(() => {
    onSelectedIndexChange?.(selected);
  }, [selected, onSelectedIndexChange]);

  useEffect(() => {
    if (images.length === 0) return;
    setSelected((s) => Math.min(s, images.length - 1));
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goPrevious = useCallback(() => {
    setSelected((s) => Math.max(0, s - 1));
  }, []);

  const goNext = useCallback(() => {
    setSelected((s) => Math.min(images.length - 1, s + 1));
  }, [images.length]);

  const canGoPrevious = selected > 0;
  const canGoNext = selected < images.length - 1;

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft" && selected > 0) goPrevious();
      if (e.key === "ArrowRight" && selected < images.length - 1) goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, closeLightbox, goPrevious, goNext, selected, images.length]);

  useEffect(() => {
    if (compact || images.length <= 1) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowLeft" && selected > 0) goPrevious();
      if (e.key === "ArrowRight" && selected < images.length - 1) goNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [compact, images.length, lightboxOpen, goPrevious, goNext, selected]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [lightboxOpen]);

  /** Total gallery block height so main image + strip fit in view (detail vs grid card). */
  const shellHeight = compact
    ? "min(30dvh, 240px)"
    : "min(560px, min(62dvh, calc(100dvh - 7.5rem)))";

  if (images.length === 0) {
    return (
      <div
        className="w-full bg-neutral-100"
        style={{ height: shellHeight }}
        aria-hidden
      />
    );
  }

  const mainSrc = images[Math.min(selected, images.length - 1)];
  const lightboxTitle = imageTitles?.[Math.min(selected, imageTitles.length - 1)];

  const lightboxLayer =
    lightboxOpen &&
    createPortal(
      <div
        className="fixed inset-0 z-[300] bg-black"
        role="dialog"
        aria-modal="true"
        aria-label="Expanded image"
      >
        <div className="absolute inset-0 flex min-h-0 min-w-0 items-center justify-center px-14 py-4 sm:px-20 sm:py-6">
          <ProgressiveImage
            key={mainSrc}
            src={mainSrc}
            alt={lightboxTitle ?? ""}
            fit="contain"
            className="h-full w-full"
            fetchPriority="high"
          />
        </div>
        {lightboxTitle && (
          <p className="pointer-events-none absolute left-3 top-3 z-10 max-w-[min(75%,22rem)] pr-16 text-sm font-semibold leading-snug text-white sm:left-5 sm:top-5 sm:text-base">
            {lightboxTitle}
          </p>
        )}
        {lightboxCopyright && (
          <p className="pointer-events-none absolute bottom-3 right-3 z-10 text-[10px] font-medium tracking-wide text-white/75 sm:bottom-5 sm:right-5 sm:text-xs">
            © {lightboxCopyright}
          </p>
        )}
        {canGoPrevious && (
          <button
            type="button"
            onClick={goPrevious}
            className={`${navButtonClass} left-3 top-1/2 -translate-y-1/2 p-2.5 sm:left-5`}
            aria-label="Previous piece"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        )}
        {canGoNext && (
          <button
            type="button"
            onClick={goNext}
            className={`${navButtonClass} right-3 top-1/2 -translate-y-1/2 p-2.5 sm:right-5`}
            aria-label="Next piece"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        )}
        <button
          type="button"
          onClick={closeLightbox}
          className="absolute right-3 top-3 inline-flex rounded-md bg-white/95 p-2.5 text-neutral-900 shadow-lg backdrop-blur-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/60 sm:right-5 sm:top-5"
          aria-label="Close expanded view"
        >
          <CloseFullscreenIcon className="h-5 w-5" />
        </button>
      </div>,
      document.body
    );

  return (
    <>
      <div
        className="grid w-full grid-rows-[1fr_auto] border-b border-neutral-100 bg-neutral-50/50"
        style={{ height: shellHeight }}
      >
        <div className="relative min-h-0 overflow-hidden bg-neutral-100">
          {!compact && canGoPrevious && (
            <button
              type="button"
              onClick={goPrevious}
              className={`${navButtonClass} left-2 top-1/2 -translate-y-1/2 p-2 sm:left-3`}
              aria-label="Previous piece"
            >
              <ChevronLeftIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
          {!compact && canGoNext && (
            <button
              type="button"
              onClick={goNext}
              className={`${navButtonClass} right-2 top-1/2 -translate-y-1/2 p-2 sm:right-3`}
              aria-label="Next piece"
            >
              <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className={[
              "absolute z-10 inline-flex rounded-md bg-white/95 text-neutral-900 shadow-md backdrop-blur-sm transition",
              "hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/30 focus-visible:ring-offset-2",
              compact ? "right-1.5 top-1.5 p-1.5" : "right-2 top-2 p-2 sm:right-3 sm:top-3",
            ].join(" ")}
            aria-label="Expand image to fill the page"
          >
            <ExpandIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4 sm:h-5 sm:w-5"} />
          </button>
          <div className="h-full w-full p-1 sm:p-2">
            <ProgressiveImage
              key={mainSrc}
              src={mainSrc}
              fit="contain"
              className="h-full w-full"
              fetchPriority="high"
            />
          </div>
        </div>

        {images.length > 1 && (
          <div
            className={[
              "flex shrink-0 gap-2 overflow-x-auto border-t border-neutral-100/80 bg-neutral-50",
              compact ? "px-2 py-1.5" : "px-3 py-2 sm:px-4 sm:py-2.5",
            ].join(" ")}
          >
            {images.map((src, i) => {
              const isSelected = i === selected;
              return (
                <button
                  key={src}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={[
                    "relative shrink-0 overflow-hidden rounded-md border-2 transition outline-none",
                    "focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
                    isSelected
                      ? "border-neutral-900 ring-1 ring-neutral-900/20"
                      : "border-neutral-200 opacity-90 hover:border-neutral-400 hover:opacity-100",
                  ].join(" ")}
                  aria-label={`Show image ${i + 1} of ${images.length}`}
                  aria-current={isSelected ? "true" : undefined}
                >
                  <img
                    src={thumbFor(src)}
                    alt=""
                    className={compact ? "h-9 w-9 object-cover" : "h-11 w-11 object-cover sm:h-12 sm:w-12"}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>
      {lightboxLayer}
    </>
  );
}
