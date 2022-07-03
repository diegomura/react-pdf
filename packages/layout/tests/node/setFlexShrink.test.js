import setFlexShrink from '../../src/node/setFlexShrink';

describe('node setFlexShrink', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setFlexShrink: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setFlexShrink(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set one by default', () => {
    const result = setFlexShrink(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(1);
    expect(result).toBe(node);
  });

  test('Should set provided value', () => {
    const result = setFlexShrink(2)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(2);
    expect(result).toBe(node);
  });
});
