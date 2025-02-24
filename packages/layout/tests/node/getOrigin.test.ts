import { describe, expect, test } from 'vitest';

import getOrigin from '../../src/node/getOrigin';

describe('node getOrigin', () => {
  test('Should return null for node without box', () => {
    const result = getOrigin({
      type: 'VIEW',
      props: {},
      style: {},
      children: [],
    });

    expect(result).toEqual(null);
  });

  test('Should return centered origin by default', () => {
    const result = getOrigin({
      type: 'VIEW',
      props: {},
      style: {},
      children: [],
      box: { top: 50, left: 100, bottom: 0, right: 0, width: 300, height: 400 },
    });

    expect(result).toHaveProperty('left', 250);
    expect(result).toHaveProperty('left', 250);
  });

  test('Should return origin adjusted by fixed values', () => {
    const result = getOrigin({
      type: 'VIEW',
      props: {},
      children: [],
      style: { transformOriginX: 100, transformOriginY: 50 },
      box: { top: 50, left: 100, bottom: 0, right: 0, width: 300, height: 400 },
    });

    expect(result).toHaveProperty('left', 200);
    expect(result).toHaveProperty('top', 100);
  });

  test('Should return origin adjusted by percent values', () => {
    const result = getOrigin({
      type: 'VIEW',
      props: {},
      children: [],
      style: { transformOriginX: '20%', transformOriginY: '70%' },
      box: { top: 50, left: 100, bottom: 0, right: 0, width: 300, height: 400 },
    });

    expect(result).toHaveProperty('left', 160);
    expect(result).toHaveProperty('top', 330);
  });
});
