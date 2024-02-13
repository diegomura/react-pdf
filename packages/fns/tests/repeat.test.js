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
});
