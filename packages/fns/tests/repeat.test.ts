import { describe, expect, test } from 'vitest';

import repeat from '../src/repeat';

describe('repeat', () => {
  test('should repeat property  times', () => {
    expect(repeat('a', 5)).toEqual(['a', 'a', 'a', 'a', 'a']);
    expect(repeat('b', 0)).toEqual([]);
    expect(repeat('Lorem', 1)).toEqual(['Lorem']);
    expect(repeat('Ipsum', 2)).toEqual(['Ipsum', 'Ipsum']);
    expect(repeat(undefined, 3)).toEqual([undefined, undefined, undefined]);
  });

  test('should not repeat property', () => {
    expect(repeat('Lorem')).toEqual([]);
  });

  test('should repeat numbers', () => {
    expect(repeat(42, 3)).toEqual([42, 42, 42]);
    expect(repeat(0, 2)).toEqual([0, 0]);
  });

  test('should repeat objects with same reference', () => {
    const obj = { id: 1 };
    const result = repeat(obj, 3);

    expect(result).toEqual([obj, obj, obj]);
    expect(result[0]).toBe(obj);
    expect(result[1]).toBe(obj);
    expect(result[2]).toBe(obj);
  });

  test('should repeat null', () => {
    expect(repeat(null, 2)).toEqual([null, null]);
  });

  test('should repeat false', () => {
    expect(repeat(false, 3)).toEqual([false, false, false]);
  });
});
