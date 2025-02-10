type Transformation = Record<string, (value: any) => any>;

/**
 * Applies a set of transformations to an object and returns a new object with the transformed values.
 *
 * @template T
 * @param transformations - The transformations to apply.
 * @param object - The object to transform.
 * @returns The transformed object.
 */
const evolve = (
  transformations: Transformation,
  object: Record<string, any>,
): Record<string, any> => {
  const result: Record<string, any> = {};
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const transformation = transformations[key];
    const type = typeof transformation;

    if (type === 'function') {
      result[key] = transformation(object[key]);
    } else {
      result[key] = object[key];
    }
  }

  return result;
};

export default evolve;
