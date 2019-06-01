import * as R from 'ramda';
import Yoga from 'yoga-layout';

import getMargin from '../../src/node/getMargin';

const getComputedMargin = R.cond([
  [R.equals(Yoga.EDGE_TOP), R.always(1)],
  [R.equals(Yoga.EDGE_RIGHT), R.always(2)],
  [R.equals(Yoga.EDGE_BOTTOM), R.always(3)],
  [R.equals(Yoga.EDGE_LEFT), R.always(4)],
]);

describe('node getMargin', () => {
  test('Should return 0 by default if no yoga node available', () => {
    const result = getMargin({});

    expect(result).toHaveProperty('marginTop', 0);
    expect(result).toHaveProperty('marginRight', 0);
    expect(result).toHaveProperty('marginBottom', 0);
    expect(result).toHaveProperty('marginLeft', 0);
  });

  test('Should return yoga values if node available', () => {
    const _yogaNode = { getComputedMargin };
    const result = getMargin({ _yogaNode });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 3);
    expect(result).toHaveProperty('marginLeft', 4);
  });
});
