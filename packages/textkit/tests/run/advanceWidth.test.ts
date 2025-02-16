import { describe, expect, test } from 'vitest';

import advanceWidth from '../../src/run/advanceWidth';

describe('run advanceWidth operator', () => {
  test('should return 0 if positions not present', () => {
    const run = {
      start: 5,
      end: 15,
      attributes: {},
    };

    expect(advanceWidth(run)).toBe(0);
  });

  test('should return 0 if positions empty', () => {
    const run = {
      start: 5,
      end: 15,
      attributes: {},
    };

    expect(advanceWidth(run)).toBe(0);
  });

  test('should sum up positions values', () => {
    const positions = [
      { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
      { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
      { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
    ];
    const run = {
      start: 5,
      end: 15,
      attributes: {},
      positions,
      glyphs: [],
      glyphIndices: [],
    };

    expect(advanceWidth(run)).toBe(30);
  });

  test('should ignore invalid positions', () => {
    const positions = [
      { xAdvance: 5 },
      { xAdvance: 10 },
      { xAdvance: 15 },
      { someAdvance: 15 },
    ];
    const run = {
      start: 5,
      end: 15,
      attributes: {},
      positions,
      glyphs: [],
      glyphIndices: [],
    };

    // @ts-expect-error - intentionally invalid argument
    expect(advanceWidth(run)).toBe(30);
  });
});
