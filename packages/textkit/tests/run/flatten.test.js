import { describe, expect, test } from 'vitest';

import flatten from '../../src/run/flatten';

describe('run flatten operator', () => {
  test('should return empty array if no runs passed', () => {
    const runs = flatten();

    expect(runs).toHaveLength(0);
  });

  test('should return empty run', () => {
    const runs = flatten([{ start: 0, end: 0, attributes: { strike: true } }]);

    expect(runs).toHaveLength(1);
    expect(runs[0].attributes).toEqual({ strike: true });
  });

  test('should merge two equal empty runs', () => {
    const runs = flatten([
      { start: 0, end: 0, attributes: { strike: true } },
      { start: 0, end: 0, attributes: { color: 'red' } },
    ]);

    expect(runs).toHaveLength(1);
    expect(runs[0]).toHaveProperty('start', 0);
    expect(runs[0]).toHaveProperty('end', 0);
    expect(runs[0].attributes).toEqual({ strike: true, color: 'red' });
  });

  test('should merge two differet empty runs', () => {
    const runs = flatten([
      { start: 0, end: 0, attributes: { strike: true } },
      { start: 5, end: 5, attributes: { color: 'red' } },
    ]);

    expect(runs).toHaveLength(2);
    expect(runs[0]).toHaveProperty('start', 0);
    expect(runs[0]).toHaveProperty('end', 0);
    expect(runs[0].attributes).toEqual({ strike: true });
    expect(runs[1]).toHaveProperty('start', 5);
    expect(runs[1]).toHaveProperty('end', 5);
    expect(runs[1].attributes).toEqual({ color: 'red' });
  });

  test('should merge two equal runs into one', () => {
    const runs = flatten([
      { start: 0, end: 10, attributes: { strike: true } },
      { start: 0, end: 10, attributes: { color: 'red' } },
    ]);

    expect(runs).toHaveLength(1);
    expect(runs[0]).toHaveProperty('start', 0);
    expect(runs[0]).toHaveProperty('end', 10);
    expect(runs[0].attributes).toEqual({ strike: true, color: 'red' });
  });

  test('should split containing runs in two', () => {
    const runs = flatten([
      { start: 0, end: 10, attributes: { strike: true } },
      { start: 0, end: 15, attributes: { color: 'red' } },
    ]);

    expect(runs).toHaveLength(2);

    expect(runs[0]).toHaveProperty('start', 0);
    expect(runs[0]).toHaveProperty('end', 10);
    expect(runs[0].attributes).toEqual({ strike: true, color: 'red' });

    expect(runs[1]).toHaveProperty('start', 10);
    expect(runs[1]).toHaveProperty('end', 15);
    expect(runs[1].attributes).toEqual({ color: 'red' });
  });

  test('should split containing runs in three', () => {
    const runs = flatten([
      { start: 0, end: 10, attributes: { strike: true } },
      { start: 5, end: 15, attributes: { color: 'red' } },
    ]);

    expect(runs).toHaveLength(3);

    expect(runs[0]).toHaveProperty('start', 0);
    expect(runs[0]).toHaveProperty('end', 5);
    expect(runs[0].attributes).toEqual({ strike: true });

    expect(runs[1]).toHaveProperty('start', 5);
    expect(runs[1]).toHaveProperty('end', 10);
    expect(runs[1].attributes).toEqual({ strike: true, color: 'red' });

    expect(runs[2]).toHaveProperty('start', 10);
    expect(runs[2]).toHaveProperty('end', 15);
    expect(runs[2].attributes).toEqual({ color: 'red' });
  });

  test('should leave disjoint runs as they are', () => {
    const runs = flatten([
      { start: 0, end: 10, attributes: { strike: true } },
      { start: 10, end: 20, attributes: { color: 'red' } },
    ]);

    expect(runs).toHaveLength(2);

    expect(runs[0]).toHaveProperty('start', 0);
    expect(runs[0]).toHaveProperty('end', 10);
    expect(runs[0].attributes).toEqual({ strike: true });

    expect(runs[1]).toHaveProperty('start', 10);
    expect(runs[1]).toHaveProperty('end', 20);
    expect(runs[1].attributes).toEqual({ color: 'red' });
  });

  test('should fill empty spaces with empty runs', () => {
    const runs = flatten([
      { start: 0, end: 10, attributes: { strike: true } },
      { start: 15, end: 20, attributes: { color: 'red' } },
    ]);

    expect(runs).toHaveLength(3);

    expect(runs[1]).toHaveProperty('start', 10);
    expect(runs[1]).toHaveProperty('end', 15);
    expect(runs[1].attributes).toEqual({});
  });
});
