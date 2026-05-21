import type { ComponentType, SVGProps } from "react";
import { QRCode } from "@/components/shared-assets/qr-code";

type IconProps = SVGProps<SVGSVGElement>;

const EmailIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 7.5l8.5 6 8.5-6" />
  </svg>
);

const InstagramIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.25" cy="6.75" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const LinkedInIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    {...props}
  >
    <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.4 8.25h4.2V22H.4V8.25zm7.5 0h4.03v1.88h.06c.56-1.06 1.93-2.18 3.97-2.18 4.25 0 5.04 2.8 5.04 6.43V22h-4.2v-6.06c0-1.45-.03-3.31-2.02-3.31-2.02 0-2.33 1.58-2.33 3.21V22H7.9V8.25z" />
  </svg>
);

const EMAIL_ADDRESS = "HallieG1604@gmail.com";
const INSTAGRAM_HANDLE = "@hallieg.art";
const INSTAGRAM_URL = "https://www.instagram.com/hallieg.art/";
const LINKEDIN_URL = "https://www.linkedin.com/in/hallie-graham/";

type ContactChannel = {
  label: string;
  description: string;
  href: string;
  qrValue: string;
  external: boolean;
  Icon: ComponentType<IconProps>;
};

const CONTACT_CHANNELS: ContactChannel[] = [
  {
    label: "Email",
    description: EMAIL_ADDRESS,
    href: `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
      "Studio enquiry"
    )}`,
    qrValue: `mailto:${EMAIL_ADDRESS}`,
    external: false,
    Icon: EmailIcon,
  },
  {
    label: "Instagram",
    description: INSTAGRAM_HANDLE,
    href: INSTAGRAM_URL,
    qrValue: INSTAGRAM_URL,
    external: true,
    Icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    description: "Hallie Graham",
    href: LINKEDIN_URL,
    qrValue: LINKEDIN_URL,
    external: true,
    Icon: LinkedInIcon,
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Contact
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
        Please get in touch!
        </p>
      </header>

      <section
        className="grid gap-5 lg:grid-cols-3"
        aria-label="Contact information"
      >
        <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md lg:col-span-2">
          <div className="p-6">
            <h2 className="text-sm font-semibold text-neutral-900">Get in touch</h2>
            <p className="mt-1 text-xs text-neutral-500">
              Pick the channel that suits you best.
            </p>

            <ul className="mt-5 space-y-3">
              {CONTACT_CHANNELS.map(
                ({ label, description, href, qrValue, external, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={`${label} — ${description}`}
                      className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition group-hover:bg-neutral-900 group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-neutral-900">
                          {label}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-neutral-500">
                          {description}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="overflow-hidden rounded-md border border-neutral-200 bg-white transition group-hover:border-neutral-300"
                      >
                        <QRCode value={qrValue} size="md" />
                      </span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </article>

        <div className="flex flex-col gap-5">
          <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="p-6">
              <h2 className="text-sm font-semibold text-neutral-900">Availability</h2>
              <p className="mt-1 text-xs text-neutral-500">
                Based in Glasgow,Scotland.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              Available for commission, collaborations and exhibitions.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-600">
                  Commissions
                </span>
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-600">
                  Collaborations
                </span>
                <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-2 py-1 text-[11px] font-medium text-neutral-600">
                  Exhibitions
                </span>
              </div>
            </div>
          </article>

        
        </div>
      </section>
    </main>
  );
}
