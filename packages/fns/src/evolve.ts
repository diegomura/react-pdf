/**
 * Applies a set of transformations to an object and returns a new object with the transformed values.
 *
 * @example
 * evolve({ count: (n) => n + 1 }, { name: 'item', count: 5 })
 * // => { name: 'item', count: 6 }
 *
 * @param transformations - The transformations to apply
 * @param object - The object to transform
 * @returns The transformed object
 */
function evolve<T extends Record<string, any>>(
  transformations: Partial<{ [K in keyof T]: (value: T[K]) => T[K] }>,
  object: T,
): T {
  const result: Record<string, any> = {};
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const transformation = transformations[key];

    if (typeof transformation === 'function') {
      result[key] = transformation(object[key]);
    } else {
      result[key] = object[key];
    }
  }

  return result as T;
}

export default evolve;
