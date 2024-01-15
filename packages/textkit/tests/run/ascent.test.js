import { describe, expect, test } from '@jest/globals';

import ascent from '../../src/run/ascent';

describe('run ascent operator', () => {
  test('should return 0 if font no attributes present', () => {
    const run = {};

    expect(ascent(run)).toBe(0);
  });

  test('should return 0 if font not present', () => {
    const run = { attributes: { fontSize: 12 } };

    expect(ascent(run)).toBe(0);
  });

  test('should return 0 if fontSize not present', () => {
    const run = { attributes: { font: { unitsPerEm: 2 } } };

    expect(ascent(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const run = { attributes: { fontSize: 12, font: { ascent: 10 } } };

    expect(ascent(run)).toBe(0);
  });

  test('should return 0 if unknown font ascent', () => {
    const run = { attributes: { fontSize: 12, font: { unitsPerEm: 2 } } };

    expect(ascent(run)).toBe(0);
  });

  test('should return correct font ascent', () => {
    const run = {
      attributes: { fontSize: 12, font: { ascent: 10, unitsPerEm: 2 } },
    };

    expect(ascent(run)).toBe((10 * 12) / 2);
  });

  test('should return correct font ascent with shortest attachment', () => {
    const run = {
      attributes: {
        fontSize: 12,
        attachment: { height: 5 },
        font: { ascent: 10, unitsPerEm: 2 },
      },
    };

    expect(ascent(run)).toBe((10 * 12) / 2);
  });

  test('should return attachment height if taller', () => {
    const run = {
      attributes: {
        fontSize: 12,
        attachment: { height: 70 },
        font: { ascent: 10, unitsPerEm: 2 },
      },
    };

    expect(ascent(run)).toBe(70);
  });
});
