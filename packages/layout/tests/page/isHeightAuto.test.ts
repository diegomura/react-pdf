import { describe, expect, test } from 'vitest';

import isHeightAuto from '../../src/page/isHeightAuto';

describe('page isHeightAuto', () => {
  test('Should return false if height present', () => {
    const result = isHeightAuto({
      type: 'PAGE',
      props: {},
      box: { width: 100, height: 10 },
    });

    expect(result).toBeFalsy();
  });

  test('Should return false if height is zero', () => {
    const result = isHeightAuto({
      type: 'PAGE',
      props: {},
      box: { width: 100, height: 0 },
    });

    expect(result).toBeFalsy();
  });

  test('Should return false if height not present', () => {
    const result = isHeightAuto({
      type: 'PAGE',
      props: {},
      box: { width: 100 },
    });

    expect(result).toBeTruthy();
  });

  test('Should return false if height is null', () => {
    const result = isHeightAuto({
      type: 'PAGE',
      props: {},
      box: { width: 100, height: null as any },
    });

    expect(result).toBeTruthy();
  });

  test('Should return false if height is undefined', () => {
    const result = isHeightAuto({
      type: 'PAGE',
      props: {},
      box: { width: 100, height: undefined },
    });

    expect(result).toBeTruthy();
  });
});
