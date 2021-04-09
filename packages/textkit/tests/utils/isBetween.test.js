import * as R from 'ramda';

import isBetween from '../../src/utils/isBetween';

describe('utils isBetween operator', () => {
  test('should return false for lower trailing value', () => {
    expect(isBetween(R.always(4), R.always(8), 2)(null)).toBeFalsy();
  });

  test('should return true for lower value', () => {
    expect(isBetween(R.always(4), R.always(8), 4)(null)).toBeTruthy();
  });

  test('should return true for contained value', () => {
    expect(isBetween(R.always(4), R.always(8), 6)(null)).toBeTruthy();
  });

  test('should return true for last (non-inclusive) value', () => {
    expect(isBetween(R.always(4), R.always(8), 7)(null)).toBeTruthy();
  });

  test('should return false for higher value', () => {
    expect(isBetween(R.always(4), R.always(8), 8)(null)).toBeFalsy();
  });

  test('should return false for higher leading value', () => {
    expect(isBetween(R.always(4), R.always(8), 10)(null)).toBeFalsy();
  });

  test('should be called with predicates', () => {
    expect(
      isBetween(R.prop('start'), R.prop('end'), 6)({ start: 4, end: 8 }),
    ).toBeTruthy();
  });
});
