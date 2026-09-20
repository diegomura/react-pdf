import { describe, expect, test } from 'vitest';

import getPadding from '../../src/node/getPadding';

describe('node getPadding', () => {
  test('Should return 0 by default', () => {
    const result = getPadding({
      type: 'VIEW',
      props: {},
      style: {},
      children: [],
    });

    expect(result).toHaveProperty('paddingTop', 0);
    expect(result).toHaveProperty('paddingRight', 0);
    expect(result).toHaveProperty('paddingBottom', 0);
    expect(result).toHaveProperty('paddingLeft', 0);
  });

  test('Should return box specific values if available', () => {
    const result = getPadding({
      type: 'VIEW',
      props: {},
      style: {},
      children: [],
      box: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 100,
        height: 100,
        paddingTop: 1,
        paddingRight: 2,
        paddingBottom: 3,
        paddingLeft: 4,
      },
    });

    expect(result).toHaveProperty('paddingTop', 1);
    expect(result).toHaveProperty('paddingRight', 2);
    expect(result).toHaveProperty('paddingBottom', 3);
    expect(result).toHaveProperty('paddingLeft', 4);
  });

  test('Should return style specific values if available', () => {
    const result = getPadding({
      type: 'VIEW',
      props: {},
      children: [],
      style: {
        paddingTop: 1,
        paddingRight: 2,
        paddingBottom: 3,
        paddingLeft: 4,
      },
    });

    expect(result).toHaveProperty('paddingTop', 1);
    expect(result).toHaveProperty('paddingRight', 2);
    expect(result).toHaveProperty('paddingBottom', 3);
    expect(result).toHaveProperty('paddingLeft', 4);
  });
});
