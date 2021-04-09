import * as R from 'ramda';

import font from '../internal/font';
import remove from '../../src/run/remove';

describe('run remove glyph operator', () => {
  test('should return same run if invalid index provided', () => {
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

    const result = remove(10, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 5);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4]);
    expect(R.pluck('id', result.glyphs)).toEqual([76, 111, 114, 101, 109]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 9]);
  });

  test('should remove glyph at beggining of run', () => {
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

    const result = remove(0, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 4);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3]);
    expect(R.pluck('id', result.glyphs)).toEqual([111, 114, 101, 109]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([6, 7, 8, 9]);
  });

  test('should remove glyph at end of run', () => {
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

    const result = remove(4, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 4);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3]);
    expect(R.pluck('id', result.glyphs)).toEqual([76, 111, 114, 101]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8]);
  });

  test('should remove glyph at middle of run', () => {
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

    const result = remove(2, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 4);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3]);
    expect(R.pluck('id', result.glyphs)).toEqual([76, 111, 101, 109]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([5, 6, 8, 9]);
  });

  test('should remove ligature glyph at beggining of run', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 64257, codePoints: [102, 105] }, // fi
        { id: 111, codePoints: [111] }, // o
        { id: 101, codePoints: [101] }, // e
        { id: 109, codePoints: [109] }, // m
      ],
      positions: [
        { xAdvance: 10 },
        { xAdvance: 7 },
        { xAdvance: 8 },
        { xAdvance: 9 },
      ],
      glyphIndices: [0, 0, 1, 2, 3],
      attributes: { font, fontSize: 2 },
    };

    const result = remove(0, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 4);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3]);
    expect(R.pluck('id', result.glyphs)).toEqual([105, 111, 101, 109]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([8, 7, 8, 9]);
  });

  test.skip('should remove ligature glyph at end of run', () => {
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

    const glyph = { id: 64257, codePoints: [102, 105], advanceWidth: 10 }; // fi
    const result = remove(5, glyph, run); // loremfi

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 7);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5, 5]);
    expect(R.pluck('id', result.glyphs)).toEqual([
      76,
      111,
      114,
      101,
      109,
      64257,
    ]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 9, 10]);
  });

  test.skip('should remove ligature glyph at middle of run', () => {
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

    const glyph = { id: 64257, codePoints: [102, 105], advanceWidth: 10 }; // fi
    const result = remove(2, glyph, run); // lofirem

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 7);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 2, 3, 4, 5]);
    expect(R.pluck('id', result.glyphs)).toEqual([
      76,
      111,
      64257,
      114,
      101,
      109,
    ]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([5, 6, 10, 7, 8, 9]);
  });

  test.skip('should remove glyph before run ligature', () => {
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
    };

    const glyph = { id: 105, codePoints: [105], advanceWidth: 10 }; // i
    const result = remove(2, glyph, run); // liofim

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 6);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 3, 4]);
    expect(R.pluck('id', result.glyphs)).toEqual([76, 111, 105, 64257, 109]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([5, 6, 10, 7, 8]);
  });

  test.skip('should remove glyph after run ligature', () => {
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
    };

    const glyph = { id: 105, codePoints: [105], advanceWidth: 10 }; // i
    const result = remove(4, glyph, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 6);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 2, 3, 4]);
    expect(R.pluck('id', result.glyphs)).toEqual([76, 111, 64257, 105, 109]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 10, 8]);
  });

  test.skip('should remove glyph in the middle of ligature', () => {
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
        { xAdvance: 10 },
        { xAdvance: 8 },
      ],
      glyphIndices: [0, 1, 2, 2, 3],
      attributes: { font },
    };

    const glyph = { id: 105, codePoints: [105], advanceWidth: 10 }; // i
    const result = remove(3, glyph, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 6);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5]);
    expect(R.pluck('id', result.glyphs)).toEqual([76, 111, 102, 105, 105, 109]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([5, 6, 8, 10, 8, 8]);
  });

  test.skip('should remove ligature glyph before run ligature', () => {
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
    };

    const glyph = { id: 64259, codePoints: [102, 102, 105], advanceWidth: 10 }; // ffi
    const result = remove(1, glyph, run); // lffiofim

    expect(result).toHaveProperty('glyphIndices', [0, 1, 1, 1, 2, 3, 3, 4]);
    expect(R.pluck('id', result.glyphs)).toEqual([76, 64259, 111, 64257, 109]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([5, 10, 6, 7, 8]);
  });

  test.skip('should remove ligature glyph after run ligature', () => {
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
    };

    const glyph = { id: 64259, codePoints: [102, 102, 105], advanceWidth: 10 }; // ffi
    const result = remove(4, glyph, run); // lofiffim

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 2, 3, 3, 3, 4]);
    expect(R.pluck('id', result.glyphs)).toEqual([76, 111, 64257, 64259, 109]);
    expect(R.pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 10, 8]);
  });
});
