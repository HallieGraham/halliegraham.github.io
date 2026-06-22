import { IMAGE_PLACEHOLDERS } from "@/data/image-placeholders";

/**
 * Strip the Vite base path so a runtime URL maps to a placeholder key
 * (e.g. `/images/backgrounds/2.jpg` -> `images/backgrounds/2.jpg`).
 */
function placeholderKey(src: string): string {
  const base = import.meta.env.BASE_URL;
  let s = src.split("?")[0];
  if (base && base !== "/" && s.startsWith(base)) s = s.slice(base.length);
  return s.replace(/^\//, "");
}

/** Inline blurred placeholder data URI for an image, if one was generated. */
export function placeholderFor(src: string): string | undefined {
  return IMAGE_PLACEHOLDERS[placeholderKey(src)];
}

/**
 * URL of the generated small `.thumb.webp` variant, or the original `src`
 * if no thumbnail exists for it.
 */
export function thumbFor(src: string): string {
  if (!(placeholderKey(src) in IMAGE_PLACEHOLDERS)) return src;
  return src.replace(/\.[^./?]+(\?.*)?$/, ".thumb.webp");
}
