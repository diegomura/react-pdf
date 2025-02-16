import { describe, expect, test } from 'vitest';

import trailingOffset from '../../src/attributedString/trailingOffset';

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
          ],
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
          ],
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
          ],
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
          ],
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
          ],
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
          ],
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
});
