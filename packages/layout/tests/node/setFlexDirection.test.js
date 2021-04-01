import Yoga from '@react-pdf/yoga';

import setFlexDirection from '../../src/node/setFlexDirection';

describe('node setFlexDirection', () => {
  const mock = jest.fn();
  const node = { _yogaNode: { setFlexDirection: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setFlexDirection(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set column by default', () => {
    const result = setFlexDirection(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.FLEX_DIRECTION_COLUMN);
    expect(result).toBe(node);
  });

  test('Should set column', () => {
    const result = setFlexDirection('column')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.FLEX_DIRECTION_COLUMN);
    expect(result).toBe(node);
  });

  test('Should set row', () => {
    const result = setFlexDirection('row')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.FLEX_DIRECTION_ROW);
    expect(result).toBe(node);
  });

  test('Should set row-reverse', () => {
    const result = setFlexDirection('row-reverse')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.FLEX_DIRECTION_ROW_REVERSE);
    expect(result).toBe(node);
  });

  test('Should set column-reverse', () => {
    const result = setFlexDirection('column-reverse')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.FLEX_DIRECTION_COLUMN_REVERSE);
    expect(result).toBe(node);
  });
});
