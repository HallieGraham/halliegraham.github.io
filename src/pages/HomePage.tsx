import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PORTFOLIO_COLLECTIONS } from "@/data/portfolio-collections";
import RotatingText from "../components/RotatingText";

export default function HomePage() {
  const base = import.meta.env.BASE_URL;

  const talesProjectHref = useMemo(() => {
    const slug = PORTFOLIO_COLLECTIONS.find((c) => c.id === "tales-of-lost-wonder")?.slug;
    return slug ? `/portfolio/${slug}` : "/portfolio";
  }, []);

  const storiesProjectHref = useMemo(() => {
    const slug = PORTFOLIO_COLLECTIONS.find((c) => c.id === "stories-set-in-stone")?.slug;
    return slug ? `/portfolio/${slug}` : "/portfolio";
  }, []);

  const heroBackgrounds = useMemo(
    () => [
      `${base}images/backgrounds/2.jpg`,
      `${base}images/backgrounds/1.jpg`,
      `${base}images/backgrounds/3.jpeg`,
      `${base}images/backgrounds/4.jpg`,
      `${base}images/backgrounds/5.jpg`,
    ],
    [base]
  );

  const [heroBgIndex, setHeroBgIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroBgIndex((i) => {
        if (i >= heroBackgrounds.length - 1) return 1;
        return i + 1;
      });
    }, 2700);
    return () => window.clearInterval(id);
  }, [heroBackgrounds.length]);


 

  return (
    <main>
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden px-4 py-10 text-left text-white sm:px-6 lg:py-0">
        <div className="pointer-events-none absolute inset-0 z-0 isolate">
          {heroBackgrounds.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                i === heroBgIndex ? "z-[1] opacity-100" : "z-0 opacity-0"
              }`}
              decoding="async"
              fetchPriority={i === 0 ? "high" : "low"}
            />
          ))}
          <div className="absolute inset-0 z-[2] bg-black/45" aria-hidden />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl">
        <h1 className="mb-2 flex flex-wrap items-baseline gap-x-3 gap-y-3 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-8xl">HALLIE GRAHAM</h1>
          <h1 className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-3 text-3xl font-semibold tracking-tight sm:mb-10 sm:text-6xl lg:text-5xl">
           
            <span className="whitespace-nowrap">A Passion for</span>
            <RotatingText
              texts={["Textiles", "Print", "Colour", "Pattern", "Design"]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-white text-black overflow-hidden py-1 sm:py-1.5 md:py-2 justify-center rounded-lg inline-flex leading-[1.15]"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.02}
              splitLevelClassName="overflow-hidden pb-1 sm:pb-1.5 md:pb-1.5"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2700}
              splitBy="characters"
              auto
              loop
            />
          </h1>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-14">
            <div className="max-w-2xl">
              <div>
                <p className="text-sm font-medium leading-relaxed text-white/90 sm:text-lg">
                Printed Textile Designer who combines physical and digital design methods. With an emphasis on layered colour, technical knowledge and material compositions. Creating thoughtful designs to bring contemporary and innovative solutions to the market.
                </p>

                  {/*div is for button  */}
                <div className="mt-6 flex w-full max-w-sm flex-col items-stretch gap-3">
                <Link
                  to={talesProjectHref}
                  className="group inline-flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                >
                  <span>Tales of Lost Wonder</span>
                  <span className="text-neutral-500 transition group-hover:translate-x-0.5 group-hover:text-neutral-900">
                    →
                  </span>
                </Link>

                <Link
                  to={storiesProjectHref}
                  className="group inline-flex w-full items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3.5 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                >
                  <span>Stories Set in Stone</span>
                  <span className="text-neutral-500 transition group-hover:translate-x-0.5 group-hover:text-neutral-900">
                    →
                  </span>
                </Link>

                <Link
                  to="/portfolio"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                  >
                  <span>Complete Collection</span>
                
                </Link>

                <Link
                  to="/about"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-black/20 backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
                >
                  <span>About the Artist</span>
                
                </Link>
              </div>
              </div>
            </div>

          
          </div>
        </div>
      </section>

      

      <section className="px-4 py-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">About</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-neutral-600 sm:text-base">
        My focus is on translating imagery in a textural and interpretive way. I create in a multi-process design method, blending hand processes with digital applications to help create successful and well-rounded outcomes. Following a process led pathway, where experimentation of dyes, helps inform the design direction.
        </p>



       
 


          <Link
            to="/about"
            className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-700"
          >
            Read more →
          </Link>
          
      </section>

      <section className="bg-neutral-900 px-4 py-12 text-center text-white">
        <h2 className="text-2xl font-semibold tracking-tight">Get in touch</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-neutral-300 sm:text-base">
          For commissions, collaborations, or exhibitions, feel free to reach out.
        </p>

        <div className="mt-6">
          <Link to="/contact" className="inline-flex">
            <button
              type="button"
              className="rounded-md bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              Contact
            </button>
          </Link>
        </div>
      </section>
 
    </main>
  );
}

