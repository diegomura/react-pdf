import setFlex from '../../src/node/setFlex';

describe('node setFlex', () => {
  const mock = jest.fn();
  const node = { _yogaNode: { setFlex: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setFlex(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set provided value', () => {
    const result = setFlex(2)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(2);
    expect(result).toBe(node);
  });
});
