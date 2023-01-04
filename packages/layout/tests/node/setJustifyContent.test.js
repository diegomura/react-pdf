import Yoga from '@govind-react-pdf/yoga';

import setJustifyContent from '../../src/node/setJustifyContent';

describe('node setJustifyContent', () => {
  const mock = jest.fn();
  const node = { _yogaNode: { setJustifyContent: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setJustifyContent(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set center', () => {
    const result = setJustifyContent('center')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.JUSTIFY_CENTER);
    expect(result).toBe(node);
  });

  test('Should set flex-end', () => {
    const result = setJustifyContent('flex-end')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.JUSTIFY_FLEX_END);
    expect(result).toBe(node);
  });

  test('Should set flex-start', () => {
    const result = setJustifyContent('flex-start')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.JUSTIFY_FLEX_START);
    expect(result).toBe(node);
  });

  test('Should set space-between', () => {
    const result = setJustifyContent('space-between')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.JUSTIFY_SPACE_BETWEEN);
    expect(result).toBe(node);
  });

  test('Should set space-around', () => {
    const result = setJustifyContent('space-around')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.JUSTIFY_SPACE_AROUND);
    expect(result).toBe(node);
  });

  test('Should set space-evenly', () => {
    const result = setJustifyContent('space-evenly')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.JUSTIFY_SPACE_EVENLY);
    expect(result).toBe(node);
  });
});
