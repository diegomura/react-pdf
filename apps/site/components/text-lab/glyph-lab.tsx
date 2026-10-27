'use client';

import { useMemo, useState } from 'react';

import { useFont } from './font';
import { Lab, TextInput, Toggle } from './ui';

const DEFAULT_TEXT = 'office fjord AVA To';

const useShaping = (text: string, kern: boolean, liga: boolean) => {
  const font = useFont();

  return useMemo(() => {
    if (!font) return null;

    // fontkit mutates the feature object it is handed, so it gets a fresh one
    const run = font.layout(text || ' ', { kern, liga });

    let x = 0;

    const cells = run.glyphs.map((glyph, index) => {
      const position = run.positions[index];
      const chars = String.fromCodePoint(...glyph.codePoints);
      const cell = {
        key: index,
        id: glyph.id,
        chars,
        x,
        offset: position.xOffset,
        advance: position.xAdvance,
        natural: glyph.advanceWidth,
        kerning: position.xAdvance - glyph.advanceWidth,
        outline: glyph.path.toSVG(),
      };

      x += position.xAdvance;

      return cell;
    });

    const chars = cells.flatMap((cell) =>
      [...cell.chars].map((char) => ({ char, cell })),
    );

    return {
      cells,
      chars,
      content: x,
      // a short string would otherwise give the svg a portrait aspect ratio and,
      // at width:100%, a height several times the width of the article
      width: Math.max(x, 7 * font.unitsPerEm),
      em: font.unitsPerEm,
      ascent: font.ascent,
      descent: font.descent,
      kerned: cells.filter((cell) => cell.kerning !== 0).length,
      ligatures: cells.filter((cell) => cell.chars.length > 1).length,
    };
  }, [font, text, kern, liga]);
};

const plural = (count: number, noun: string) =>
  `${count} ${noun}${count === 1 ? '' : 's'}`;

const caption = (model: NonNullable<ReturnType<typeof useShaping>>) => {
  const { chars, cells, ligatures, kerned } = model;

  return [
    `${plural(chars.length, 'character')} shape into ${plural(cells.length, 'glyph')}.`,
    ligatures > 0 &&
      `${ligatures} of them ${ligatures === 1 ? 'covers' : 'cover'} more than one character.`,
    kerned > 0
      ? `${plural(kerned, 'pair')} ${kerned === 1 ? 'is' : 'are'} kerned, which is why the character row above is evenly spaced and the glyph row below is not.`
      : 'Nothing here is kerned, so both rows line up.',
  ]
    .filter(Boolean)
    .join(' ');
};

export function GlyphLab() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [kern, setKern] = useState(true);
  const [liga, setLiga] = useState(true);

  const model = useShaping(text, kern, liga);

  const controls = (
    <>
      <TextInput label="Text" value={text} onChange={setText} />
      <div className="flex items-center gap-2">
        <Toggle label="kern" checked={kern} onChange={setKern} />
        <Toggle label="liga" checked={liga} onChange={setLiga} />
      </div>
    </>
  );

  if (!model) {
    return (
      <Lab controls={controls}>
        <div className="bg-fd-muted h-40 animate-pulse rounded-lg" />
      </Lab>
    );
  }

  const { em, ascent, descent, cells, chars, width, content } = model;
  const origin = (width - content) / 2;

  const chipHeight = 0.5 * em;
  const gap = 0.55 * em;
  const labelRow = 0.5 * em;
  const pad = 0.14 * em;

  const bandHeight = ascent - descent;
  const baseline = ascent;
  const chipY = -(gap + chipHeight);

  const chipWidth = Math.min(0.8 * em, width / Math.max(chars.length, 1));
  const chipX0 = (width - chipWidth * chars.length) / 2;

  const viewBox = [
    -pad,
    chipY - pad,
    width + pad * 2,
    chipHeight + gap + bandHeight + labelRow + pad * 2,
  ].join(' ');

  if (!text) {
    return (
      <Lab controls={controls}>
        <div className="text-fd-muted-foreground flex h-40 items-center justify-center text-[0.8125rem]">
          Type something to shape it
        </div>
      </Lab>
    );
  }

  return (
    <Lab controls={controls} caption={caption(model)}>
      <svg
        viewBox={viewBox}
        className="text-fd-foreground w-full"
        role="img"
        aria-label={`The string "${text}" shaped into ${cells.length} glyphs`}
      >
        <g transform={`translate(${origin} 0)`}>
          {cells.map((cell, index) => (
            <g key={cell.key}>
              <rect
                x={cell.x}
                y={0}
                width={Math.max(cell.advance, 0)}
                height={bandHeight}
                className={
                  cell.chars.length > 1
                    ? 'fill-fd-primary/10 stroke-fd-primary/30'
                    : index % 2
                      ? 'fill-fd-muted/70 stroke-fd-border'
                      : 'fill-transparent stroke-fd-border'
                }
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              {cell.outline && (
                <path
                  d={cell.outline}
                  transform={`translate(${cell.x + cell.offset} ${baseline}) scale(1 -1)`}
                  className="fill-fd-foreground"
                />
              )}
              {cell.kerning !== 0 && (
                <rect
                  x={cell.x + Math.min(cell.advance, cell.natural)}
                  y={0}
                  width={Math.abs(cell.kerning)}
                  height={bandHeight}
                  className={
                    cell.kerning < 0
                      ? 'fill-fd-primary/25'
                      : 'fill-sky-500/25 dark:fill-sky-400/25'
                  }
                />
              )}
              {cell.advance > 0.3 * em && (
                <text
                  x={cell.x + cell.advance / 2}
                  y={bandHeight + labelRow * 0.72}
                  textAnchor="middle"
                  fontSize={0.26 * em}
                  className="fill-fd-muted-foreground font-mono"
                >
                  {cell.id}
                </text>
              )}
            </g>
          ))}

          <line
            x1={0}
            y1={baseline}
            x2={content}
            y2={baseline}
            className="stroke-fd-border"
            strokeDasharray="4 4"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {chars.map((entry, index) => {
          const x = chipX0 + index * chipWidth;
          const cx = x + chipWidth / 2;
          const target = origin + entry.cell.x + entry.cell.advance / 2;

          return (
            <g key={index}>
              <line
                x1={cx}
                y1={chipY + chipHeight}
                x2={target}
                y2={0}
                className={
                  entry.cell.chars.length > 1
                    ? 'stroke-fd-primary/60'
                    : 'stroke-fd-border'
                }
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <rect
                x={x + chipWidth * 0.08}
                y={chipY}
                width={chipWidth * 0.84}
                height={chipHeight}
                rx={chipHeight * 0.22}
                className="fill-fd-muted stroke-fd-border"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <text
                x={cx}
                y={chipY + chipHeight * 0.7}
                textAnchor="middle"
                fontSize={0.28 * em}
                className="fill-fd-muted-foreground font-mono"
              >
                {entry.char === ' ' ? '␣' : entry.char}
              </text>
            </g>
          );
        })}
      </svg>
    </Lab>
  );
}
