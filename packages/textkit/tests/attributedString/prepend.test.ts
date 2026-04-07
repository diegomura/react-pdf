import { describe, expect, test } from 'vitest';

import font from '../internal/font';
import pluck from '../internal/pluck';
import empty from '../../src/attributedString/empty';
import prepend from '../../src/attributedString/prepend';
import { Glyph } from '../../src/types';

describe('attributeString prepend operator', () => {
  test('should return copy of string if no glyph provided', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // l
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2, 3, 4],
      },
    ];

    const string = { string: 'lorem', runs };
    const result = prepend(null, string);

    expect(result).not.toBe(string);
    expect(result).toEqual(string);
  });

  test('should prepend glyph to empty string', () => {
    const string = empty();
    const glyph = { id: 76, codePoints: [76], advanceWidth: 10 } as Glyph; // L
    const result = prepend(glyph, string);

    expect(result).toHaveProperty('string', 'L');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
    expect(result.runs[0].glyphIndices).toEqual([0]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76]);
  });

  test('should prepend glyph on single run string', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // l
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2, 3, 4],
        attributes: { font: [font], fontSize: 2 },
      },
    ];

    const string = { string: 'lorem', runs };
    const glyph = { id: 76, codePoints: [76], advanceWidth: 10 } as Glyph; // L
    const result = prepend(glyph, string);

    expect(result).toHaveProperty('string', 'Llorem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 76, 111, 114, 101, 109,
    ]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([
      10, 5, 6, 7, 8, 9,
    ]);
  });

  test('should prepend glyph on multiple run string', () => {
    const runs = [
      {
        start: 0,
        end: 3,
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // l
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ] as Glyph[],
        positions: [
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2],
        attributes: { font: [font], fontSize: 2 },
      },
      {
        start: 3,
        end: 5,
        glyphs: [
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1],
        attributes: { font: [font], fontSize: 2 },
      },
    ];

    const string = { string: 'lorem', runs };
    const glyph = { id: 76, codePoints: [76], advanceWidth: 10 } as Glyph; // L
    const result = prepend(glyph, string);

    expect(result).toHaveProperty('string', 'Llorem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 4);
    expect(result.runs[1]).toHaveProperty('start', 4);
    expect(result.runs[1]).toHaveProperty('end', 6);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3]);
    expect(result.runs[1].glyphIndices).toEqual([0, 1]);

    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 76, 111, 114]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([101, 109]);

    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([10, 5, 6, 7]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([8, 9]);
  });

  test('should prepend ligature glyph on single run string', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // l
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2, 3, 4],
        attributes: { font: [font], fontSize: 2 },
      },
    ];

    const string = { string: 'lorem', runs };
    const glyph = {
      id: 64257,
      codePoints: [102, 105],
      advanceWidth: 10,
    } as Glyph; // fi
    const result = prepend(glyph, string);

    expect(result).toHaveProperty('string', 'filorem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(result.runs[0].glyphIndices).toEqual([0, 0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      64257, 76, 111, 114, 101, 109,
    ]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([
      10, 5, 6, 7, 8, 9,
    ]);
  });

  test('should prepend ligaure glyph on multiple run string', () => {
    const runs = [
      {
        start: 0,
        end: 3,
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // l
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ] as Glyph[],
        positions: [
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2],
        attributes: { font: [font], fontSize: 2 },
      },
      {
        start: 3,
        end: 5,
        glyphs: [
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ] as Glyph[],
        positions: [
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1],
        attributes: { font: [font], fontSize: 2 },
      },
    ];

    const string = { string: 'lorem', runs };
    const glyph = {
      id: 64257,
      codePoints: [102, 105],
      advanceWidth: 10,
    } as Glyph; // fi
    const result = prepend(glyph, string);

    expect(result).toHaveProperty('string', 'filorem');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[1]).toHaveProperty('start', 5);
    expect(result.runs[1]).toHaveProperty('end', 7);

    expect(result.runs[0].glyphIndices).toEqual([0, 0, 1, 2, 3]);
    expect(result.runs[1].glyphIndices).toEqual([0, 1]);

    expect(pluck('id', result.runs[0].glyphs!)).toEqual([64257, 76, 111, 114]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([101, 109]);

    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([10, 5, 6, 7]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([8, 9]);
  });

  test('should not mutate the original string when prepending', () => {
    const runs = [
      {
        start: 0,
        end: 3,
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // l
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ] as Glyph[],
        positions: [
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2],
        attributes: { font: [font], fontSize: 2 },
      },
    ];

    const originalString = { string: 'lor', runs };
    const originalRunsLength = originalString.runs.length;
    const originalStringValue = originalString.string;

    const glyph = { id: 76, codePoints: [76], advanceWidth: 8 } as Glyph;
    prepend(glyph, originalString);

    expect(originalString.string).toBe(originalStringValue);
    expect(originalString.runs).toHaveLength(originalRunsLength);
  });

  test('should return same string when prepending undefined', () => {
    const runs = [
      {
        start: 0,
        end: 3,
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // l
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ] as Glyph[],
        positions: [
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2],
        attributes: { font: [font], fontSize: 2 },
      },
    ];

    const string = { string: 'lor', runs };
    // @ts-expect-error - testing undefined handling
    const result = prepend(undefined, string);

    expect(result).not.toBe(string);
    expect(result.string).toBe('lor');
    expect(result.runs).toHaveLength(1);
  });

  test('should set correct position values when prepending glyph with advanceWidth', () => {
    const runs = [
      {
        start: 0,
        end: 2,
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // l
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
        ] as Glyph[],
        positions: [
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1],
        attributes: { font: [font], fontSize: 2 },
      },
    ];

    const string = { string: 'lo', runs };
    const glyph = { id: 114, codePoints: [114], advanceWidth: 10 } as Glyph; // r with advanceWidth 10
    const result = prepend(glyph, string);

    const firstPosition = result.runs[0].positions![0];

    expect(firstPosition.yAdvance).toBe(0);
    expect(firstPosition.xAdvance).toBe(10);
    expect(firstPosition.xOffset).toBe(0);
    expect(firstPosition.yOffset).toBe(0);
  });

  test('should prepend glyph to string with run without positions', () => {
    const runs = [
      {
        start: 0,
        end: 3,
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // l
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ] as Glyph[],
        glyphIndices: [0, 1, 2],
        attributes: { font: [font], fontSize: 2 },
      },
    ];

    const string = { string: 'lor', runs };
    const glyph = { id: 101, codePoints: [101], advanceWidth: 8 } as Glyph; // e
    const result = prepend(glyph, string);

    expect(result).toHaveProperty('string', 'elor');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 4);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([101, 76, 111, 114]);
  });
});
