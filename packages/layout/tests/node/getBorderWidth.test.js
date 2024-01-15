import yogaModule from 'yoga-layout/sync';

import getBorderWidth from '../../src/node/getBorderWidth';

// yoga-layout sets default export using non-standard __esModule property, so we need to
// make an additional check in case it's used in a bundler that does not support it.
const Yoga = 'default' in yogaModule ? yogaModule.default : yogaModule;

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
    const yogaNode = { getComputedBorder };
    const result = getBorderWidth({ yogaNode });

    expect(result).toHaveProperty('borderTopWidth', 1);
    expect(result).toHaveProperty('borderRightWidth', 2);
    expect(result).toHaveProperty('borderBottomWidth', 3);
    expect(result).toHaveProperty('borderLeftWidth', 4);
  });
});
