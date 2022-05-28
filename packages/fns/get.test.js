import get from './get';

describe('get', () => {
  const deepObject = {
    a: { b: { c: 'c' } },
    falseVal: false,
    nullVal: null,
    undefinedVal: undefined,
    arrayVal: ['arr'],
  };

  test('takes a path and an object and returns the value at the path or the default value', () => {
    const obj = {
      a: {
        b: {
          c: 100,
          d: 200,
        },
        e: {
          f: [100, 101, 102],
          g: 'G',
        },
        h: 'H',
      },
      i: 'I',
      j: ['J'],
    };

    expect(get(obj, ['a', 'b', 'c'], 'Unknown')).toBe(100);
    expect(get(obj, [], 'Unknown')).toBe(obj);
    expect(get(obj, ['a', 'e', 'f', 1], 'Unknown')).toBe(101);
    expect(get(obj, ['j', 0], 'Unknown')).toBe('J');
    expect(get(obj, ['j', 1], 'Unknown')).toBe('Unknown');
    expect(get(null, ['a', 'b', 'c'], 'Unknown')).toBe('Unknown');
  });

  test("gets a deep property's value from objects", () => {
    expect(get(deepObject, ['a', 'b', 'c'], 'Unknown')).toBe('c');
    expect(get(deepObject, ['a'], 'Unknown')).toBe(deepObject.a);
  });

  test('returns the default value for items not found', () => {
    expect(get(deepObject, ['a', 'b', 'foo'], 'Unknown')).toBe('Unknown');
    expect(get(deepObject, ['bar'], 'Unknown')).toBe('Unknown');
  });

  test('returns the default value for null/undefined', () => {
    expect(get(null, ['toString'], 'Unknown')).toBe('Unknown');
    expect(get(undefined, ['toString'], 'Unknown')).toBe('Unknown');
  });

  test('works with falsy items', () => {
    expect(get(false, ['toString'], 'Unknown')).toBe(
      Boolean.prototype.toString,
    );
  });
});
