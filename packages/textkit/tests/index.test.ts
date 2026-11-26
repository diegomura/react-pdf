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
const BENGALI_FONT_PATH = path.resolve(__dirname, './assets/bengali.ttf');
const THAI_FONT_PATH = path.resolve(__dirname, './assets/thai.ttf');

const engines = {
  bidi,
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  fontSubstitution,
};

let font: Font;
let bengaliFont: Font;
let thaiFont: Font;

beforeAll(async () => {
  font = (await fontkit.open(LATIN_FONT_PATH)) as unknown as Font;
  bengaliFont = (await fontkit.open(BENGALI_FONT_PATH)) as unknown as Font;
  thaiFont = (await fontkit.open(THAI_FONT_PATH)) as unknown as Font;
});

const layout = (
  string: string,
  opts: { fontSize?: number; width?: number; font?: Font } = {},
) => {
  const { fontSize = 12, width = 500, font: f } = opts;
  const engine = layoutEngine(engines);

  const attributedString = {
    string,
    runs: [
      {
        start: 0,
        end: string.length,
        attributes: { font: [f ?? font], fontSize },
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

test('should produce glyphs for Bengali text', () => {
  const result = layout('বাংলা', { font: bengaliFont });
  const ids = getGlyphIds(result);
  const positions = getPositions(result);

  expect(ids).toHaveLength(5);
  expect(ids).toEqual([42, 54, 6, 47, 54]);
  expect(positions).toHaveLength(5);
  for (const pos of positions) {
    expect(pos.xAdvance).toBeGreaterThan(0);
  }
});

test('should produce correct glyphs for Bengali with vowel signs', () => {
  const result = layout('হোসেন', { font: bengaliFont });
  const ids = getGlyphIds(result);

  // হো decomposes: ে (2503) reorders before হ (2489) + া (2494)
  // সে decomposes: ে (2503) reorders before স (2488)
  // ন (2472)
  expect(ids).toEqual([418, 51, 54, 418, 50, 39]);
});

test('should produce positive advances for all Bengali glyphs', () => {
  const result = layout('মুফতি ইকবাল হোসেন নাটোরি', {
    font: bengaliFont,
  });
  const positions = getPositions(result);

  expect(positions.length).toBeGreaterThan(0);
  for (const pos of positions) {
    expect(pos.xAdvance).toBeGreaterThanOrEqual(0);
  }
});

test('should produce glyphs for Thai กำ', () => {
  const result = layout('กำ', { font: thaiFont });
  const ids = getGlyphIds(result);
  const positions = getPositions(result);

  // กำ (U+0E01 U+0E33) produces 3 glyphs due to Sara Am decomposition
  expect(ids).toHaveLength(3);
  expect(ids).toEqual([431, 759, 487]);
  expect(positions).toHaveLength(3);
});

test('should produce glyphs for Thai with Sara Am in longer text', () => {
  const result = layout('กำกก', { font: thaiFont });
  const ids = getGlyphIds(result);

  // กำ produces 3 glyphs, then กก produces 2
  expect(ids).toEqual([431, 759, 487, 431, 431]);
});

test('should produce glyphs for Thai with vowel marks', () => {
  const result = layout('สวัสดี', { font: thaiFont });
  const ids = getGlyphIds(result);

  expect(ids).toEqual([480, 477, 732, 480, 456, 753]);
});

test('should produce positive advances for all Thai glyphs', () => {
  const result = layout('สวัสดีครับ ยินดีต้อนรับ', { font: thaiFont });
  const positions = getPositions(result);

  expect(positions.length).toBeGreaterThan(0);
  for (const pos of positions) {
    expect(pos.xAdvance).toBeGreaterThanOrEqual(0);
  }
});
