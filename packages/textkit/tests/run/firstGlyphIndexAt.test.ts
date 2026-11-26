import { describe, expect, test } from 'vitest';

import firstGlyphIndexAt from '../../src/run/firstGlyphIndexAt';

describe('run firstGlyphIndexAt operator', () => {
  test('should return string index if no glyph indices present', () => {
    const run = { start: 0, end: 5, attributes: {} };

    expect(firstGlyphIndexAt(1, run)).toBe(1);
  });

  test('should return first glyph of a decomposed character', () => {
    const run = {
      start: 0,
      end: 4,
      attributes: {},
      stringIndices: [0, 2, 3, 5],
      glyphIndices: [0, 0, 1, 2, 2, 3],
    };

    expect(firstGlyphIndexAt(0, run)).toBe(0);
    expect(firstGlyphIndexAt(1, run)).toBe(2);
    expect(firstGlyphIndexAt(2, run)).toBe(3);
    expect(firstGlyphIndexAt(3, run)).toBe(5);
  });

  test('should return glyphs length when index is past the end', () => {
    const run = {
      start: 0,
      end: 2,
      attributes: {},
      stringIndices: [0, 2],
      glyphIndices: [0, 0, 1],
    };

    expect(firstGlyphIndexAt(2, run)).toBe(3);
  });
});
