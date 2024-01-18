import { jest } from '@jest/globals';
import {
  setWidth,
  setMinWidth,
  setMaxWidth,
  setHeight,
  setMinHeight,
  setMaxHeight,
} from '../../src/node/setDimension';

describe('node setDimension', () => {
  const mockSetWidth = jest.fn();
  const mockSetWidthPercent = jest.fn();
  const mockSetMinWidth = jest.fn();
  const mockSetMaxWidth = jest.fn();
  const mockSetHeight = jest.fn();
  const mockSetHeightPercent = jest.fn();
  const mockSetMinHeight = jest.fn();
  const mockSetMaxHeight = jest.fn();

  const node = {
    yogaNode: {
      setWidth: mockSetWidth,
      setWidthPercent: mockSetWidthPercent,
      setMinWidth: mockSetMinWidth,
      setMaxWidth: mockSetMaxWidth,
      setHeight: mockSetHeight,
      setHeightPercent: mockSetHeightPercent,
      setMinHeight: mockSetMinHeight,
      setMaxHeight: mockSetMaxHeight,
    },
  };

  beforeEach(() => {
    mockSetWidth.mockReset();
    mockSetWidthPercent.mockReset();
    mockSetMinWidth.mockReset();
    mockSetMaxWidth.mockReset();
    mockSetHeight.mockReset();
    mockSetHeightPercent.mockReset();
    mockSetMinHeight.mockReset();
    mockSetMaxHeight.mockReset();
  });

  describe('setWidth', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setWidth(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setWidth(50)(node);

      expect(mockSetWidth.mock.calls).toHaveLength(1);
      expect(mockSetWidthPercent.mock.calls).toHaveLength(0);
      expect(mockSetWidth.mock.calls[0][0]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setWidth('50%')(node);

      expect(mockSetWidth.mock.calls).toHaveLength(0);
      expect(mockSetWidthPercent.mock.calls).toHaveLength(1);
      expect(mockSetWidthPercent.mock.calls[0][0]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setMinWidth', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setMinWidth(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setMinWidth(50)(node);

      expect(mockSetMaxWidth.mock.calls).toHaveLength(0);
      expect(mockSetMinWidth.mock.calls).toHaveLength(1);
      expect(mockSetMinWidth.mock.calls[0][0]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should throw error for percent values', () => {
      expect(() => setMinWidth('50%')(node)).toThrow();
    });
  });

  describe('setMaxWidth', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setMaxWidth(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setMaxWidth(50)(node);

      expect(mockSetMinWidth.mock.calls).toHaveLength(0);
      expect(mockSetMaxWidth.mock.calls).toHaveLength(1);
      expect(mockSetMaxWidth.mock.calls[0][0]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should throw error for percent values', () => {
      expect(() => setMaxWidth('50%')(node)).toThrow();
    });
  });

  describe('setHeight', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setHeight(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setHeight(50)(node);

      expect(mockSetHeight.mock.calls).toHaveLength(1);
      expect(mockSetHeightPercent.mock.calls).toHaveLength(0);
      expect(mockSetHeight.mock.calls[0][0]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should call appropiate yoga node method for percent values', () => {
      const result = setHeight('50%')(node);

      expect(mockSetHeight.mock.calls).toHaveLength(0);
      expect(mockSetHeightPercent.mock.calls).toHaveLength(1);
      expect(mockSetHeightPercent.mock.calls[0][0]).toBe(50);
      expect(result).toBe(node);
    });
  });

  describe('setMinHeight', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setMinWidth(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setMinHeight(50)(node);

      expect(mockSetMaxHeight.mock.calls).toHaveLength(0);
      expect(mockSetMinHeight.mock.calls).toHaveLength(1);
      expect(mockSetMinHeight.mock.calls[0][0]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should throw error for percent values', () => {
      expect(() => setMinHeight('50%')(node)).toThrow();
    });
  });

  describe('setMaxHeight', () => {
    test('should return node if no yoga node available', () => {
      const emptyNode = { box: { width: 10, height: 20 } };
      const result = setMaxHeight(null)(emptyNode);

      expect(result).toBe(emptyNode);
    });

    test('Should call appropiate yoga node method for numeric values', () => {
      const result = setMaxHeight(50)(node);

      expect(mockSetMinHeight.mock.calls).toHaveLength(0);
      expect(mockSetMaxHeight.mock.calls).toHaveLength(1);
      expect(mockSetMaxHeight.mock.calls[0][0]).toBe(50);
      expect(result).toBe(node);
    });

    test('Should throw error for percent values', () => {
      expect(() => setMaxHeight('50%')(node)).toThrow();
    });
  });
});
