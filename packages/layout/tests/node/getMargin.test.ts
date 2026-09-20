import { describe, expect, test } from 'vitest';

import getMargin from '../../src/node/getMargin';

describe('node getMargin', () => {
  test('Should return 0 by default', () => {
    const result = getMargin({
      type: 'VIEW',
      props: {},
      style: {},
      children: [],
    });

    expect(result).toHaveProperty('marginTop', 0);
    expect(result).toHaveProperty('marginRight', 0);
    expect(result).toHaveProperty('marginBottom', 0);
    expect(result).toHaveProperty('marginLeft', 0);
  });

  test('Should return box specific values if available', () => {
    const result = getMargin({
      type: 'VIEW',
      props: {},
      style: {},
      box: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 100,
        height: 200,
        marginTop: 1,
        marginRight: 2,
        marginBottom: 3,
        marginLeft: 4,
      },
      children: [],
    });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 3);
    expect(result).toHaveProperty('marginLeft', 4);
  });

  test('Should return style specific values if available', () => {
    const result = getMargin({
      type: 'VIEW',
      props: {},
      style: {
        marginTop: 1,
        marginRight: 2,
        marginBottom: 3,
        marginLeft: 4,
      },
      children: [],
    });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 3);
    expect(result).toHaveProperty('marginLeft', 4);
  });
});
