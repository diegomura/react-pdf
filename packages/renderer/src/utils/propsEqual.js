/* eslint-disable no-continue */

/**
 * Checks if two sets of props are equal (recursively)
 *
 * @param {Object} props A
 * @param {Object} props B
 * @returns {Boolean} props equals?
 *
 */
const propsEqual = (a, b) => {
  const oldPropsKeys = Object.keys(a);
  const newPropsKeys = Object.keys(b);

  if (oldPropsKeys.length !== newPropsKeys.length) {
    return false;
  }

  for (let i = 0; i < oldPropsKeys.length; i += 1) {
    const propName = oldPropsKeys[i];

    if (propName === 'render' && !a[propName] !== !b[propName]) {
      return false;
    }

    if (propName !== 'children' && a[propName] !== b[propName]) {
      if (
        typeof a[propName] === 'object' &&
        typeof b[propName] === 'object' &&
        propsEqual(a[propName], b[propName])
      ) {
        continue;
      }

      return false;
    }

    if (
      propName === 'children' &&
      (typeof a[propName] === 'string' || typeof b[propName] === 'string')
    ) {
      return a[propName] === b[propName];
    }
  }

  return true;
};

export default propsEqual;
