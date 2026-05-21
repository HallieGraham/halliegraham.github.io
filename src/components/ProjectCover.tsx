import { useEffect, useState } from "react";

const HOVER_INTERVAL_MS = 700;

type ProjectCoverProps = {
  images: string[];
};

/**
 * Portfolio grid only: cycles images on hover with a short crossfade (no thumbnails / lightbox).
 */
export function ProjectCover({ images }: ProjectCoverProps) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!hovering || images.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, HOVER_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [hovering, images.length]);

  if (images.length === 0) {
    return <div className="aspect-[4/3] w-full bg-neutral-100" aria-hidden />;
  }

  return (
    <div
      className="relative isolate aspect-[4/3] w-full cursor-default overflow-hidden bg-neutral-100"
      onMouseEnter={() => {
        setHovering(true);
        setActive(0);
      }}
      onMouseLeave={() => {
        setHovering(false);
        setActive(0);
      }}
    >
      {images.map((src, i) => (
        <img
          key={`${src}-${i}`}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-150 ease-out ${
            i === active ? "z-[1] opacity-100" : "z-0 opacity-0"
          }`}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
        />
      ))}
      <div className="pointer-events-none absolute inset-0 z-[2] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
      </div>
    </div>
  );
}
