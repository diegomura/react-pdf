/**
 * Picks the specified keys from an object and returns a new object with only those keys.
 *
 * @example
 * pick(['a', 'c'], { a: 1, b: 2, c: 3 }) // => { a: 1, c: 3 }
 * pick(['x'], { a: 1, b: 2 })            // => {}
 *
 * @param keys - The keys to pick from the object
 * @param object - The object to pick the keys from
 * @returns A new object with only the picked keys
 */
const pick = (
  keys: (string | number)[],
  object: Record<string, any>,
): Record<string, any> => {
  const result: Record<string, any> = {};

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (key in object) result[key] = object[key];
  }

  return result;
};

export default pick;
