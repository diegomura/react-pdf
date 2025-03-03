import { describe, expect, test } from 'vitest';

import empty from '../../src/run/empty';
import trailingOffset from '../../src/run/trailingOffset';
import { Glyph } from '../../src/types';

describe('run trailingOffset operator', () => {
  test('should return zero for empty run', () => {
    const result = trailingOffset(empty());

    expect(result).toBe(0);
  });

  test('should return zero if no leafing spaces', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 10, codePoints: [76] }, // l
        { id: 111, advanceWidth: 10, codePoints: [111] }, // o
        { id: 114, advanceWidth: 10, codePoints: [114] }, // r
        { id: 101, advanceWidth: 10, codePoints: [101] }, // e
        { id: 109, advanceWidth: 10, codePoints: [109] }, // m
      ] as Glyph[],
      positions: [
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
      glyphIndices: [0, 1, 2, 3, 4],
    };

    const result = trailingOffset(run);

    expect(result).toBe(0);
  });

  test('should return trailing space of one space', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 10, codePoints: [76] }, // l
        { id: 111, advanceWidth: 10, codePoints: [111] }, // o
        { id: 114, advanceWidth: 10, codePoints: [114] }, // r
        { id: 101, advanceWidth: 10, codePoints: [101] }, // e
        { id: 32, advanceWidth: 10, codePoints: [32] }, // space
      ] as Glyph[],
      positions: [
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
      glyphIndices: [0, 1, 2, 3, 4],
    };

    const result = trailingOffset(run);

    expect(result).toBe(9);
  });

  test('should return trailing space of many spaces', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 10, codePoints: [76] }, // l
        { id: 111, advanceWidth: 10, codePoints: [111] }, // o
        { id: 32, advanceWidth: 10, codePoints: [32] }, // space
        { id: 32, advanceWidth: 10, codePoints: [32] }, // space
        { id: 32, advanceWidth: 10, codePoints: [32] }, // space
      ] as Glyph[],
      positions: [
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
      glyphIndices: [0, 1, 2, 3, 4],
    };

    const result = trailingOffset(run);

    expect(result).toBe(24);
  });
});
