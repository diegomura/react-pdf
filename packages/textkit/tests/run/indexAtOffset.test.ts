import { describe, expect, test } from 'vitest';

import indexAtOffset from '../../src/run/indexAtOffset';

describe('run indexAtOffset operator', () => {
  test('should return 0 if positions not present', () => {
    const run = { start: 0, end: 5, attributes: {} };

    expect(indexAtOffset(5, run)).toBe(0);
  });

  test('should return 0 if positions empty', () => {
    const run = { start: 0, end: 5, attributes: {}, positions: [] };

    expect(indexAtOffset(5, run)).toBe(0);
  });

  test('should return 0 if glyphs not present', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      positions: [
        { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 3, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 2, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(indexAtOffset(5, run)).toBe(0);
  });

  test('should return 0 if glyphs empty', () => {
    const run = {
      start: 5,
      end: 15,
      glyphs: [],
      attributes: {},
      positions: [
        { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 3, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 2, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(indexAtOffset(5, run)).toBe(0);
  });

  test('should return correct index', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 0, codePoints: [76] }, // l
        { id: 111, advanceWidth: 0, codePoints: [111] }, // o
        { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        { id: 101, advanceWidth: 0, codePoints: [101] }, // e
        { id: 109, advanceWidth: 0, codePoints: [109] }, // m
      ],
      positions: [
        { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 3, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 2, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(indexAtOffset(5, run)).toBe(0);
    expect(indexAtOffset(10, run)).toBe(1);
    expect(indexAtOffset(12, run)).toBe(2);
    expect(indexAtOffset(15, run)).toBe(3);
    expect(indexAtOffset(19, run)).toBe(4);
    expect(indexAtOffset(21, run)).toBe(5);
    expect(indexAtOffset(30, run)).toBe(5);
  });

  test('should return correct index with ligatures', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 0, codePoints: [76] }, // l
        { id: 111, advanceWidth: 0, codePoints: [111] }, // o
        { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
        { id: 109, advanceWidth: 0, codePoints: [109] }, // m
      ],
      positions: [
        { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 3, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(indexAtOffset(5, run)).toBe(0);
    expect(indexAtOffset(10, run)).toBe(1);
    expect(indexAtOffset(12, run)).toBe(2);
    expect(indexAtOffset(15, run)).toBe(2);
    expect(indexAtOffset(21, run)).toBe(4);
    expect(indexAtOffset(24, run)).toBe(5);
  });
});
