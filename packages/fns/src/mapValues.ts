type IteratorFn = (value: any, key: string, index: number) => any;

/**
 * Maps over the values of an object and applies a function to each value.
 *
 * @param object - The object to map over
 * @param fn - The function to apply to each value
 * @returns A new object with the mapped values
 */
const mapValues = (object: Record<string, any>, fn: IteratorFn): object => {
  const entries = Object.entries(object);
  const acc = {} as Record<string, any>;

  return entries.reduce((acc, [key, value], index) => {
    acc[key] = fn(value, key, index);
    return acc;
  }, acc);
};

export default mapValues;
