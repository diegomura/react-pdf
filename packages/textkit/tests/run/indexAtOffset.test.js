import { describe, expect, test } from '@jest/globals';

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
      positions: [
        { xAdvance: 6 },
        { xAdvance: 5 },
        { xAdvance: 4 },
        { xAdvance: 3 },
        { xAdvance: 2 },
      ],
    };

    expect(indexAtOffset(run, 5)).toBe(0);
  });

  test('should return 0 if glyphs empty', () => {
    const run = {
      start: 5,
      end: 15,
      glyphs: [],
      positions: [
        { xAdvance: 6 },
        { xAdvance: 5 },
        { xAdvance: 4 },
        { xAdvance: 3 },
        { xAdvance: 2 },
      ],
    };

    expect(indexAtOffset(run, 5)).toBe(0);
  });

  test('should return correct index', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 114, codePoints: [114] }, // r
        { id: 101, codePoints: [101] }, // e
        { id: 109, codePoints: [109] }, // m
      ],
      positions: [
        { xAdvance: 6 },
        { xAdvance: 5 },
        { xAdvance: 4 },
        { xAdvance: 3 },
        { xAdvance: 2 },
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
      glyphs: [
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 64257, codePoints: [102, 105] }, // fi
        { id: 109, codePoints: [109] }, // m
      ],
      positions: [
        { xAdvance: 6 },
        { xAdvance: 5 },
        { xAdvance: 10 },
        { xAdvance: 3 },
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
