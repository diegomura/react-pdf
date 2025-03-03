import { describe, expect, test } from 'vitest';

import pluck from '../internal/pluck';
import dropLast from '../../src/run/dropLast';
import { Glyph } from '../../src/types';

describe('run dropLast operator', () => {
  test('should have one less char', () => {
    const run = { start: 5, end: 10, attributes: {} };
    const result = dropLast(run);

    expect(result).toHaveProperty('start', 5);
    expect(result).toHaveProperty('end', 9);
  });

  test('should correctly drop last glyph', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 0, codePoints: [76] },
        { id: 111, advanceWidth: 0, codePoints: [111] },
        { id: 82, advanceWidth: 0, codePoints: [82] },
        { id: 74, advanceWidth: 0, codePoints: [74] },
        { id: 109, advanceWidth: 0, codePoints: [109] },
      ] as Glyph[],
    };
    const result = dropLast(run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 4);
    expect(pluck('id', result.glyphs!)).toEqual([76, 111, 82, 74]);
  });

  test('should correctly drop last position', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      positions: [
        { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };
    const result = dropLast(run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 4);
    expect(pluck('xAdvance', result.positions!)).toEqual([6, 7, 8, 9]);
  });

  test('should correctly drop last glyph index', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      glyphs: [
        { id: 76, advanceWidth: 0, codePoints: [76] },
        { id: 111, advanceWidth: 0, codePoints: [111] },
        { id: 82, advanceWidth: 0, codePoints: [82] },
        { id: 74, advanceWidth: 0, codePoints: [74] },
        { id: 109, advanceWidth: 0, codePoints: [109] },
      ] as Glyph[],
      glyphIndices: [0, 1, 2, 3, 4],
    };
    const result = dropLast(run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 4);
    expect(result.glyphIndices).toEqual([0, 1, 2, 3]);
  });
});
