import { describe, expect, test } from 'vitest';

import ascent from '../../src/run/ascent';
import { Font } from '../../src/types';

describe('run ascent operator', () => {
  test('should return 0 if font not present', () => {
    const run = { start: 0, end: 0, attributes: { fontSize: 12 } };

    expect(ascent(run)).toBe(0);
  });

  test('should return 0 if fontSize not present', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { font: [{ unitsPerEm: 2 } as Font] },
    };

    expect(ascent(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: [{ ascent: 10 } as Font] },
    };

    expect(ascent(run)).toBe(0);
  });

  test('should return 0 if unknown font ascent', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: [{ unitsPerEm: 2 } as Font] },
    };

    expect(ascent(run)).toBe(0);
  });

  test('should return correct font ascent', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: {
        fontSize: 12,
        font: [{ ascent: 10, unitsPerEm: 2 } as Font],
      },
    };

    expect(ascent(run)).toBe((10 * 12) / 2);
  });

  test('should return correct font ascent with shortest attachment', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: {
        fontSize: 12,
        attachment: { width: 5, height: 5, image: Buffer.from('') },
        font: [{ ascent: 10, unitsPerEm: 2 } as Font],
      },
    };

    expect(ascent(run)).toBe((10 * 12) / 2);
  });

  test('should return attachment height if taller', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: {
        fontSize: 12,
        attachment: { width: 70, height: 70, image: Buffer.from('') },
        font: [{ ascent: 10, unitsPerEm: 2 } as Font],
      },
    };

    expect(ascent(run)).toBe(70);
  });
});
