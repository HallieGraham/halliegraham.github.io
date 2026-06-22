import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProgressiveImage } from "@/components/ProgressiveImage";

const VIMEO_EMBED_SRC =
  "https://player.vimeo.com/video/1190994271?badge=0&autopause=0&player_id=0&app_id=58479";

export default function AboutPage() {
  const portrait = `${import.meta.env.BASE_URL}images/halliePortrait.jpg`;

  useEffect(() => {
    const existing = document.querySelector('script[data-vimeo-player="true"]');
    if (existing) return;

    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.dataset.vimeoPlayer = "true";
    document.body.appendChild(script);
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          About
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
         Hi! I’m Hallie Graham a recent 2026 graduate from Heriot-Watt University, School of Textile Design. 
Specialized in Print, I have a strong passion for dye mixing, hand printed techniques and colour. With a focus of mine being to translate imagery in a textural and interpretive way. I create in a multi-process design method, blending hand processes with digital applications to help create successful and well-rounded outcomes. Following a process led pathway, where experimentation of dyes, helps inform the design direction.

        </p>
      </header>

      <section className="flex flex-col gap-5" aria-label="About Hallie Graham">
        {/* A–C left (portrait above video) | B right (studio practice) */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,260px)_1fr] md:items-stretch">
          <div className="flex flex-col gap-5">
            <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="relative mx-auto aspect-[4/5] max-h-44 w-full max-w-[200px] overflow-hidden bg-neutral-100">
                <ProgressiveImage
                  src={portrait}
                  alt="Portrait of Hallie Graham"
                  fit="cover"
                  className="h-full w-full"
                  loading="eager"
                />
              </div>
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-semibold text-neutral-900">Hallie Graham</h2>
                    <p className="mt-0.5 text-xs text-neutral-500">Textile & print designer</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-600">
                    UK
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  <Link
                    to="/work"
                    className="inline-flex items-center rounded-full bg-neutral-900 px-2.5 py-1 text-[10px] font-medium text-white transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    View work
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[10px] font-medium text-neutral-700 transition hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    Get in touch
                  </Link>
                </div>
              </div>
            </article>

            <article className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex flex-1 flex-col p-4">
                <h2 className="text-sm font-semibold text-neutral-900">Project video</h2>
                <p className="mt-1 text-xs text-neutral-500">Hallie Graham — studio work in motion.</p>

                <div className="relative mt-3 flex flex-1 items-center justify-center">
                  <div className="relative aspect-[9/16] w-full overflow-hidden rounded-lg bg-neutral-100">
                    <iframe
                      src={VIMEO_EMBED_SRC}
                      title="Hallie Graham Project Video"
                      className="absolute inset-0 h-full w-full border-0"
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>

          <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-sm font-semibold text-neutral-900">Studio practice</h2>

              <div className="mt-4 space-y-3 text-sm leading-relaxed text-neutral-600">
                <p>
                  I work primarily with manual printing methods. With in-depth technical knowledge of manual
                  screen printing and sublimation processes. With a firm grasp of different dyestuff and material
                  compositions. With understanding of Reactive Dye, Disperse Dye, Discharge, Devoré, Pigment as well as
                  digital print processes.
                </p>
                <p>
                  Exploring surface design, through experimentation with dyes and sketchbook development. I am particularly focused on the relationship between colour and movement, using dramatic brushstrokes to imply form. Expressing design through texture to create unique, interactive outcomes.
                </p>
                <p>
                  Each design is created through trailing and notetaking. Developing from initial studies and mark making to print room exploration to find its final form. Using a combination of handprint processes and digital design applications to create with all the authenticity of hand make work as well as the practicality and professionalism of digital technologies.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-600">
                  Print
                </span>
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-600">
                  Surface design
                </span>
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-600">
                  Hand processes
                </span>
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-600">
                  Digital tools
                </span>
              </div>
            </div>
          </article>
        </div>

        {/* D | E | F */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-stretch">
          <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-sm font-semibold text-neutral-900">Background</h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-600">
                <li>Work Placement at Joanna Kinnersly-Taylors design studio. Developing interpersonal client relation skills, industry management as well as observation of professional design and maker’s process. </li>
                <li>Proficient with a range of dyestuffs, substrates and physical and digital print processes.</li>
                <li>Experience and building skills in digital design software (AVA, Creative Cloud).</li>
                <li>BA (Hons) Design for Textiles Degree for Heriot-Watt School of Textile Design.</li>
              </ul>
            </div>
          </article>

          <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-sm font-semibold text-neutral-900">Achievements</h2>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-600">
                <li>Ba (Hons) Design For Textiles</li>
                <li> 2025 Worshipful Company of Dyers of the City of London - Prize for Excellence</li>
                <li>2026 Worshipful Company of Dyers of the City of London – 2nd Place Prize for Use of Colour</li>
              </ul>
            </div>
          </article>

          <article className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-sm font-semibold text-neutral-900">Exhibitions</h2>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-neutral-600">
                <li>Degree Show- Heriot Watt University 2026</li>
                <li>New Designers Exhibition- Business Design Centre, London 2026</li>
                <li>Worshipful Company of Dyers of the City of London- Dyers Hall, London 2025</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
