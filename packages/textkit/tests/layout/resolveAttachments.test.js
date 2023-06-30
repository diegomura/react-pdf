import pluck from '../internal/pluck';
import resolveAttachments from '../../src/layout/resolveAttachments';

const instance = resolveAttachments();

describe('resolveAttachments', () => {
  test('should return same string if no attributes present', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
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
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, // r
            { xAdvance: 5 }, // e
            { xAdvance: 4 }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const result = instance(string);

    expect(result).toBe(string);
    // expect(result).not.toBe(string);
    expect(result).toEqual(string);
  });

  test('should return same string if no attachment present', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
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
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, // r
            { xAdvance: 5 }, // e
            { xAdvance: 4 }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { something: 'blah' },
        },
      ],
    };
    const result = instance(string);

    expect(result).toBe(string);
    // expect(result).not.toBe(string);
    expect(result).toEqual(string);
  });

  test('should return same string if no attachment code point present', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
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
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, // r
            { xAdvance: 5 }, // e
            { xAdvance: 4 }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { attachment: { width: 20 } },
        },
      ],
    };
    const result = instance(string);

    expect(result).toBe(string);
    // expect(result).not.toBe(string);
    expect(result).toEqual(string);
  });

  test('should return same string if attachment code point present but no attachment', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
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
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, // r
            { xAdvance: 5 }, // e
            { xAdvance: 4 }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
        },
      ],
    };
    const result = instance(string);

    expect(result).toBe(string);
    // expect(result).not.toBe(string);
    expect(result).toEqual(string);
  });

  xtest('should not mutate passed string', () => {
    const string = {
      string: `Lo${String.fromCodePoint(65532)}em`,
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 65532, codePoints: [65532] }, // ATTACHMENT REPLACE
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          positions: [
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, // ATTACHMENT REPLACE
            { xAdvance: 5 }, // e
            { xAdvance: 4 }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { attachment: { width: 20 } },
        },
      ],
    };

    instance(string);

    expect(string.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4]);
    expect(pluck('id', string.runs[0].glyphs)).toEqual([
      76,
      111,
      65532,
      101,
      109,
    ]);
    expect(pluck('xAdvance', string.runs[0].positions)).toEqual([
      8,
      7,
      6,
      5,
      4,
    ]);
  });

  test('should change attachment glyph position appropiately', () => {
    const string = {
      string: `Lo${String.fromCodePoint(65532)}em`,
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 111, codePoints: [111] }, // o
            { id: 65532, codePoints: [65532] }, // ATTACHMENT REPLACE
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          positions: [
            { xAdvance: 8 }, // l
            { xAdvance: 7 }, // o
            { xAdvance: 6 }, //  ATTACHMENT REPLACE
            { xAdvance: 5 }, // e
            { xAdvance: 4 }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { attachment: { width: 20 } },
        },
      ],
    };
    const result = instance(string);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4]);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      76,
      111,
      65532,
      101,
      109,
    ]);
    expect(pluck('xAdvance', result.runs[0].positions)).toEqual([
      8,
      7,
      20,
      5,
      4,
    ]);
  });

  test('should change attachment glyph position appropiately when ligature is present before', () => {
    const string = {
      string: `Lo${String.fromCodePoint(65532)}em`,
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 64257, codePoints: [102, 105] }, // fi
            { id: 65532, codePoints: [65532] }, // ATTACHMENT REPLACE
            { id: 101, codePoints: [101] }, // e
            { id: 109, codePoints: [109] }, // m
          ],
          positions: [
            { xAdvance: 10 }, // fi
            { xAdvance: 6 }, //  ATTACHMENT REPLACE
            { xAdvance: 5 }, // e
            { xAdvance: 4 }, // m
          ],
          glyphIndices: [0, 0, 1, 2, 3],
          attributes: { attachment: { width: 20 } },
        },
      ],
    };
    const result = instance(string);

    expect(result.runs[0].glyphIndices).toEqual([0, 0, 1, 2, 3]);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      64257,
      65532,
      101,
      109,
    ]);
    expect(pluck('xAdvance', result.runs[0].positions)).toEqual([10, 20, 5, 4]);
  });

  test('should change attachment glyph position appropiately when ligature is present after', () => {
    const string = {
      string: `Lo${String.fromCodePoint(65532)}em`,
      runs: [
        {
          start: 0,
          end: 5,
          glyphs: [
            { id: 76, codePoints: [76] }, // l
            { id: 65532, codePoints: [65532] }, // ATTACHMENT REPLACE
            { id: 64257, codePoints: [102, 105] }, // fi
            { id: 109, codePoints: [109] }, // m
          ],
          positions: [
            { xAdvance: 7 }, // l
            { xAdvance: 6 }, //  ATTACHMENT REPLACE
            { xAdvance: 10 }, // fi
            { xAdvance: 4 }, // m
          ],
          glyphIndices: [0, 1, 2, 2, 3],
          attributes: { attachment: { width: 20 } },
        },
      ],
    };
    const result = instance(string);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 2, 3]);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([76, 65532, 64257, 109]);
    expect(pluck('xAdvance', result.runs[0].positions)).toEqual([7, 20, 10, 4]);
  });
});
