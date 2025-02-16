import { describe, expect, test } from 'vitest';

import indexAtOffset from '../../src/attributedString/indexAtOffset';

describe('attributeString indexAtOffset operator', () => {
  test('should return index for single run string', () => {
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
      },
    ];

    const string = { string: 'Lorem', runs };

    expect(indexAtOffset(5, string)).toBe(0);
    expect(indexAtOffset(7, string)).toBe(1);
    expect(indexAtOffset(13, string)).toBe(2);
    expect(indexAtOffset(22, string)).toBe(3);
    expect(indexAtOffset(30, string)).toBe(4);
    expect(indexAtOffset(42, string)).toBe(5);
  });

  test('should return index for multiple run string', () => {
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
        positions: [
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];
    const string = { string: 'Lorem', runs };

    expect(indexAtOffset(5, string)).toBe(0);
    expect(indexAtOffset(7, string)).toBe(1);
    expect(indexAtOffset(13, string)).toBe(2);
    expect(indexAtOffset(22, string)).toBe(3);
    expect(indexAtOffset(30, string)).toBe(4);
    expect(indexAtOffset(42, string)).toBe(5);
  });

  test('should return index for single run string with ligature', () => {
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
        positions: [
          { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];

    const string = { string: 'Lofim', runs };

    expect(indexAtOffset(5, string)).toBe(0);
    expect(indexAtOffset(7, string)).toBe(1);
    expect(indexAtOffset(13, string)).toBe(2);
    expect(indexAtOffset(24, string)).toBe(4);
    expect(indexAtOffset(32, string)).toBe(5);
    expect(indexAtOffset(40, string)).toBe(5);
  });

  test('should return index for multiple run string with ligature', () => {
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
        positions: [
          { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        ],
      },
    ];
    const string = { string: 'Lfirefim', runs };

    expect(indexAtOffset(5, string)).toBe(0);
    expect(indexAtOffset(7, string)).toBe(1);
    expect(indexAtOffset(16, string)).toBe(3);
    expect(indexAtOffset(25, string)).toBe(4);
    expect(indexAtOffset(33, string)).toBe(5);
    expect(indexAtOffset(43, string)).toBe(7);
    expect(indexAtOffset(48, string)).toBe(8);
    expect(indexAtOffset(60, string)).toBe(8);
  });
});
