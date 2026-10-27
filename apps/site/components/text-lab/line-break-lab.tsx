'use client';

import { useMemo, useState } from 'react';
import layoutEngine, {
  bidi,
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
  fromFragments,
} from '@react-pdf/textkit';

import { greedyLines, raggedness } from './breaks';
import {
  isSpace,
  naturalHeight,
  useFont,
  type Font,
  type GlyphRun,
} from './font';
import { Lab, Legend, Segmented, Slider, Toggle } from './ui';

const ENGINE = layoutEngine({
  bidi,
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
});

const TEXT =
  'Knuth and Plass read a paragraph the way a compiler reads a program: not one line at a time, but all of it at once. Every space can stretch or shrink a little, every hyphenation point costs something, and the winning set of breaks is the one with the lowest total badness.';

const FONT_SIZE = 11;
const MIN_WIDTH = 150;
const MAX_WIDTH = 380;
const SLOTS = 10; // the tallest either algorithm gets, at MIN_WIDTH
const PAD = 16;

type DrawLine = {
  glyphs: { d: string; x: number }[];
  gaps: { x: number; width: number; grew: boolean }[];
  right: number;
};

/**
 * @param posScale points per position unit — 1 for textkit runs, which are
 *   already scaled, and fontSize/unitsPerEm for raw fontkit output
 * @param unitScale points per font unit, always fontSize/unitsPerEm
 */
const collect = (
  run: Pick<GlyphRun, 'glyphs' | 'positions'>,
  posScale: number,
  unitScale: number,
  startX: number,
  stretch: number,
): DrawLine => {
  const glyphs: DrawLine['glyphs'] = [];
  const gaps: DrawLine['gaps'] = [];

  let x = startX;
  let right = startX;

  run.glyphs.forEach((glyph, index) => {
    const position = run.positions[index];
    const advance =
      position.xAdvance * posScale + (isSpace(glyph) ? stretch : 0);

    if (isSpace(glyph)) {
      const natural = glyph.advanceWidth * unitScale;
      const extra = advance - natural;
      if (Math.abs(extra) > 0.15) {
        gaps.push({
          x: x + Math.min(natural, advance),
          width: Math.abs(extra),
          grew: extra > 0,
        });
      }
    } else {
      const outline = glyph.path.toSVG();
      if (outline)
        glyphs.push({ d: outline, x: x + position.xOffset * posScale });
      right = x + advance;
    }

    x += advance;
  });

  return { glyphs, gaps, right };
};

const useKnuthPlass = (font: Font | null, width: number, justify: boolean) =>
  useMemo(() => {
    if (!font) return null;

    const attributes = {
      font: [font],
      fontSize: FONT_SIZE,
      align: justify ? 'justify' : 'left',
    };

    const string = fromFragments([
      { string: TEXT, attributes },
    ] as unknown as Parameters<typeof fromFragments>[0]);

    const container = { x: 0, y: 0, width, height: Infinity };
    const blocks = ENGINE(string, container, {});

    // textkit already scaled every position into points, and its justification
    // engine already moved the extra width into the space advances, so nothing
    // here rescales or stretches anything.
    return blocks.flat().map((line) =>
      collect(
        {
          glyphs: line.runs.flatMap((run) => run.glyphs ?? []),
          positions: line.runs.flatMap((run) => run.positions ?? []),
        } as unknown as GlyphRun,
        1,
        FONT_SIZE / font.unitsPerEm,
        line.box?.x ?? 0,
        0,
      ),
    );
  }, [font, width, justify]);

const useGreedy = (font: Font | null, width: number, justify: boolean) =>
  useMemo(() => {
    if (!font) return null;

    const scale = FONT_SIZE / font.unitsPerEm;
    const measure = (line: string) => font.layout(line).advanceWidth * scale;
    const lines = greedyLines(TEXT, width, measure);

    return lines.map((line, index) => {
      const run = font.layout(line);
      const spaces = run.glyphs.filter(isSpace).length;
      const slack = width - run.advanceWidth * scale;
      const stretchable = justify && index < lines.length - 1 && spaces > 0;

      return collect(run, scale, scale, 0, stretchable ? slack / spaces : 0);
    });
  }, [font, width, justify]);

const score = (lines: DrawLine[] | null, width: number) =>
  lines
    ? raggedness(
        lines.map((line) => line.right),
        width,
      )
    : 0;

export function LineBreakLab() {
  const font = useFont();
  const [width, setWidth] = useState(260);
  const [mode, setMode] = useState<'knuth' | 'greedy'>('knuth');
  const [justify, setJustify] = useState(false);

  const knuth = useKnuthPlass(font, width, justify);
  const greedy = useGreedy(font, width, justify);

  const lines = mode === 'knuth' ? knuth : greedy;
  const lineHeight = font ? naturalHeight(font, FONT_SIZE) : 13;
  const ascent = font ? (font.ascent / font.unitsPerEm) * FONT_SIZE : 10;
  const scale = font ? FONT_SIZE / font.unitsPerEm : 1;

  const controls = (
    <>
      <Slider
        label="Column"
        value={width}
        min={MIN_WIDTH}
        max={MAX_WIDTH}
        onChange={setWidth}
        format={(value) => `${value} pt`}
      />
      <Segmented
        label="Breaks"
        value={mode}
        onChange={setMode}
        options={[
          { value: 'knuth', label: 'Knuth & Plass' },
          { value: 'greedy', label: 'Greedy' },
        ]}
      />
      <Toggle label="justify" checked={justify} onChange={setJustify} />
    </>
  );

  // the box is sized for the worst case so dragging the slider never resizes it,
  // and short paragraphs are centred in it rather than pinned to the top
  const offset = Math.max(0, (SLOTS - (lines?.length ?? 0)) / 2);

  const viewBox = [
    -PAD,
    -PAD,
    MAX_WIDTH + PAD * 2,
    SLOTS * lineHeight + PAD * 2,
  ].join(' ');

  return (
    <Lab
      controls={controls}
      caption={
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Legend
            items={[
              { color: 'bg-fd-muted-foreground/20', label: 'leftover space' },
              { color: 'bg-fd-primary/30', label: 'stretched space' },
            ]}
          />
          {/* every justified line is flush by definition, so the leftovers only
              mean something with justify off */}
          <span className="tabular-nums">
            {justify ? 'lines' : 'raggedness'}{' '}
            <b
              className={
                mode === 'knuth' ? 'text-fd-foreground' : 'font-normal'
              }
            >
              K&amp;P{' '}
              {justify
                ? (knuth?.length ?? 0)
                : Math.round(score(knuth, width)).toLocaleString('en-US')}
            </b>{' '}
            ·{' '}
            <b
              className={
                mode === 'greedy' ? 'text-fd-foreground' : 'font-normal'
              }
            >
              greedy{' '}
              {justify
                ? (greedy?.length ?? 0)
                : Math.round(score(greedy, width)).toLocaleString('en-US')}
            </b>
          </span>
        </div>
      }
    >
      <svg
        viewBox={viewBox}
        className="text-fd-foreground w-full"
        role="img"
        aria-label={`A paragraph broken into ${lines?.length ?? 0} lines in a ${width} point column`}
      >
        <line
          x1={0}
          y1={-PAD / 2}
          x2={0}
          y2={SLOTS * lineHeight + PAD / 2}
          className="stroke-fd-border"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1={width}
          y1={-PAD / 2}
          x2={width}
          y2={SLOTS * lineHeight + PAD / 2}
          className="stroke-fd-primary/50"
          strokeDasharray="3 3"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />

        {lines?.map((line, index) => {
          const top = (index + offset) * lineHeight;
          const baseline = top + ascent;

          return (
            <g key={index}>
              {line.right < width - 0.5 && (
                <rect
                  x={line.right}
                  y={top}
                  width={width - line.right}
                  height={lineHeight}
                  className="fill-fd-muted-foreground/15"
                />
              )}
              {line.gaps.map((gap, gapIndex) => (
                <rect
                  key={gapIndex}
                  x={gap.x}
                  y={baseline}
                  width={gap.width}
                  height={lineHeight - ascent}
                  className={
                    gap.grew ? 'fill-fd-primary/50' : 'fill-sky-500/50'
                  }
                />
              ))}
              {line.glyphs.map((glyph, glyphIndex) => (
                <path
                  key={glyphIndex}
                  d={glyph.d}
                  transform={`translate(${glyph.x} ${baseline}) scale(${scale} ${-scale})`}
                  className="fill-fd-foreground"
                />
              ))}
            </g>
          );
        })}
      </svg>
    </Lab>
  );
}
