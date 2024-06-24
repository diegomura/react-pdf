import castArray from './castArray';

/**
 * Creates a new object by omitting specified keys from the original object.
 *
 * @param {string|string[]} keys the key or keys to omit
 * @param {object} object the original object
 * @returns {object} the new object without the omitted keys
 */
const omit = (keys, object) => {
  const _keys = castArray(keys);

  const copy = Object.assign({}, object);

  _keys.forEach((key) => {
    delete copy[key];
  });

  return copy;
};

export default omit;
