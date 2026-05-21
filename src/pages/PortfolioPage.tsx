import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ProjectCover } from "@/components/ProjectCover";
import { getGridImagePaths, PORTFOLIO_COLLECTIONS } from "@/data/portfolio-collections";

type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  notes: string;
  tags: string[];
  images: string[];
};

export default function PortfolioPage() {
  const base = import.meta.env.BASE_URL;

  const projects: Project[] = useMemo(
    () =>
      PORTFOLIO_COLLECTIONS.map((collection) => ({
        id: collection.id,
        slug: collection.slug,
        title: collection.title,
        subtitle: collection.subtitle,
        notes: collection.notes,
        tags: collection.tags,
        images: getGridImagePaths(collection).map((p) => `${base}${p.replace(/^\//, "")}`),
      })),
    [base]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Complete Collection
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          A Series of Textile Print Collections
        </p>
      </header>

      <section
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        aria-label="Portfolio projects"
      >
        {projects.map((p, idx) => (
          <article
            key={p.slug}
            className="group scroll-mt-24 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Link
              to={`/portfolio/${p.slug}`}
              className="block text-left text-inherit no-underline outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label={`Open project: ${p.title}`}
            >
              <ProjectCover images={p.images} />

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-900 transition group-hover:text-neutral-800 group-hover:underline">
                      {p.title}
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500">{p.subtitle}</p>
                  </div>
                  {(idx === 0 || idx === 1) && (
                    <span className="mt-0.5 inline-flex shrink-0 items-center rounded-full bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-600">
                      Honours Project
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{p.notes}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
