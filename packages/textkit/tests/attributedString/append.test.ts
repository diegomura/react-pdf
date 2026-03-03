import { describe, expect, test } from 'vitest';

import font from '../internal/font';
import pluck from '../internal/pluck';
import empty from '../../src/attributedString/empty';
import append from '../../src/attributedString/append';
import { Glyph } from '../../src/types';

describe('attributeString append operator', () => {
  test('should return copy of string if no glyph provided', () => {
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
    const result = append(null, string);

    expect(result).not.toBe(string);
    expect(result).toEqual(string);
  });

  test('should append glyph to empty string', () => {
    const string = empty();
    const glyph = { id: 76, codePoints: [76], advanceWidth: 10 } as Glyph; // L
    const result = append(glyph, string);

    expect(result).toHaveProperty('string', 'L');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
    expect(result.runs[0].glyphIndices).toEqual([0]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76]);
  });

  test('should append glyph on single run string', () => {
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
    const glyph = { id: 76, codePoints: [76], advanceWidth: 8 } as Glyph; // L
    const result = append(glyph, string);

    expect(result).toHaveProperty('string', 'loremL');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 114, 101, 109, 76,
    ]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([
      5, 6, 7, 8, 9, 8,
    ]);
  });

  test('should append code point on single run string', () => {
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
    const result = append(76, string);

    expect(result).toHaveProperty('string', 'loremL');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4, 5]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 114, 101, 109, 76,
    ]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([
      5, 6, 7, 8, 9, 8,
    ]);
  });

  test('should append glyph on multiple run string', () => {
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
    const glyph = { id: 76, codePoints: [76], advanceWidth: 8 } as Glyph; // L
    const result = append(glyph, string);

    expect(result).toHaveProperty('string', 'loremL');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 6);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(result.runs[1].glyphIndices).toEqual([0, 1, 2]);

    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 114]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([101, 109, 76]);

    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([5, 6, 7]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([8, 9, 8]);
  });

  test('should append code point on multiple run string', () => {
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
    const result = append(76, string);

    expect(result).toHaveProperty('string', 'loremL');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 6);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(result.runs[1].glyphIndices).toEqual([0, 1, 2]);

    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 114]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([101, 109, 76]);

    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([5, 6, 7]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([8, 9, 8]);
  });

  test('should append ligature glyph on single run string', () => {
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
    const result = append(glyph, string);

    expect(result).toHaveProperty('string', 'loremfi');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 7);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4, 5, 5]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 114, 101, 109, 64257,
    ]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([
      5, 6, 7, 8, 9, 10,
    ]);
  });

  test('should append ligaure glyph on multiple run string', () => {
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
    const result = append(glyph, string);

    expect(result).toHaveProperty('string', 'loremfi');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 7);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(result.runs[1].glyphIndices).toEqual([0, 1, 2, 2]);

    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 114]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([101, 109, 64257]);

    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([5, 6, 7]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([8, 9, 10]);
  });

  test('should not mutate the original string when appending', () => {
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
    append(glyph, originalString);

    expect(originalString.string).toBe(originalStringValue);
    expect(originalString.runs).toHaveLength(originalRunsLength);
  });

  test('should return same string when appending undefined', () => {
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
    const result = append(undefined, string);

    expect(result).not.toBe(string);
    expect(result.string).toBe('lor');
    expect(result.runs).toHaveLength(1);
  });

  test('should set correct position values when appending glyph with advanceWidth', () => {
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
    const result = append(glyph, string);

    const lastPosition =
      result.runs[0].positions![result.runs[0].positions!.length - 1];

    expect(lastPosition.yAdvance).toBe(0);
    expect(lastPosition.xAdvance).toBe(10);
    expect(lastPosition.xOffset).toBe(0);
    expect(lastPosition.yOffset).toBe(0);
  });

  test('should append glyph to string with run without positions', () => {
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
    const result = append(glyph, string);

    expect(result).toHaveProperty('string', 'lore');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('end', 4);
    expect(result.runs[0].positions).toBeUndefined();
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 114, 101]);
  });
});
