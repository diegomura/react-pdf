import { describe, expect, test } from '@jest/globals';

import lineGap from '../../src/run/lineGap';

describe('run lineGap operator', () => {
  test('should return 0 if font not present', () => {
    const run = { attributes: { fontSize: 12 } };

    expect(lineGap(run)).toBe(0);
  });

  test('should return 0 if fontSize not present', () => {
    const run = { attributes: { font: { unitsPerEm: 2 } } };

    expect(lineGap(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const run = { attributes: { fontSize: 12, font: { decent: 10 } } };

    expect(lineGap(run)).toBe(0);
  });

  test('should return 0 if unknown font decent', () => {
    const run = { attributes: { fontSize: 12, font: { unitsPerEm: 2 } } };

    expect(lineGap(run)).toBe(0);
  });

  test('should return correct font lineGap', () => {
    const run = {
      attributes: { fontSize: 12, font: { lineGap: 10, unitsPerEm: 2 } },
    };

    expect(lineGap(run)).toBe((10 * 12) / 2);
  });
});
