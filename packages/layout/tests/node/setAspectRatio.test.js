import { jest } from '@jest/globals';
import setAspectRatio from '../../src/node/setAspectRatio';

describe('node setAspectRatio', () => {
  const mock = jest.fn();
  const node = { yogaNode: { setAspectRatio: mock } };

  beforeEach(() => {
    mock.mockReset();
  });

  test('should return node if no yoga node available', () => {
    const emptyNode = { box: { width: 10, height: 20 } };
    const result = setAspectRatio(null)(emptyNode);

    expect(result).toBe(emptyNode);
  });

  test('Should call yoga node setter if provided', () => {
    const result = setAspectRatio(3)(node);

    expect(mock.mock.calls).toHaveLength(1);
    expect(mock.mock.calls[0][0]).toBe(3);
    expect(result).toBe(node);
  });
});
