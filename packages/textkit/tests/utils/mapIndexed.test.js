import * as R from 'ramda';

import mapIndexed from '../../src/utils/mapIndexed';

describe('utils mapIndexed operator', () => {
  test('should apply same function to all values if only one provided', () => {
    expect(mapIndexed([R.identity], [2, 3, 4])).toEqual([2, 3, 4]);
  });

  test('should apply respective functions to values', () => {
    const fns = [R.always(0), R.identity, R.always(Infinity)];
    expect(mapIndexed(fns, [2, 3, 4, 5])).toEqual([0, 3, 4, Infinity]);
  });
});
