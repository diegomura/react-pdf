import { describe, expect, test } from '@jest/globals';

import scale from '../../src/run/scale';

describe('run scale operator', () => {
  test('should return 0 if font not present', () => {
    const run = { attributes: { fontSize: 12 } };

    expect(scale(run)).toBe(0);
  });

  test('should return 0 if unknown font unitsPerEm', () => {
    const run = { attributes: { fontSize: 12, font: { other: 'blah' } } };

    expect(scale(run)).toBe(0);
  });

  test('should return correct font scale', () => {
    const run = { attributes: { fontSize: 12, font: { unitsPerEm: 2 } } };

    expect(scale(run)).toBe(12 / 2);
  });
});
