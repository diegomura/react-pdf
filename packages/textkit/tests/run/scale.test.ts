import { describe, expect, test } from 'vitest';

import scale from '../../src/run/scale';
import { Font } from '../../src/types';

describe('run scale operator', () => {
  test('should return 0 if font not present', () => {
    const run = { start: 0, end: 0, attributes: { fontSize: 12 } };

    expect(scale(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const font = [{ ascent: 0 } as Font];

    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font },
    };

    expect(scale(run)).toBe(0);
  });

  test('should return correct font scale', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: [{ unitsPerEm: 2 } as Font] },
    };

    expect(scale(run)).toBe(12 / 2);
  });
});
