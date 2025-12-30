type IteratorFn = (value: any, key: string, index: number) => any;

/**
 * Maps over the values of an object and applies a function to each value.
 *
 * @example
 * mapValues({ a: 1, b: 2 }, (v) => v * 2) // => { a: 2, b: 4 }
 *
 * @param object - The object to map over
 * @param fn - The function to apply to each value
 * @returns A new object with the mapped values
 */
const mapValues = (
  object: Record<string, any>,
  fn: IteratorFn,
): Record<string, any> => {
  const result: Record<string, any> = {};
  const entries = Object.entries(object);

  for (let i = 0; i < entries.length; i += 1) {
    const [key, value] = entries[i];
    result[key] = fn(value, key, i);
  }

  return result;
};

export default mapValues;
