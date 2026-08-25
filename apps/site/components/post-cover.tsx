/* Covers are drawn, not photographed: we have no art assets and can't fetch
   any, so every post gets a miniature typeset page — the thing this library
   actually makes — laid out deterministically from its slug. */

const SHEET = { w: 132, h: 186, pad: 15 };

const hash = (value: string) => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  }
  return h >>> 0;
};

const rng = (seed: number) => {
  let s = seed || 1;
  return () => {
    s = (s ^ (s << 13)) >>> 0;
    s = (s ^ (s >>> 17)) >>> 0;
    s = (s ^ (s << 5)) >>> 0;
    return s / 4294967296;
  };
};

type Block = {
  y: number;
  w: number;
  h: number;
  tone: keyof typeof TONE;
};

function typeset(rand: () => number) {
  const inner = SHEET.w - SHEET.pad * 2;
  const limit = SHEET.h - 12;
  const blocks: Block[] = [
    {
      y: 18,
      w: inner * (0.44 + rand() * 0.3),
      h: 5,
      tone: rand() < 0.6 ? 'accent' : 'head',
    },
  ];
  let y = 34;
  let figure = rand() < 0.8;

  while (y < limit) {
    if (figure && rand() < 0.45 && y + 46 < limit) {
      const h = 26 + Math.round(rand() * 16);
      blocks.push({ y, w: inner, h, tone: 'cut' });
      y += h + 12;
      figure = false;
      continue;
    }
    const lines = 3 + Math.floor(rand() * 4);
    for (let i = 0; i < lines && y < limit; i++) {
      const last = i === lines - 1;
      const w = last ? 0.36 + rand() * 0.3 : 0.9 + rand() * 0.1;
      blocks.push({ y, w: inner * w, h: 3, tone: 'text' });
      y += 7;
    }
    y += 6;
  }

  return blocks;
}

const TONE = {
  accent: 'fill-fd-primary/80',
  head: 'fill-fd-foreground/[0.28] dark:fill-fd-foreground/40',
  text: 'fill-fd-foreground/[0.16] dark:fill-fd-foreground/25',
  cut: 'fill-fd-foreground/[0.06] dark:fill-fd-foreground/10',
};

export function PostCover({
  seed,
  className,
}: {
  seed: string;
  className?: string;
}) {
  const rand = rng(hash(seed));
  const mirror = rand() < 0.5;
  const flipY = rand() < 0.5;
  const tilt = -8 + rand() * 16;
  const zoom = 0.86 + rand() * 0.5;
  const x = 116 + rand() * 52;
  const y = 4 + rand() * 34;
  const tint = 0.05 + rand() * 0.09;
  const hue = -12 + rand() * 30;
  const blocks = typeset(rand);
  const id = `cover-${hash(seed).toString(36)}`;

  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <defs>
        <radialGradient id={id} cx="0" cy="0" r="1">
          <stop
            offset="0"
            style={{ stopColor: 'var(--color-fd-primary)', stopOpacity: tint }}
          />
          <stop
            offset="1"
            style={{ stopColor: 'var(--color-fd-primary)', stopOpacity: 0 }}
          />
        </radialGradient>
      </defs>

      <rect
        width="320"
        height="200"
        className="fill-fd-muted dark:fill-fd-background"
      />
      <rect
        width="320"
        height="200"
        fill="#c98a5e"
        className="opacity-[0.09] dark:opacity-[0.05]"
      />

      <g
        transform={`${mirror ? 'translate(320 0) scale(-1 1)' : ''} ${flipY ? 'translate(0 200) scale(1 -1)' : ''}`}
      >
        <rect
          width="320"
          height="200"
          fill={`url(#${id})`}
          className="dark:opacity-75"
          style={{ filter: `hue-rotate(${hue}deg)` }}
        />

        <g fill="none" strokeWidth="1" className="stroke-fd-foreground/[0.1]">
          {[56, 96, 136, 176, 216, 256].map((r) => (
            <circle key={r} cx="0" cy="0" r={r} />
          ))}
        </g>
      </g>

      <g
        transform={`translate(${mirror ? 320 - x - SHEET.w * zoom : x} ${y}) scale(${zoom}) rotate(${tilt} 66 93)`}
      >
        <rect
          x="-18"
          y="9"
          width={SHEET.w}
          height={SHEET.h}
          rx="4"
          transform="rotate(-7 66 93)"
          className="fill-fd-background/70 stroke-fd-border dark:fill-fd-card/70"
          strokeWidth="1"
        />
        <g style={{ filter: 'drop-shadow(0 3px 9px rgba(0,0,0,0.12))' }}>
          <rect
            width={SHEET.w}
            height={SHEET.h}
            rx="4"
            className="fill-fd-background stroke-fd-border dark:fill-fd-card"
            strokeWidth="1"
          />
          {blocks.map((block, i) => (
            <rect
              key={i}
              x={SHEET.pad}
              y={block.y}
              width={block.w}
              height={block.h}
              rx={block.tone === 'cut' ? 2 : block.h / 2}
              className={TONE[block.tone]}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
