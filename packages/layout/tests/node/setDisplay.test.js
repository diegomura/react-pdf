import Yoga from '@react-pdf/yoga';

import setDisplay from '../../src/node/setDisplay';

describe('node setDisplay', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setDisplay: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setDisplay(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set flex by default', () => {
    const result = setDisplay(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.DISPLAY_FLEX);
    expect(result).toBe(node);
  });

  test('Should set flex', () => {
    const result = setDisplay('flex')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.DISPLAY_FLEX);
    expect(result).toBe(node);
  });

  test('Should set none', () => {
    const result = setDisplay('none')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.DISPLAY_NONE);
    expect(result).toBe(node);
  });
});
