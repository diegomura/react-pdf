import setFlexGrow from '../../src/node/setFlexGrow';

describe('node setFlexGrow', () => {
  const mock = jest.fn();
  const node = { _yogaNode: { setFlexGrow: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setFlexGrow(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set zero by default', () => {
    const result = setFlexGrow(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(0);
    expect(result).toBe(node);
  });

  test('Should set provided value', () => {
    const result = setFlexGrow(2)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(2);
    expect(result).toBe(node);
  });
});
