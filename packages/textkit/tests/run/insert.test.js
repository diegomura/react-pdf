import font from '../internal/font';
import pluck from '../internal/pluck';
import insert from '../../src/run/insert';

describe('run insert glyph operator', () => {
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

    const result = insert(2, null, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 5);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 9]);
  });

  test('should insert glyph at beggining of run', () => {
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
    const result = insert(0, glyph, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 6);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([105, 76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([10, 5, 6, 7, 8, 9]);
  });

  test('should insert glyph at end of run', () => {
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
    const result = insert(5, glyph, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 6);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 114, 101, 109, 105]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 9, 10]);
  });

  test('should insert glyph at middle of run', () => {
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
    const result = insert(2, glyph, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 6);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 105, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 10, 7, 8, 9]);
  });

  test('should insert ligature glyph at beggining of run', () => {
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
    const result = insert(0, glyph, run); // filorem

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 7);
    expect(result).toHaveProperty('glyphIndices', [0, 0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([64257, 76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([10, 5, 6, 7, 8, 9]);
  });

  test('should insert ligature glyph at end of run', () => {
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
    const result = insert(5, glyph, run); // loremfi

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 7);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5, 5]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 114, 101, 109, 64257]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 9, 10]);
  });

  test('should insert ligature glyph at middle of run', () => {
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
    const result = insert(2, glyph, run); // lofirem

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 7);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 64257, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 10, 7, 8, 9]);
  });

  test('should insert glyph before run ligature', () => {
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
    const result = insert(2, glyph, run); // liofim

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 6);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 105, 64257, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 10, 7, 8]);
  });

  test('should insert glyph after run ligature', () => {
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
    const result = insert(4, glyph, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 6);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 2, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 64257, 105, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 10, 8]);
  });

  test('should insert glyph in the middle of ligature', () => {
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
      attributes: { font, fontSize: 2 },
    };

    const glyph = { id: 105, codePoints: [105], advanceWidth: 10 }; // i
    const result = insert(3, glyph, run);

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 6);
    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 102, 105, 105, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 8, 10, 8, 8]);
  });

  test('should insert ligature glyph before run ligature', () => {
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
    const result = insert(1, glyph, run); // lffiofim

    expect(result).toHaveProperty('glyphIndices', [0, 1, 1, 1, 2, 3, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 64259, 111, 64257, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 10, 6, 7, 8]);
  });

  test('should insert ligature glyph after run ligature', () => {
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
    const result = insert(4, glyph, run); // lofiffim

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 2, 3, 3, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 64257, 64259, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 10, 8]);
  });
});

describe('run insert code point operator', () => {
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

    const result = insert(2, null, run);

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 9]);
  });

  test('should insert code point at beggining of run', () => {
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

    const result = insert(0, 105, run);

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([105, 76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([8, 5, 6, 7, 8, 9]);
  });

  test('should insert code point at end of run', () => {
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

    const result = insert(5, 105, run);

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 114, 101, 109, 105]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 9, 8]);
  });

  test('should insert code point at middle of run', () => {
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

    const result = insert(2, 105, run);

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 105, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 8, 7, 8, 9]);
  });

  test('should insert ligature code point at beggining of run', () => {
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

    const result = insert(0, 64257, run); // filorem

    expect(result).toHaveProperty('glyphIndices', [0, 0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([64257, 76, 111, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([10, 5, 6, 7, 8, 9]);
  });

  test('should insert ligature code point at end of run', () => {
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

    const result = insert(2, 64257, run); // lofirem

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 2, 3, 4, 5]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 64257, 114, 101, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 10, 7, 8, 9]);
  });

  test('should insert ligature code point at middle of run', () => {
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

    const result = insert(5, 64257, run); // loremfi

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 4, 5, 5]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 114, 101, 109, 64257]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 9, 10]);
  });

  test('should insert code point before run ligature', () => {
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

    const result = insert(1, 105, run);

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 3, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 105, 111, 64257, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 8, 6, 7, 8]);
  });

  test('should insert code point after run ligature', () => {
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

    const result = insert(4, 105, run);

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 2, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 64257, 105, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 8, 8]);
  });

  test('should insert ligature code point before run ligature', () => {
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

    const result = insert(1, 64259, run); // lffiofim

    expect(result).toHaveProperty('glyphIndices', [0, 1, 1, 1, 2, 3, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 64259, 111, 64257, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 10, 6, 7, 8]);
  });

  test('should insert ligature code point after run ligature', () => {
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

    const result = insert(4, 64259, run); // lofiffim

    expect(result).toHaveProperty('glyphIndices', [0, 1, 2, 2, 3, 3, 3, 4]);
    expect(pluck('id', result.glyphs)).toEqual([76, 111, 64257, 64259, 109]);
    expect(pluck('xAdvance', result.positions)).toEqual([5, 6, 7, 10, 8]);
  });
});
