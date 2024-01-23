import { describe, expect, test } from 'vitest';

import pluck from '../internal/pluck';
import dropLast from '../../src/run/dropLast';

describe('run dropLast operator', () => {
  test('should have one less char', () => {
    const run = { start: 5, end: 10 };
    const result = dropLast(run);

    expect(result).toHaveProperty('start', 5);
    expect(result).toHaveProperty('end', 9);
  });

  test('should correctly drop last glyph', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] },
        { id: 111, codePoints: [111] },
        { id: 82, codePoints: [82] },
        { id: 74, codePoints: [74] },
        { id: 109, codePoints: [109] },
      ],
    };
    const result = dropLast(run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 4);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 82, 74]);
  });

  test('should correctly drop last position', () => {
    const run = {
      start: 0,
      end: 5,
      positions: [
        { xAdvance: 6 },
        { xAdvance: 7 },
        { xAdvance: 8 },
        { xAdvance: 9 },
        { xAdvance: 10 },
      ],
    };
    const result = dropLast(run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 4);
    expect(pluck('xAdvance', result.positions)).toEqual([6, 7, 8, 9]);
  });

  test('should correctly drop last glyph index', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] },
        { id: 111, codePoints: [111] },
        { id: 82, codePoints: [82] },
        { id: 74, codePoints: [74] },
        { id: 109, codePoints: [109] },
      ],
      glyphIndices: [0, 1, 2, 3, 4],
    };
    const result = dropLast(run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 4);
    expect(result.glyphIndices).toEqual([0, 1, 2, 3]);
  });
});
