import { describe, expect, test } from '@jest/globals';

import length from '../../src/run/length';

describe('run length operator', () => {
  test('should be zero for empty run', () => {
    const run = { start: 5, end: 5 };

    expect(length(run)).toBe(0);
  });

  test('should be correct length for run', () => {
    const run = { start: 5, end: 15 };

    expect(length(run)).toBe(10);
  });
});
