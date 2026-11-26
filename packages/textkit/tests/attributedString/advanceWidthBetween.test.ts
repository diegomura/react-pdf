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

  test('should return 0 when start equals end', () => {
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

    expect(advanceWidthBetween(2, 2, string)).toBe(0);
  });

  test('should return 0 when range is completely outside of runs', () => {
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

    expect(advanceWidthBetween(10, 15, string)).toBe(0);
  });

  test('should handle range partially overlapping at the start of a run', () => {
    const string = {
      string: '',
      runs: [
        {
          start: 5,
          end: 9,
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

    // Range 3-7 overlaps with run 5-9 at positions 5-7 (indices 0-2)
    expect(advanceWidthBetween(3, 7, string)).toBe(15); // 5 + 10
  });

  test('should handle range partially overlapping at the end of a run', () => {
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

    // Range 2-10 overlaps with run 0-4 at positions 2-4 (indices 2-4)
    expect(advanceWidthBetween(2, 10, string)).toBe(27); // 12 + 15
  });

  test('should handle single position in range', () => {
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

    expect(advanceWidthBetween(1, 2, string)).toBe(10);
  });

  test('should return correct per-character width for CJK runs split by script', () => {
    // Simulates scriptItemizer splitting "本当にテキスト" into:
    //   run 0: "本当" (Han)
    //   run 1: "に"   (Hiragana)
    //   run 2: "テキスト" (Katakana)
    const pos = (w: number) => ({
      xAdvance: w,
      yAdvance: 0,
      xOffset: 0,
      yOffset: 0,
    });
    const string = {
      string: '本当にテキスト',
      runs: [
        {
          start: 0,
          end: 2,
          attributes: {},
          glyphIndices: [0, 1],
          positions: [pos(12), pos(12)],
        },
        {
          start: 2,
          end: 3,
          attributes: {},
          glyphIndices: [0],
          positions: [pos(12)],
        },
        {
          start: 3,
          end: 7,
          attributes: {},
          glyphIndices: [0, 1, 2, 3],
          positions: [pos(12), pos(11), pos(12), pos(12)],
        },
      ],
    };

    // Each character should return its own width, not 0
    expect(advanceWidthBetween(0, 1, string)).toBe(12); // 本
    expect(advanceWidthBetween(1, 2, string)).toBe(12); // 当
    expect(advanceWidthBetween(2, 3, string)).toBe(12); // に
    expect(advanceWidthBetween(3, 4, string)).toBe(12); // テ
    expect(advanceWidthBetween(4, 5, string)).toBe(11); // キ
    expect(advanceWidthBetween(5, 6, string)).toBe(12); // ス
    expect(advanceWidthBetween(6, 7, string)).toBe(12); // ト

    // Cross-run range
    expect(advanceWidthBetween(0, 7, string)).toBe(83);
  });
});
