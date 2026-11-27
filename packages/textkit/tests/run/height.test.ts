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

  test('should return user lineHeight when it exceeds the intrinsic height', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: {
        fontSize: 12,
        lineHeight: 200,
        font: [{ descent: -10, ascent: 15, lineGap: 2, unitsPerEm: 2 } as Font],
      },
    };

    // intrinsic = (15 + 10 + 2) * 12 / 2 = 162; user lineHeight = 200 wins.
    expect(height(run)).toBe(200);
  });

  test('should clamp user lineHeight up to the intrinsic height (CSS line-box rule)', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: {
        fontSize: 12,
        lineHeight: 5,
        font: [{ descent: -10, ascent: 15, lineGap: 2, unitsPerEm: 2 } as Font],
      },
    };

    // intrinsic = 162 > user lineHeight = 5; line-box must grow.
    expect(height(run)).toBe(((15 + 10 + 2) * 12) / 2);
  });

  test('should use OS/2 typo metrics when computing the intrinsic height', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: {
        fontSize: 12,
        font: [
          {
            // hhea inflated (typical Source Han Sans behaviour).
            ascent: 1160,
            descent: -288,
            lineGap: 0,
            unitsPerEm: 1000,
            'OS/2': {
              typoAscender: 880,
              typoDescender: -120,
              typoLineGap: 0,
            },
          } as unknown as Font,
        ],
      },
    };

    // typo intrinsic = (880 - (-120) + 0) * 12 / 1000 = 12;
    // hhea intrinsic would have been (1160 - (-288)) * 12 / 1000 = 17.376.
    expect(height(run)).toBe(12);
  });
});
