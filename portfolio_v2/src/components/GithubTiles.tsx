const SIZE = 10;
const GAP = 3;
const STEP = SIZE + GAP;
const COLS = 90;
const ROWS = 48;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildTiles() {
  const rand = mulberry32(0x516174);
  let heat = 0.22;
  const cells: string[] = [];

  for (let col = 0; col < COLS; col++) {
    heat = Math.min(0.9, Math.max(0.08, heat + (rand() - 0.5) * 0.38));
    for (let row = 0; row < ROWS; row++) {
      const p = rand();
      const level =
        p < heat * 0.1 ? 4 : p < heat * 0.26 ? 3 : p < heat * 0.48 ? 2 : p < heat * 0.74 ? 1 : 0;
      const cls = level === 0 ? "t" : `a${level}`;
      cells.push(
        `<rect x="${col * STEP}" y="${row * STEP}" width="${SIZE}" height="${SIZE}" rx="2" class="${cls}"/>`,
      );
    }
  }

  const width = COLS * STEP;
  const height = ROWS * STEP;

  return `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <pattern id="gh-tiles" width="${width}" height="${height}" patternUnits="userSpaceOnUse">
        <style>
          .t{fill:var(--color-tile)}
          .a1{fill:var(--color-accent);opacity:.34}
          .a2{fill:var(--color-accent);opacity:.55}
          .a3{fill:var(--color-accent);opacity:.76}
          .a4{fill:var(--color-accent)}
        </style>
        ${cells.join("")}
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#gh-tiles)"/>
  </svg>`;
}

const tiles = buildTiles();

export function GithubTiles() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0 [&_svg]:h-full [&_svg]:w-full"
        dangerouslySetInnerHTML={{ __html: tiles }}
      />
      <div className="absolute inset-0 bg-background/95" />
    </div>
  );
}
