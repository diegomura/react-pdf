/**
 * Applies a set of transformations to an object and returns a new object with the transformed values.
 *
 * @template T
 * @param {Record<string, (value: T) => T | Record<string, (value: T) => T>>} transformations - The transformations to apply.
 * @param {T} object the object to transform.
 * @returns {T} the transformed object.
 */
const evolve = (transformations, object) => {
  const result = object instanceof Array ? [] : {};
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const transformation = transformations[key];
    const type = typeof transformation;

    if (type === 'function') {
      result[key] = transformation(object[key]);
    } else if (transformation && type === 'object') {
      result[key] = evolve(transformation, object[key]);
    } else {
      result[key] = object[key];
    }
  }

  return result;
};

export default evolve;
