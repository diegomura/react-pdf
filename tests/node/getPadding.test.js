import * as R from 'ramda';
import Yoga from 'yoga-layout';

import getPadding from '../../src/node/getPadding';

const getComputedPadding = R.cond([
  [R.equals(Yoga.EDGE_TOP), R.always(1)],
  [R.equals(Yoga.EDGE_RIGHT), R.always(2)],
  [R.equals(Yoga.EDGE_BOTTOM), R.always(3)],
  [R.equals(Yoga.EDGE_LEFT), R.always(4)],
]);

describe('node getPadding', () => {
  test('Should return 0 by default if no yoga node available', () => {
    const result = getPadding({});

    expect(result).toHaveProperty('paddingTop', 0);
    expect(result).toHaveProperty('paddingRight', 0);
    expect(result).toHaveProperty('paddingBottom', 0);
    expect(result).toHaveProperty('paddingLeft', 0);
  });

  test('Should return yoga values if node available', () => {
    const _yogaNode = { getComputedPadding };
    const result = getPadding({ _yogaNode });

    expect(result).toHaveProperty('paddingTop', 1);
    expect(result).toHaveProperty('paddingRight', 2);
    expect(result).toHaveProperty('paddingBottom', 3);
    expect(result).toHaveProperty('paddingLeft', 4);
  });
});
