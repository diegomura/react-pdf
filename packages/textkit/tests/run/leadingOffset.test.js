import { describe, expect, test } from '@jest/globals';

import empty from '../../src/run/empty';
import leadingOffset from '../../src/run/leadingOffset';

describe('run leadingOffset operator', () => {
  test('should return zero for empty run', () => {
    const result = leadingOffset(empty());

    expect(result).toBe(0);
  });

  test('should return zero if no leafing spaces', () => {
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
        { xAdvance: 5 },
        { xAdvance: 6 },
        { xAdvance: 7 },
        { xAdvance: 8 },
        { xAdvance: 9 },
      ],
      glyphIndices: [0, 1, 2, 3, 4],
    };

    const result = leadingOffset(run);

    expect(result).toBe(0);
  });

  test('should return trailing space of one space', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 32, codePoints: [32] }, // space
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 114, codePoints: [114] }, // r
        { id: 101, codePoints: [101] }, // e
      ],
      positions: [
        { xAdvance: 5 },
        { xAdvance: 6 },
        { xAdvance: 7 },
        { xAdvance: 8 },
        { xAdvance: 9 },
      ],
      glyphIndices: [0, 1, 2, 3, 4],
    };

    const result = leadingOffset(run);

    expect(result).toBe(5);
  });

  test('should return trailing space of many spaces', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 32, codePoints: [32] }, // space
        { id: 32, codePoints: [32] }, // space
        { id: 32, codePoints: [32] }, // space
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
      ],
      positions: [
        { xAdvance: 5 },
        { xAdvance: 6 },
        { xAdvance: 7 },
        { xAdvance: 8 },
        { xAdvance: 9 },
      ],
      glyphIndices: [0, 1, 2, 3, 4],
    };

    const result = leadingOffset(run);

    expect(result).toBe(18);
  });
});
