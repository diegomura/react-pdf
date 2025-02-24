import { describe, expect, test } from 'vitest';

import getPosition from '../../src/node/getPosition';

const getComputedTop = () => 10;
const getComputedRight = () => 20;
const getComputedBottom = () => 30;
const getComputedLeft = () => 40;

describe('node getPosition', () => {
  test('Should return 0 by default if no yoga node available', () => {
    const result = getPosition({
      type: 'VIEW',
      props: {},
      style: {},
      children: [],
    });

    expect(result).toHaveProperty('top', 0);
    expect(result).toHaveProperty('right', 0);
    expect(result).toHaveProperty('bottom', 0);
    expect(result).toHaveProperty('left', 0);
  });

  test('Should return yoga values if node available', () => {
    const yogaNode = {
      getComputedTop,
      getComputedRight,
      getComputedBottom,
      getComputedLeft,
    };
    const result = getPosition({
      type: 'VIEW',
      props: {},
      style: {},
      children: [],
      yogaNode,
    });

    expect(result).toHaveProperty('top', 10);
    expect(result).toHaveProperty('right', 20);
    expect(result).toHaveProperty('bottom', 30);
    expect(result).toHaveProperty('left', 40);
  });
});
