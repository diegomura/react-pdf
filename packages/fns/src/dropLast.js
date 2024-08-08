/**
 * Drops the last element from an array.
 *
 * @template T
 * @param {T[]} array the array to drop the last element from
 * @returns {T[]} the new array with the last element dropped
 */
const dropLast = (array) => array.slice(0, array.length - 1);

export default dropLast;
