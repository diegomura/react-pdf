import { describe, expect, test } from 'vitest';

import sort from '../../src/run/sort';

describe('run sort operator', () => {
  test('should sort no runs', () => {
    const sorted = sort([]);

    expect(sorted).toHaveLength(0);
  });

  test('should sort one run', () => {
    const runs = [{ start: 5, end: 15, attributes: {} }];
    const sorted = sort(runs);

    expect(sorted).toHaveLength(1);
    expect(sorted[0]).toHaveProperty('start', 5);
    expect(sorted[0]).toHaveProperty('end', 15);
  });

  test('should sort ordered runs', () => {
    const runs = [
      { start: 5, end: 15, attributes: {} },
      { start: 10, end: 25, attributes: {} },
    ];
    const sorted = sort(runs);

    expect(sorted).toHaveLength(2);
    expect(sorted[0]).toHaveProperty('start', 5);
    expect(sorted[0]).toHaveProperty('end', 15);
    expect(sorted[1]).toHaveProperty('start', 10);
    expect(sorted[1]).toHaveProperty('end', 25);
  });

  test('should sort unordered runs', () => {
    const runs = [
      { start: 10, end: 25, attributes: {} },
      { start: 5, end: 15, attributes: {} },
    ];
    const sorted = sort(runs);

    expect(sorted).toHaveLength(2);
    expect(sorted[0]).toHaveProperty('start', 5);
    expect(sorted[0]).toHaveProperty('end', 15);
    expect(sorted[1]).toHaveProperty('start', 10);
    expect(sorted[1]).toHaveProperty('end', 25);
  });

  test('should sort many runs', () => {
    const runs = [
      { start: 10, end: 25, attributes: {} },
      { start: 0, end: 10, attributes: {} },
      { start: 5, end: 15, attributes: {} },
    ];
    const sorted = sort(runs);

    expect(sorted).toHaveLength(3);
    expect(sorted[0]).toHaveProperty('start', 0);
    expect(sorted[0]).toHaveProperty('end', 10);
    expect(sorted[1]).toHaveProperty('start', 5);
    expect(sorted[1]).toHaveProperty('end', 15);
    expect(sorted[2]).toHaveProperty('start', 10);
    expect(sorted[2]).toHaveProperty('end', 25);
  });
});
