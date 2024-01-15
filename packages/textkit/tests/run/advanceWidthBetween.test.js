import { describe, expect, test } from '@jest/globals';

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
      positions: [
        { xAdvance: 5 },
        { xAdvance: 10 },
        { xAdvance: 15 },
        { xAdvance: 17 },
        { xAdvance: 18 },
      ],
    };

    expect(advanceWidthBetween(1, 2, run)).toBe(0);
  });

  test('should return 0 for trailing start and end', () => {
    const run = {
      start: 5,
      end: 10,
      positions: [
        { xAdvance: 5 },
        { xAdvance: 10 },
        { xAdvance: 15 },
        { xAdvance: 17 },
        { xAdvance: 18 },
      ],
    };

    expect(advanceWidthBetween(10, 15, run)).toBe(0);
  });

  test('should return correct width when leading start', () => {
    const run = {
      start: 5,
      end: 10,
      positions: [
        { xAdvance: 5 },
        { xAdvance: 10 },
        { xAdvance: 15 },
        { xAdvance: 17 },
        { xAdvance: 18 },
      ],
    };

    expect(advanceWidthBetween(3, 7, run)).toBe(15);
  });

  test('should return correct width when trailing end', () => {
    const run = {
      start: 5,
      end: 10,
      positions: [
        { xAdvance: 5 },
        { xAdvance: 10 },
        { xAdvance: 15 },
        { xAdvance: 17 },
        { xAdvance: 18 },
      ],
    };

    expect(advanceWidthBetween(8, 15, run)).toBe(35);
  });

  test('should return correct width when leading start and trailing end', () => {
    const run = {
      start: 5,
      end: 10,
      positions: [
        { xAdvance: 5 },
        { xAdvance: 10 },
        { xAdvance: 15 },
        { xAdvance: 17 },
        { xAdvance: 18 },
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
        { xAdvance: 5 },
        { xAdvance: 10 },
        { xAdvance: 15 },
        { xAdvance: 17 },
        { xAdvance: 18 },
      ],
    };

    expect(advanceWidthBetween(1, 4, run)).toBe(42);
  });

  test('should sum up positions values when not starting on zero', () => {
    const positions = [
      { xAdvance: 5 },
      { xAdvance: 10 },
      { xAdvance: 15 },
      { xAdvance: 17 },
      { xAdvance: 18 },
    ];
    const run = { start: 5, end: 10, attributes: {}, positions };

    expect(advanceWidthBetween(7, 9, run)).toBe(32);
  });
});
