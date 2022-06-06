import last from '../src/last';

describe('last', () => {
  test('returns the last element of an ordered collection', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last([1, 2])).toBe(2);
    expect(last([1])).toBe(1);
    expect(last([])).toBe(undefined);

    expect(last('abc')).toBe('c');
    expect(last('ab')).toBe('b');
    expect(last('a')).toBe('a');
    expect(last('')).toBe('');
  });
});
