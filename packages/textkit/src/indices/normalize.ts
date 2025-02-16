/**
 * Returns new array starting with zero, and keeping same relation between consecutive values
 *
 * @param array - List
 * @returns Normalized array
 */
const normalize = (array: number[]) => {
  const head = array[0];
  return array.map((value) => value - head);
};

export default normalize;
