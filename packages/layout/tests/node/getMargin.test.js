import Yoga from '@react-pdf/yoga';

import getMargin from '../../src/node/getMargin';

const getComputedMargin = value => {
  if (value === Yoga.EDGE_TOP) return 1;
  if (value === Yoga.EDGE_RIGHT) return 2;
  if (value === Yoga.EDGE_BOTTOM) return 3;
  return 4;
};

describe('node getMargin', () => {
  test('Should return 0 by default if no yoga node available', () => {
    const result = getMargin({});

    expect(result).toHaveProperty('marginTop', 0);
    expect(result).toHaveProperty('marginRight', 0);
    expect(result).toHaveProperty('marginBottom', 0);
    expect(result).toHaveProperty('marginLeft', 0);
  });

  test('Should return yoga values if node available', () => {
    const yogaNode = { getComputedMargin };
    const result = getMargin({ yogaNode });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 3);
    expect(result).toHaveProperty('marginLeft', 4);
  });

  test('Should return box specific values if available', () => {
    const result = getMargin({
      box: {
        marginTop: 1,
        marginRight: 2,
        marginBottom: 3,
        marginLeft: 4,
      },
    });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 3);
    expect(result).toHaveProperty('marginLeft', 4);
  });

  test('Should return style specific values if available', () => {
    const result = getMargin({
      style: {
        marginTop: 1,
        marginRight: 2,
        marginBottom: 3,
        marginLeft: 4,
        marginVertical: 5,
        marginHorizontal: 6,
        margin: 7,
      },
    });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 3);
    expect(result).toHaveProperty('marginLeft', 4);
  });

  test('Should return style axis values if available', () => {
    const result = getMargin({
      style: {
        marginVertical: 1,
        marginHorizontal: 2,
        margin: 3,
      },
    });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 2);
    expect(result).toHaveProperty('marginBottom', 1);
    expect(result).toHaveProperty('marginLeft', 2);
  });

  test('Should return generic margin value if available', () => {
    const result = getMargin({
      style: {
        margin: 1,
      },
    });

    expect(result).toHaveProperty('marginTop', 1);
    expect(result).toHaveProperty('marginRight', 1);
    expect(result).toHaveProperty('marginBottom', 1);
    expect(result).toHaveProperty('marginLeft', 1);
  });
});
