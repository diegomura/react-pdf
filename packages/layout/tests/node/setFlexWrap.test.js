import { beforeEach, describe, expect, test, vi } from 'vitest';

import * as Yoga from 'yoga-layout/load';

import setFlexWrap from '../../src/node/setFlexWrap';

describe('node setFlexWrap', () => {
  const mock = vi.fn();
  const node = { yogaNode: { setFlexWrap: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setFlexWrap(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set no-wrap by default', () => {
    const result = setFlexWrap(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Wrap.NoWrap);
    expect(result).toBe(node);
  });

  test('Should set no-wrap', () => {
    const result = setFlexWrap('no-wrap')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Wrap.NoWrap);
    expect(result).toBe(node);
  });

  test('Should set wrap', () => {
    const result = setFlexWrap('wrap')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Wrap.Wrap);
    expect(result).toBe(node);
  });

  test('Should set wrap-reverse', () => {
    const result = setFlexWrap('wrap-reverse')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.Wrap.WrapReverse);
    expect(result).toBe(node);
  });
});
