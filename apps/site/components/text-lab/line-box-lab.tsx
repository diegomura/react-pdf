'use client';

import { useMemo, useState } from 'react';

import { naturalHeight, useFont } from './font';
import { Lab, Legend, Slider } from './ui';

const TEXT = 'Typography is the craft of';
const SECOND = 'endowing human language';

const PAD = 18;
const LINES = 2;
const ZOOM = 2.6; // css pixels per point, so the box grows as fontSize does

export function LineBoxLab() {
  const font = useFont();
  const [fontSize, setFontSize] = useState(18);
  const [multiplier, setMultiplier] = useState(0);

  const model = useMemo(() => {
    if (!font) return null;

    const scale = fontSize / font.unitsPerEm;
    const ascent = font.ascent * scale;
    const descent = font.descent * scale;
    const lineGap = font.lineGap * scale;
    const natural = naturalHeight(font, fontSize);
    const height = multiplier ? multiplier * fontSize : natural;

    const shape = (text: string) => {
      const run = font.layout(text);
      const glyphs: { d: string; x: number }[] = [];
      let x = 0;

      run.glyphs.forEach((glyph, index) => {
        const outline = glyph.path.toSVG();
        if (outline) glyphs.push({ d: outline, x });
        x += run.positions[index].xAdvance * scale;
      });

      return { glyphs, width: run.advanceWidth * scale };
    };

    const lines = [shape(TEXT), shape(SECOND)];

    return {
      scale,
      ascent,
      descent,
      lineGap,
      natural,
      height,
      lines,
      // the box hugs the widest line, so growing fontSize can never overflow it
      column: Math.max(...lines.map((line) => line.width)) + fontSize,
    };
  }, [font, fontSize, multiplier]);

  const controls = (
    <>
      <Slider
        label="fontSize"
        value={fontSize}
        min={10}
        max={30}
        onChange={setFontSize}
        format={(value) => `${value} pt`}
      />
      <Slider
        label="lineHeight"
        value={multiplier}
        min={0}
        max={2.4}
        step={0.05}
        onChange={setMultiplier}
        format={(value) => (value ? value.toFixed(2) : 'auto')}
      />
    </>
  );

  if (!model) {
    return (
      <Lab controls={controls}>
        <div className="bg-fd-muted h-44 animate-pulse rounded-lg" />
      </Lab>
    );
  }

  const { ascent, descent, height, natural, lines, scale, column } = model;
  const boxHeight = Math.max(height, natural);
  const total = boxHeight * LINES;

  const viewBox = [-PAD, -PAD, column + PAD * 2, total + PAD * 2].join(' ');

  return (
    <Lab
      controls={controls}
      caption={
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <Legend
            items={[
              { color: 'bg-fd-primary/20', label: 'ascent' },
              { color: 'bg-sky-500/25', label: 'descent' },
              { color: 'bg-fd-muted-foreground/15', label: 'leading' },
            ]}
          />
          <span className="tabular-nums">
            {multiplier
              ? `height = lineHeight ${multiplier.toFixed(2)} × fontSize ${fontSize} = ${boxHeight.toFixed(2)} pt`
              : `height = lineGap ${model.lineGap.toFixed(2)} + ascent ${ascent.toFixed(2)} − descent (${descent.toFixed(2)}) = ${natural.toFixed(2)} pt`}
            , baseline {ascent.toFixed(2)} pt below the top
          </span>
        </div>
      }
    >
      <div className="flex min-h-[13rem] items-center justify-center">
        <svg
          viewBox={viewBox}
          width={(column + PAD * 2) * ZOOM}
          className="text-fd-foreground h-auto max-w-full"
          role="img"
          aria-label="Two lines of text with their line boxes, ascent, descent and leading drawn as bands"
        >
          {lines.map((line, index) => {
            const top = index * boxHeight;
            const baseline = top + ascent;

            return (
              <g key={index}>
                <rect
                  x={0}
                  y={top}
                  width={column}
                  height={ascent}
                  className="fill-fd-primary/20"
                />
                <rect
                  x={0}
                  y={baseline}
                  width={column}
                  height={-descent}
                  className="fill-sky-500/25"
                />
                <rect
                  x={0}
                  y={baseline - descent}
                  width={column}
                  height={Math.max(0, top + boxHeight - (baseline - descent))}
                  className="fill-fd-muted-foreground/15"
                />
                <rect
                  x={0}
                  y={top}
                  width={column}
                  height={boxHeight}
                  className="fill-none stroke-fd-border"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1={0}
                  y1={baseline}
                  x2={column}
                  y2={baseline}
                  className="stroke-fd-primary/70"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
                {line.glyphs.map((glyph, glyphIndex) => (
                  <path
                    key={glyphIndex}
                    d={glyph.d}
                    transform={`translate(${glyph.x + fontSize / 2} ${baseline}) scale(${scale} ${-scale})`}
                    className="fill-fd-foreground"
                  />
                ))}
              </g>
            );
          })}
        </svg>
      </div>
    </Lab>
  );
}
