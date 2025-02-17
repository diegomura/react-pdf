import { describe, expect, test } from 'vitest';

import empty from '../../src/attributedString/empty';
import advanceWidthBetween from '../../src/attributedString/advanceWidthBetween';

describe('attributeString advanceWidthBetween operator', () => {
  test('should return 0 for empty string', () => {
    expect(advanceWidthBetween(2, 4, empty())).toBe(0);
  });

  test('should return 0 if runs dont have positions', () => {
    const string = {
      string: '',
      runs: [
        { start: 2, end: 5, attributes: {} },
        { start: 5, end: 8, attributes: {} },
      ],
    };

    expect(advanceWidthBetween(0, 10, string)).toBe(0);
  });

  test('should sum up single run advance width', () => {
    const string = {
      string: '',
      runs: [
        {
          start: 0,
          end: 4,
          attributes: {},
          positions: [
            { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 12, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
      ],
    };

    expect(advanceWidthBetween(1, 3, string)).toBe(22);
  });

  test('should sum up multiple runs advance width', () => {
    const string = {
      string: '',
      runs: [
        {
          start: 0,
          end: 4,
          attributes: {},
          positions: [
            { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 12, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
        {
          start: 4,
          end: 6,
          attributes: {},
          positions: [
            { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 20, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
      ],
    };

    expect(advanceWidthBetween(2, 6, string)).toBe(62);
  });

  test('should sum up single run advance width when not starting on zero', () => {
    const string = {
      string: '',
      runs: [
        {
          start: 2,
          end: 6,
          attributes: {},
          positions: [
            { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 12, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
      ],
    };

    expect(advanceWidthBetween(3, 5, string)).toBe(22);
  });

  test('should sum up multiple runs advance width when not starting on zero', () => {
    const string = {
      string: '',
      runs: [
        {
          start: 2,
          end: 6,
          attributes: {},
          positions: [
            { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 12, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
        {
          start: 6,
          end: 8,
          attributes: {},
          positions: [
            { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
            { xAdvance: 20, yAdvance: 0, xOffset: 0, yOffset: 0 },
          ],
        },
      ],
    };

    expect(advanceWidthBetween(4, 8, string)).toBe(62);
  });
});
