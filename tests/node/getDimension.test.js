import * as R from 'ramda';

import getDimension from '../../src/node/getDimension';

const getComputedWidth = R.always(10);
const getComputedHeight = R.always(20);

describe('node getDimension', () => {
  test('Should return 0 by default if no yoga node available', () => {
    const result = getDimension({});

    expect(result).toHaveProperty('width', 0);
    expect(result).toHaveProperty('height', 0);
  });

  test('Should return yoga values if node available', () => {
    const _yogaNode = { getComputedWidth, getComputedHeight };
    const result = getDimension({ _yogaNode });

    expect(result).toHaveProperty('width', 10);
    expect(result).toHaveProperty('height', 20);
  });
});
