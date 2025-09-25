import { describe, expect, test } from 'vitest';

import getUTF16Increment from '../src/getUTF16Increment';

describe('getUTF16Increment', () => {
  test('returns 1 for BMP characters', () => {
    expect(getUTF16Increment(0x0000)).toEqual(1);
    expect(getUTF16Increment(0x007f)).toEqual(1);
    expect(getUTF16Increment(0xffff)).toEqual(1);
  });

  test('returns 2 for surrogate pairs', () => {
    expect(getUTF16Increment(0x10000)).toEqual(2);
    expect(getUTF16Increment(0x10ffff)).toEqual(2);
  });
});
