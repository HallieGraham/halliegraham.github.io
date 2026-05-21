import type { HTMLAttributes } from "react";
import { useEffect, useRef } from "react";
import QRCodeStyling, { type Options as QRCodeStylingOptions } from "qr-code-styling";
import { cx } from "@/utils/cx";

const QRCodeFrameHandle = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cx("size-3 rounded-tl border-t-2 border-l-2 border-brand_alt", className)}
  />
);

export const GradientScan = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={cx(
      "absolute bottom-0 h-1/2 w-full border-t border-brand bg-brand-solid/10",
      className
    )}
    style={{
      maskImage:
        "radial-gradient(52.19% 100% at 50% 0%, #000 0%, rgba(0,0,0,0) 95.31%)",
      WebkitMaskImage:
        "radial-gradient(52.19% 100% at 50% 0%, #000 0%, rgba(0,0,0,0) 95.31%)",
      ...props.style,
    }}
  />
);

/** Outer box matches padding + fixed QR pixels so layout never flexes unevenly across payloads. */
const styles = {
  md: {
    root: "box-border flex size-28 shrink-0 items-center justify-center p-2",
    qr: { width: 96, height: 96 },
  },
  lg: {
    root: "box-border flex size-[152px] shrink-0 items-center justify-center p-3",
    qr: { width: 128, height: 128 },
  },
} as const;

/** Force library output to fill our slot (different data lengths sometimes affect SVG sizing). */
const qrMountClass =
  "flex shrink-0 items-center justify-center overflow-hidden [&_canvas]:block [&_canvas]:!h-full [&_canvas]:!w-full [&_svg]:block [&_svg]:!h-full [&_svg]:!w-full";

interface QRCodeProps {
  value: string;
  options?: QRCodeStylingOptions;
  size?: "md" | "lg";
  className?: string;
}

export const QRCode = ({ size = "md", value, options, className }: QRCodeProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.innerHTML = "";

    const { width, height } = styles[size].qr;
    const qr = new QRCodeStyling({
      type: "svg",
      ...options,
      width,
      height,
      data: value,
    });

    qr.append(el);
    return () => {
      el.innerHTML = "";
    };
  }, [options, size, value]);

  return (
    <div className={cx("relative overflow-hidden", styles[size].root, className)}>
      <div
        ref={ref}
        className={qrMountClass}
        style={{
          width: styles[size].qr.width,
          height: styles[size].qr.height,
        }}
      />

      <QRCodeFrameHandle className="absolute top-0 left-0" />
      <QRCodeFrameHandle className="absolute top-0 right-0 rotate-90" />
      <QRCodeFrameHandle className="absolute right-0 bottom-0 rotate-180" />
      <QRCodeFrameHandle className="absolute bottom-0 left-0 -rotate-90" />
    </div>
  );
};
