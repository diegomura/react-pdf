import Yoga from '@nutshelllabs/yoga';

import setAlignSelf from '../../src/node/setAlignSelf';

describe('node setAlignSelf', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setAlignSelf: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setAlignSelf(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set align auto by default', () => {
    const result = setAlignSelf(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_AUTO);
    expect(result).toBe(node);
  });

  test('Should set flex-start', () => {
    const result = setAlignSelf('flex-start')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_FLEX_START);
    expect(result).toBe(node);
  });

  test('Should set center', () => {
    const result = setAlignSelf('center')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_CENTER);
    expect(result).toBe(node);
  });

  test('Should set flex-end', () => {
    const result = setAlignSelf('flex-end')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_FLEX_END);
    expect(result).toBe(node);
  });

  test('Should set stretch', () => {
    const result = setAlignSelf('stretch')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_STRETCH);
    expect(result).toBe(node);
  });

  test('Should set baseline', () => {
    const result = setAlignSelf('baseline')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_BASELINE);
    expect(result).toBe(node);
  });

  test('Should set space-between', () => {
    const result = setAlignSelf('space-between')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_SPACE_BETWEEN);
    expect(result).toBe(node);
  });

  test('Should set space-around', () => {
    const result = setAlignSelf('space-around')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_SPACE_AROUND);
    expect(result).toBe(node);
  });
});
