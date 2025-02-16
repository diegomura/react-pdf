import { describe, expect, test } from 'vitest';

import length from '../../src/run/length';

describe('run length operator', () => {
  test('should be zero for empty run', () => {
    const run = { start: 5, end: 5, attributes: {} };

    expect(length(run)).toBe(0);
  });

  test('should be correct length for run', () => {
    const run = { start: 5, end: 15, attributes: {} };

    expect(length(run)).toBe(10);
  });
});
