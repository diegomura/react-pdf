/**
 * Picks the specified keys from an object and returns a new object with only those keys.
 *
 * @param keys - The keys to pick from the object
 * @param object - The object to pick the keys from
 * @returns A new object with only the picked keys
 */
const pick = (keys: (string | number)[], obj: Record<string, any>): object => {
  const result: Record<string, any> = {};

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (key in obj) result[key] = obj[key];
  }

  return result;
};

export default pick;
