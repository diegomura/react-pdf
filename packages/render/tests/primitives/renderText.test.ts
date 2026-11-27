import { describe, expect, test, vi } from 'vitest';

import createCTX from '../ctx';
import renderText from '../../src/primitives/renderText';
import renderSvgText from '../../src/primitives/renderSvgText';

const embedded: any = {
  type: 'TTF',
  ascent: 900,
  descent: -200,
  xHeight: 500,
  capHeight: 700,
  glyphForCodePoint: () => ({ id: 0 }),
};
const helvetica: any = {
  type: 'STANDARD',
  fullName: 'Helvetica',
  ascent: 900,
  descent: -200,
  xHeight: 500,
  capHeight: 700,
  glyphForCodePoint: () => ({ id: 0 }),
};

const glyph: any = { id: 65, advanceWidth: 500 };
const position: any = { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 };

const run = (font: any, glyphs: any[], extra: any = {}): any => ({
  start: 0,
  end: glyphs.length,
  attributes: { font: [font], fontSize: 12, color: 'black', ...extra },
  glyphs,
  positions: glyphs.map(() => position),
  xAdvance: glyphs.length * 6,
});

// A paragraph's trailing "\n" has no glyph in most fonts, so font substitution
// gives it the last fallback (Helvetica). It is measured, then removed from the
// line, leaving a run with no glyphs set in Helvetica.
const lineWithEmptyTrailingRun = (extra: any = {}): any => ({
  box: { x: 0, y: 0, width: 100, height: 14 },
  runs: [run(embedded, [glyph]), run(helvetica, [], extra)],
});

const createGlyphsCTX = () => {
  const ctx = createCTX();
  ctx.glyphs = vi.fn();
  return ctx;
};

describe('renderText', () => {
  test('selects no font for a run with no glyphs', () => {
    const ctx = createGlyphsCTX();
    const node: any = {
      box: { top: 0, left: 0 },
      lines: [lineWithEmptyTrailingRun()],
    };

    renderText(ctx, node);

    expect(ctx.font).toHaveBeenCalledTimes(1);
    expect(ctx.font).toHaveBeenCalledWith(embedded, 12);
    expect(ctx.glyphs).toHaveBeenCalledTimes(1);
  });

  test('still advances past a run with no glyphs', () => {
    const ctx = createGlyphsCTX();
    const node: any = {
      box: { top: 0, left: 0 },
      lines: [lineWithEmptyTrailingRun()],
    };

    renderText(ctx, node);

    expect(ctx.translate).toHaveBeenCalledWith(6, 0);
    expect(ctx.translate).toHaveBeenCalledWith(0, 0);
  });

  test("still adds an empty run's link", () => {
    const ctx = createGlyphsCTX();
    const node: any = {
      box: { top: 0, left: 0 },
      lines: [lineWithEmptyTrailingRun({ link: 'https://example.com' })],
    };

    renderText(ctx, node);

    expect(ctx.link).toHaveBeenCalledTimes(1);
  });
});

describe('renderSvgText', () => {
  test('selects no font for a run with no glyphs', () => {
    const ctx = createGlyphsCTX();
    const node: any = {
      children: [
        {
          props: {},
          lines: [{ ...lineWithEmptyTrailingRun(), xAdvance: 6 }],
        },
      ],
    };

    renderSvgText(ctx, node);

    expect(ctx.font).toHaveBeenCalledTimes(1);
    expect(ctx.font).toHaveBeenCalledWith(embedded, 12);
    expect(ctx.glyphs).toHaveBeenCalledTimes(1);
  });
});
