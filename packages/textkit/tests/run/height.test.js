import { describe, expect, test } from '@jest/globals';

import height from '../../src/run/height';

describe('run height operator', () => {
  test('should return 0 if font no attributes present', () => {
    const run = {};

    expect(height(run)).toBe(0);
  });

  test('should return 0 if attributes empty', () => {
    const run = { attributes: {} };

    expect(height(run)).toBe(0);
  });

  test('should line height if present', () => {
    const run = { attributes: { lineHeight: 20 } };

    expect(height(run)).toBe(20);
  });

  test('should return 0 if font not present', () => {
    const run = { attributes: { fontSize: 12 } };

    expect(height(run)).toBe(0);
  });

  test('should return 0 if fontSize not present', () => {
    const run = { attributes: { font: { unitsPerEm: 2 } } };

    expect(height(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const run = { attributes: { fontSize: 12, font: { height: 10 } } };

    expect(height(run)).toBe(0);
  });

  test('should return 0 if unknown font descent', () => {
    const run = { attributes: { fontSize: 12, font: { unitsPerEm: 2 } } };

    expect(height(run)).toBe(0);
  });

  test('should return 0 if unknown font ascent', () => {
    const run = { attributes: { fontSize: 12, font: { unitsPerEm: 2 } } };

    expect(height(run)).toBe(0);
  });

  test('should return correct height', () => {
    const run = {
      attributes: {
        fontSize: 12,
        font: { descent: -10, ascent: 15, lineGap: 2, unitsPerEm: 2 },
      },
    };

    expect(height(run)).toBe(((15 + 10 + 2) * 12) / 2);
  });
});
