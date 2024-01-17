import * as Yoga from 'yoga-layout';

import getBorderWidth from '../../src/node/getBorderWidth';

const getComputedBorder = value => {
  if (value === Yoga.Edge.Top) return 1;
  if (value === Yoga.Edge.Right) return 2;
  if (value === Yoga.Edge.Bottom) return 3;
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
    const yogaNode = { getComputedBorder };
    const result = getBorderWidth({ yogaNode });

    expect(result).toHaveProperty('borderTopWidth', 1);
    expect(result).toHaveProperty('borderRightWidth', 2);
    expect(result).toHaveProperty('borderBottomWidth', 3);
    expect(result).toHaveProperty('borderLeftWidth', 4);
  });
});
