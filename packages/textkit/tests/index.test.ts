import * as fontkit from 'fontkit';
import { fileURLToPath } from 'url';
import path from 'path';
import { describe, expect, test, beforeAll } from 'vitest';

import layoutEngine from '../src/index';
import bidi from '../src/engines/bidi';
import linebreaker from '../src/engines/linebreaker';
import justification from '../src/engines/justification';
import textDecoration from '../src/engines/textDecoration';
import scriptItemizer from '../src/engines/scriptItemizer';
import fontSubstitution from '../src/engines/fontSubstitution';
import type { Font } from '../src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LATIN_FONT_PATH = path.resolve(__dirname, './assets/latin.ttf');

const engines = {
  bidi,
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  fontSubstitution,
};

let font: Font;

beforeAll(async () => {
  font = (await fontkit.open(LATIN_FONT_PATH)) as unknown as Font;
});

const layout = (
  string: string,
  opts: { fontSize?: number; width?: number } = {},
) => {
  const { fontSize = 12, width = 500 } = opts;
  const engine = layoutEngine(engines);

  const attributedString = {
    string,
    runs: [
      {
        start: 0,
        end: string.length,
        attributes: { font: [font], fontSize },
      },
    ],
  };

  const container = { x: 0, y: 0, width, height: 1000 };

  return engine(attributedString, container);
};

const getGlyphs = (paragraphs: ReturnType<typeof layout>) => {
  return paragraphs.flatMap((lines) =>
    lines.flatMap((line) => line.runs.flatMap((run) => run.glyphs ?? [])),
  );
};

const getGlyphIds = (paragraphs: ReturnType<typeof layout>) => {
  return getGlyphs(paragraphs).map((g) => g.id);
};

const getGlyphCodePoints = (paragraphs: ReturnType<typeof layout>) => {
  return getGlyphs(paragraphs).map((g) => g.codePoints);
};

const getPositions = (paragraphs: ReturnType<typeof layout>) => {
  return paragraphs.flatMap((lines) =>
    lines.flatMap((line) => line.runs.flatMap((run) => run.positions ?? [])),
  );
};

describe('layoutEngine', () => {
  test('should handle empty string', () => {
    const result = layout('');
    const glyphs = getGlyphs(result);

    expect(glyphs).toHaveLength(0);
  });

  test('should produce correct glyphs for simple text', () => {
    const result = layout('Hello');
    const codePoints = getGlyphCodePoints(result);

    expect(codePoints).toEqual([[72], [101], [108], [108], [111]]);
  });

  test('should handle space characters', () => {
    const result = layout('a b');
    const codePoints = getGlyphCodePoints(result);

    expect(codePoints).toEqual([[97], [32], [98]]);
  });

  test('should produce positive xAdvance for all visible glyphs', () => {
    const result = layout('Hello');
    const positions = getPositions(result);

    expect(positions).toHaveLength(5);
    for (const pos of positions) {
      expect(pos.xAdvance).toBeGreaterThan(0);
    }
  });

  test('should produce different glyph ids for uppercase vs lowercase', () => {
    const resultUpper = layout('A');
    const resultLower = layout('a');
    const upperCodePoints = getGlyphCodePoints(resultUpper);
    const lowerCodePoints = getGlyphCodePoints(resultLower);

    expect(upperCodePoints).not.toBe(lowerCodePoints);
  });

  test('should scale glyph advances with font size', () => {
    const result12 = layout('A', { fontSize: 12 });
    const result24 = layout('A', { fontSize: 24 });
    const pos12 = getPositions(result12);
    const pos24 = getPositions(result24);

    // Doubling font size should double advances
    expect(pos24[0].xAdvance).toBeCloseTo(pos12[0].xAdvance * 2, 1);
  });

  test('should handle digits', () => {
    const result = layout('0123456789');
    const codePoints = getGlyphCodePoints(result);

    expect(codePoints).toHaveLength(10);
    expect(codePoints).toEqual([
      [48],
      [49],
      [50],
      [51],
      [52],
      [53],
      [54],
      [55],
      [56],
      [57],
    ]);
  });

  test('should handle accents', () => {
    const result = layout('café');
    const ids = getGlyphIds(result);

    expect(ids).toEqual([71, 69, 74, 675]);
  });

  test('should handle ligatures', () => {
    const result = layout('definition');
    const codePoints = getGlyphCodePoints(result);

    expect(codePoints).toHaveLength(9);
    expect(codePoints).toEqual([
      [100],
      [101],
      [102, 105],
      [110],
      [105],
      [116],
      [105],
      [111],
      [110],
    ]);
  });

  test('should handle longer ligatures', () => {
    const result = layout('ffi');
    const codePoints = getGlyphCodePoints(result);

    expect(codePoints).toHaveLength(1);
    expect(codePoints).toEqual([[102, 102, 105]]);
  });
});
