/**
 * Returns new array starting with zero, and keeping same relation between consecutive values
 *
 * @param {number[]} array list
 * @returns {number[]} normalized array
 */
export default function normalize(array) {
  const head = array[0];
  return array.map((value) => value - head);
}
