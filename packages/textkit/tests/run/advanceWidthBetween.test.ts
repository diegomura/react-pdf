import { describe, expect, test } from 'vitest';

import advanceWidthBetween from '../../src/run/advanceWidthBetween';

describe('run advanceWidthBetween operator', () => {
  test('should return 0 if positions not present', () => {
    const run = { start: 5, end: 15, attributes: {} };

    expect(advanceWidthBetween(8, 10, run)).toBe(0);
  });

  test('should return 0 if positions empty', () => {
    const run = { start: 5, end: 15, attributes: {}, positions: [] };

    expect(advanceWidthBetween(8, 10, run)).toBe(0);
  });

  test('should return 0 for leading start and end', () => {
    const run = {
      start: 5,
      end: 10,
      attributes: {},
      positions: [
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 17, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 18, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(advanceWidthBetween(1, 2, run)).toBe(0);
  });

  test('should return 0 for trailing start and end', () => {
    const run = {
      start: 5,
      end: 10,
      attributes: {},
      positions: [
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 17, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 18, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(advanceWidthBetween(10, 15, run)).toBe(0);
  });

  test('should return correct width when leading start', () => {
    const run = {
      start: 5,
      end: 10,
      attributes: {},
      positions: [
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 17, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 18, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(advanceWidthBetween(3, 7, run)).toBe(15);
  });

  test('should return correct width when trailing end', () => {
    const run = {
      start: 5,
      end: 10,
      attributes: {},
      positions: [
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 17, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 18, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(advanceWidthBetween(8, 15, run)).toBe(35);
  });

  test('should return correct width when leading start and trailing end', () => {
    const run = {
      start: 5,
      end: 10,
      attributes: {},
      positions: [
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 17, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 18, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(advanceWidthBetween(3, 15, run)).toBe(65);
  });

  test('should sum up positions values', () => {
    const run = {
      start: 0,
      end: 5,
      attributes: {},
      positions: [
        { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 17, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 18, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(advanceWidthBetween(1, 4, run)).toBe(42);
  });

  test('should sum up positions values when not starting on zero', () => {
    const positions = [
      { xAdvance: 5, yAdvance: 0, xOffset: 0, yOffset: 0 },
      { xAdvance: 10, yAdvance: 0, xOffset: 0, yOffset: 0 },
      { xAdvance: 15, yAdvance: 0, xOffset: 0, yOffset: 0 },
      { xAdvance: 17, yAdvance: 0, xOffset: 0, yOffset: 0 },
      { xAdvance: 18, yAdvance: 0, xOffset: 0, yOffset: 0 },
    ];
    const run = { start: 5, end: 10, attributes: {}, positions };

    expect(advanceWidthBetween(7, 9, run)).toBe(32);
  });

  test('should return correct width for each character with glyphIndices', () => {
    // Simulates a CJK run where scriptItemizer splits by script
    // e.g., "本当" as a Han run with 1:1 glyph mapping
    const run = {
      start: 0,
      end: 2,
      attributes: {},
      glyphIndices: [0, 1],
      positions: [
        { xAdvance: 12, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 12, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(advanceWidthBetween(0, 1, run)).toBe(12);
    expect(advanceWidthBetween(1, 2, run)).toBe(12);
    expect(advanceWidthBetween(0, 2, run)).toBe(24);
  });

  test('should return correct width for last character with glyphIndices and offset start', () => {
    // Run starting at offset, like a Katakana run after Han+Hiragana runs
    const run = {
      start: 3,
      end: 7,
      attributes: {},
      glyphIndices: [0, 1, 2, 3],
      positions: [
        { xAdvance: 12, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 11, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 12, yAdvance: 0, xOffset: 0, yOffset: 0 },
        { xAdvance: 12, yAdvance: 0, xOffset: 0, yOffset: 0 },
      ],
    };

    expect(advanceWidthBetween(3, 4, run)).toBe(12);
    expect(advanceWidthBetween(6, 7, run)).toBe(12);
    expect(advanceWidthBetween(3, 7, run)).toBe(47);
  });
});
