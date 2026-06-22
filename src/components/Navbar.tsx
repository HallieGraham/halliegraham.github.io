import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { getGridImagePaths, PORTFOLIO_COLLECTIONS } from "@/data/portfolio-collections";
import { thumbFor } from "@/lib/images";

const portfolioDropdownPanel = {
  hidden: { opacity: 0, y: -6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18 },
  },
};

type IconProps = { className?: string };

const EmailIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7.5l8.5 6 8.5-6" />
  </svg>
);

const InstagramIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.25" cy="6.75" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.4 8.25h4.2V22H.4V8.25zm7.5 0h4.03v1.88h.06c.56-1.06 1.93-2.18 3.97-2.18 4.25 0 5.04 2.8 5.04 6.43V22h-4.2v-6.06c0-1.45-.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 3.21V22H7.9V8.25z" />
  </svg>
);

const CONTACT_OPTIONS = [
  {
    label: "Email",
    href: "mailto:HallieG1604@gmail.com",
    external: false,
    Icon: EmailIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hallieg.art/",
    external: true,
    Icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    external: true,
    Icon: LinkedInIcon,
  },
] as const;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [portfolioHover, setPortfolioHover] = useState(false);
  const [contactHover, setContactHover] = useState(false);
  const location = useLocation();
  const assetBase = import.meta.env.BASE_URL;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const navItems = useMemo(
    () => [
      { to: "/", label: "Home", end: true },
      { to: "/portfolio", label: "Portfolio" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
    []
  );

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "relative inline-flex items-center rounded-md px-2 py-1 text-sm font-medium transition",
      "text-neutral-600 hover:text-neutral-900",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
      "after:absolute after:inset-x-2 after:-bottom-0.5 after:h-[2px] after:rounded-full after:transition after:content-['']",
      isActive
        ? "text-neutral-900 after:bg-neutral-900 after:opacity-100"
        : "after:bg-neutral-900 after:opacity-0 hover:after:opacity-100",
    ].join(" ");

  const collectionLinkActive = (slug: string) => location.pathname === `/portfolio/${slug}`;

  const portfolioNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    linkClass({
      isActive:
        isActive ||
        location.pathname.startsWith("/portfolio/"),
    });

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b border-neutral-200/70",
        "bg-white",
        "transition-shadow",
        scrolled ? "shadow-sm shadow-black/5" : "shadow-none",
      ].join(" ")}
    >
      <div
        className="flex h-16 w-full items-center justify-between px-4 sm:px-6"
        style={{ color: "rgba(0, 0, 0, 1)" }}
      >
        <NavLink
          to="/"
          className="inline-flex items-center rounded-md px-1 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          onClick={() => setMenuOpen(false)}
        >
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: "var(--chart-2)" }}
          >
            Hallie Graham
          </span>
        </NavLink>

        <nav
          className="hidden self-stretch items-center gap-2 sm:flex"
          aria-label="Primary"
        >
          {navItems.map((item) =>
            item.to === "/contact" ? (
              <div
                key={item.to}
                className="relative flex items-center self-stretch"
                onMouseEnter={() => setContactHover(true)}
                onMouseLeave={() => setContactHover(false)}
              >
                <NavLink to="/contact" className={linkClass}>
                  {item.label}
                </NavLink>
                <div
                  className={[
                    "absolute right-0 top-full z-50 -mt-px",
                    contactHover ? "pointer-events-auto" : "pointer-events-none",
                  ].join(" ")}
                  role="menu"
                  aria-label="Contact options"
                  aria-hidden={!contactHover}
                >
                  <motion.div
                    variants={portfolioDropdownPanel}
                    initial="hidden"
                    animate={contactHover ? "show" : "hidden"}
                    className="overflow-hidden rounded-b-xl border-x border-b border-neutral-200/70 bg-white py-1 shadow-lg shadow-black/10"
                  >
                    <ul className="py-1">
                      {CONTACT_OPTIONS.map((opt) => {
                        const Icon = opt.Icon;
                        return (
                          <li key={opt.label} role="none">
                            <a
                              role="menuitem"
                              href={opt.href}
                              target={opt.external ? "_blank" : undefined}
                              rel={opt.external ? "noopener noreferrer" : undefined}
                              className="flex items-center justify-between gap-6 py-2.5 pl-4 pr-2 text-left text-sm font-medium text-neutral-800 transition hover:bg-neutral-50 hover:text-neutral-900"
                            >
                              <span>{opt.label}</span>
                              <Icon className="h-4 w-4 shrink-0 text-neutral-500" />
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                </div>
              </div>
            ) : item.to === "/portfolio" ? (
              <div
                key={item.to}
                className="relative flex items-center self-stretch"
                onMouseEnter={() => setPortfolioHover(true)}
                onMouseLeave={() => setPortfolioHover(false)}
              >
                <NavLink to="/portfolio" className={portfolioNavLinkClass}>
                  {item.label}
                </NavLink>
                <div
                  className={[
                    "absolute right-0 left-auto top-full z-50 -mt-px w-[min(280px,calc(100vw-3rem))] max-w-[calc(100vw-3rem)]",
                    portfolioHover ? "pointer-events-auto" : "pointer-events-none",
                  ].join(" ")}
                  role="menu"
                  aria-label="Portfolio collections"
                  aria-hidden={!portfolioHover}
                >
                  <motion.div
                    variants={portfolioDropdownPanel}
                    initial="hidden"
                    animate={portfolioHover ? "show" : "hidden"}
                    className="overflow-hidden rounded-b-xl border-x border-b border-neutral-200/70 bg-white py-1 shadow-lg shadow-black/10"
                  >
                    <ul className="max-h-[min(70vh,22rem)] overflow-y-auto py-1">
                      {PORTFOLIO_COLLECTIONS.map((c) => {
                        const active = collectionLinkActive(c.slug);
                        const coverPath = getGridImagePaths(c, 1)[0];
                        const coverSrc = coverPath
                          ? `${assetBase}${coverPath.replace(/^\//, "")}`
                          : null;
                        return (
                          <li key={c.id} role="none">
                            <Link
                              role="menuitem"
                              to={`/portfolio/${c.slug}`}
                              className={[
                                "flex items-center gap-2 py-2 pl-2 pr-2 text-left transition",
                                active
                                  ? "bg-neutral-100 text-neutral-900"
                                  : "text-neutral-800 hover:bg-neutral-50",
                              ].join(" ")}
                            >
                              <div className="min-w-0 flex-1">
                                <span className="block truncate text-sm font-medium">{c.title}</span>
                                <span className="mt-0.5 block truncate text-xs leading-snug text-neutral-500">
                                  {c.subtitle}
                                </span>
                              </div>
                              {coverSrc ? (
                                <img
                                  src={thumbFor(coverSrc)}
                                  alt=""
                                  className={[
                                    "h-10 w-10 shrink-0 rounded-md object-cover",
                                    active ? "ring-1 ring-neutral-300" : "ring-1 ring-neutral-200/90",
                                  ].join(" ")}
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : (
                                <div
                                  className="h-10 w-10 shrink-0 rounded-md bg-neutral-100 ring-1 ring-neutral-200/80"
                                  aria-hidden
                                />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                </div>
              </div>
            ) : (
              <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
                {item.label}
              </NavLink>
            )
          )}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-neutral-700 transition hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={[
          "sm:hidden overflow-hidden border-t border-neutral-200/70",
          "bg-white",
          "transition-[max-height,opacity] duration-300",
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <div className="w-full px-4 py-3 sm:px-6">
          <div className="grid gap-1">
            {navItems.map((item) =>
              item.to === "/contact" ? (
                <div
                  key={item.to}
                  className="space-y-1 rounded-lg border border-neutral-100 bg-neutral-50/80 p-2"
                >
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                        isActive
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-800 hover:bg-white",
                      ].join(" ")
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-70">↵</span>
                  </NavLink>
                  <ul className="space-y-0.5 border-t border-neutral-200/80 pt-2">
                    {CONTACT_OPTIONS.map((opt) => {
                      const Icon = opt.Icon;
                      return (
                        <li key={opt.label}>
                          <a
                            href={opt.href}
                            target={opt.external ? "_blank" : undefined}
                            rel={opt.external ? "noopener noreferrer" : undefined}
                            className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm text-neutral-700 transition hover:bg-white"
                            onClick={() => setMenuOpen(false)}
                          >
                            <span>{opt.label}</span>
                            <Icon className="h-4 w-4 shrink-0 text-neutral-500" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : item.to === "/portfolio" ? (
                <div key={item.to} className="space-y-1 rounded-lg border border-neutral-100 bg-neutral-50/80 p-2">
                  <NavLink
                    to={item.to}
                    className={() =>
                      [
                        "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                        location.pathname === "/portfolio" ||
                        location.pathname.startsWith("/portfolio/")
                          ? "bg-neutral-900 text-white"
                          : "text-neutral-800 hover:bg-white",
                      ].join(" ")
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-70">↵</span>
                  </NavLink>
                  <ul className="space-y-0.5 border-t border-neutral-200/80 pt-2">
                    {PORTFOLIO_COLLECTIONS.map((c) => {
                      const active = collectionLinkActive(c.slug);
                      const coverPath = getGridImagePaths(c, 1)[0];
                      const coverSrc = coverPath
                        ? `${assetBase}${coverPath.replace(/^\//, "")}`
                        : null;
                      return (
                        <li key={c.id}>
                          <Link
                            to={`/portfolio/${c.slug}`}
                            className={[
                              "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition",
                              active
                                ? "bg-neutral-900 font-medium text-white"
                                : "text-neutral-700 hover:bg-white",
                            ].join(" ")}
                            onClick={() => setMenuOpen(false)}
                          >
                            <span className="min-w-0 flex-1 truncate">{c.title}</span>
                            {coverSrc ? (
                              <img
                                src={thumbFor(coverSrc)}
                                alt=""
                                className={[
                                  "h-9 w-9 shrink-0 rounded object-cover",
                                  active ? "ring-1 ring-white/35" : "ring-1 ring-neutral-200",
                                ].join(" ")}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <div
                                className={[
                                  "h-9 w-9 shrink-0 rounded bg-neutral-600/40",
                                  active ? "ring-1 ring-white/25" : "ring-1 ring-neutral-300",
                                ].join(" ")}
                                aria-hidden
                              />
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "text-neutral-800 hover:bg-neutral-100",
                    ].join(" ")
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{item.label}</span>
                  <span className="text-xs opacity-70">↵</span>
                </NavLink>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
