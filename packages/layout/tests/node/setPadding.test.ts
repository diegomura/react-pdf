import { beforeEach, describe, expect, test, vi } from 'vitest';

import * as Yoga from 'yoga-layout/load';

import setPadding, {
  setPaddingTop,
  setPaddingRight,
  setPaddingBottom,
  setPaddingLeft,
} from '../../src/node/setPadding';
import { SafeNode } from '../../src/types';

describe('node setPadding', () => {
  const mock = vi.fn();
  const mockPercent = vi.fn();

  const node = {
    type: 'VIEW',
    props: {},
    style: {},
    children: [],
    yogaNode: { setPadding: mock, setPaddingPercent: mockPercent },
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

  describe('setPaddingTop', () => {
    test('should return node if no yoga node available', () => {
      const result = setPaddingTop(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPaddingTop(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Top);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPaddingTop('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.Edge.Top);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPaddingRight', () => {
    test('should return node if no yoga node available', () => {
      const result = setPaddingRight(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPaddingRight(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Right);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPaddingRight('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.Edge.Right);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPaddingBottom', () => {
    test('should return node if no yoga node available', () => {
      const result = setPaddingBottom(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPaddingBottom(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Bottom);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPaddingBottom('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.Edge.Bottom);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPaddingLeft', () => {
    test('should return node if no yoga node available', () => {
      const result = setPaddingLeft(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPaddingLeft(50)(node);

      expect(mock.mock.calls).toHaveLength(1);
      expect(mock.mock.calls[0][0]).toBe(Yoga.Edge.Left);
      expect(mock.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPaddingLeft('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(1);
      expect(mockPercent.mock.calls[0][0]).toBe(Yoga.Edge.Left);
      expect(mockPercent.mock.calls[0][1]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setPadding', () => {
    test('should return node if no yoga node available', () => {
      const result = setPadding(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setPadding(50)(node);

      expect(mock.mock.calls).toHaveLength(4);
      expect(mock.mock.calls[0]).toEqual([Yoga.Edge.Top, 50]);
      expect(mock.mock.calls[1]).toEqual([Yoga.Edge.Right, 50]);
      expect(mock.mock.calls[2]).toEqual([Yoga.Edge.Bottom, 50]);
      expect(mock.mock.calls[3]).toEqual([Yoga.Edge.Left, 50]);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setPadding('50%')(node);

      expect(mockPercent.mock.calls).toHaveLength(4);
      expect(mockPercent.mock.calls[0]).toEqual([Yoga.Edge.Top, 50]);
      expect(mockPercent.mock.calls[1]).toEqual([Yoga.Edge.Right, 50]);
      expect(mockPercent.mock.calls[2]).toEqual([Yoga.Edge.Bottom, 50]);
      expect(mockPercent.mock.calls[3]).toEqual([Yoga.Edge.Left, 50]);
      expect(result).toBe(node);
    });
  });
});
