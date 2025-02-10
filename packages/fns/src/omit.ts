import castArray from './castArray';

/**
 * Creates a new object by omitting specified keys from the original object.
 *
 * @param keys - The key or keys to omit
 * @param object - The original object
 * @returns The new object without the omitted keys
 */
const omit = (keys: string | string[], object: Record<string, any>): object => {
  const _keys = castArray(keys);

  const copy = Object.assign({}, object);

  _keys.forEach((key) => {
    delete copy[key];
  });

  return copy;
};

export default omit;
