import { describe, expect, test } from 'vitest';

import empty from '../../src/attributedString/empty';
import advanceWidth from '../../src/attributedString/advanceWidth';

describe('attributeString advanceWidth operator', () => {
  test('should return 0 for empty string', () => {
    expect(advanceWidth(empty())).toBe(0);
  });

  test('should return 0 if runs dont have positions', () => {
    const string = {
      string: '',
      runs: [
        {
          start: 2,
          end: 5,
          attributes: {},
        },
        {
          start: 5,
          end: 8,
          attributes: {},
        },
      ],
    };

    expect(advanceWidth(string)).toBe(0);
  });

  test('should return advance width for single run', () => {
    const string = {
      string: '',
      runs: [
        {
          start: 0,
          end: 2,
          glyphIndices: [],
          glyphs: [],
          positions: [
            { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
          attributes: {},
        },
      ],
    };

    expect(advanceWidth(string)).toBe(15);
  });

  test('should handle mixed runs with and without positions', () => {
    const string = {
      string: '',
      runs: [
        {
          start: 0,
          end: 2,
          attributes: {},
        },
        {
          start: 2,
          end: 4,
          glyphIndices: [],
          glyphs: [],
          positions: [
            { xAdvance: 7, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 3, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
          attributes: {},
        },
      ],
    };

    expect(advanceWidth(string)).toBe(10);
  });

  test('should sum up runs advance width', () => {
    const runs = [
      {
        start: 2,
        end: 4,
        glyphIndices: [],
        glyphs: [],
        positions: [
          {
            xAdvance: 5,
            yAdvance: 0,
            xOffset: 0,
            yOffset: 0,
          },
          {
            xAdvance: 10,
            yAdvance: 0,
            xOffset: 0,
            yOffset: 0,
          },
        ],
        attributes: {},
      },
      {
        start: 4,
        end: 6,
        glyphIndices: [],
        glyphs: [],
        positions: [
          {
            xAdvance: 15,
            yAdvance: 0,
            xOffset: 0,
            yOffset: 0,
          },
          {
            xAdvance: 20,
            yAdvance: 0,
            xOffset: 0,
            yOffset: 0,
          },
        ],
        attributes: {},
      },
    ];
    const string = { string: '', runs };

    expect(advanceWidth(string)).toBe(50);
  });
});
