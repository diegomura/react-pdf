import { describe, expect, test } from 'vitest';

import runIndexAt from '../../src/run/runIndexAt';

const runs = [
  { start: 0, end: 6, attributes: {} },
  { start: 6, end: 12, attributes: {} },
];

describe('run runIndexAt operator', () => {
  test('should get index at start of first run', () => {
    const result = runIndexAt(0, runs);
    expect(result).toBe(0);
  });

  test('should get index at end of first run', () => {
    const result = runIndexAt(5, runs);
    expect(result).toBe(0);
  });

  test('should get index at start of last run', () => {
    const result = runIndexAt(6, runs);
    expect(result).toBe(1);
  });

  test('should get index at end of last run', () => {
    const result = runIndexAt(11, runs);
    expect(result).toBe(1);
  });

  test('should get -1 at invalid index', () => {
    const result = runIndexAt(12, runs);
    expect(result).toBe(-1);
  });
});
