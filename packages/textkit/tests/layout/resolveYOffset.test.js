import font from '../internal/font';
import pluck from '../internal/pluck';
import resolveYOffset from '../../src/layout/resolveYOffset';

const instance = resolveYOffset();

describe('resolveYOffset', () => {
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
            { xAdvance: 8, yOffset: 0 }, // l
            { xAdvance: 7, yOffset: 0 }, // o
            { xAdvance: 6, yOffset: 0 }, // r
            { xAdvance: 5, yOffset: 0 }, // e
            { xAdvance: 4, yOffset: 0 }, // m
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

  test('should return same string if no yOffset present', () => {
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
            { xAdvance: 8, yOffset: 0 }, // l
            { xAdvance: 7, yOffset: 0 }, // o
            { xAdvance: 6, yOffset: 0 }, // r
            { xAdvance: 5, yOffset: 0 }, // e
            { xAdvance: 4, yOffset: 0 }, // m
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

  test('should return same string if no font present', () => {
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
            { xAdvance: 8, yOffset: 0 }, // l
            { xAdvance: 7, yOffset: 0 }, // o
            { xAdvance: 6, yOffset: 0 }, // r
            { xAdvance: 5, yOffset: 0 }, // e
            { xAdvance: 4, yOffset: 0 }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { yOffset: 20 },
        },
      ],
    };
    const result = instance(string);

    expect(result).toBe(string);
    // expect(result).not.toBe(string);
    expect(result).toEqual(string);
  });

  test('should return same string if no positions present', () => {
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
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { yOffset: 20, font },
        },
      ],
    };
    const result = instance(string);

    expect(result).toBe(string);
    // expect(result).not.toBe(string);
    expect(result).toEqual(string);
  });

  test('should not mutate passed string', () => {
    const string = {
      string: `Lorem`,
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
            { xAdvance: 8, yOffset: 0 }, // l
            { xAdvance: 7, yOffset: 0 }, // o
            { xAdvance: 6, yOffset: 0 }, // r
            { xAdvance: 5, yOffset: 0 }, // e
            { xAdvance: 4, yOffset: 0 }, // m
          ],
          glyphIndices: [0, 1, 2, 3, 4],
          attributes: { yOffset: 20, font },
        },
      ],
    };

    instance(string);

    expect(string.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4]);
    expect(pluck('id', string.runs[0].glyphs)).toEqual([
      76,
      111,
      114,
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

  test('should change glyph positions appropiately', () => {
    const string = {
      string: `Lorem`,
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
          attributes: { yOffset: 20, font },
        },
      ],
    };
    const result = instance(string);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4]);
    expect(pluck('id', result.runs[0].glyphs)).toEqual([
      76,
      111,
      114,
      101,
      109,
    ]);
    expect(pluck('xAdvance', result.runs[0].positions)).toEqual([
      8,
      7,
      6,
      5,
      4,
    ]);
    expect(pluck('yOffset', result.runs[0].positions)).toEqual([
      40,
      40,
      40,
      40,
      40,
    ]); // yOffset * font.unitsPerEm
  });
});
