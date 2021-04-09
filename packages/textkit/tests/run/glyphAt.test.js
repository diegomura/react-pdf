import glyphAt from '../../src/run/glyphAt';

describe('run glyphAt operator', () => {
  test('should return null if no glyph present', () => {
    const run = { start: 0, end: 5 };

    expect(glyphAt(1, run)).toBe(null);
  });

  test('should correctly return glyph index if glyph indices not present', () => {
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
    };

    expect(glyphAt(1, run)).toHaveProperty('id', 111);
  });

  test('should correctly return glyph index', () => {
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
      glyphIndices: [0, 1, 2, 3, 4],
    };

    expect(glyphAt(2, run)).toHaveProperty('id', 114);
  });

  test('should correctly return trailing glyph index when ligature', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 114, codePoints: [64257] }, // fi
        { id: 109, codePoints: [109] }, // m
      ],
      glyphIndices: [0, 1, 2, 2, 3],
    };

    expect(glyphAt(1, run)).toHaveProperty('id', 111);
  });

  test('should correctly return leading glyph index when ligature', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 64257, codePoints: [102, 105] }, // fi
        { id: 109, codePoints: [109] }, // m
      ],
      glyphIndices: [0, 1, 2, 2, 3],
    };

    expect(glyphAt(4, run)).toHaveProperty('id', 109);
  });

  test('should correctly return glyph at ligature start', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 64257, codePoints: [102, 105] }, // fi
        { id: 109, codePoints: [109] }, // m
      ],
      glyphIndices: [0, 1, 2, 2, 3],
    };

    expect(glyphAt(2, run)).toHaveProperty('id', 64257);
  });

  test('should correctly return glyph at ligature end', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 64257, codePoints: [102, 105] }, // fi
        { id: 109, codePoints: [109] }, // m
      ],
      glyphIndices: [0, 1, 2, 2, 3],
    };

    expect(glyphAt(3, run)).toHaveProperty('id', 64257);
  });
});
