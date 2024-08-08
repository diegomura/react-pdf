import { describe, expect, test } from 'vitest';

import omit from '../src/omit';

describe('omit', () => {
  const obj = { a: 1, b: 2, c: 3 };

  test('copies an object omitting the listed property', () => {
    expect(omit('a', obj)).toEqual({ b: 2, c: 3 });
  });

  test('copies an object omitting the listed properties', () => {
    expect(omit(['a', 'c'], obj)).toEqual({ b: 2 });
  });
});
