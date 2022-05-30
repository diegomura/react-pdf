/**
 * Applies a function to the value at the given index of an array

 * @param {number} index
 * @param {function} fn
 * @param {array} collection
 * @returns copy of the array with the element at the given index replaced with the result of the function application.
 */
const adjust = (index, fn, collection) => {
  if (index >= 0 && index >= collection.length) return collection;
  if (index < 0 && Math.abs(index) > collection.length) return collection;

  const i = index < 0 ? collection.length + index : index;

  return Object.assign([], collection, { [i]: fn(collection[i]) });
};

export default adjust;
