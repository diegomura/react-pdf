import * as R from 'ramda';
import Yoga from '@govind-react-pdf/yoga';

import getBorderWidth from '../../src/node/getBorderWidth';

const getComputedBorder = R.cond([
  [R.equals(Yoga.EDGE_TOP), R.always(1)],
  [R.equals(Yoga.EDGE_RIGHT), R.always(2)],
  [R.equals(Yoga.EDGE_BOTTOM), R.always(3)],
  [R.equals(Yoga.EDGE_LEFT), R.always(4)],
]);

describe('node getBorderWidth', () => {
  test('Should return 0 by default if no yoga node available', () => {
    const result = getBorderWidth({});

    expect(result).toHaveProperty('borderTopWidth', 0);
    expect(result).toHaveProperty('borderRightWidth', 0);
    expect(result).toHaveProperty('borderBottomWidth', 0);
    expect(result).toHaveProperty('borderLeftWidth', 0);
  });

  test('Should return yoga values if node available', () => {
    const _yogaNode = { getComputedBorder };
    const result = getBorderWidth({ _yogaNode });

    expect(result).toHaveProperty('borderTopWidth', 1);
    expect(result).toHaveProperty('borderRightWidth', 2);
    expect(result).toHaveProperty('borderBottomWidth', 3);
    expect(result).toHaveProperty('borderLeftWidth', 4);
  });
});
