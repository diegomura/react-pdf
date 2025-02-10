import isNil from './isNil.js';
import castArray from './castArray.js';

/**
 * Retrieves the value at a given path from an object.
 *
 * @param target - The object to retrieve the value from.
 * @param path - The path of the value to retrieve.
 * @param defaultValue - The default value to return if the path does not exist.
 * @returns The value at the given path, or the default value if the path does not exist.
 */
const get = (
  target: any,
  path: (string | number)[],
  defaultValue: any,
): any => {
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
