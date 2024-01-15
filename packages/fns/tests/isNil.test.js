/* eslint-disable no-void */
import { describe, expect, test } from 'vitest';

import isNil from '../src/isNil';

describe('isNil', () => {
  test('tests a value for `null` or `undefined`', () => {
    expect(isNil(void 0)).toBe(true);
    expect(isNil(null)).toBe(true);
    expect(isNil([])).toBe(false);
    expect(isNil({})).toBe(false);
    expect(isNil(0)).toBe(false);
    expect(isNil('')).toBe(false);
  });
});
