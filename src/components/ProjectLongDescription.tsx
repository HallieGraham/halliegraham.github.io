import { useEffect, useMemo, useState } from "react";

function firstTwoSentences(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  if (!sentences || sentences.length <= 2) return text.trim();
  return sentences.slice(0, 2).join(" ").trim();
}

type ProjectLongDescriptionProps = {
  text: string;
  /** Resets collapsed state when the project changes. */
  resetKey?: string;
};

export function ProjectLongDescription({ text, resetKey }: ProjectLongDescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const preview = useMemo(() => firstTwoSentences(text), [text]);
  const hasMore = preview.length < text.trim().length;

  useEffect(() => {
    setExpanded(false);
  }, [resetKey, text]);

  const buttonClass =
    "inline-flex items-center rounded-full border border-neutral-200 bg-white/95 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-sm transition hover:border-neutral-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/25 focus-visible:ring-offset-2";

  return (
    <div className="mt-4 w-full">
      <div className="relative">
        <p className="pr-0 text-sm leading-relaxed text-neutral-600 sm:text-base">
          {expanded ? text : preview}
        </p>
        {!expanded && hasMore && (
          <>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-white/80 to-white"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className={buttonClass}
                aria-expanded={false}
              >
                Expand description
              </button>
            </div>
          </>
        )}
      </div>
      {expanded && hasMore && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className={buttonClass}
            aria-expanded
          >
            Collapse description
          </button>
        </div>
      )}
    </div>
  );
}
