export function Monogram({
  className,
  viewBox = "0 0 320 360",
  strokeWidth = 2.5,
  title,
}: {
  className?: string;
  viewBox?: string;
  strokeWidth?: number;
  title?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        d="M48 292 V68 L160 168 L272 68 V292"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
      />
      <path
        d="M118 196 H196 C214 196 226 208 226 224 C226 240 214 252 196 252 H124 C106 252 94 264 94 280 C94 296 106 308 124 308 H202"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
