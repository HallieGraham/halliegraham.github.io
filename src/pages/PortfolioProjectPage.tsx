import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { PortfolioWork } from "@/data/portfolio-collections";
import { Link, Navigate, useParams } from "react-router-dom";
import { CollectionImageGallery } from "@/components/CollectionImageGallery";
import { ProjectGroupedGallery } from "@/components/ProjectGroupedGallery";
import { ProjectLongDescription } from "@/components/ProjectLongDescription";
import {
  getCollectionBySlug,
  getDetailWorks,
  getGalleryGroups,
  PORTFOLIO_COLLECTIONS,
} from "@/data/portfolio-collections";

export default function PortfolioProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const base = import.meta.env.BASE_URL;

  const collection = useMemo(() => getCollectionBySlug(slug), [slug]);

  const works = useMemo(() => (collection ? getDetailWorks(collection) : []), [collection]);

  const galleryGroups = useMemo(
    () => (collection ? getGalleryGroups(collection) : []),
    [collection]
  );

  const images = useMemo(
    () => works.map((w) => `${base}${w.imagePath.replace(/^\//, "")}`),
    [works, base]
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const mainGalleryRef = useRef<HTMLElement>(null);

  const handleGroupedGallerySelect = useCallback(
    (work: PortfolioWork) => {
      const index = works.findIndex((w) => w.imagePath === work.imagePath);
      if (index < 0) return;
      setSelectedImageIndex(index);
      mainGalleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [works]
  );

  const selectedWork =
    works.length > 0
      ? works[Math.min(selectedImageIndex, works.length - 1)]
      : undefined;

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [slug]);

  if (!collection) {
    return <Navigate to="/portfolio" replace />;
  }

  const listIndex = PORTFOLIO_COLLECTIONS.findIndex((c) => c.id === collection.id);
  const showHonours = listIndex === 0 || listIndex === 1;

  return (
    <main className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
      <nav className="mb-3 sm:mb-4">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition hover:text-neutral-900"
        >
          <span aria-hidden>←</span>
          Complete Collection
        </Link>
      </nav>

      <header className="mb-2 sm:mb-3">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            {collection.title}
          </h1>
          {showHonours && (
            <span className="mt-1 inline-flex shrink-0 items-center rounded-full bg-neutral-100 px-2.5 py-1 text-[14px] font-medium text-neutral-600 sm:mt-2">
              Honours Project
            </span>
          )}
        </div>
        <p className="mt-3 w-full text-sm leading-relaxed text-neutral-600 sm:text-base">
          {collection.notes}
        </p>
        <p className="mt-2 w-full text-sm text-neutral-500 sm:text-base">{collection.subtitle}</p>
        {collection.longDescription && (
          <ProjectLongDescription text={collection.longDescription} resetKey={collection.slug} />
        )}
      </header>

      <article
        ref={mainGalleryRef}
        className="scroll-mt-20 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
      >
        <CollectionImageGallery
          images={images}
          imageTitles={works.map((w) => w.title)}
          lightboxCopyright="Hallie Graham"
          galleryKey={collection.slug}
          selectedIndex={selectedImageIndex}
          onSelectedIndexChange={setSelectedImageIndex}
        />

        <div className="p-4 sm:p-6">
          {selectedWork?.title && (
            <div aria-live="polite">
              <h2 className="text-base font-semibold tracking-tight text-neutral-900 sm:text-lg">
                {selectedWork.title}
              </h2>
              {selectedWork.subtitle && (
                <p className="mt-1 text-sm text-neutral-500 sm:text-base">{selectedWork.subtitle}</p>
              )}

              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                {(
                  [
                    ["Medium", selectedWork.medium],
                    ["Method", selectedWork.method],
                    ["Finishings", selectedWork.finishings],
                    ["Substrate", selectedWork.substrate],
                  ] as const
                )
                  .filter(([, value]) => value && value !== "—")
                  .map(([label, value]) => (
                    <div key={label} className="flex gap-2 sm:block">
                      <dt className="shrink-0 font-medium text-neutral-900">{label}:</dt>
                      <dd className="text-neutral-600">{value}</dd>
                    </div>
                  ))}
              </dl>

              {selectedWork.description && (
                <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
                  {selectedWork.description}
                </p>
              )}
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {collection.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-600"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </article>

      <ProjectGroupedGallery
        groups={galleryGroups}
        base={base}
        selectedImagePath={selectedWork?.imagePath}
        onSelectWork={handleGroupedGallerySelect}
      />
    </main>
  );
}
