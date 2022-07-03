import Yoga from '@react-pdf/yoga';

import setOverflow from '../../src/node/setOverflow';

describe('node setOverflow', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setOverflow: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setOverflow(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set visible', () => {
    const result = setOverflow('visible')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.OVERFLOW_VISIBLE);
    expect(result).toBe(node);
  });

  test('Should set scroll', () => {
    const result = setOverflow('scroll')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.OVERFLOW_SCROLL);
    expect(result).toBe(node);
  });

  test('Should set hidden', () => {
    const result = setOverflow('hidden')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.OVERFLOW_HIDDEN);
    expect(result).toBe(node);
  });
});
