import castArray from './castArray';

/**
 * Creates a new object by omitting specified keys from the original object.
 *
 * @example
 * omit('b', { a: 1, b: 2, c: 3 })      // => { a: 1, c: 3 }
 * omit(['a', 'c'], { a: 1, b: 2, c: 3 }) // => { b: 2 }
 *
 * @param keys - The key or keys to omit
 * @param object - The original object
 * @returns The new object without the omitted keys
 */
const omit = (
  keys: string | string[],
  object: Record<string, any>,
): Record<string, any> => {
  const _keys = castArray(keys);
  const copy = { ...object };

  for (let i = 0; i < _keys.length; i += 1) {
    delete copy[_keys[i]];
  }

  return copy;
};

export default omit;
