import { describe, expect, test } from 'vitest';

import descent from '../../src/run/descent';
import { Font } from '../../src/types';

describe('run descent operator', () => {
  test('should return 0 if font not present', () => {
    const run = { start: 0, end: 0, attributes: { fontSize: 12 } };

    expect(descent(run)).toBe(0);
  });

  test('should return 0 if fontSize not present', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { font: [{ unitsPerEm: 2 } as Font] },
    };

    expect(descent(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: [{ descent: -10 } as Font] },
    };

    expect(Math.abs(descent(run))).toBe(0);
  });

  test('should return 0 if unknown font descent', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: [{ unitsPerEm: 2 } as Font] },
    };

    expect(descent(run)).toBe(0);
  });

  test('should return correct font descent', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: {
        fontSize: 12,
        font: [{ descent: -10, unitsPerEm: 2 } as Font],
      },
    };

    expect(descent(run)).toBe(-(10 * 12) / 2);
  });
});
