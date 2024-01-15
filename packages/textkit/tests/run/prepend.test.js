import { describe, expect, test } from '@jest/globals';

import font from '../internal/font';
import pluck from '../internal/pluck';
import prepend from '../../src/run/prepend';

describe('run prepend glyph operator', () => {
  test('should return same run if no glyph provided', () => {
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
      attributes: { font, fontSize: 2 },
    };

    const result = prepend(null, run);

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 9]);
  });

  test('should prepend glyph at run', () => {
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
      attributes: { font, fontSize: 2 },
    };

    const glyph = { id: 105, codePoints: [105], advanceWidth: 10 }; // i
    const result = prepend(glyph, run);

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([105, 76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([10, 5, 6, 7, 8, 9]);
  });

  test('should prepend ligature glyph at run', () => {
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
      attributes: { font, fontSize: 2 },
    };

    const glyph = { id: 64257, codePoints: [102, 105], advanceWidth: 10 }; // fi
    const result = prepend(glyph, run); // filorem

    expect(result).toHaveProperty('glyphIndices', [0, 0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([64257, 76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([10, 5, 6, 7, 8, 9]);
  });

  test('should prepend glyph at run with ligature', () => {
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
        { xAdvance: 5 },
        { xAdvance: 6 },
        { xAdvance: 7 },
        { xAdvance: 8 },
      ],
      glyphIndices: [0, 1, 2, 2, 3],
      attributes: { font, fontSize: 2 },
    };

    const glyph = { id: 105, codePoints: [105], advanceWidth: 10 }; // i
    const result = prepend(glyph, run); // ilofim

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([105, 76, 111, 64257, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([10, 5, 6, 7, 8]);
  });

  test('should prepend ligature glyph before run ligature', () => {
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
        { xAdvance: 5 },
        { xAdvance: 6 },
        { xAdvance: 7 },
        { xAdvance: 8 },
      ],
      glyphIndices: [0, 1, 2, 2, 3],
      attributes: { font, fontSize: 2 },
    };

    const glyph = { id: 64259, codePoints: [102, 102, 105], advanceWidth: 10 }; // ffi
    const result = prepend(glyph, run); //  ffilofim

    expect(result).toHaveProperty('glyphIndices', [0, 0, 0, 1, 2, 3, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([64259, 76, 111, 64257, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([10, 5, 6, 7, 8]);
  });
});

describe('run prepend code point operator', () => {
  test('should return same run if no code point provided', () => {
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
      attributes: { font, fontSize: 2 },
    };

    const result = prepend(null, run);

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 9]);
  });

  test('should prepend code point at run', () => {
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
      attributes: { font, fontSize: 2 },
    };

    const result = prepend(105, run);

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([105, 76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([8, 5, 6, 7, 8, 9]);
  });

  test('should prepend ligature code point at run', () => {
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
      attributes: { font, fontSize: 2 },
    };

    const result = prepend(64257, run); // filorem

    expect(result).toHaveProperty('glyphIndices', [0, 0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([64257, 76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([10, 5, 6, 7, 8, 9]);
  });

  test('should prepend code point at run with ligature', () => {
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
        { xAdvance: 5 },
        { xAdvance: 6 },
        { xAdvance: 7 },
        { xAdvance: 8 },
      ],
      glyphIndices: [0, 1, 2, 2, 3],
      attributes: { font, fontSize: 2 },
    };

    const result = prepend(105, run); // ilofim

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([105, 76, 111, 64257, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([8, 5, 6, 7, 8]);
  });

  test('should prepend ligature code point before run ligature', () => {
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
        { xAdvance: 5 },
        { xAdvance: 6 },
        { xAdvance: 7 },
        { xAdvance: 8 },
      ],
      glyphIndices: [0, 1, 2, 2, 3],
      attributes: { font, fontSize: 2 },
    };

    const result = prepend(64259, run); //  ffilofim

    expect(result).toHaveProperty('glyphIndices', [0, 0, 0, 1, 2, 3, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([64259, 76, 111, 64257, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([10, 5, 6, 7, 8]);
  });
});
