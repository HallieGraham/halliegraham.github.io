import { useEffect, useRef, useState } from "react";
import { placeholderFor } from "@/lib/images";

type ProgressiveImageProps = {
  src: string;
  alt?: string;
  /** How the image fills its box. Mirrors CSS object-fit. */
  fit?: "cover" | "contain";
  /** Classes for the wrapper element (controls the box size). */
  className?: string;
  fetchPriority?: "high" | "low" | "auto";
  loading?: "lazy" | "eager";
};

/**
 * Shows an inline blurred placeholder immediately, then fades in the full
 * image once it has loaded. Both layers use the same object-fit so they align
 * (the placeholder shares the original's aspect ratio).
 */
export function ProgressiveImage({
  src,
  alt = "",
  fit = "cover",
  className = "",
  fetchPriority,
  loading,
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const placeholder = placeholderFor(src);
  const fitClass = fit === "cover" ? "object-cover" : "object-contain";

  useEffect(() => {
    setLoaded(false);
    if (imgRef.current?.complete) setLoaded(true);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {placeholder && (
        <img
          src={placeholder}
          alt=""
          aria-hidden
          className={`pointer-events-none absolute inset-0 h-full w-full scale-105 blur-lg transition-opacity duration-500 ${fitClass}`}
          style={{ opacity: loaded ? 0 : 1 }}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        decoding="async"
        fetchPriority={fetchPriority}
        loading={loading}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${fitClass}`}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}
