import { describe, expect, test } from 'vitest';

import pluck from '../internal/pluck';
import concat from '../../src/run/concat';
import { Glyph } from '../../src/types';

describe('run concat operator', () => {
  test('should concat with empty run return same run', () => {
    const runA = { start: 0, end: 5, attributes: {} };
    const runB = { start: 0, end: 0, attributes: {} };

    const result = concat(runA, runB);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 5);
  });

  test('should merge runs attributes', () => {
    const runA = {
      start: 0,
      end: 3,
      attributes: { font: [] },
    };
    const runB = {
      start: 3,
      end: 5,
      attributes: { fontSize: 16 },
    };

    const result = concat(runA, runB);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 5);
    expect(result).toHaveProperty('attributes', { font: [], fontSize: 16 });
  });

  test('should concat runs glyphs', () => {
    const runA = {
      start: 0,
      end: 3,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 10, codePoints: [76] }, // l
        { id: 111, advanceWidth: 10, codePoints: [111] }, // o
        { id: 114, advanceWidth: 10, codePoints: [114] }, // r
      ] as Glyph[],
    };
    const runB = {
      start: 3,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 101, advanceWidth: 10, codePoints: [101] }, // e
        { id: 109, advanceWidth: 10, codePoints: [109] }, // m
      ] as Glyph[],
    };

    const result = concat(runA, runB);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 5);
    expect(pluck('id', result.glyphs!)).toEqual([76, 111, 114, 101, 109]);
  });

  test('should concat runs positions', () => {
    const runA = {
      start: 0,
      end: 3,
      attributes: {},
      positions: [
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };
    const runB = {
      start: 3,
      end: 5,
      attributes: {},
      positions: [
        { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    const result = concat(runA, runB);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 5);
    expect(pluck('xAdvance', result.positions!)).toEqual([5, 6, 7, 8, 9]);
  });

  test('should concat runs glyph indices', () => {
    const runA = {
      start: 0,
      end: 3,
      attributes: {},
      glyphIndices: [0, 1, 2],
    };
    const runB = {
      start: 3,
      end: 5,
      attributes: {},
      glyphIndices: [0, 1],
    };

    const result = concat(runA, runB);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 5);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4]);
  });
});
