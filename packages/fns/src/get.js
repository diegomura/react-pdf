import isNil from './isNil';
import castArray from './castArray';

/**
 * Retrieves the value at a given path from an object.
 *
 * @param {object} target the object to retrieve the value from.
 * @param {string | string[]} path the path of the value to retrieve.
 * @param {*} defaultValue the default value to return if the path does not exist.
 * @returns {*} the value at the given path, or the default value if the path does not exist.
 */
const get = (target, path, defaultValue) => {
  if (isNil(target)) return defaultValue;

  const _path = castArray(path);

  let result = target;

  for (let i = 0; i < _path.length; i += 1) {
    if (isNil(result)) return undefined;

    result = result[_path[i]];
  }

  return isNil(result) ? defaultValue : result;
};

export default get;
