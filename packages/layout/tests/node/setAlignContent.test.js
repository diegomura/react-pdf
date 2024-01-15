import { beforeEach, describe, expect, jest, test } from '@jest/globals';

import Yoga from '../../yoga';

import setAlignContent from '../../src/node/setAlignContent';

describe('node setAlignContent', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setAlignContent: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setAlignContent(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should set align auto by default', () => {
    const result = setAlignContent(null)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_AUTO);
    expect(result).toBe(node);
  });

  test('Should set flex-start', () => {
    const result = setAlignContent('flex-start')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_FLEX_START);
    expect(result).toBe(node);
  });

  test('Should set center', () => {
    const result = setAlignContent('center')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_CENTER);
    expect(result).toBe(node);
  });

  test('Should set flex-end', () => {
    const result = setAlignContent('flex-end')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_FLEX_END);
    expect(result).toBe(node);
  });

  test('Should set stretch', () => {
    const result = setAlignContent('stretch')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_STRETCH);
    expect(result).toBe(node);
  });

  test('Should set baseline', () => {
    const result = setAlignContent('baseline')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_BASELINE);
    expect(result).toBe(node);
  });

  test('Should set space-between', () => {
    const result = setAlignContent('space-between')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_SPACE_BETWEEN);
    expect(result).toBe(node);
  });

  test('Should set space-around', () => {
    const result = setAlignContent('space-around')(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(Yoga.ALIGN_SPACE_AROUND);
    expect(result).toBe(node);
  });
});
