import firstPass from '../../src/utils/firstPass';

describe('firstPass', () => {
  test('should return undefined if no functions provided', () => {
    const result = firstPass()();
    expect(result).toBe(undefined);
  });

  test('should pass same argument to all functions', () => {
    const mock1 = jest.fn(() => null);
    const mock2 = jest.fn(() => null);
    const mock3 = jest.fn(() => null);
    const value = 'react-pdf';

    firstPass(mock1, mock2, mock3)(value);

    expect(mock1.mock.calls).toHaveLength(1);
    expect(mock2.mock.calls).toHaveLength(1);
    expect(mock3.mock.calls).toHaveLength(1);
    expect(mock1.mock.calls[0]).toEqual([value]);
    expect(mock2.mock.calls[0]).toEqual([value]);
    expect(mock3.mock.calls[0]).toEqual([value]);
  });

  test('should call functions until one returns', () => {
    const mock1 = jest.fn(() => null);
    const mock2 = jest.fn(() => true);
    const mock3 = jest.fn(() => null);
    const value = 'react-pdf';

    firstPass(mock1, mock2, mock3)(value);

    expect(mock1.mock.calls).toHaveLength(1);
    expect(mock2.mock.calls).toHaveLength(1);
    expect(mock3.mock.calls).toHaveLength(0);
    expect(mock1.mock.calls[0]).toEqual([value]);
    expect(mock2.mock.calls[0]).toEqual([value]);
  });
});
