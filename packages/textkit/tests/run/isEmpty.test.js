import { describe, expect, test } from 'vitest';

import isEmpty from '../../src/run/isEmpty';

describe('run isEmpty operator', () => {
  test('should be truthy for empty run', () => {
    const run = { start: 5, end: 5 };

    expect(isEmpty(run)).toBeTruthy();
  });

  test('should be falsy for non-empty run', () => {
    const run = { start: 5, end: 10 };

    expect(isEmpty(run)).toBeFalsy();
  });
});
