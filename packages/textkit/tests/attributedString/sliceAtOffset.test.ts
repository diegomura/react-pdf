import { describe, expect, test } from 'vitest';

import pluck from '../internal/pluck';
import sliceAtOffset from '../../src/attributedString/sliceAtOffset';

describe('attributeString sliceAtOffset operator', () => {
  test('should slice single run string', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2, 3, 4],
      },
    ];

    const string = { string: 'Lorem', runs };
    const result = sliceAtOffset(22, string);

    expect(result).toHaveProperty('string', 'Lor');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 114]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([6, 7, 8]);
  });

  test('should slice complete single run string when exceeding offset', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
        glyphIndices: [0, 1, 2, 3, 4],
      },
    ];

    const string = { string: 'Lorem', runs };
    const result = sliceAtOffset(70, string);

    expect(result).not.toBe(string);
    expect(result).toEqual(string);
  });

  test('should slice single run string before ligature', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];

    const string = { string: 'Lofim', runs };
    const result = sliceAtOffset(15, string);

    expect(result).toHaveProperty('string', 'Lo');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0].glyphIndices).toEqual([0, 1]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([6, 7]);
  });

  test('should slice single run string after ligature', () => {
    const runs = [
      {
        start: 0,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 2, 2, 3],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];

    const string = { string: 'Lofim', runs };
    const result = sliceAtOffset(24, string);

    expect(result).toHaveProperty('string', 'Lofi');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 2]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 64257]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([6, 7, 10]);
  });

  test('should slice multiple run string', () => {
    const runs = [
      {
        start: 0,
        end: 3,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ],
        glyphIndices: [0, 1, 2],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
      {
        start: 3,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1],
        positions: [
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];

    const string = { string: 'Lorem', runs };
    const result = sliceAtOffset(32, string);

    expect(result).toHaveProperty('string', 'Lore');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 114]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([6, 7, 8]);

    expect(result.runs[1].glyphIndices).toEqual([0]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([101]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([9]);
  });

  test('should slice complete multiple run string when exceeding offset', () => {
    const runs = [
      {
        start: 0,
        end: 3,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 111, advanceWidth: 0, codePoints: [111] }, // o
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ],
        glyphIndices: [0, 1, 2],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
      {
        start: 3,
        end: 5,
        attributes: {},
        glyphs: [
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1],
        positions: [
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];

    const string = { string: 'Lorem', runs };
    const result = sliceAtOffset(70, string);

    expect(result).not.toBe(string);
    expect(result).toEqual(string);
  });

  test('should slice multiple run string before ligature in 1st run', () => {
    const runs = [
      {
        start: 0,
        end: 4,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ],
        glyphIndices: [0, 1, 1, 2],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
      {
        start: 4,
        end: 8,
        attributes: {},
        glyphs: [
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 1, 2],
        positions: [
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];

    const string = { string: 'Lfirefim', runs };
    const result = sliceAtOffset(7, string);

    expect(result).toHaveProperty('string', 'L');
    expect(result.runs).toHaveLength(1);

    expect(result.runs[0].glyphIndices).toEqual([0]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([6]);
  });

  test('should slice multiple run string after ligature in 1st run', () => {
    const runs = [
      {
        start: 0,
        end: 4,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ],
        glyphIndices: [0, 1, 1, 2],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
      {
        start: 4,
        end: 8,
        attributes: {},
        glyphs: [
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 1, 2],
        positions: [
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];

    const string = { string: 'Lfirefim', runs };
    const result = sliceAtOffset(17, string);

    expect(result).toHaveProperty('string', 'Lfi');
    expect(result.runs).toHaveLength(1);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 1]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 64257]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([6, 10]);
  });

  test('should slice multiple run string before ligature in 2nd run', () => {
    const runs = [
      {
        start: 0,
        end: 4,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ],
        glyphIndices: [0, 1, 1, 2],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
      {
        start: 4,
        end: 8,
        attributes: {},
        glyphs: [
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 1, 2],
        positions: [
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];

    const string = { string: 'Lfirefim', runs };
    const result = sliceAtOffset(34, string);

    expect(result).toHaveProperty('string', 'Lfire');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 1, 2]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 64257, 114]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([6, 10, 8]);

    expect(result.runs[1].glyphIndices).toEqual([0]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([101]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([9]);
  });

  test('should slice multiple run string after ligature in 2nd run', () => {
    const runs = [
      {
        start: 0,
        end: 4,
        attributes: {},
        glyphs: [
          { id: 76, advanceWidth: 0, codePoints: [76] }, // L
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 114, advanceWidth: 0, codePoints: [114] }, // r
        ],
        glyphIndices: [0, 1, 1, 2],
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
      {
        start: 4,
        end: 8,
        attributes: {},
        glyphs: [
          { id: 101, advanceWidth: 0, codePoints: [101] }, // e
          { id: 64257, advanceWidth: 0, codePoints: [102, 105] }, // fi
          { id: 109, advanceWidth: 0, codePoints: [109] }, // m
        ],
        glyphIndices: [0, 1, 1, 2],
        positions: [
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];

    const string = { string: 'Lfirefim', runs };
    const result = sliceAtOffset(44, string);

    expect(result).toHaveProperty('string', 'Lfirefi');
    expect(result.runs).toHaveLength(2);

    expect(result.runs[0].glyphIndices).toEqual([0, 1, 1, 2]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 64257, 114]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([6, 10, 8]);

    expect(result.runs[1].glyphIndices).toEqual([0, 1, 1]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([101, 64257]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([9, 10]);
  });
});
