import { describe, expect, test } from 'vitest';

import descent from '../../src/run/descent';

describe('run descent operator', () => {
  test('should return 0 if font no attributes present', () => {
    const run = {};

    expect(descent(run)).toBe(0);
  });

  test('should return 0 if font not present', () => {
    const run = { attributes: { fontSize: 12 } };

    expect(descent(run)).toBe(0);
  });

  test('should return 0 if fontSize not present', () => {
    const run = { attributes: { font: { unitsPerEm: 2 } } };

    expect(descent(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const run = { attributes: { fontSize: 12, font: { descent: -10 } } };

    expect(Math.abs(descent(run))).toBe(0);
  });

  test('should return 0 if unknown font descent', () => {
    const run = { attributes: { fontSize: 12, font: { unitsPerEm: 2 } } };

    expect(descent(run)).toBe(0);
  });

  test('should return correct font descent', () => {
    const run = {
      attributes: { fontSize: 12, font: { descent: -10, unitsPerEm: 2 } },
    };

    expect(descent(run)).toBe(-(10 * 12) / 2);
  });
});
