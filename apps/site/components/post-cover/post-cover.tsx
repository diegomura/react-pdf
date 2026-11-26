/* Covers are drawn, not photographed: we have no art assets and can't fetch
   any. Every post gets its own picture of its own subject, sharing only the
   ground, the palette and the flat vector treatment. The warm field and its
   arcs are seeded from the slug; the drawing on top is composed by hand, so it
   never crops badly whatever aspect ratio it lands in. */

import type { ReactNode } from 'react';

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

const INK = 'fill-fd-foreground/[0.72] dark:fill-fd-foreground/[0.82]';
const TEXT = 'fill-fd-foreground/[0.16] dark:fill-fd-foreground/25';
const FAINT = 'fill-fd-foreground/[0.07] dark:fill-fd-foreground/[0.11]';
const RULE = 'stroke-fd-foreground/[0.16] dark:stroke-fd-foreground/25';
const PLATE = 'fill-fd-background stroke-fd-border dark:fill-fd-card';
const SHADOW = { filter: 'drop-shadow(0 3px 9px rgba(0,0,0,0.12))' };

/* The 2.4:1 hero crops this 320x200 box to y 33..167, so every drawing lives
   inside y 36..164 and nothing important is ever cut. */

// ---------------------------------------------------------------- glyph paths
// Roboto outlines, in font units with y pointing up. unitsPerEm 2048,
// cap height 1456, x-height 1082, descender -500.
const EM = { cap: 1456, xHeight: 1082, descender: 500 };

const ROBOTO_R =
  'M703 589L361 589L361 0L168 0L168 1456L650 1456Q896 1456 1028.5 1344Q1161 1232 1161 1018Q1161 882 1087.5 781Q1014 680 883 630L1225 12L1225 0L1019 0ZM361 746L656 746Q799 746 883.5 820Q968 894 968 1018Q968 1153 887.5 1225Q807 1297 655 1298L361 1298Z';
const ROBOTO_G =
  'M96 550Q96 803 213 952.5Q330 1102 523 1102Q721 1102 832 962L841 1082L1010 1082L1010 26Q1010 -184 885.5 -305Q761 -426 551 -426Q434 -426 322 -376Q210 -326 151 -239L247 -128Q366 -275 538 -275Q673 -275 748.5 -199Q824 -123 824 15L824 108Q713 -20 521 -20Q331 -20 213.5 133Q96 286 96 550ZM282 529Q282 346 357 241.5Q432 137 567 137Q742 137 824 296L824 790Q739 945 569 945Q434 945 358 840Q282 735 282 529Z';
const ROBOTO_BOLD_2 =
  'M1097 0L99 0L99 198L570 700Q667 806 713.5 885Q760 964 760 1035Q760 1132 711 1187.5Q662 1243 571 1243Q473 1243 416.5 1175.5Q360 1108 360 998L70 998Q70 1131 133.5 1241Q197 1351 313 1413.5Q429 1476 576 1476Q801 1476 925.5 1368Q1050 1260 1050 1063Q1050 955 994 843Q938 731 802 582L471 233L1097 233Z';
const ROBOTO_BOLD_V =
  'M516 353L717 1082L1019 1082L654 0L378 0L13 1082L315 1082Z';

const glyph = (d: string, x: number, baseline: number, scale: number) => ({
  d,
  transform: `translate(${x} ${baseline}) scale(${scale} ${-scale})`,
});

// ------------------------------------------------------------------- drawings

/** How react-pdf renders text: a type specimen on its metric rules. */
function specimen(): ReactNode {
  const scale = 0.06;
  const baseline = 130;
  const advanceR = 1261 * scale;
  const advanceG = 1149 * scale;

  // centred on the pair's total advance, which also lands the ink on 160
  const x = (320 - (advanceR + advanceG)) / 2;

  const cap = baseline - EM.cap * scale;
  const xHeight = baseline - EM.xHeight * scale;
  const descender = baseline + EM.descender * scale;

  return (
    <>
      <rect
        x={x + advanceR}
        y={cap}
        width={advanceG}
        height={descender - cap}
        className="fill-fd-primary/[0.09]"
      />

      {[cap, xHeight, descender].map((y) => (
        <line
          key={y}
          x1={34}
          y1={y}
          x2={286}
          y2={y}
          strokeWidth={1}
          strokeDasharray="3 4"
          className={RULE}
        />
      ))}
      <line
        x1={34}
        y1={baseline}
        x2={286}
        y2={baseline}
        strokeWidth={1.5}
        className="stroke-fd-primary/55"
      />

      {[x, x + advanceR, x + advanceR + advanceG].map((tick) => (
        <line
          key={tick}
          x1={tick}
          y1={cap - 9}
          x2={tick}
          y2={descender + 9}
          strokeWidth={1}
          className={RULE}
        />
      ))}

      <path {...glyph(ROBOTO_R, x, baseline, scale)} className={INK} />
      <path
        {...glyph(ROBOTO_G, x + advanceR, baseline, scale)}
        className={INK}
      />
    </>
  );
}

/** How react-pdf renders a document: the pipeline as a stack of passes. */
function layers(): ReactNode {
  const width = 148;
  const height = 13;
  const skew = 24;
  const bars = [0.5, 0.66, 0.42, 0.58, 0.72, 0.34];
  const x = 96;

  return (
    <g style={SHADOW}>
      {bars.map((bar, i) => {
        const y = 40 + i * 22;
        const output = i === bars.length - 1;
        const barWidth = width * bar;
        const barSkew = (skew * 4) / height;

        return (
          <g key={i}>
            <path
              d={`M${x} ${y} h${width} l${-skew} ${height} h${-width} Z`}
              strokeWidth={1}
              className={
                output ? 'fill-fd-primary/[0.16] stroke-fd-primary/55' : PLATE
              }
            />
            <path
              d={`M${x + 13} ${y + 4.5} h${barWidth} l${-barSkew} 4 h${-barWidth} Z`}
              className={
                output
                  ? 'fill-fd-primary/80'
                  : 'fill-fd-foreground/[0.22] dark:fill-fd-foreground/30'
              }
            />
          </g>
        );
      })}
    </g>
  );
}

/** Dropping the pdfkit fork: a long branch, finally merged back. */
function branch(): ReactNode {
  const trunk = 122;
  const fork = 198;

  return (
    <>
      <path
        d={`M${trunk} 32 L${trunk} 168`}
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
        className="stroke-fd-foreground/25 dark:stroke-fd-foreground/35"
      />
      <path
        d={`M${trunk} 64 C${trunk} 80 ${fork} 74 ${fork} 92 L${fork} 124 C${fork} 142 ${trunk} 138 ${trunk} 156`}
        strokeWidth={2}
        strokeDasharray="5 5"
        fill="none"
        className="stroke-fd-primary/55"
      />

      {[40, 64, 88, 112, 136].map((y) => (
        <circle
          key={y}
          cx={trunk}
          cy={y}
          r={5}
          strokeWidth={2}
          className="fill-fd-background stroke-fd-foreground/30 dark:fill-fd-card dark:stroke-fd-foreground/40"
        />
      ))}
      {[98, 118].map((y) => (
        <circle
          key={y}
          cx={fork}
          cy={y}
          r={4.5}
          className="fill-fd-primary/45"
        />
      ))}

      <circle cx={trunk} cy={156} r={7.5} className="fill-fd-primary/85" />
    </>
  );
}

/** Announcing v2.0: the version, set as a mark. */
function release(): ReactNode {
  const scale = 0.072;
  const baseline = 153;
  const x = 82; // "v2" measures 2210 units, so this centres the pair

  return (
    <>
      <path
        {...glyph(ROBOTO_BOLD_V, x, baseline, scale)}
        className="fill-fd-primary/45"
      />
      <path
        {...glyph(ROBOTO_BOLD_2, x + 1035 * scale, baseline, scale)}
        className="fill-fd-primary/85"
      />
    </>
  );
}

const SCENES: Record<string, () => ReactNode> = {
  'rendering-text': specimen,
  'rendering-process': layers,
  'dropping-the-pdfkit-fork': branch,
  'announcing-react-pdf-v2': release,
};

// --------------------------------------------------- fallback: a typeset page

const SHEET = { w: 132, h: 186, pad: 15 };

function page(rand: () => number): ReactNode {
  const inner = SHEET.w - SHEET.pad * 2;
  const limit = SHEET.h - 12;
  const blocks: { y: number; w: number; h: number; cut?: boolean }[] = [
    { y: 18, w: inner * (0.44 + rand() * 0.3), h: 5 },
  ];

  let y = 34;
  let figure = rand() < 0.8;

  while (y < limit) {
    if (figure && rand() < 0.45 && y + 46 < limit) {
      const h = 26 + Math.round(rand() * 16);
      blocks.push({ y, w: inner, h, cut: true });
      y += h + 12;
      figure = false;
      continue;
    }
    const lines = 3 + Math.floor(rand() * 4);
    for (let i = 0; i < lines && y < limit; i++) {
      const last = i === lines - 1;
      const w = last ? 0.36 + rand() * 0.3 : 0.9 + rand() * 0.1;
      blocks.push({ y, w: inner * w, h: 3 });
      y += 7;
    }
    y += 6;
  }

  return (
    <g transform={`translate(122 6) rotate(-5 66 93)`} style={SHADOW}>
      <rect
        width={SHEET.w}
        height={SHEET.h}
        rx="4"
        strokeWidth="1"
        className={PLATE}
      />
      {blocks.map((block, i) => (
        <rect
          key={i}
          x={SHEET.pad}
          y={block.y}
          width={block.w}
          height={block.h}
          rx={block.cut ? 2 : block.h / 2}
          className={block.cut ? FAINT : i === 0 ? 'fill-fd-primary/80' : TEXT}
        />
      ))}
    </g>
  );
}

export interface PostCoverProps {
  seed: string;
  className?: string;
}

export function PostCover({ seed, className }: PostCoverProps) {
  const rand = rng(hash(seed));
  const mirror = rand() < 0.5;
  const flipY = rand() < 0.5;
  const tint = 0.06 + rand() * 0.08;
  const hue = -12 + rand() * 30;
  const id = `cover-${hash(seed).toString(36)}`;
  const scene = SCENES[seed.split('/').pop() ?? ''];

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

      {scene ? scene() : page(rand)}
    </svg>
  );
}
