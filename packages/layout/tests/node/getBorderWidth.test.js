import Yoga from '@react-pdf/yoga';

import getBorderWidth from '../../src/node/getBorderWidth';

const getComputedBorder = value => {
  if (value === Yoga.EDGE_TOP) return 1;
  if (value === Yoga.EDGE_RIGHT) return 2;
  if (value === Yoga.EDGE_BOTTOM) return 3;
  return 4;
};

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
