import { describe, expect, test } from 'vitest';

import lineGap from '../../src/run/lineGap';

describe('run lineGap operator', () => {
  test('should return 0 if font not present', () => {
    const run = { start: 0, end: 0, attributes: { fontSize: 12 } };

    expect(lineGap(run)).toBe(0);
  });

  test('should return 0 if fontSize not present', () => {
    const run = { start: 0, end: 0, attributes: { font: { unitsPerEm: 2 } } };

    expect(lineGap(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const font = { descent: 10 };

    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font },
    };

    expect(lineGap(run)).toBe(0);
  });

  test('should return 0 if unknown font decent', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: { unitsPerEm: 2 } },
    };

    expect(lineGap(run)).toBe(0);
  });

  test('should return correct font lineGap', () => {
    const run = {
      start: 0,
      end: 0,
      attributes: { fontSize: 12, font: { lineGap: 10, unitsPerEm: 2 } },
    };

    expect(lineGap(run)).toBe((10 * 12) / 2);
  });
});
