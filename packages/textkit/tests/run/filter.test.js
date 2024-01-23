import { describe, expect, test } from 'vitest';

import filter from '../../src/run/filter';

describe('run filter operator', () => {
  test('should return empty array if no runs passed', () => {
    const filtered = filter(2, 15, []);

    expect(filtered).toHaveLength(0);
  });

  test('should filter only one run', () => {
    const attributes = { something: 'blah' };
    const runs = [{ start: 0, end: 15, attributes }];
    const filtered = filter(2, 15, runs);

    expect(filtered).toHaveLength(1);
    expect(filtered[0]).toEqual(runs[0]);
  });

  test('should filter many runs', () => {
    const runs = [
      { start: 0, end: 6 },
      { start: 6, end: 12 },
    ];
    const filtered = filter(2, 11, runs);

    expect(filtered).toHaveLength(2);
    expect(filtered[0]).toEqual(runs[0]);
    expect(filtered[1]).toEqual(runs[1]);
  });

  test('should filter trailing runs', () => {
    const runs = [
      { start: 0, end: 6 },
      { start: 6, end: 12 },
    ];
    const filtered = filter(7, 11, runs);

    expect(filtered).toHaveLength(1);
    expect(filtered[0]).toEqual(runs[1]);
  });

  test('should filter leading runs', () => {
    const runs = [
      { start: 0, end: 6 },
      { start: 6, end: 12 },
    ];
    const filtered = filter(1, 5, runs);

    expect(filtered).toHaveLength(1);
    expect(filtered[0]).toEqual(runs[0]);
  });
});
