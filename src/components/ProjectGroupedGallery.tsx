import { useMemo } from "react";
import type { PortfolioGalleryGroup, PortfolioWork } from "@/data/portfolio-collections";
import { thumbFor } from "@/lib/images";

function workSrc(base: string, work: PortfolioWork) {
  return `${base}${work.imagePath.replace(/^\//, "")}`;
}

type ProjectGroupedGalleryProps = {
  groups: PortfolioGalleryGroup[];
  base: string;
  /** Highlights the thumbnail matching the main gallery selection. */
  selectedImagePath?: string;
  /** Fired when a thumbnail is chosen (updates main gallery + descriptions). */
  onSelectWork?: (work: PortfolioWork) => void;
};

export function ProjectGroupedGallery({
  groups,
  base,
  selectedImagePath,
  onSelectWork,
}: ProjectGroupedGalleryProps) {
  const hasWorks = useMemo(() => groups.some((g) => g.works.length > 0), [groups]);

  if (!hasWorks) return null;

  return (
    <section className="mt-10" aria-label="Full collection gallery">
      {groups.map((group) => (
        <div key={group.label} className="mb-10 last:mb-0">
          <h2 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
            {group.label}
          </h2>
          <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
            {group.works.map((work) => {
              const isSelected = selectedImagePath === work.imagePath;
              return (
                <li key={work.imagePath}>
                  <button
                    type="button"
                    onClick={() => onSelectWork?.(work)}
                    className={[
                      "group block w-full overflow-hidden rounded-md border-2 bg-neutral-100 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2",
                      isSelected
                        ? "border-neutral-900 ring-1 ring-neutral-900/20"
                        : "border-neutral-200 hover:border-neutral-300 hover:shadow-sm",
                    ].join(" ")}
                    aria-current={isSelected ? "true" : undefined}
                  >
                    <img
                      src={thumbFor(workSrc(base, work))}
                      alt={
                        work.title ||
                        work.imagePath.split("/").pop()?.replace(/\.[^.]+$/, "") ||
                        "Artwork"
                      }
                      className="aspect-[4/5] max-h-32 w-full object-cover transition duration-300 group-hover:scale-[1.05] sm:max-h-36"
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
