import { describe, expect, test } from 'vitest';

import height from '../../src/run/height';
import { Font } from '../../src/types';

describe('run height operator', () => {
  test('should return 0 if attributes empty', () => {
    const run = { start: 0, end: 0, attributes: {} };

    expect(height(run)).toBe(0);
  });

  test('should line height if present', () => {
    const run = { start: 0, end: 0, attributes: { lineHeight: 20 } };

    expect(height(run)).toBe(20);
  });

  test('should return 0 if font not present', () => {
    const run = { start: 0, end: 0, attributes: { fontSize: 12 } };

    expect(height(run)).toBe(0);
  });

  test('should return 0 if fontSize not present', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { font: [{ unitsPerEm: 2 } as Font] },
    };

    expect(height(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: [{ fullName: 'other' } as Font] },
    };

    expect(height(run)).toBe(0);
  });

  test('should return 0 if unknown font descent', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: [{ unitsPerEm: 2 } as Font] },
    };

    expect(height(run)).toBe(0);
  });

  test('should return 0 if unknown font ascent', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: [{ unitsPerEm: 2 } as Font] },
    };

    expect(height(run)).toBe(0);
  });

  test('should return correct height', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: {
        fontSize: 12,
        font: [{ descent: -10, ascent: 15, lineGap: 2, unitsPerEm: 2 } as Font],
      },
    };

    expect(height(run)).toBe(((15 + 10 + 2) * 12) / 2);
  });
});
