import { beforeEach, describe, expect, test, vi } from 'vitest';

import * as Yoga from 'yoga-layout/load';

import { setRowGap, setColumnGap } from '../../src/node/setGap';
import { SafeNode } from '../../src/types';

describe('node setGap', () => {
  const mock = vi.fn();
  const mockPercent = vi.fn();

  const node = {
    type: 'VIEW',
    props: {},
    style: {},
    children: [],
    yogaNode: {
      setGap: mock,
      setGapPercent: mockPercent,
    },
  } as SafeNode;

  const emptyNode = {
    type: 'VIEW',
    props: {},
    style: {},
    children: [],
    box: { top: 0, right: 0, bottom: 0, left: 0, width: 10, height: 20 },
  } as SafeNode;

  beforeEach(() => {
    mock.mockReset();
    mockPercent.mockReset();
  });

  describe('setRowGap', () => {
    test('should return node if no yoga node available', () => {
      const result = setRowGap(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('should call appropiate yoga node method for numeric values', () => {
      const result = setRowGap(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Gutter.Row);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('should call appropiate yoga node method for percent values', () => {
      const result = setRowGap('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.Gutter.Row);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setColumnGap', () => {
    test('should return node if no yoga node available', () => {
      const result = setColumnGap(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('should call appropiate yoga node method for numeric values', () => {
      const result = setColumnGap(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Gutter.Column);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('should call appropiate yoga node method for percent values', () => {
      const result = setColumnGap('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.Gutter.Column);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });
});
