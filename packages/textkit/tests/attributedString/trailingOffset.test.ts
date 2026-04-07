import { describe, expect, test } from 'vitest';

import trailingOffset from '../../src/attributedString/trailingOffset';
import { Glyph } from '../../src/types';
import empty from '../../src/attributedString/empty';

describe('attributeString trailingOffset operator', () => {
  test('should return zero for single run string without spaces', () => {
    const string = {
      string: 'Lorem',
      runs: [
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
        },
      ],
    };
    const result = trailingOffset(string);

    expect(result).toBe(0);
  });

  test('should return zero for multipe run string without spaces', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 3,
          attributes: {},
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
        },
        {
          start: 3,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 109, advanceWidth: 0, codePoints: [109] }, // m
          ] as Glyph[],
          positions: [
            { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
      ],
    };

    const result = trailingOffset(string);

    expect(result).toBe(0);
  });

  test('should return correct offset for single run string with spaces', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 111, advanceWidth: 0, codePoints: [111] }, // o
            { id: 114, advanceWidth: 0, codePoints: [114] }, // r
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
          ] as Glyph[],
          positions: [
            { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 6, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
      ],
    };

    const result = trailingOffset(string);

    expect(result).toBe(17);
  });

  test('should return correct offset for multiple run string with spaces', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 3,
          attributes: {},
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
        },
        {
          start: 3,
          end: 5,
          attributes: {},
          glyphs: [
            { id: 101, advanceWidth: 0, codePoints: [101] }, // e
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
          ] as Glyph[],
          positions: [
            { xAdvance: 8, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 9, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
      ],
    };

    const result = trailingOffset(string);

    expect(result).toBe(9);
  });

  test('should return zero for empty attributed string', () => {
    const result = trailingOffset(empty());

    expect(result).toBe(0);
  });

  test('should return zero for run with no glyphs', () => {
    const string = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: {},
          glyphs: [] as Glyph[],
          positions: [],
        },
      ],
    };

    const result = trailingOffset(string);

    expect(result).toBe(0);
  });

  test('should return offset when run has only spaces', () => {
    const string = {
      string: '   ',
      runs: [
        {
          start: 0,
          end: 3,
          attributes: {},
          glyphs: [
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
          ] as Glyph[],
          positions: [
            { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
      ],
    };

    const result = trailingOffset(string);

    expect(result).toBe(15);
  });

  test('should return correct offset for multiple runs with spaces', () => {
    const string = {
      string: 'L     ',
      runs: [
        {
          start: 0,
          end: 3,
          attributes: {},
          glyphs: [
            { id: 76, advanceWidth: 0, codePoints: [76] }, // l
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
          ] as Glyph[],
          positions: [
            { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
        {
          start: 3,
          end: 6,
          attributes: {},
          glyphs: [
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
            { id: 32, advanceWidth: 0, codePoints: [32] }, // space
          ] as Glyph[],
          positions: [
            { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 4, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
      ],
    };

    const result = trailingOffset(string);

    expect(result).toBe(20);
  });
});
