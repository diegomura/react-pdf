import { describe, expect, test } from '@jest/globals';

import empty from '../../src/run/empty';

describe('run empty operator', () => {
  test('should return empty run', () => {
    const result = empty();

    expect(result).toHaveProperty('start', 0);
    expect(result).toHaveProperty('end', 0);
    expect(result).toHaveProperty('glyphs', []);
    expect(result).toHaveProperty('glyphIndices', []);
    expect(result).toHaveProperty('positions', []);
  });
});
