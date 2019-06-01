import * as R from 'ramda';

import getPosition from '../../src/node/getPosition';

const getComputedTop = R.always(10);
const getComputedRight = R.always(20);
const getComputedBottom = R.always(30);
const getComputedLeft = R.always(40);

describe('node getPosition', () => {
  test('Should return 0 by default if no yoga node available', () => {
    const result = getPosition({});

    expect(result).toHaveProperty('top', 0);
    expect(result).toHaveProperty('right', 0);
    expect(result).toHaveProperty('bottom', 0);
    expect(result).toHaveProperty('left', 0);
  });

  test('Should return yoga values if node available', () => {
    const _yogaNode = {
      getComputedTop,
      getComputedRight,
      getComputedBottom,
      getComputedLeft,
    };
    const result = getPosition({ _yogaNode });

    expect(result).toHaveProperty('top', 10);
    expect(result).toHaveProperty('right', 20);
    expect(result).toHaveProperty('bottom', 30);
    expect(result).toHaveProperty('left', 40);
  });
});
